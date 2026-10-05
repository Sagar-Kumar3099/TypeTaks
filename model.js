let nextId = 1;
export function seedNextId(tasks) {
    nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
// Add a new task — always starts as "todo".
export function addTask(tasks, title) {
    const newTask = { id: nextId++, title, status: "todo" };
    return [...tasks, newTask];
}
export function advanceTask(tasks, id) {
    const next = {
        todo: "in-progress",
        "in-progress": "done",
        done: "done",
    };
    return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}
// Mark a task done by id.
function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// Count tasks in a given status (handy for the header summary).
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
