import { useEffect } from "react";
import { Pressable, View } from "react-native";
import { Trash2 } from "lucide-react-native";
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
  onDelete: () => void;
  onDeleteAnimationEnd?: () => void;
};

export function TaskCard({
  task,
  isDeleting = false,
  onPress,
  onDelete,
  onDeleteAnimationEnd,
}: TaskCardProps) {
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
        <View className="flex-1 gap-2">
          <AppText
            variant="h3"
            className={
              task.status === "done"
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
          <StatusPill status={task.status} />
        </View>

        <Pressable onPress={onDelete} className="p-1 active:opacity-60">
          <Trash2 size={18} color="#737373" strokeWidth={1.5} />
        </Pressable>
      </View>
    </AnimatedPressable>
  );
}
