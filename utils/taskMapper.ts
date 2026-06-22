import type { JsonPlaceholderTodo, Task } from "./types";

const DESCRIPTIONS = [
  "Review and prioritize for the week ahead.",
  "Block time on the calendar to finish this.",
  "Break into smaller steps if it feels too large.",
  "Follow up once the first draft is done.",
  "Share progress with the team when complete.",
];

export function mapTodoToTask(todo: JsonPlaceholderTodo, index: number): Task {
  return {
    id: String(todo.id),
    title: todo.title.charAt(0).toUpperCase() + todo.title.slice(1),
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    status: todo.completed ? "completed" : "pending",
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  };
}

export function mapTodosToTasks(todos: JsonPlaceholderTodo[]): Task[] {
  return todos.slice(0, 12).map(mapTodoToTask);
}
