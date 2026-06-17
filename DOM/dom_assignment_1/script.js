
const taskForm = document.querySelector("#task-creator form");
const taskTitle = document.querySelector("#task-title");
const taskCategory = document.querySelector("#task-category");
const taskBoard = document.querySelector("#task-board");

const pendingContainer = document.querySelector(
    '.column[data-status="pending"] .task-container',
);
const doingContainer = document.querySelector(
    '.column[data-status="doing"] .task-container',
);
const completedContainer = document.querySelector(
    '.column[data-status="completed"] .task-container',
);


const searchInput = document.querySelector("header input[type='text']");
const themeToggle = document.querySelector("#theme-toggle");


const demoInput = document.querySelector("#demo-input");
const compareBtn = document.querySelector("#attribute-demo button");
const resultBox = document.querySelector(".result-box");
const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");


let tasks = [];


document.addEventListener("DOMContentLoaded", () => {
    loadTheme();
    loadTasks();
    renderTasks();
});


// --- CREATE TASK ---
taskForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = taskTitle.value.trim();
    const category = taskCategory.value;

    if (!title) return;

    const task = {
        id: Date.now(),
        title: title,
        category: category,
        status: "pending",
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    taskForm.reset();
});

// --- GENERATE TASK CARD DOM ELEMENT ---
function createTaskCard(task) {
    const card = document.createElement("div");
    card.classList.add("task-card");
    card.dataset.id = task.id;
    card.dataset.status = task.status;
    card.dataset.category = task.category;

   
    card.innerHTML = `
        <h4>${task.title}</h4>
        <p>Category: <strong>${task.category}</strong></p>
        
        <select class="status-select">
            <option value="pending" ${task.status === "pending" ? "selected" : ""}>Pending</option>
            <option value="doing" ${task.status === "doing" ? "selected" : ""}>Doing</option>
            <option value="completed" ${task.status === "completed" ? "selected" : ""}>Completed</option>
        </select>

        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn" style="background: var(--red);">Delete</button>
        </div>
    `;
    return card;
}

// --- READ / RENDER TASKS ---
function renderTasks() {
 
    if (pendingContainer) pendingContainer.innerHTML = "";
    if (doingContainer) doingContainer.innerHTML = "";
    if (completedContainer) completedContainer.innerHTML = "";

    tasks.forEach((task) => {
        const card = createTaskCard(task);

        if (task.status === "pending" && pendingContainer) {
            pendingContainer.append(card);
        } else if (task.status === "doing" && doingContainer) {
            doingContainer.append(card);
        } else if (task.status === "completed" && completedContainer) {
            completedContainer.append(card);
        }
    });

    updateCounters();
}

// --- UPDATE TASK STATUS (via select dropdown menus) ---
taskBoard?.addEventListener("change", (e) => {
    if (!e.target.classList.contains("status-select")) return;

    const card = e.target.closest(".task-card");
    if (!card) return;

    const taskId = Number(card.dataset.id);
    const newStatus = e.target.value;

    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.status = newStatus;
        saveTasks();
        renderTasks();
    }
});

// --- EDIT & DELETE TRIPPERS (via Event Delegation) ---
taskBoard?.addEventListener("click", (e) => {
    const card = e.target.closest(".task-card");
    if (!card) return;

    const taskId = Number(card.dataset.id);

 
    if (e.target.classList.contains("delete-btn")) {
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks();
        renderTasks();
        return;
    }


    if (e.target.classList.contains("edit-btn")) {
        e.preventDefault();
        e.stopPropagation();
        enableInlineEdit(card, taskId);
    }
});


function enableInlineEdit(card, taskId) {
    const heading = card.querySelector("h4");
    const editBtn = card.querySelector(".edit-btn");

    const task = tasks.find((t) => t.id === taskId);
    if (!task || card.classList.contains("editing") || !heading || !editBtn)
        return;

    card.classList.add("editing");

   
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task.title;
    editInput.className = "inline-edit-input"; // Connects to styling architecture
    editInput.style.marginBottom = "0.5rem";
    editInput.style.padding = "0.5rem";

    
    heading.replaceWith(editInput);
    editInput.focus();

    
    editBtn.textContent = "Save";
    editBtn.style.background = "var(--green)";

    
    function saveChanges() {
        const updatedTitle = editInput.value.trim();
        if (updatedTitle !== "") {
            task.title = updatedTitle;
            saveTasks();
        }
        card.classList.remove("editing");
        renderTasks();
    }

    // Mouse click hook override
    editBtn.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
        saveChanges();
    };

    // Keyboard "Enter" key submit trigger
    editInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveChanges();
        }
    });
}


searchInput?.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const cards = taskBoard ? taskBoard.querySelectorAll(".task-card") : [];

    cards.forEach((card) => {
        const titleText = card.querySelector("h4")?.textContent.toLowerCase() || "";
        const categoryText = card.dataset.category.toLowerCase();

        if (titleText.includes(keyword) || categoryText.includes(keyword)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});


function updateCounters() {
    const pendingCount = tasks.filter((t) => t.status === "pending").length;
    const doingCount = tasks.filter((t) => t.status === "doing").length;
    const completedCount = tasks.filter((t) => t.status === "completed").length;

    // 1. Safely update text inside header badges
    const pendingSpan = document.querySelector(
        '.column[data-status="pending"] .column-header span',
    );
    const doingSpan = document.querySelector(
        '.column[data-status="doing"] .column-header span',
    );
    const completedSpan = document.querySelector(
        '.column[data-status="completed"] .column-header span',
    );

    if (pendingSpan) pendingSpan.textContent = pendingCount;
    if (doingSpan) doingSpan.textContent = doingCount;
    if (completedSpan) completedSpan.textContent = completedCount;

    // 2. Target specific elements inside the dashboard NodeList safely using individual indexing
    const statCards = document.querySelectorAll("#stats .stat-card");
    if (statCards.length === 3) {
        statCards[0].innerHTML = `Total Tasks <h3>${tasks.length}</h3>`;
        statCards[1].innerHTML = `Pending <h3>${pendingCount + doingCount}</h3>`; // Total backlog remaining
        statCards[2].innerHTML = `Completed <h3>${completedCount}</h3>`;
    }
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const stored = localStorage.getItem("tasks");
    if (stored) {
        tasks = JSON.parse(stored);
    }
}

themeToggle?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
});

function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        document.body.setAttribute("data-theme", "dark");
    }
}



// --- ATTRIBUTES VS PROPERTIES ---
compareBtn?.addEventListener("click", () => { 
    if (!demoInput || !resultBox) return; 
    
    const propertyValue = demoInput.value; 
    const attributeValue = demoInput.getAttribute("value"); 
    
    // Fixed: Wrapped with backticks so JavaScript renders the HTML string correctly
    resultBox.innerHTML = `
        <p><strong>Property Value:</strong> <code style="color:var(--red); font-size:1.1rem;">"${propertyValue}"</code> (Live user input value)</p> 
        <p><strong>Attribute Value:</strong> <code style="color:var(--blue); font-size:1.1rem;">"${attributeValue}"</code> (Static source markup configuration)</p>
    `; 
});

// --- EVENT PROPAGATION ---
if (grandparent && parent && child) {
    // Capturing Phase Loops (Options toggle true)
    grandparent.addEventListener("click", () => {
        console.log("💥 CAPTURE PHASE: Grandparent Node Intercepted");
    }, true);

    parent.addEventListener("click", () => {
        console.log("💥 CAPTURE PHASE: Parent Node Intercepted");
    }, true);

    child.addEventListener("click", () => {
        console.log("💥 CAPTURE PHASE: Child Button Node Intercepted");
    }, true);

    // Bubbling Phase Loops (Options toggle false)
    grandparent.addEventListener("click", () => {
        console.log("🎈 BUBBLING PHASE: Grandparent Action Triggered");
    }, false);

    parent.addEventListener("click", () => {
        console.log("🎈 BUBBLING PHASE: Parent Action Triggered");
    }, false);

    child.addEventListener("click", () => {
        console.log("🎈 BUBBLING PHASE: Child Button Action Triggered");
    }, false);
}
