import { Pressable, ScrollView, View } from "react-native";

import {
  getStatusDotClassName,
  getStatusLabel,
  getStatusPillClassName,
  getStatusTextClassName,
  shouldStatusPulse,
  TASK_STATUSES,
} from "../utils/statusConfig";
import type { TaskFilter, TaskStatus } from "../utils/types";
import { Pill } from "./ui/Pill";

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

type FilterOption = {
  label: string;
  value: TaskFilter;
  status?: TaskStatus;
};

const FILTERS: FilterOption[] = [
  { label: "All", value: "all" },
  ...TASK_STATUSES.map((status) => ({
    label: getStatusLabel(status),
    value: status as TaskFilter,
    status,
  })),
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2"
    >
      {FILTERS.map((filter) => {
        const isActive = filter.value === value;
        const statusClassName = filter.status
          ? getStatusPillClassName(filter.status)
          : "border-border bg-muted";
        const textClassName = filter.status
          ? getStatusTextClassName(filter.status)
          : "text-foreground";

        return (
          <Pressable
            key={filter.value}
            onPress={() => onChange(filter.value)}
            className="active:opacity-80"
          >
            <View className={isActive ? "border-2 border-accent" : ""}>
              <Pill
                label={filter.label}
                className={
                  isActive
                    ? statusClassName
                    : "border-border bg-muted"
                }
                textClassName={
                  isActive ? textClassName : "text-muted-foreground"
                }
                dotClassName={
                  filter.status ? getStatusDotClassName(filter.status) : undefined
                }
                pulse={
                  isActive &&
                  filter.status !== undefined &&
                  shouldStatusPulse(filter.status)
                }
              />
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
