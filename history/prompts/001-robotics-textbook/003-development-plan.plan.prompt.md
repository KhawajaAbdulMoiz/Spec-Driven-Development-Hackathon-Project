---
id: 003
title: "Textbook Development Execution Plan"
stage: plan
date: 2025-12-05
surface: agent
model: claude-haiku-4-5-20251001
feature: 001-robotics-textbook
branch: 001-robotics-textbook
user: architect
command: /sp.plan
labels: ["plan", "execution", "docusaurus", "phases", "architecture"]
links:
  spec: specs/001-robotics-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-robotics-textbook/plan.md
tests:
  - Docusaurus v2.4+ builds locally without errors
  - All 19 chapter skeleton files created with frontmatter
  - Sidebar navigation reflects 5-module structure
  - i18n structure prepared for Urdu, Hindi, Arabic, Spanish
  - GitHub Pages deployment pipeline configured
---

## Prompt

Create a complete Development Plan for the project titled:
"Physical AI & Humanoid Robotics Textbook."

Follow the Constitution and Specification strictly. The plan must define the step-by-step execution strategy for producing the full Docusaurus-based textbook, including:

1. PROJECT INITIALIZATION – Verify readiness, setup repo, configure npm, Docusaurus
2. DOCUSAURUS SETUP – Config, theme, sidebar, Mermaid, MDX, i18n, placeholder pages
3. CONTENT DEVELOPMENT PHASES – 5 phases: Skeleton, Core, Enhancements, Review, Polish
4. FILE STRUCTURE – Exact folder layout for modules + chapters
5. CHAPTER WORKFLOW – Step-by-step process for each chapter
6. RAG + CHATBOT PREP – Placeholder structure for future integration
7. MULTILINGUAL SUPPORT – i18n strategy for Urdu, Hindi, Arabic, Spanish
8. TESTING & DEPLOYMENT – GitHub Pages pipeline + QA
9. COMPLETION CRITERIA – Readiness checklist for task generation

## Response snapshot

Created comprehensive Development Plan at `specs/001-robotics-textbook/plan.md` (500+ lines) defining:

**Technical Context**:
- Stack: Node.js 18+ + TypeScript 5 + Docusaurus 2.4+ + MDX
- Dependencies: @docusaurus/preset-classic, Mermaid 10.x, i18n plugin
- Platform: GitHub Pages static hosting
- Performance: Build <30s, page load <2s, Lighthouse 100
- Constraints: Browser-only "Try It" activities; responsive mobile; WCAG 2.1 AA

**Constitution Check**: ✅ All 6 principles verified:
- Clarity First: Template enforces 2–4 line paragraphs, simple vocabulary
- Technical Accuracy: Phase 4 validation + hardware reference spreadsheet
- Structured Template: 9-component chapter template mandatory
- Progressive Complexity: Modules scaffold from Foundations → Perception → Control → AI → Real-World
- Docusaurus-Ready: MDX + i18n + Mermaid fully supported
- Engagement: Did You Know, Real-World Examples, Try It activities integrated

**7-Phase Execution**:
1. **Phase 0** (2 days): Project init + Docusaurus setup + npm config
2. **Phase 1** (1 day): Skeleton structure (19 chapter files + frontmatter)
3. **Phase 2** (3 days): Docusaurus config + custom React components + i18n
4. **Phase 3** (21 days): Core writing (all 19 chapters, ~30,000–50,000 words)
5. **Phase 4** (5 days): Technical review + accuracy validation
6. **Phase 5** (5 days): Enhancements + engagement polish
7. **Phase 6** (3 days): Final polish + i18n prep
8. **Phase 7** (1 day): Deploy to GitHub Pages + launch

**Total**: ~41 days (6 weeks)

**File Structure** (Docusaurus project):
- `/docs/module-01-foundations/` through `/docs/module-05-real-world/` (19 chapters total)
- `/src/components/` – LanguageSelector, ChatbotWidget, AdmonitionBox, ExerciseBlock, DiagramWrapper
- `/src/pages/` – About, How to Use, Chatbot placeholder, Contact
- `/i18n/en|ur|hi|ar|es/` – Multilingual folder structure
- `/static/img/diagrams/` – Exported Mermaid/ASCII diagrams
- `docusaurus.config.js`, `sidebars.js`, `package.json` configured

**Chapter Writing Workflow** (each chapter):
1. Create from template (Phase 1 ✓)
2. Write intro + learning objectives
3. Write main content (H2 sections, 2–4 line paragraphs)
4. Create diagram (Mermaid or ASCII)
5. Add 1–3 real-world examples (Tesla Bot, Boston Dynamics, etc.)
6. Add "Did You Know?" callout
7. Add key takeaways (3–5 bullets)
8. Add exercises (3–5 questions)
9. Add "Try It" activity
10. Add cross-links (≥2 per chapter)
11. Verify quality gates (clarity, accuracy, structure, rendering, engagement)

**RAG + Chatbot Prep**:
- Unique IDs added to chapter sections for chunk-level retrieval
- Placeholder components created: `ChatbotWidget.tsx`, `/pages/chatbot.mdx`
- Endpoints structure prepared for future FastAPI + Qdrant + PostgreSQL backend

**Multilingual (i18n) Strategy**:
- English: source-of-truth at `/i18n/en/`
- Urdu, Hindi, Arabic, Spanish: `/i18n/ur|hi|ar|es/` directories prepared
- Docusaurus native i18n plugin handles routing + language toggle
- Translation guidelines + terminology mapping documented

**Success Metrics** (all 8 from specification):
- SC-001: 80%+ reader clarity (post-chapter surveys)
- SC-002: 70%+ exercise completion, 50%+ Try It participation
- SC-003: 100% technical accuracy (Phase 4 validation)
- SC-004: Zero Docusaurus build warnings
- SC-005: 100% i18n-ready; pilot chapters translated
- SC-006: 1–3 real robots per chapter
- SC-007: ≥2 cross-links per chapter
- SC-008: 22,500–54,000 words; 19 chapters

**GitHub Pages Deployment**:
- GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
- `npm run deploy` → automatic GitHub Pages push
- Live site verified before Phase 7 completion

## Outcome

- ✅ Impact: Establishes concrete 7-phase roadmap for 6-week textbook execution; phases are sequenced logically with minimal blocker dependencies; each phase produces testable deliverables
- 🧪 Tests: Build validation (Phase 0–2), chapter accuracy (Phase 4), rendering (Phase 6), deployment (Phase 7); all success criteria measurable
- 📁 Files: `specs/001-robotics-textbook/plan.md` (500+ lines); comprehensive scope, technical depth, phase breakdown, deliverables per phase
- 🔁 Next prompts: `/sp.tasks` to generate 200+ granular tasks; chapter writing workflow templates; reviewer checklists
- 🧠 Reflection: Plan balances ambition (19 chapters, 7 phases, ~6 weeks) with realism (1 chapter/day writing phase; phases built for parallel work if staffed); critical path clear; blockers identified; rollback/rework paths documented in quality gates

## Evaluation notes (flywheel)

- Failure modes observed: None; plan is comprehensive and addresses all user requirements
- Graders run and results (PASS/FAIL): PASS – Constitution compliance verified; all technical context defined; 7 phases detailed with deliverables; success metrics aligned; deployment pipeline specified; i18n strategy clear
- Prompt variant (if applicable): Single-turn comprehensive plan generation
- Next experiment: Execute Phase 0 and Phase 1 to validate skeleton structure; then adjust Phase 3 chapter-writing workflow based on lessons learned from first 1–2 chapters

