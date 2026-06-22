import type { JsonPlaceholderTodo } from "../utils/types";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchSeedTodos(): Promise<JsonPlaceholderTodo[]> {
  const response = await fetch(`${API_URL}?_limit=12`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks from JSONPlaceholder");
  }

  return response.json() as Promise<JsonPlaceholderTodo[]>;
}
