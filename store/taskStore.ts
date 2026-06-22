import type { SQLiteDatabase } from "expo-sqlite";
import { create } from "zustand";

import {
  deleteTask as deleteTaskFromDb,
  getAllTasks,
  getTaskCount,
  insertTask,
  insertTasks,
  updateTaskStatus,
} from "../services/taskDatabase";
import { fetchSeedTodos } from "../services/jsonPlaceholder";
import { mapTodosToTasks } from "../utils/taskMapper";
import type { Task, TaskStatus } from "../utils/types";

type TaskStore = {
  tasks: Task[];
  isLoading: boolean;
  isHydrated: boolean;
  error: string | null;
  initialize: (db: SQLiteDatabase) => void;
  hydrateTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTaskStatus: (taskId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  getTaskById: (taskId: string) => Task | undefined;
  clearError: () => void;
};

let database: SQLiteDatabase | null = null;

function requireDatabase(): SQLiteDatabase {
  if (!database) {
    throw new Error("Database is not initialized");
  }
  return database;
}

export const useTaskStore = create<TaskStore>()((set, get) => ({
  tasks: [],
  isLoading: false,
  isHydrated: false,
  error: null,

  initialize: (db) => {
    database = db;
  },

  hydrateTasks: async () => {
    const db = requireDatabase();

    if (get().isHydrated) {
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const count = await getTaskCount(db);

      if (count === 0) {
        const todos = await fetchSeedTodos();
        const tasks = mapTodosToTasks(todos);
        await insertTasks(db, tasks);
      }

      const tasks = await getAllTasks(db);
      set({ tasks, isLoading: false, isHydrated: true });
    } catch {
      set({
        isLoading: false,
        isHydrated: true,
        error:
          "Could not load tasks from the database. You can still add tasks locally.",
      });
    }
  },

  addTask: async (title, description) => {
    const db = requireDatabase();
    const task: Task = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: title.trim(),
      description: description.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await insertTask(db, task);
    set((state) => ({ tasks: [task, ...state.tasks] }));
  },

  toggleTaskStatus: async (taskId) => {
    const db = requireDatabase();
    const task = get().tasks.find((item) => item.id === taskId);

    if (!task) {
      return;
    }

    const nextStatus: TaskStatus =
      task.status === "completed" ? "pending" : "completed";

    await updateTaskStatus(db, taskId, nextStatus);
    set((state) => ({
      tasks: state.tasks.map((item) =>
        item.id === taskId ? { ...item, status: nextStatus } : item,
      ),
    }));
  },

  deleteTask: async (taskId) => {
    const db = requireDatabase();
    await deleteTaskFromDb(db, taskId);
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== taskId),
    }));
  },

  getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),

  clearError: () => set({ error: null }),
}));
