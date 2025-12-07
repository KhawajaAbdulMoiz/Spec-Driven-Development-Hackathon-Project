import os
import cohere
from agents import Agent, Runner, OpenAIChatCompletionsModel, AsyncOpenAI
from agents import set_tracing_disabled, function_tool
from dotenv import load_dotenv
from agents import enable_verbose_stdout_logging
from qdrant_client import QdrantClient

enable_verbose_stdout_logging()

load_dotenv()
set_tracing_disabled(disabled=True)

gemini_api_key = os.getenv("GEMINI_API_KEY")
provider = AsyncOpenAI(
    api_key=gemini_api_key,
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

model = OpenAIChatCompletionsModel(
    model="gemini-2.0-flash",  
    openai_client=provider
)



cohere_client = cohere.Client("KuKYbmlZlF5MtKLJTIeC9Mu4SISlmgfBMv6TsJr6")

qdrant = QdrantClient(
    url="https://0343f943-a206-4705-ae17-a2b7bfd76547.europe-west3-0.gcp.cloud.qdrant.io:6333", 
    api_key="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3MiOiJtIn0.3c65sYpV9mpGHqRDw9ULxy2ZkvfrDPhWaHV3TGgHJjc",
)



def get_embedding(text):
    response = cohere_client.embed(
        model="embed-english-v3.0",
        input_type="search_query",
        texts=[text],
    )
    return response.embeddings[0] 


@function_tool
def retrieve(query):
    embedding = get_embedding(query)
    result = qdrant.query_points(
        collection_name="humanoid-robotics-book",
        query=embedding,
        limit=5
    )
    return [point.payload["text"] for point in result.points]



agent = Agent(
    name="Assistant",
    instructions="""
You are an AI tutor for the Physical AI & Humanoid Robotics textbook.
To answer the user question, first call the tool `retrieve` with the user query.
Use ONLY the returned content from `retrieve` to answer.
If the answer is not in the retrieved content, say "I don't know".
""",
    model=model,
    tools=[retrieve]
)


result = Runner.run_sync(
    agent,
    input="what is physical ai?",
)

print(result.final_output)