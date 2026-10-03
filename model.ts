type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

export function seedNextId(tasks: Task[]): void {
  nextId = tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
// Add a new task — always starts as "todo".
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = { id: nextId++, title, status: "todo" };
  return [...tasks, newTask];
}


export function advanceTask(tasks: Task[], id: number): Task[] {
  const next: Record<TaskStatus, TaskStatus> = {
    todo: "in-progress",
    "in-progress": "done",
    done: "done",
  };
  return tasks.map((t) => (t.id === id ? { ...t, status: next[t.status] } : t));
}

// Mark a task done by id.
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}


export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Return only the tasks matching a given status.
function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}