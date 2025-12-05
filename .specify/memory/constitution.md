# Physical AI & Humanoid Robotics Textbook Constitution

<!-- Sync Impact Report -->
<!-- Version: 1.0.0 (Initial) | Changes: 6 Principles added, 3 Sections added | Templates Affected: spec, plan, tasks -->

## Core Principles

### I. Clarity First – Beginner-Friendly Writing

Every explanation MUST prioritize simplicity and accessibility over technical depth.
- Short paragraphs: 2–4 lines maximum
- Define all technical terms in simple English before first use
- Use analogies and real-world stories
- Avoid jargon unless thoroughly explained
- Read every sentence aloud—if it stumbles, rewrite it
- Every concept must be understandable to a complete novice in robotics

**Rationale**: The textbook's core value is making robotics accessible. A reader confused by dense writing abandons the material. Clarity is non-negotiable.

### II. Technical Accuracy – Non-Hallucinatory Content

Every claim about hardware, software, AI methods, or robotics MUST be verifiable and reflect current industry practice.
- Cite real robots: Tesla Bot, Boston Dynamics robots, Agility Robotics, NVIDIA robotics research
- Use actual sensor/actuator specifications from real products
- Reference peer-reviewed or authoritative sources for AI/control methods
- State assumptions explicitly if information is uncertain
- NEVER invent APIs, hardware specs, or algorithm details
- Perform fact-checks for each chapter before final output

**Rationale**: Credibility is fundamental. Readers who detect hallucinations will distrust the entire textbook. Accuracy builds reputation and enables readers to apply knowledge in real projects.

### III. Structured Chapter Template – Consistency & Completeness

Every chapter MUST follow this mandatory structure:
1. **Introduction**: What will you learn? Why does it matter?
2. **Main Content**: Clear explanations with subsections
3. **Diagrams**: At least one ASCII or Mermaid diagram per chapter
4. **Real-World Examples**: 1–3 concrete examples (Tesla Bot, Boston Dynamics, etc.)
5. **Did You Know? Block**: A surprising or motivating fact
6. **Key Takeaways**: 3–5 bullet points summarizing the essentials
7. **Exercises**: 3–5 questions (ranging from recall to application)
8. **Try It**: Hands-on mini-tutorial or thought experiment

**Rationale**: Consistency helps readers navigate the material with predictable structure. This format balances theory, practice, engagement, and assessment.

### IV. Progressive Complexity – Build Foundational Knowledge

Content must flow from beginner → intermediate → advanced, with each chapter building on prior chapters.
- Early chapters: foundational concepts (sensors, actuators, motion basics)
- Mid chapters: integration (perception, planning, control loops)
- Late chapters: AI agents, real-world deployment, ethical considerations
- Cross-link related chapters using markdown links
- Never assume readers have prior robotics knowledge
- Each chapter must stand alone while contributing to the whole

**Rationale**: Readers learn more effectively when concepts are scaffolded. Jumping to advanced topics without foundation causes confusion and dropout.

### V. Docusaurus-Ready Markdown & Multilingual Support

All output MUST be clean, valid Markdown formatted for Docusaurus with built-in internationalization support.
- Use proper Markdown heading hierarchy (H1 for chapter title, H2 for sections, etc.)
- Use bullet points extensively for readability
- Use code blocks with language tags where needed
- Avoid HTML; use Markdown equivalents
- Structure must support language toggles (i18n ready)
- Filenames: `01-intro.md`, `02-sensors.md`, etc.
- Include frontmatter with title, description, language metadata
- Use international English (favor British/neutral spelling consistency)

**Rationale**: Docusaurus is the delivery platform. Clean Markdown ensures rendering quality and enables future translation automation. i18n-ready structure unlocks multilingual expansion (Urdu, Hindi, Arabic, Spanish, etc.).

### VI. Engagement Through Storytelling & Real Examples

Every chapter must connect theory to real robots and industry use cases.
- Use narrative: "Imagine you're building a robot that walks upstairs—how would it sense the steps?"
- Reference specific companies: Tesla (humanoid robots), Boston Dynamics (locomotion), Agility Robotics (Digit), NVIDIA (Isaac, AI frameworks)
- Include failure stories and real-world constraints (why certain approaches don't work)
- Use visuals: diagrams explain architecture, data flow, sensor/actuator relationships
- Make readers feel like they're part of the robotics community
- Celebrate small achievements and breakthroughs

**Rationale**: Stories stick in memory better than abstract definitions. Real examples prove concepts have practical value. Engagement drives completion and learning retention.

## Content Quality Standards

### Technical Correctness Requirements

- All hardware examples must reference actual products (e.g., "Unitree A1 Quadruped uses LiDAR sensors manufactured by XXX")
- All algorithms must match published research or industry documentation
- Ambiguous or evolving topics (e.g., emerging AI methods) must be flagged with "Research in progress" or "Industry debate"
- No speculative features presented as established fact
- Constraints and limitations must be explicitly stated (e.g., "Current humanoid robots cannot yet learn new gaits in <1 hour")

### Readability Standards

- Flesch Reading Ease target: 50–65 (conversational level)
- Sentences must be <20 words on average
- Paragraphs must be 2–4 lines (max ~80 words)
- Code examples must be <10 lines per block
- Use active voice predominantly
- Every section must have a one-sentence summary at the end

## Chapter Architecture

### Mandatory Chapter Components

1. **Frontmatter** (YAML):
   ```yaml
   ---
   id: chapter-slug
   title: "Chapter Title"
   description: "One-line summary for table of contents"
   lang: en
   difficulty: beginner|intermediate|advanced
   duration: "reading time in minutes"
   ---
   ```

2. **Introduction Block**: "After this chapter, you'll understand…"

3. **Main Content** with H2/H3 subsections

4. **Diagram Block** (Mermaid or ASCII)

5. **Real-World Examples** section (1–3 paragraphs)

6. **Did You Know?** callout box

7. **Key Takeaways** (bulleted list)

8. **Exercises** (3–5 questions with difficulty levels)

9. **Try It** section (hands-on or thought experiment)

10. **Further Reading** (links to related chapters or resources)

### Special Markdown Blocks

Use Docusaurus admonitions for engagement:

```markdown
:::info Did You Know?
[Fact here]
:::

:::tip Real-World Example
[Example here]
:::

:::caution Challenge
[Mini hands-on task here]
:::
```

## Engagement Elements

### Storytelling Guidelines

- Lead each chapter with a relatable scenario: "Your robot just tripped on the stairs. Why?"
- Use the second person: "You decide to add a depth camera. Now what?"
- Reference famous roboticists and companies by name
- Include "failure stories": "Why does the Boston Dynamics Atlas fail on sand? Because…"
- End each chapter with "What's next?" teaser

### Visual Requirements

- ASCII diagrams for architecture (e.g., sensor → processor → actuator pipeline)
- Mermaid flowcharts for algorithms and control loops
- Labeled examples from real robots
- At least one diagram per chapter
- Diagrams must be understandable to a beginner (simple shapes, clear labels)

### Hands-On Activities

- "Try It" sections must be testable without hardware (simulations, thought experiments, design challenges)
- Include pseudocode snippets (not full implementations)
- Relate activities back to real robots ("Here's how the Tesla Bot decides to step")

## Development Workflow

### Chapter Creation Process

1. **Plan**: Outline chapter sections and learning objectives
2. **Draft**: Write content following clarity and structure principles
3. **Diagram**: Create ASCII or Mermaid visual for the chapter
4. **Examples**: Add 1–3 real-world robot examples
5. **Verify**: Fact-check all technical claims
6. **Revise**: Simplify language and refine for readability
7. **Test**: Read aloud; ensure Docusaurus Markdown validity
8. **Finalize**: Format with frontmatter, add exercises, publish

### Content Review Gate

Every chapter MUST pass:
- ✅ Clarity check: One non-roboticist can understand the core concept
- ✅ Accuracy check: All hardware/algorithms match real-world practice
- ✅ Structure check: Follows mandatory chapter template
- ✅ Docusaurus check: Markdown renders without errors
- ✅ Engagement check: At least one story or real example present

## Multilingual & Accessibility Support

### i18n Strategy

- All chapters written in English first (source of truth)
- Markdown structure supports language toggles for future translation
- Translation workflow: English → Urdu → Hindi → Arabic → Spanish (prioritized by community demand)
- Each translated chapter maintains identical structure and visuals
- Translation notes: robotics terminology may require transliteration or contextual explanation in non-English languages

### Accessibility Requirements

- Diagrams include alt text describing the concept
- Code blocks labeled with language
- Lists use clear formatting (not nested >3 levels)
- High contrast in any color-coded elements
- Support for screen reader navigation via proper Markdown headings

## Governance

### Amendment Procedure

- Constitution changes require written justification and impact assessment
- Any addition of new principles MUST explain how it serves the core mission (beginner-friendly, accurate, engaging robotics textbook)
- Version changes follow semantic versioning:
  - **MAJOR**: Principle removal/redefinition or mandatory structure changes (e.g., chapter template overhaul)
  - **MINOR**: New principle added, or principle guidance significantly expanded
  - **PATCH**: Clarifications, wording refinement, no semantic changes

### Compliance Review

- Every chapter delivery must include a checklist confirming all Core Principles and Content Quality Standards are met
- Chapters failing the Content Review Gate cannot be published
- Quarterly alignment reviews to ensure all chapters remain consistent with constitution

### Success Metrics

- Reader feedback: "I understood this with no prior robotics knowledge" (target: >80% of readers)
- Technical accuracy: Zero documented errors per chapter after publication (target: 100%)
- Engagement: Readers complete >70% of exercises per chapter (target: >50% participation)
- Docusaurus quality: Clean rendering, no markdown errors (target: 0 build warnings)
- Multilingual readiness: Structure supports future translations without refactoring (target: 100% i18n-compatible)

### Roles & Responsibilities

- **Robotics Instructor (Primary Persona)**: Ensures clarity, pedagogical flow, and engagement
- **AI/Robotics Engineer (Secondary Persona)**: Validates technical accuracy, real-world applicability, and algorithm correctness
- **Editor**: Checks Markdown formatting, Docusaurus rendering, language consistency
- **Community Lead**: Gathers multilingual translation priorities and feedback

---

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
