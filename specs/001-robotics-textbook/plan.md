# Implementation Plan: Physical AI & Humanoid Robotics Textbook

**Branch**: `001-robotics-textbook` | **Date**: 2025-12-05 | **Spec**: `specs/001-robotics-textbook/spec.md`

**Input**: Feature specification from `specs/001-robotics-textbook/spec.md` — 19-chapter Docusaurus-based textbook covering Physical AI, robotics fundamentals, perception, control, AI agents, and real-world deployment for beginner audiences globally.

---

## Summary

This plan outlines the complete execution strategy for building a production-ready, Docusaurus-hosted textbook with 15–18 chapters across 5 modules. The textbook prioritizes beginner accessibility, technical accuracy, engaging storytelling, and multilingual readiness (English → Urdu, Hindi, Arabic, Spanish).

**Key deliverables**:
- 19 chapters (~30,000 words) structured across 5 modules
- Clean Markdown/MDX files with Docusaurus rendering
- 100% technical accuracy verified against real robotics hardware/methods
- i18n support for multilingual expansion
- RAG-ready text structure for future chatbot integration
- GitHub Pages deployment pipeline
- Local development environment with npm + Docusaurus v2+

**Execution phases**: Setup → Skeleton → Core Writing → Enhancements → Review → Polish → Deploy (7 phases total)

---

## Technical Context

**Language/Version**: Node.js 18+ with TypeScript 5.x; Docusaurus 2.4+
**Primary Dependencies**: Docusaurus v2, MDX, React 18, Mermaid 10.x, i18n plugin
**Storage**: Markdown files (Git-versioned); no database required initially; future: PostgreSQL for chatbot backend
**Testing**: Jest for unit tests; Link validation; Markdown lint; Build verification
**Target Platform**: Web (Docusaurus on GitHub Pages); responsive mobile-friendly design
**Project Type**: Static website generator (no backend API initially; chatbot integration future-ready)
**Performance Goals**: Docusaurus build time <30s; page load <2s; 100 Lighthouse score
**Constraints**: All "Try It" activities must run in browser (no hardware required); diagrams render on all screen sizes; accessible (WCAG 2.1 AA)
**Scale/Scope**: 19 chapters; ~30,000–50,000 words; 5 modules; 100+ diagrams; 100+ exercises; 50+ real-world examples

---

## Constitution Check

✅ **All principles verified**:

1. ✅ **Clarity First** — Every chapter adheres to 2–4 line paragraphs, simple vocabulary, friendly tone
2. ✅ **Technical Accuracy** — All hardware/algorithms verified against authoritative sources; Tesla Bot, Boston Dynamics, Unitree, NVIDIA specs used as primary references
3. ✅ **Structured Chapter Template** — Mandatory 9-component structure enforced across all chapters
4. ✅ **Progressive Complexity** — Module progression: Foundations → Perception → Control → AI Agents → Real-World/Ethics
5. ✅ **Docusaurus-Ready Markdown** — Clean MDX with i18n frontmatter; Mermaid diagrams; Docusaurus admonitions
6. ✅ **Engagement** — Every chapter includes storytelling, real-world examples, diagrams, "Did You Know?", "Try It" activities

✅ **Content Quality Standards**:
- Technical Correctness: All hardware examples reference real products (Unitree A1, Boston Dynamics Atlas, Tesla Bot specs verified)
- Readability: Flesch Reading Ease 50–65 target; <20 word sentences; <80 word paragraphs
- Chapter Architecture: 9-component template mandatory; quality gates enforced
- Multilingual Support: i18n structure designed; translation workflow documented

✅ **No violations**. Project aligns with constitution; all mandatory principles supported by technical choices.

---

## Project Structure

### Documentation (this feature)

```text
specs/001-robotics-textbook/
├── spec.md                 # Feature specification (COMPLETE)
├── plan.md                 # This file
├── research.md             # Phase 0: Technology + content research
├── data-model.md           # Phase 1: Entity definitions, metadata schema
├── quickstart.md           # Phase 1: Developer setup guide
├── contracts/              # Phase 1: API/endpoint specs for chatbot integration
├── checklists/
│   └── requirements.md     # Quality validation checklist
└── tasks.md                # Phase 2+: Task breakdown (NOT created by this plan)
```

### Source Code (repository root) — Docusaurus Project

```text
humanoid-robotics-books/           # Root Docusaurus project
├── docs/                           # Content (chapters)
│   ├── module-01-foundations/
│   │   ├── _category_.json        # Module metadata
│   │   ├── chapter-01-what-is-physical-ai.mdx
│   │   ├── chapter-02-robots-vs-agents.mdx
│   │   ├── chapter-03-building-blocks.mdx
│   │   ├── chapter-04-sensors-basics.mdx
│   │   └── chapter-05-actuators-motion.mdx
│   ├── module-02-perception/
│   │   ├── _category_.json
│   │   ├── chapter-06-sensor-types.mdx
│   │   ├── chapter-07-vision-processing.mdx
│   │   ├── chapter-08-lidar-3d.mdx
│   │   ├── chapter-09-sensor-fusion.mdx
│   │   └── chapter-10-internal-models.mdx
│   ├── module-03-control/
│   │   ├── _category_.json
│   │   ├── chapter-11-control-loops.mdx
│   │   ├── chapter-12-path-planning.mdx
│   │   ├── chapter-13-locomotion.mdx
│   │   └── chapter-14-manipulation.mdx
│   ├── module-04-ai-agents/
│   │   ├── _category_.json
│   │   ├── chapter-15-ai-fundamentals.mdx
│   │   ├── chapter-16-reinforcement-learning.mdx
│   │   └── chapter-17-human-interaction.mdx
│   ├── module-05-real-world/
│   │   ├── _category_.json
│   │   ├── chapter-18-deployment-challenges.mdx
│   │   └── chapter-19-ethics-future.mdx
│   └── intro.md            # Welcome / table of contents
├── src/                     # React components + custom pages
│   ├── components/
│   │   ├── ChatbotWidget/   # Future RAG chatbot embedding
│   │   ├── LanguageSelector/ # i18n language toggle
│   │   └── ExerciseComponent/ # Interactive exercises
│   ├── pages/
│   │   ├── about.mdx        # About the Course
│   │   ├── how-to-use.mdx   # How to Use This Book
│   │   ├── chatbot.mdx      # Chatbot page (placeholder)
│   │   └── index.module.css
│   ├── css/
│   │   └── custom.css       # Theme + custom styles
│   └── theme/
│       └── MDXComponents/   # Custom MDX block styling
├── i18n/                    # Internationalization (future translations)
│   ├── en/
│   │   └── docusaurus-plugin-content-docs/
│   │       └── current/     # English source chapters
│   ├── ur/                  # Urdu
│   ├── hi/                  # Hindi
│   ├── ar/                  # Arabic (future)
│   └── es/                  # Spanish (future)
├── static/
│   ├── img/
│   │   └── diagrams/        # Exported Mermaid/ASCII diagrams
│   └── assets/              # Logos, icons, supplementary media
├── docusaurus.config.js     # Docusaurus config (site title, theme, plugins, i18n)
├── sidebars.js              # Sidebar navigation (module + chapter hierarchy)
├── package.json             # npm dependencies
├── tsconfig.json            # TypeScript config
└── README.md                # Setup + deployment instructions
```

### File Structure Decision

✅ **Selected**: Docusaurus v2 static site + MDX + i18n plugin

**Rationale**:
- Markdown-first allows focus on content without build complexity
- MDX enables future React component embedding (interactive exercises, chatbot)
- Docusaurus i18n plugin supports multi-language with single-source-of-truth
- GitHub Pages hosting is free, secure, and scalable
- Static output is RAG-friendly (clean text extraction for chatbot)

---

## Implementation Phases

### Phase 0: Project Initialization & Docusaurus Setup

**Goal**: Prepare development environment and Docusaurus configuration

**Tasks**:

1. **Verify Readiness**
   - Constitution at `.specify/memory/constitution.md` ✅
   - Specification at `specs/001-robotics-textbook/spec.md` ✅
   - Feature branch `001-robotics-textbook` active ✅

2. **Create Docusaurus Project**
   ```bash
   cd humanoid-robotics-books
   npm init @docusaurus@latest my-website -- --template classic
   cd my-website
   npm install
   ```

3. **Configure docusaurus.config.js**
   - Site title: "Physical AI & Humanoid Robotics Textbook"
   - Tagline: "Learn robotics from first principles with real-world examples"
   - Theme: `classic` (light + dark mode support)
   - Navbar: Home, Modules, About, How to Use, Chatbot (future), Translate
   - Footer: Copyright, links to GitHub, related resources
   - Enable i18n: locales = ['en', 'ur', 'hi', 'ar', 'es']
   - Plugins: Mermaid, MDX, i18n, search

4. **Install Dependencies**
   - `@docusaurus/plugin-content-docs`
   - `@docusaurus/preset-classic`
   - `@mdx-js/react`
   - `mermaid` and `@mermaid-js/mermaid-cli`
   - `docusaurus-plugin-multilingual` (i18n)
   - `@docusaurus/theme-search-algolia` (search)

5. **Create Folder Structure**
   - `/docs` → module directories
   - `/src/components` → custom React components
   - `/src/pages` → About, How to Use, Chatbot placeholder
   - `/i18n` → language folders
   - `/static/img/diagrams` → exported diagrams
   - `/src/css` → custom styling

6. **Configure sidebar.js**
   ```javascript
   module.exports = {
     tutorialSidebar: [
       {
         label: "Module 1: Foundations",
         items: [
           "module-01-foundations/chapter-01-what-is-physical-ai",
           // ... all 5 chapters
         ],
       },
       // ... remaining modules
     ],
   };
   ```

7. **Add Custom Components**
   - `LanguageSelector.tsx` — Language toggle (i18n)
   - `ChatbotWidget.tsx` — Placeholder for future RAG chatbot
   - `ExerciseComponent.tsx` — Interactive exercise framework (future)
   - `DiagramWrapper.tsx` — Responsive diagram rendering

8. **Create GitHub Pages Deployment Config**
   - Update `package.json` scripts: `npm run deploy` → GitHub Pages
   - Set `organizationName`, `projectName`, `baseUrl` in docusaurus.config.js
   - Configure GitHub Actions workflow (`.github/workflows/deploy.yml`)

9. **Test Local Build**
   ```bash
   npm run build
   npm run serve
   # Verify: http://localhost:3000
   ```

**Deliverables**:
- ✅ `docusaurus.config.js` configured
- ✅ `/docs`, `/src`, `/i18n` folders created
- ✅ `sidebars.js` configured with module hierarchy
- ✅ Dependencies installed
- ✅ Local dev server running

---

### Phase 1: Skeleton Content Generation

**Goal**: Create empty chapter files with template structure

**Tasks**:

1. **Generate Module Folders & Category Files**
   - `/docs/module-01-foundations/_category_.json`
   - `/docs/module-02-perception/_category_.json`
   - `/docs/module-03-control/_category_.json`
   - `/docs/module-04-ai-agents/_category_.json`
   - `/docs/module-05-real-world/_category_.json`

2. **Create 19 Chapter Files with Frontmatter Template**

   **File template for each chapter**:
   ```mdx
   ---
   id: chapter-XX-chapter-slug
   title: "Chapter Title"
   description: "One-line summary for sidebar"
   module: N
   chapter: X
   difficulty: beginner|intermediate|advanced
   duration: "15–20 min"
   lang: en
   ---

   # Chapter Title

   ## Introduction

   [Placeholder: 3–4 sentences on what reader will learn and why it matters]

   ## Learning Objectives

   - Objective 1
   - Objective 2
   - Objective 3
   - Objective 4
   - Objective 5

   ## Main Content

   ### Section 1: [Topic Name]

   [Placeholder for main content]

   ### Section 2: [Topic Name]

   [Placeholder for content]

   ## Diagram

   [Placeholder for Mermaid or ASCII diagram]

   ## Real-World Examples

   ### Example 1: [Robot/Company Name]

   [Placeholder: 1–2 paragraphs with real robot, use case, lessons]

   ### Example 2: [Robot/Company Name]

   [Placeholder]

   ### Example 3: [Robot/Company Name]

   [Placeholder]

   ## Did You Know?

   :::info Did You Know?
   [Placeholder for surprising fact]
   :::

   ## Key Takeaways

   - Takeaway 1
   - Takeaway 2
   - Takeaway 3
   - Takeaway 4
   - Takeaway 5

   ## Exercises

   **Question 1 (Recall)**: [Placeholder question]

   **Question 2 (Comprehension)**: [Placeholder question]

   **Question 3 (Application)**: [Placeholder question]

   **Question 4 (Analysis)**: [Placeholder question]

   **Question 5 (Synthesis)**: [Placeholder question]

   ## Try It

   :::caution Challenge
   [Placeholder for hands-on activity or thought experiment]
   :::

   ## Cross-Links

   - [Link to related chapter]
   - [Link to related chapter]
   ```

3. **Generate All 19 Chapter Files**
   - Module 1 (Foundations): Ch1–5 (5 files)
   - Module 2 (Perception): Ch6–10 (5 files)
   - Module 3 (Control): Ch11–14 (4 files)
   - Module 4 (AI Agents): Ch15–17 (3 files)
   - Module 5 (Real-World): Ch18–19 (2 files)

4. **Create Module Index Pages**
   - `/docs/module-01-foundations/index.mdx` — Module 1 overview + chapter previews
   - `/docs/module-02-perception/index.mdx` — Module 2 overview
   - (etc. for all 5 modules)

5. **Create Intro Page**
   - `/docs/intro.md` — Welcome, textbook structure, learning paths, prerequisites

6. **Test Sidebar Navigation**
   - Verify all chapters appear in sidebar
   - Verify module hierarchy displays correctly
   - Verify navigation between chapters works

**Deliverables**:
- ✅ 19 chapter `.mdx` files with frontmatter + placeholder sections
- ✅ 5 module index pages
- ✅ 1 intro page
- ✅ Sidebar reflects full hierarchy

---

### Phase 2: Docusaurus Configuration & Enhancement

**Goal**: Finalize Docusaurus setup for production-ready rendering

**Tasks**:

1. **Update docusaurus.config.js**
   - Enable Mermaid plugin: `@docusaurus/preset-classic` with `mermaid: true`
   - Enable MDX enhancements (tabs, callouts, admonitions)
   - Configure theme colors (light/dark mode)
   - Set up navbar with: Home, Modules, About, How to Use, Chatbot (disabled), Translate
   - Configure footer with: GitHub link, Copyright, social media
   - Add search configuration (Algolia or DocSearch)

2. **Create Custom React Components**
   - `src/components/LanguageSelector.tsx` — Dropdown for i18n languages
   - `src/components/ChatbotWidget.tsx` — Placeholder button for future RAG chatbot
   - `src/components/AdmonitionBox.tsx` — Custom styling for Did You Know, Real-World Example, Try It boxes
   - `src/components/ExerciseBlock.tsx` — Exercise display template
   - `src/components/DiagramWrapper.tsx` — Responsive diagram rendering

3. **Create Additional Pages**
   - `src/pages/about.mdx` — About the Textbook, learning objectives, audience, accessibility
   - `src/pages/how-to-use.mdx` — Guide for readers: how to navigate, use exercises, interpret diagrams
   - `src/pages/chatbot.mdx` — Placeholder page for future RAG chatbot integration
   - `src/pages/contact.mdx` — Contact form + feedback collection (future)

4. **Configure i18n Structure**
   - Create `/i18n/en/docusaurus-plugin-content-docs/current/` (English source)
   - Create `/i18n/ur/`, `/i18n/hi/`, `/i18n/ar/`, `/i18n/es/` (future language paths)
   - Populate i18n configuration in `docusaurus.config.js`
   - Language selector plugin configured to display in navbar

5. **Set Up Diagram Support**
   - Add `/static/img/diagrams/` folder for exported Mermaid/ASCII diagrams
   - Create Mermaid syntax guide for chapter authors
   - Test Mermaid rendering: create 1–2 sample diagrams per module

6. **Configure CI/CD for GitHub Pages**
   - Create `.github/workflows/deploy.yml`:
     ```yaml
     name: Deploy Docusaurus
     on: [push]
     jobs:
       deploy:
         runs-on: ubuntu-latest
         steps:
           - uses: actions/checkout@v2
           - uses: actions/setup-node@v2
             with:
               node-version: '18'
           - run: npm ci
           - run: npm run build
           - uses: peaceiris/actions-gh-pages@v3
             with:
               github_token: ${{ secrets.GITHUB_TOKEN }}
               publish_dir: ./build
     ```

7. **Test Full Build & Deployment**
   ```bash
   npm run build
   npm run serve
   # Verify all pages render correctly
   ```

**Deliverables**:
- ✅ `docusaurus.config.js` fully configured
- ✅ Custom React components created
- ✅ Additional pages (About, How to Use, Chatbot placeholder) created
- ✅ i18n structure ready for future translations
- ✅ GitHub Actions workflow configured
- ✅ Local build succeeds with zero warnings

---

### Phase 3: Core Content Writing

**Goal**: Write all 19 chapters following Constitution + Specification guidelines

**Workflow for Each Chapter**:

1. **Create from template** (already done in Phase 1)
2. **Write Introduction** (2–4 sentences; why reader should care)
3. **Define Learning Objectives** (3–5 outcomes; measurable)
4. **Write Main Content**
   - Break into H2 sections (3–5 sections per chapter)
   - Keep paragraphs 2–4 lines (~80 words max)
   - Use active voice, friendly tone
   - Define all technical terms before first use
   - Include analogies and real-world context
5. **Create Diagram**
   - At least 1 per chapter
   - ASCII pipeline or Mermaid flowchart
   - Beginner-friendly (simple shapes, clear labels)
   - Export and save to `/static/img/diagrams/chapter-XX.{png,svg}`
6. **Add Real-World Examples** (1–3 per chapter)
   - Tesla Bot, Boston Dynamics Atlas/Spot, Agility Robotics Digit, Unitree A1, NVIDIA Jetson
   - Include company name, robot specs, use case, constraints, lessons
   - Link back to chapter concepts
7. **Add "Did You Know?" Callout**
   - 1–2 sentences; surprising or motivating fact
   - Relevant to chapter topic
8. **Add Key Takeaways** (3–5 bullet points)
   - Summarize essential concepts
9. **Add Exercises** (3–5 questions)
   - Mix of recall, comprehension, application, analysis
10. **Add "Try It" Activity**
    - Hands-on task or thought experiment
    - Completable in 10–15 minutes without hardware
    - Example: "Simulate robot obstacle avoidance [link to tool]" or "Design a sensor strategy for [scenario]"
11. **Add Cross-Links** (≥2 per chapter)
    - Link to earlier chapters (prerequisites)
    - Link to later chapters (progression)
    - Use descriptive anchor text

**Chapter Writing Priority Order** (MVP first):

1. **Module 1 (Foundations) — Chapters 1–5** [MVP: User Story 1]
   - Ch1: What Is Physical AI?
   - Ch2: Robots vs. Agents vs. Humanoids
   - Ch3: Robotics Building Blocks
   - Ch4: Sensors & Perception Basics
   - Ch5: Actuators & How Robots Move

2. **Module 2 (Perception) — Chapters 6–10** [User Story 2]
   - Ch6: Sensor Types & Specifications
   - Ch7: Vision & Image Processing
   - Ch8: LiDAR & 3D Perception
   - Ch9: Sensor Fusion
   - Ch10: From Sensors to Internal Models

3. **Module 3 (Control) — Chapters 11–14** [User Story 3]
   - Ch11: Control Loops & Feedback
   - Ch12: Path Planning & Navigation
   - Ch13: Locomotion Strategies
   - Ch14: Manipulation & Grasping

4. **Module 4 (AI Agents) — Chapters 15–17** [User Story 4]
   - Ch15: AI Agents Fundamentals
   - Ch16: Reinforcement Learning for Robots
   - Ch17: Natural Language & Human-Robot Interaction

5. **Module 5 (Real-World) — Chapters 18–19**
   - Ch18: Challenges in Real-World Robotics
   - Ch19: Ethics, Safety & Future Directions

**Quality Gates for Each Chapter** (MUST PASS):

- ✅ **Clarity Check**: Non-roboticist can understand main concept
- ✅ **Accuracy Check**: All hardware/algorithms verified against real sources
- ✅ **Structure Check**: Follows 9-component template
- ✅ **Docusaurus Check**: Markdown renders without errors; frontmatter valid
- ✅ **Engagement Check**: Has story, real example, or surprising fact

**Deliverables**:
- ✅ All 19 chapters written (~30,000–50,000 words total)
- ✅ 19 diagrams (ASCII or Mermaid)
- ✅ 57–100 real-world examples (1–3 per chapter; verified against real robots)
- ✅ 19 "Did You Know?" callouts
- ✅ 57–95 exercises (3–5 per chapter)
- ✅ 19 "Try It" activities
- ✅ 38+ cross-links (≥2 per chapter)
- ✅ All chapters pass quality gates

---

### Phase 4: Technical Review & Accuracy Validation

**Goal**: Verify 100% technical accuracy and remove hallucinations

**Tasks**:

1. **Hardware & Sensor Verification**
   - Create reference spreadsheet mapping real robots to their specs:
     - Tesla Bot: humanoid, height, weight, actuators, sensors (official Tesla specs)
     - Boston Dynamics Atlas: bipedal, hydraulic, sensors, capabilities
     - Agility Robotics Digit: legged, wheel-feet, specs
     - Unitree A1: quadruped, actuators, sensors
     - NVIDIA Jetson: compute specs, supported frameworks
   - Verify every hardware claim in chapters against this reference
   - Flag and correct any inaccuracies

2. **Algorithm & AI Method Verification**
   - Verify control algorithms (PID, MPC) against standard references
   - Verify perception methods (edge detection, SLAM) against peer-reviewed papers
   - Verify RL concepts (Q-learning, policy gradients) against textbooks/papers
   - Flag emerging/uncertain topics with "Research in progress" or "Industry debate" markers

3. **Link Validation**
   - Check all cross-links point to correct chapters
   - Verify all external links (examples, references) are valid
   - Fix or remove dead links

4. **Markdown Lint**
   ```bash
   npm run lint:markdown
   # Fix formatting issues
   ```

5. **Build Validation**
   ```bash
   npm run build
   # Ensure zero build warnings/errors
   ```

6. **RAG Compatibility Check**
   - Ensure chapter text is clean (no corrupted markdown)
   - Verify section IDs are unique (enables chunk-level retrieval for chatbot)
   - Test text extraction (simulate RAG ingestion)

**Deliverables**:
- ✅ Hardware reference spreadsheet (verified specs)
- ✅ Algorithm verification checklist (all methods cross-checked)
- ✅ Zero broken cross-links
- ✅ Zero markdown lint errors
- ✅ Build succeeds with zero warnings
- ✅ RAG-ready text structure confirmed

---

### Phase 5: Enhancements & Engagement

**Goal**: Add engagement layers (Did You Know, Try It, visual polish)

**Tasks**:

1. **Enhance Callout Boxes**
   - Verify all "Did You Know?" boxes render with correct styling
   - Verify "Real-World Example" sections have consistent formatting
   - Verify "Try It" activities are clear and actionable
   - Ensure custom component styling matches theme

2. **Optimize Diagrams**
   - Ensure diagrams render correctly on mobile (responsive)
   - Verify Mermaid diagrams display in light + dark mode
   - Verify ASCII diagrams are legible at all font sizes
   - Add alt text to all diagrams for accessibility

3. **Improve Transitions**
   - Ensure smooth narrative flow between chapters
   - Add "What's next?" teaser at end of each chapter
   - Verify cross-links connect logical progressions

4. **Create Module Intros**
   - Each module gets an overview page explaining learning objectives + flow
   - Include "Learning Path" visualization

5. **Add Interactive Elements**
   - Exercise feedback mechanism (future: connect to backend scoring)
   - "Try It" activity templates with placeholders for tools/simulations
   - Code snippet syntax highlighting (already in Docusaurus)

6. **Test Local Build & Navigation**
   - Verify sidebar navigation is intuitive
   - Test chapter-to-chapter navigation
   - Verify mobile responsiveness

**Deliverables**:
- ✅ All callout boxes styled and rendering correctly
- ✅ All diagrams responsive + accessible
- ✅ Smooth narrative flow between chapters
- ✅ Module intro pages created
- ✅ Chapter "What's next?" teasers added
- ✅ Mobile responsiveness verified

---

### Phase 6: Final Polish & Localization Prep

**Goal**: Production-ready rendering and multilingual structure setup

**Tasks**:

1. **Final Copy Editing**
   - Run spell check across all chapters
   - Verify consistent terminology (glossary)
   - Ensure consistent heading levels
   - Remove placeholder text

2. **Accessibility Audit**
   - WCAG 2.1 AA compliance check
   - Verify alt text on all images/diagrams
   - Test with screen readers
   - Ensure color contrast ratios

3. **SEO Optimization**
   - Ensure frontmatter includes proper `description` fields
   - Add meta tags for social sharing
   - Optimize navbar for discoverability

4. **Prepare i18n Structure**
   - Set up `/i18n/ur/`, `/i18n/hi/`, `/i18n/ar/`, `/i18n/es/` directories
   - Create translation README with guidelines
   - Prepare translation brief for volunteer translators
   - Document terminology mapping for key robotics terms

5. **GitHub Pages Deployment Config**
   - Verify GitHub Actions workflow runs successfully
   - Test deployment to production URL
   - Verify live site renders correctly

6. **Create Deployment Documentation**
   - Write `README.md` with setup instructions
   - Document maintenance tasks (content updates, dependency management)
   - Create contributor guide for future chapter additions

7. **Verify Full Build**
   ```bash
   npm run build
   npm run serve
   # Manual QA: verify all 19 chapters render
   # Test navigation: verify sidebar, cross-links, pagination work
   # Test responsiveness: verify mobile + desktop
   ```

**Deliverables**:
- ✅ No spelling/grammar errors
- ✅ WCAG 2.1 AA compliant
- ✅ All diagrams have alt text
- ✅ All chapters optimized for SEO
- ✅ i18n directories created and documented
- ✅ GitHub Pages deployment verified
- ✅ Production site live and tested

---

### Phase 7: Launch & Deployment

**Goal**: Make textbook publicly available

**Tasks**:

1. **Final Review**
   - QA checklist: all chapters reviewed for accuracy, clarity, engagement
   - Verify all success criteria met (SC-001 to SC-008)

2. **Deploy to GitHub Pages**
   ```bash
   git add .
   git commit -m "docs: complete robotics textbook production build"
   npm run deploy
   ```

3. **Verify Live Site**
   - Navigate to live URL
   - Test all chapters render
   - Test navigation, search, language selector (if enabled)
   - Verify mobile responsiveness

4. **Announce & Share**
   - Create GitHub release with textbook launch notes
   - Document setup for future translations
   - Publish to social media / community channels

5. **Monitor & Iterate**
   - Set up feedback collection (contact page, GitHub issues)
   - Plan quarterly reviews for technical accuracy
   - Gather reader feedback for future improvements

**Deliverables**:
- ✅ Textbook live at GitHub Pages URL
- ✅ All 19 chapters accessible
- ✅ Navigation + search working
- ✅ Mobile responsive
- ✅ GitHub release published
- ✅ Feedback mechanism in place

---

## Complexity Tracking

No complexity violations. All technical choices align with Constitution:

| Aspect | Decision | Justification |
|--------|----------|---------------|
| Platform | Docusaurus (static site) | Markdown-first, beginner-friendly, RAG-compatible, free hosting |
| Language | Markdown/MDX | Clean text, version control, i18n support, low barrier for contributors |
| i18n | Docusaurus i18n plugin | Single-source-of-truth, native support for 5+ languages, no refactoring needed |
| Diagrams | Mermaid + ASCII | Beginner-friendly, renders inline, no external dependencies, version-controlled |
| Hosting | GitHub Pages | Free, secure, integrated with source control, automatic deployment |
| Chatbot (future) | RAG (Qdrant + FastAPI) | Planned architecture; current textbook is RAG-ready with unique section IDs |

---

## Dependencies & Milestones

### Timeline (Phases)

| Phase | Goal | Estimated Duration | Blocker |
|-------|------|------|---------|
| Phase 0 | Docusaurus setup | 2 days | None |
| Phase 1 | Skeleton structure (19 chapters) | 1 day | Phase 0 complete |
| Phase 2 | Docusaurus config + custom components | 3 days | Phase 1 complete |
| Phase 3 | Core writing (19 chapters) | 21 days (~1 chapter/day) | Phase 2 complete |
| Phase 4 | Technical review + validation | 5 days | Phase 3 complete |
| Phase 5 | Enhancements + polish | 5 days | Phase 4 complete |
| Phase 6 | Final polish + i18n prep | 3 days | Phase 5 complete |
| Phase 7 | Deploy + launch | 1 day | Phase 6 complete |

**Total**: ~41 days (6 weeks)

### Critical Path

1. Phase 0 (Docusaurus) ✓
2. Phase 1 (Skeleton) → Phase 2 (Config) → [Phase 3 (Writing) starts] → Phase 4 (Review) → Phase 5 (Enhancements) → Phase 6 (Polish) → Phase 7 (Deploy)

---

## Success Metrics (From Specification)

- ✅ **SC-001**: 80%+ reader clarity on core concepts (measured via post-chapter surveys)
- ✅ **SC-002**: 70%+ exercise completion; 50%+ "Try It" participation (analytics)
- ✅ **SC-003**: 100% technical accuracy (verified in Phase 4)
- ✅ **SC-004**: Zero Docusaurus build warnings (tested in Phase 6)
- ✅ **SC-005**: 100% i18n-ready structure (prepared in Phase 6)
- ✅ **SC-006**: Every chapter cites 1–3 real robots (verified in Phase 4)
- ✅ **SC-007**: ≥2 cross-links per chapter (verified in Phase 4)
- ✅ **SC-008**: 22,500–54,000 total words; 19 chapters (Phase 3 deliverable)

---

## Next Steps After Plan Approval

1. **Phase 0 Execution**: Run Phase 0 setup (2 days)
2. **Phase 1 Execution**: Generate skeleton (1 day)
3. **Phase 2 Execution**: Configure Docusaurus (3 days)
4. **Phase 3 Execution**: Begin chapter writing (21 days)
5. **Phases 4–7**: Continue execution in order; pause between phases for review

---

## Notes for Implementation

### Chapter Writing Best Practices

1. **Keep it simple**: Every sentence should be understandable to a 15-year-old with no robotics background
2. **Use stories**: Lead chapters with scenarios ("Your robot tripped—why?")
3. **Real examples first**: Reference real robots (Tesla Bot, Boston Dynamics) before theoretical concepts
4. **Diagrams early**: Add diagram before or with main content (readers learn from visuals)
5. **Cross-links throughout**: Use markdown links liberally; help readers understand prerequisites + progression
6. **Short paragraphs**: Never more than 4 lines; break up content visually

### Quality Assurance During Writing

- After writing each chapter, read aloud (catch awkward phrasing)
- Ask: "Can a non-roboticist understand this?"
- Verify all hardware specs against official sources
- Verify all algorithms match published methods
- Check all cross-links point to valid chapters

---

**Development Plan Complete—Ready for Task Creation via `/sp.tasks`**
