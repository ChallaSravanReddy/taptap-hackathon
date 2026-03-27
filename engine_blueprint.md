# 🛠️ Engine Blueprint: Code Runner

This document outlines the technical architecture, data structures, and design principles behind the Code Runner engine.

## 🏗️ Engine Architecture

The Code Runner engine is built on a decoupled, reactive architecture that bridges modern web technologies with real-time Python execution.

```mermaid
graph TD
    subgraph "Frontend Layer (React 19)"
        UI[App Entry] --> MM[Maze Mode]
        UI --> SM[Survival Mode]
        SM --> PE[Python Engine Wrapper]
    </div>

    subgraph "Logic Layer (Engine)"
        PE --> BRY[Brython Core VM]
        BRY --> EXEC[Python 3 Execution]
        EXEC --> VAL[Logic Validation]
    </div>

    subgraph "Data Layer (JSON)"
        DB1[(coding_challenges.json)] --> SM
        DB2[(questions.json)] --> MM
    </div>

    VAL -.->|"Success/Error"| SM
    MM -.->|"Score/Integrity"| UI
    SM -.->|"Integrity/Timer"| UI
```

### Key Components:
- **[PythonEngine.js](file:///c:/Users/rintu21/OneDrive/Desktop/sravan/projects/TapTap%20Hackathon/src/engine/PythonEngine.js)**: A singleton wrapper that manages the lifecycle of the Brython VM. It handles asynchronous initialization, code injection, and result extraction.
- **`Brython VM`**: Client-side Python 3 environment running in a separate namespace to prevent main-thread contamination.
- **Reactive HUD**: Framer Motion-powered UI that reacts to engine status pulses in real-time.

---

## 📄 JSON Configuration Structure

The engine is completely data-driven. Challenges are injected via JSON files, allowing for easy expansion without code changes.

### 🧩 Coding Challenge Schema (Survival Mode)
```json
{
  "description": "Initialize a variable 'x' and set it to 42.",
  "validate": "x == 42",
  "difficulty": "Easy"
}
```

### 🧩 Logic Sequence Schema (Maze Mode)
```json
{
  "question": "What is the result of 2 ** 3 in Python?",
  "options": ["6", "8", "9", "5"],
  "correct": 1
}
```

---

## 🔄 Reusability Design Plan

The architecture follows strict **S.O.L.I.D** principles to ensure long-term reusability:

1. **Decoupled Engine**: The [PythonEngine](file:///c:/Users/rintu21/OneDrive/Desktop/sravan/projects/TapTap%20Hackathon/src/engine/PythonEngine.js#1-72) is a standalone class. It can be dropped into any JavaScript project (Vue, Angular, Vanilla) with zero dependencies on the React UI.
2. **Pluggable Validators**: Validation logic is passed as a string (`validate`), allowing for complex assertion logic (e.g., `isinstance(x, list) and len(x) > 5`) without modifying the engine.
3. **Multi-Mode Scalability**: The [App](file:///c:/Users/rintu21/OneDrive/Desktop/sravan/projects/TapTap%20Hackathon/src/App.jsx#58-103) controller uses a state machine to swap "Modes". New modes (e.g., "SQL Mode" or "C++ Mode") can be added by simply implementing a new mode component.
4. **Themable HUD**: The UI uses CSS tokens (`--cyan`, `--primary`) meaning the "Cyberpunk" aesthetic can be swapped for a "Minimalist" or "Dark" theme by changing a single CSS file.

---

## 🔗 External Links
- **GitHub Repository**: [taptap-hackathon](https://github.com/ChallaSravanReddy/taptap-hackathon.git)
- **Deployment**: Localhost Port 3000

---

> [!TIP]
> **Exporting to PDF**: You can export this documentation to a high-quality PDF directly from the workspace or by using a Markdown-to-PDF tool.
