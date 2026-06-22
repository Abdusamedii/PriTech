import type { TaskStatus } from "./types";

type StatusConfig = {
  label: string;
  pillClassName: string;
  textClassName: string;
  dotClassName: string;
  pulse: boolean;
};

export const TASK_STATUSES: TaskStatus[] = [
  "todo",
  "in_progress",
  "on_hold",
  "done",
  "archived",
];

export const ACTIVE_STATUSES: TaskStatus[] = TASK_STATUSES.filter(
  (status) => status !== "archived",
);

const STATUS_CONFIG: Record<TaskStatus, StatusConfig> = {
  todo: {
    label: "To Do",
    pillClassName: "border-status-todo bg-status-todo/10",
    textClassName: "text-status-todo",
    dotClassName: "bg-status-todo",
    pulse: false,
  },
  in_progress: {
    label: "In Progress",
    pillClassName: "border-status-progress bg-status-progress/10",
    textClassName: "text-status-progress",
    dotClassName: "bg-status-progress",
    pulse: true,
  },
  on_hold: {
    label: "On Hold",
    pillClassName: "border-status-hold bg-status-hold/10",
    textClassName: "text-status-hold",
    dotClassName: "bg-status-hold",
    pulse: false,
  },
  done: {
    label: "Done",
    pillClassName: "border-status-done bg-status-done/10",
    textClassName: "text-status-done",
    dotClassName: "bg-status-done",
    pulse: false,
  },
  archived: {
    label: "Archived",
    pillClassName: "border-status-archived bg-status-archived/10",
    textClassName: "text-status-archived",
    dotClassName: "bg-status-archived",
    pulse: false,
  },
};

const LEGACY_STATUS_MAP: Record<string, TaskStatus> = {
  pending: "todo",
  completed: "done",
};

export function getStatusConfig(status: TaskStatus): StatusConfig {
  return STATUS_CONFIG[status];
}

export function getStatusLabel(status: TaskStatus): string {
  return STATUS_CONFIG[status].label;
}

export function getStatusPillClassName(status: TaskStatus): string {
  return STATUS_CONFIG[status].pillClassName;
}

export function getStatusTextClassName(status: TaskStatus): string {
  return STATUS_CONFIG[status].textClassName;
}

export function getStatusDotClassName(status: TaskStatus): string {
  return STATUS_CONFIG[status].dotClassName;
}

export function shouldStatusPulse(status: TaskStatus): boolean {
  return STATUS_CONFIG[status].pulse;
}

export function normalizeTaskStatus(raw: string): TaskStatus {
  if (raw in STATUS_CONFIG) {
    return raw as TaskStatus;
  }

  if (raw in LEGACY_STATUS_MAP) {
    return LEGACY_STATUS_MAP[raw];
  }

  return "todo";
}
