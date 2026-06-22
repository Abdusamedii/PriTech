import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { CheckCircle2, Circle, Trash2 } from "lucide-react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { StatusPill } from "./ui/Pill";
import { AppText } from "./ui/AppText";
import type { Task } from "../utils/types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TaskCardProps = {
  task: Task;
  isDeleting?: boolean;
  onPress: () => void;
  onToggleCompletion: () => void;
  onDelete: () => void;
  onDeleteAnimationEnd?: () => void;
};

export function TaskCard({
  task,
  isDeleting = false,
  onPress,
  onToggleCompletion,
  onDelete,
  onDeleteAnimationEnd,
}: TaskCardProps) {
  const isDone = task.status === "done";
  const scale = useSharedValue(1);
  const cardOpacity = useSharedValue(1);
  const cardTranslateX = useSharedValue(0);

  useEffect(() => {
    if (!isDeleting) {
      return;
    }

    cardOpacity.value = withTiming(0, { duration: 200 });
    cardTranslateX.value = withTiming(48, { duration: 250 }, (finished) => {
      if (finished && onDeleteAnimationEnd) {
        runOnJS(onDeleteAnimationEnd)();
      }
    });
  }, [isDeleting, cardOpacity, cardTranslateX, onDeleteAnimationEnd]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ scale: scale.value }, { translateX: cardTranslateX.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 15, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }}
      style={cardAnimatedStyle}
      className="border border-border bg-card px-4 py-5 active:bg-muted"
    >
      <View className="flex-row items-start gap-4">
        <Pressable
          onPress={onToggleCompletion}
          hitSlop={8}
          className="pt-0.5 active:opacity-60"
          accessibilityRole="checkbox"
          accessibilityState={{ checked: isDone }}
        >
          {isDone ? (
            <CheckCircle2 size={24} color="#FF3D00" strokeWidth={1.5} />
          ) : (
            <Circle size={24} color="#737373" strokeWidth={1.5} />
          )}
        </Pressable>

        <View className="flex-1 gap-2">
          <AppText
            variant="h3"
            className={isDone ? "text-muted-foreground line-through" : ""}
          >
            {task.title}
          </AppText>
          {task.description ? (
            <AppText variant="caption" numberOfLines={2}>
              {task.description}
            </AppText>
          ) : null}
          <StatusPill status={task.status} />
        </View>

        <Pressable onPress={onDelete} className="p-1 active:opacity-60">
          <Trash2 size={18} color="#737373" strokeWidth={1.5} />
        </Pressable>
      </View>
    </AnimatedPressable>
  );
}
