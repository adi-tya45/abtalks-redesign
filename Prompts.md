# 🤖 Vibe Coding AI Usage Log

Welcome to the AI usage and prompt log for abtalks-redesign. This document outlines how we leveraged AI assistants (like gemini, ChatGPT, Claude) to build this project during the hackathon.

---

## 🛠️ AI Tools Used
* **Primary IDE / Assistant:** [VS code+copilot, Gemini]
* **Chat / Reasoning Models:** [ChatGpt/ Gemini Pro]
* **Role of AI:** Handled boilerplate setup, architectural design drafts, writing complex algorithms, and rapid UI layout iterations. Human directed architecture, security checks, and final debugging.

---

## 📈 Development Timeline & Prompt Log

### Phase 1: Project Initialization & Scaffolding
* **Objective:** Set up project directory, configure dependencies, and structure the basic architecture.
* **Key Prompt:**
  > "Set up a full-stack template using [Tech Stack]. Create a clean folder structure, initialize configuration files, and set up a basic routing layout."
* **AI Output & Actions:** Generated the base file structure and configuration files. 
* **Human Adjustments:** Tweaked dependency versions and cleaned up unused boilerplates.

### Phase 2: Core Feature Development
* **Objective:** Build the core logic / main feature ([Short description of your main feature]).
* **Key Prompt:**
  > "Write a function/component that handles [specific feature logic] keeping edge cases like [mention an edge case] in mind."
* **AI Output & Actions:** Produced the primary implementation logic.
* **Human Adjustments:** Refined the variable names and integrated it cleanly with the database schema.

### Phase 3: Iteration & Bug Fixing (The "Vibe" Loop)
* **Objective:** Resolve state management bugs and UI overflow issues.
* **Error Encountered:** 
  **Prompt (Ghost Errors):**
> "I am getting an error in the console: `install: missing/invalid publicKey or merchantId — aborting`. The screen is blank. What is causing this?"
> *(AI Solution: Identified that a third-party browser shopping extension was injecting scripts into localhost and failing. Bypassed using Incognito mode).*
* **Prompt used to fix:**
  > "I am getting this error: Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/lucide-react.js. 
  fix it
* **AI Fix:** Suggested adding optional chaining and null checks. Verified and accepted the fix.

---

## 🧠 Key Learnings & Reflections
* **What worked well:** Breaking down large features into granular, step-by-step prompts instead of asking for the entire app at once.
* **Challenges faced:** Dealing with context loss or outdated packages where the AI hallucinated older syntax, requiring manual human overrides.