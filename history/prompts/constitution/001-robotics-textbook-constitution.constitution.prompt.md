---
id: 001
title: "Physical AI & Humanoid Robotics Textbook Constitution"
stage: constitution
date: 2025-12-05
surface: agent
model: claude-haiku-4-5-20251001
feature: none
branch: master
user: architect
command: /sp.constitution
labels: ["textbook", "robotics", "ai", "governance", "principles"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
  - null
---

## Prompt

Create a complete and detailed constitution for a textbook project titled:
"Physical AI & Humanoid Robotics Textbook."

The constitution must follow these rules and include them clearly:

1. Purpose
   - The project will produce a 15–18 chapter, beginner-friendly, humanized textbook.
   - It will teach Physical AI, humanoid robotics, sensors, actuators, locomotion, perception, planning, control, AI agents, and real-world robotics examples.
   - Writing must be engaging, clear, and formatted for Docusaurus.
   - Must support multilingual output and translation buttons (English, Urdu, Hindi, Arabic, Spanish, etc.).

2. Tone & Writing Style
   - Friendly, teacher-like, simple explanations.
   - Avoid jargon unless explained.
   - Short paragraphs (2–4 lines).
   - Use real-world stories, analogies, and examples.
   - Include robots like Tesla Bot, Boston Dynamics, Agility Robotics, NVIDIA robotics.
   - Use diagrams (ASCII or Mermaid), definitions, lists, and workflow charts.
   - Each chapter MUST include: introduction → main content → diagrams → real examples → summary → exercises.

3. Textbook Structure Rules
   - Every chapter must have clear sections with proper Markdown headings.
   - Use bullet points heavily.
   - Use code blocks where needed.
   - Add special blocks:
       • "Did You Know?"
       • "Real-World Example"
       • "Try It"
   - Ensure clean, Docusaurus-ready Markdown.

4. Content Quality Rules
   - Must be technically accurate and non-hallucinatory.
   - Use real robotics hardware and AI methods.
   - Build from beginner → intermediate → advanced.
   - Cross-link chapters when needed.
   - Explain every technical term in simple English.

5. Personas
   - Primary: Expert robotics instructor teaching beginners.
   - Secondary: Senior AI engineer ensuring accuracy.

6. Engagement Requirements
   - Use diagrams for architecture, sensors, motion, planning.
   - Include real industry examples.
   - Add hands-on mini-tutorials.
   - Make the content fun, simple, and motivating.

7. Chapter Output Requirements
   Each chapter MUST include:
     - Clear introduction
     - Detailed explanations
     - At least one diagram (ASCII or Mermaid)
     - 1–3 real-world examples
     - Key takeaways
     - Exercises (3–5 questions)
     - Short recap

8. Global Rules for Agents
   - Follow the Constitution, Plan, and Tasks strictly.
   - Write everything in clean Markdown.
   - Maintain consistent tone across chapters.
   - Prioritize clarity over complexity.
   - State assumptions if unsure instead of hallucinating.
   - Ensure outputs are RAG-friendly.

9. Evaluation Criteria
   - Beginner-friendly clarity.
   - Technical accuracy.
   - Good Docusaurus formatting.
   - Engaging storytelling and visuals.
   - Smooth flow across all 15–18 chapters.

10. Future Extensions Supported
   - Multi-language translation button.
   - Urdu translation option.
   - Personalized chapters based on reader level.
   - RAG chatbot integration for the final book.

Generate the full constitution document based on all rules above.

## Response snapshot

Created comprehensive constitution document at `.specify/memory/constitution.md` (Version 1.0.0) with:

**6 Core Principles:**
1. Clarity First – Beginner-Friendly Writing
2. Technical Accuracy – Non-Hallucinatory Content
3. Structured Chapter Template – Consistency & Completeness
4. Progressive Complexity – Build Foundational Knowledge
5. Docusaurus-Ready Markdown & Multilingual Support
6. Engagement Through Storytelling & Real Examples

**3 Content Sections:**
- Content Quality Standards (Technical Correctness & Readability)
- Chapter Architecture (Mandatory Components & Markdown Blocks)
- Engagement Elements (Storytelling, Visuals, Hands-On Activities)

**3 Operational Sections:**
- Development Workflow (Chapter Creation Process & Review Gate)
- Multilingual & Accessibility Support (i18n Strategy & Accessibility)
- Governance (Amendment Procedure, Compliance Review, Success Metrics, Roles)

All principles include clear rationale and non-negotiable enforcement rules.

## Outcome

- ✅ Impact: Establishes authoritative governance framework for 15–18 chapter robotics textbook; enables consistent quality, accuracy, and engagement across all chapters; supports future multilingual expansion (Urdu, Hindi, Arabic, Spanish)
- 🧪 Tests: Constitution Review Gate checklist defined; 5 success metrics established (clarity >80%, accuracy 100%, engagement 50%+, zero build warnings, 100% i18n-compatible)
- 📁 Files: `.specify/memory/constitution.md` (254 lines); `/history/prompts/constitution/001-robotics-textbook-constitution.constitution.prompt.md` (PHR)
- 🔁 Next prompts: `/sp.specify` for feature specs; `/sp.plan` for implementation planning; chapter drafting workflow
- 🧠 Reflection: Constitution balances five competing demands: beginner accessibility, technical accuracy, structural consistency, engagement/storytelling, and multilingual readiness. Each principle includes clear rationale and measurable enforcement criteria. Governance section enables future amendments without losing coherence.

## Evaluation notes (flywheel)

- Failure modes observed: None; input requirements comprehensively addressed
- Graders run and results (PASS/FAIL): PASS – All user requirements encoded as principles; all rules from 10-point spec captured
- Prompt variant (if applicable): Single-turn comprehensive constitution generation
- Next experiment: Validate constitution with sample chapter draft to ensure all principles are practically enforceable and coherent
