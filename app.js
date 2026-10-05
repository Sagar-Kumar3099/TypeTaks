// app.ts — wires the typed model to the HTML UI.
// Notice: this file never re-checks "is this a valid task?" — the types from model.ts
// already guarantee it. The UI just reads and writes Task[].
import { addTask, advanceTask, deleteTask, filterByStatus, countByStatus, seedNextId, } from "./model.js";
const STORAGE_KEY = "typetasks.tasks";
const STATUSES = ["todo", "in-progress", "done"];
// ---- State -------------------------------------------------------------
let tasks = load();
let filter = "all";
seedNextId(tasks);
// ---- Elements ----------------------------------------------------------
const titleInput = document.getElementById("title");
const statusSelect = document.getElementById("status");
const addBtn = document.getElementById("add");
const listEl = document.getElementById("list");
const chipsEl = document.getElementById("chips");
const summaryEl = document.getElementById("summary");
// ---- Persistence -------------------------------------------------------
function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw)
            return JSON.parse(raw);
    }
    catch {
        /* ignore */
    }
    // Starter tasks so the app isn't empty on first visit.
    return [
        { id: 1, title: "Design the Task model", status: "done" },
        { id: 2, title: "Write the typed operations", status: "in-progress" },
        { id: 3, title: "Build the UI (Part 2)", status: "todo" },
    ];
}
function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
// ---- Render ------------------------------------------------------------
function render() {
    const shown = filter === "all" ? tasks : filterByStatus(tasks, filter);
    listEl.innerHTML = "";
    if (shown.length === 0) {
        const li = document.createElement("li");
        li.className = "empty";
        li.textContent = "No tasks here yet. Add one above!";
        listEl.appendChild(li);
    }
    else {
        for (const t of shown) {
            listEl.appendChild(renderTask(t));
        }
    }
    summaryEl.textContent =
        countByStatus(tasks, "todo") +
            " to do · " +
            countByStatus(tasks, "in-progress") +
            " in progress · " +
            countByStatus(tasks, "done") +
            " done";
    renderChips();
}
function renderTask(t) {
    const li = document.createElement("li");
    li.className = "task" + (t.status === "done" ? " is-done" : "");
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = t.title;
    const badge = document.createElement("span");
    badge.className = "badge badge-" + t.status.replace("-", "");
    badge.textContent = t.status;
    const advance = document.createElement("button");
    advance.className = "btn-ghost";
    advance.textContent = t.status === "done" ? "✓ done" : "advance →";
    advance.disabled = t.status === "done";
    advance.onclick = () => {
        tasks = advanceTask(tasks, t.id);
        save();
        render();
    };
    const del = document.createElement("button");
    del.className = "btn-del";
    del.textContent = "✕";
    del.title = "Delete task";
    del.onclick = () => {
        tasks = deleteTask(tasks, t.id);
        save();
        render();
    };
    li.append(title, badge, advance, del);
    return li;
}
function renderChips() {
    const filters = ["all", ...STATUSES];
    chipsEl.innerHTML = "";
    for (const f of filters) {
        const chip = document.createElement("button");
        chip.className = "chip" + (f === filter ? " on" : "");
        chip.textContent = f;
        chip.onclick = () => {
            filter = f;
            render();
        };
        chipsEl.appendChild(chip);
    }
}
// ---- Events ------------------------------------------------------------
addBtn.onclick = () => {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    // respect the chosen status (addTask starts at "todo"; advance if needed)
    const chosen = statusSelect.value;
    if (chosen !== "todo") {
        const justAdded = tasks[tasks.length - 1];
        tasks = tasks.map((t) => t.id === justAdded.id ? { ...t, status: chosen } : t);
    }
    titleInput.value = "";
    filter = "all";
    save();
    render();
};
titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        addBtn.click();
});
render();
