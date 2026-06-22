export type TaskStatus =
  | "todo"
  | "in_progress"
  | "on_hold"
  | "done"
  | "archived";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
};

export type TaskRow = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
};

export type TaskFilter = "all" | TaskStatus;

export type RootStackParamList = {
  TaskList: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
};

export type JsonPlaceholderTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
