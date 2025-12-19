# api.py - Enhanced RAG endpoint with conversation memory and agent orchestration
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import cohere
from qdrant_client import QdrantClient
import uvicorn
import openai
import os
from typing import List, Dict, Optional
import logging
from datetime import datetime
import json

# Import agents
from agents import AgentOrchestrator

# Import skills
from agents.stream_events import skill_registry

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RAG Chatbot API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize clients
cohere_client = cohere.Client(os.getenv("COHERE_API_KEY", "KuKYbmlZlF5MtKLJTIeC9Mu4SISlmgfBMv6TsJr6"))
openai_api_key = os.getenv("OPENAI_API_KEY", "dummy-key-for-testing")
openai_client = openai.OpenAI(api_key=openai_api_key)

qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL", "https://0343f943-a206-4705-ae17-a2b7bfd76547.europe-west3-0.gcp.cloud.qdrant.io:6333"),
    api_key=os.getenv("QDRANT_API_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.3c65sYpV9mpGHqRDw9ULxy2ZkvfrDPhWaHV3TGgHJjc"),
)

# Initialize agent orchestrator
agent_orchestrator = AgentOrchestrator(openai_client)

# In-memory conversation storage (in production, use Redis or database)
conversations: Dict[str, List[Dict]] = {}

class Message(BaseModel):
    role: str
    content: str
    timestamp: Optional[datetime] = None

class ChatRequest(BaseModel):
    question: str
    user_id: Optional[str] = "default_user"
    context: Optional[Dict] = {}

class AnswerResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = []
    agent_used: Optional[str] = "general"


class SkillExecuteRequest(BaseModel):
    skill_name: str
    parameters: Dict


class SkillExecuteResponse(BaseModel):
    success: bool
    result: Optional[Dict] = {}
    error: Optional[str] = None


class ListSkillsResponse(BaseModel):
    skills: List[str]

def get_embedding(text):
    """Get embedding from Cohere"""
    try:
        response = cohere_client.embed(
            model="embed-english-v3.0",
            input_type="search_query",
            texts=[text],
        )
        return response.embeddings[0]
    except Exception as e:
        logger.error(f"Embedding error: {str(e)}")
        return []

def retrieve_context(query, limit: int = 3):
    """Retrieve relevant context from Qdrant"""
    try:
        embedding = get_embedding(query)
        if not embedding:
            return []

        result = qdrant.query_points(
            collection_name="humanoid-robotics-book",
            query=embedding,
            limit=limit
        )
        contexts = []
        sources = []
        for point in result.points:
            contexts.append(point.payload["text"])
            # Extract source information if available
            if "source" in point.payload:
                sources.append(point.payload["source"])

        return contexts, sources
    except Exception as e:
        logger.error(f"Retrieval error: {str(e)}")
        return [], []

@app.get("/")
def read_root():
    return {"message": "Enhanced RAG Chatbot API is running"}

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        logger.info(f"[RAG] Processing question from user {request.user_id}: {request.question}")

        # Get or initialize conversation history
        user_conversation = conversations.get(request.user_id, [])

        # Get relevant context
        contexts, sources = retrieve_context(request.question)

        if not contexts:
            answer = "I couldn't find specific information about that in the textbook. Please try asking about robotics concepts, sensors, actuators, or textbook modules."
            agent_used = "general"
        else:
            # Process query through agent orchestrator
            answer = agent_orchestrator.process_query(request.question, contexts, user_conversation)

            # Determine which agent was used (simplified approach)
            if "TechnicalExpertAgent" in answer:
                agent_used = "technical_expert"
            elif "TextbookGuideAgent" in answer:
                agent_used = "textbook_guide"
            elif "LearningPathAgent" in answer:
                agent_used = "learning_path"
            elif "ExampleGeneratorAgent" in answer:
                agent_used = "example_generator"
            else:
                agent_used = "general"

        # Add user message and bot response to conversation history
        user_conversation.append({"role": "user", "content": request.question})
        user_conversation.append({"role": "assistant", "content": answer})

        # Keep only the last 10 exchanges to manage memory
        conversations[request.user_id] = user_conversation[-10:]

        logger.info(f"[RAG] Answer generated by agent: {agent_used}")

        return AnswerResponse(answer=answer, sources=sources, agent_used=agent_used)

    except Exception as e:
        logger.error(f"[RAG] Error: {str(e)}")
        # Always return a valid response
        return AnswerResponse(
            answer="Welcome to the Physical AI & Humanoid Robotics textbook! I can help you understand concepts about robots, sensors, actuators, AI, and more. What would you like to learn about?",
            agent_used="fallback"
        )

@app.post("/pipelines/rag-pipeline/run/ex")
async def legacy_rag_query(request: ChatRequest):
    """Legacy endpoint for compatibility"""
    # Call the new endpoint logic
    return await chat_endpoint(request)


@app.get("/skills")
async def list_skills():
    """List all available skills"""
    try:
        skills = skill_registry.list_skills()
        return ListSkillsResponse(skills=skills)
    except Exception as e:
        logger.error(f"[SKILLS] Error listing skills: {str(e)}")
        raise HTTPException(status_code=500, detail="Error listing skills")


@app.post("/skills/execute")
async def execute_skill(request: SkillExecuteRequest):
    """Execute a specific skill with given parameters"""
    try:
        logger.info(f"[SKILLS] Executing skill '{request.skill_name}' with parameters: {request.parameters}")

        result = skill_registry.execute_skill(request.skill_name, **request.parameters)

        return SkillExecuteResponse(
            success=result.get('success', True),
            result=result,
            error=result.get('error')
        )
    except Exception as e:
        logger.error(f"[SKILLS] Error executing skill '{request.skill_name}': {str(e)}")
        return SkillExecuteResponse(
            success=False,
            error=f"Error executing skill: {str(e)}",
            result={}
        )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3001)