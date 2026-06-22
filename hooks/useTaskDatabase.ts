import { useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

import { useTaskStore } from "../store/taskStore";

export function useTaskDatabase() {
  const db = useSQLiteContext();
  const initialize = useTaskStore((state) => state.initialize);
  const hydrateTasks = useTaskStore((state) => state.hydrateTasks);
  const isHydrated = useTaskStore((state) => state.isHydrated);

  useEffect(() => {
    initialize(db);
    hydrateTasks();
  }, [db, initialize, hydrateTasks]);

  return { isHydrated };
}
