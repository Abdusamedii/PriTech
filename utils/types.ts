export type TaskStatus = "completed" | "pending";

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

export type TaskFilter = "all" | "pending" | "completed";

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
