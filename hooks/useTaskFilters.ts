import { useMemo } from "react";

import type { Task, TaskFilter } from "../utils/types";

export function useTaskFilters(
  tasks: Task[],
  searchQuery: string,
  statusFilter: TaskFilter,
) {
  return useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        task.title.toLowerCase().includes(normalizedQuery);

      const matchesStatus =
        statusFilter === "all"
          ? task.status !== "archived"
          : task.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [tasks, searchQuery, statusFilter]);
}
