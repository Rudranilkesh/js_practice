# TaskFlow - Kanban Board & Web Fundamentals Sandbox

TaskFlow is a high-contrast, Neo-Brutalist style project management web application. It combines a fully functional Kanban workflow (task creation, local storage persistence, theme toggling, and searching) with interactive, live-action educational sandboxes designed to demonstrate core browser layout workflows and JavaScript event handling models.

---

## 🚀 Key Features

* **Task Management**: Add, inline-edit, delete, and move tasks across categories.
* **Local Storage Persistence**: App state and selected color themes remain saved between reloads.
* **Instant Filter Search**: Live-filters task card datasets dynamically using header text inputs.
* **Educational Sandboxes**: Embedded interactive tools to observe Attributes vs Properties and Event Propagation live in the browser console.

---

## 📑 Core Web Development Concepts

Below is an in-depth look at the foundational web concepts built into this application's layout.

### 🌐 The Browser Rendering Pipeline

When you load TaskFlow, the browser converts the raw source markup text files into visual pixels on your screen through a multi-step execution flow:

#### 1. Tokenization
* **What it is**: The initial stage where the raw byte stream of an incoming HTML document is broken down into distinct atomic pieces called "tokens."
* **How it works**: The browser reads individual text characters and clusters them into defined tags, attribute keys, value strings, and text segments (e.g., recognizing `<body>` as a start tag token).

#### 2. Parsing
* **What it is**: The process of taking the string of individual tokens generated during tokenization and analyzing their structural nesting order according to formal language rules.
* **How it works**: The browser ensures syntax elements are valid and builds a logical representation of the relationships between components.

#### 3. DOM Tree (Document Object Model)
* **What it is**: A living tree-like data structure object in browser memory representing the parsed HTML nodes.
* **How it works**: It establishes parent-child-sibling node hierarchies. JavaScript uses the DOM API (e.g., `document.querySelector`) to dynamically read, insert, modify, or delete elements.

#### 4. CSSOM Tree (CSS Object Model)
* **What it is**: A distinct object hierarchy mapped out in memory specifically for styles, capturing rules from both local files (e.g., `style.css`) and browser user-agent style rules.
* **How it works**: The browser parses style rules and cascades styling down to child nodes. For example, a child button nested inside a `.parent` block inherits properties based on specificity.

#### 5. Render Tree
* **What it is**: The ultimate combination of the DOM tree and the CSSOM tree containing only the elements needed to paint the screen.
* **How it works**: Non-visual nodes (like `<head>` or selectors marked with `display: none;`) are excluded. The browser uses this tree to calculate layout geometries (positions/sizes) and paint the actual physical pixels onto the monitor viewport.

---

### ⚡ DOM Event Architecture

TaskFlow includes a dedicated experimental sandbox (`#event-demo`) utilizing a **Grandparent ➔ Parent ➔ Child Button** nesting structure to explicitly demonstrate the native life cycle phases of a DOM Event click:

#### 1. Event Capturing (Trickling Phase)
* **What it is**: The initial phase where an event journeys down from the top level of the document tree down toward the specific target node that was clicked.
* **In this application**: If you click the **Child Button**, the browser scans downward first. In your developer console, you will observe the event intercepting the `grandparent` first, then the `parent`, before arriving at the target button.

#### 2. Event Bubbling
* **What it is**: The automatic secondary phase where an event "bubbles up" vertically from the target element back up to the roots of the document tree.
* **In this application**: Once the button click reaches the inner `child`, it triggers upwards. The console records the bubble event triggering first on the `child`, moving up to the `parent`, and finishing at the `grandparent`.

#### 3. Event Delegation
* **What it is**: A high-efficiency design pattern where a single event listener is attached to a shared parent wrapper container instead of setting individual event listeners onto multiple child nodes.
* **In this application**: Individual task cards are created dynamically over time. Instead of assigning individual click listeners to every single new "Edit" or "Delete" button, TaskFlow attaches a single event listener to the main `#task-board` wrapper layout. It reads `e.target.closest(".task-card")` to instantly discover exactly which node was targeted.
