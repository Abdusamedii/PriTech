import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { Check, Trash2 } from "lucide-react-native";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { AppText } from "./ui/AppText";
import type { Task } from "../utils/types";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TaskCardProps = {
  task: Task;
  isDeleting?: boolean;
  onPress: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
  onDeleteAnimationEnd?: () => void;
};

export function TaskCard({
  task,
  isDeleting = false,
  onPress,
  onToggleStatus,
  onDelete,
  onDeleteAnimationEnd,
}: TaskCardProps) {
  const scale = useSharedValue(1);
  const checkScale = useSharedValue(task.status === "completed" ? 1 : 0);
  const checkOpacity = useSharedValue(task.status === "completed" ? 1 : 0);
  const cardOpacity = useSharedValue(1);
  const cardTranslateX = useSharedValue(0);

  useEffect(() => {
    checkScale.value = withSpring(task.status === "completed" ? 1 : 0, {
      damping: 14,
      stiffness: 180,
    });
    checkOpacity.value = withSpring(task.status === "completed" ? 1 : 0, {
      damping: 14,
      stiffness: 180,
    });
  }, [task.status, checkOpacity, checkScale]);

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

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkScale.value }],
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
          onPress={onToggleStatus}
          className="mt-1 h-6 w-6 items-center justify-center border border-border active:border-accent"
        >
          <Animated.View style={checkAnimatedStyle}>
            <Check size={14} color="#FF3D00" strokeWidth={1.5} />
          </Animated.View>
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
    </AnimatedPressable>
  );
}
