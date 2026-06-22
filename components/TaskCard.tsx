import { Pressable, View } from "react-native";
import { Check, Trash2 } from "lucide-react-native";

import { AppText } from "./ui/AppText";
import type { Task } from "../utils/types";

type TaskCardProps = {
  task: Task;
  onPress: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
};

export function TaskCard({
  task,
  onPress,
  onToggleStatus,
  onDelete,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="border border-border bg-card px-4 py-5 active:bg-muted"
    >
      <View className="flex-row items-start gap-4">
        <Pressable
          onPress={onToggleStatus}
          className="mt-1 h-6 w-6 items-center justify-center border border-border active:border-accent"
        >
          {task.status === "completed" ? (
            <Check size={14} color="#FF3D00" strokeWidth={1.5} />
          ) : null}
        </Pressable>

        <View className="flex-1 gap-2">
          <AppText
            variant="h3"
            className={
              task.status === "completed"
                ? "text-muted-foreground line-through"
                : ""
            }
          >
            {task.title}
          </AppText>
          {task.description ? (
            <AppText variant="caption" numberOfLines={2}>
              {task.description}
            </AppText>
          ) : null}
          <AppText variant="mono">
            {task.status === "completed" ? "Completed" : "Pending"}
          </AppText>
        </View>

        <Pressable onPress={onDelete} className="p-1 active:opacity-60">
          <Trash2 size={18} color="#737373" strokeWidth={1.5} />
        </Pressable>
      </View>
    </Pressable>
  );
}
