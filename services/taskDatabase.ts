import type { SQLiteDatabase } from "expo-sqlite";

import type { Task, TaskRow, TaskStatus } from "../utils/types";

function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function initDatabase(db: SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_tasks_created_at ON tasks(created_at DESC);
  `);
}

export async function getTaskCount(db: SQLiteDatabase): Promise<number> {
  const result = await db.getFirstAsync<{ count: number }>(
    "SELECT COUNT(*) AS count FROM tasks",
  );
  return result?.count ?? 0;
}

export async function getAllTasks(db: SQLiteDatabase): Promise<Task[]> {
  const rows = await db.getAllAsync<TaskRow>(
    "SELECT id, title, description, status, created_at FROM tasks ORDER BY created_at DESC",
  );
  return rows.map(mapRowToTask);
}

export async function insertTask(db: SQLiteDatabase, task: Task): Promise<void> {
  await db.runAsync(
    "INSERT INTO tasks (id, title, description, status, created_at) VALUES (?, ?, ?, ?, ?)",
    [task.id, task.title, task.description, task.status, task.createdAt],
  );
}

export async function insertTasks(
  db: SQLiteDatabase,
  tasks: Task[],
): Promise<void> {
  await db.withTransactionAsync(async () => {
    for (const task of tasks) {
      await insertTask(db, task);
    }
  });
}

export async function updateTaskStatus(
  db: SQLiteDatabase,
  id: string,
  status: TaskStatus,
): Promise<void> {
  await db.runAsync("UPDATE tasks SET status = ? WHERE id = ?", [status, id]);
}

export async function deleteTask(db: SQLiteDatabase, id: string): Promise<void> {
  await db.runAsync("DELETE FROM tasks WHERE id = ?", [id]);
}
