import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { getStorageItem, setStorageItem, removeStorageItem } from "../helpers/storage";
import { fetchSeedTodos } from "../services/jsonPlaceholder";
import { mapTodosToTasks } from "../utils/taskMapper";
import type { Task, TaskStatus } from "../utils/types";

type TaskStore = {
  tasks: Task[];
  hasSeeded: boolean;
  isLoading: boolean;
  error: string | null;
  hydrateFromApi: () => Promise<void>;
  addTask: (title: string, description: string) => void;
  toggleTaskStatus: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  getTaskById: (taskId: string) => Task | undefined;
  clearError: () => void;
};

const zustandStorage = {
  getItem: async (name: string) => getStorageItem(name),
  setItem: async (name: string, value: string) => setStorageItem(name, value),
  removeItem: async (name: string) => removeStorageItem(name),
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      hasSeeded: false,
      isLoading: false,
      error: null,

      hydrateFromApi: async () => {
        if (get().hasSeeded) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const todos = await fetchSeedTodos();
          const tasks = mapTodosToTasks(todos);
          set({ tasks, hasSeeded: true, isLoading: false });
        } catch {
          set({
            isLoading: false,
            error: "Could not load tasks from the API. You can still add tasks locally.",
            hasSeeded: true,
          });
        }
      },

      addTask: (title, description) => {
        const task: Task = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          title: title.trim(),
          description: description.trim(),
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        set((state) => ({ tasks: [task, ...state.tasks] }));
      },

      toggleTaskStatus: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status:
                    task.status === "completed"
                      ? ("pending" as TaskStatus)
                      : ("completed" as TaskStatus),
                }
              : task,
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        }));
      },

      getTaskById: (taskId) => get().tasks.find((task) => task.id === taskId),

      clearError: () => set({ error: null }),
    }),
    {
      name: "pritech-task-store",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        hasSeeded: state.hasSeeded,
      }),
    },
  ),
);
