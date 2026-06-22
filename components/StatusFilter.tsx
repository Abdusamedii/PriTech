import { Pressable, View } from "react-native";

import { AppText } from "./ui/AppText";
import type { TaskFilter } from "../utils/types";

type StatusFilterProps = {
  value: TaskFilter;
  onChange: (value: TaskFilter) => void;
};

const FILTERS: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Done", value: "completed" },
];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <View className="flex-row gap-6">
      {FILTERS.map((filter) => {
        const isActive = filter.value === value;

        return (
          <Pressable
            key={filter.value}
            onPress={() => onChange(filter.value)}
            className="py-2"
          >
            <AppText
              variant="label"
              className={isActive ? "text-accent" : "text-muted-foreground"}
            >
              {filter.label}
            </AppText>
            {isActive ? <View className="mt-1 h-0.5 bg-accent" /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}
