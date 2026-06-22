import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import {
  getStatusDotClassName,
  getStatusLabel,
  getStatusPillClassName,
  getStatusTextClassName,
  shouldStatusPulse,
} from "../../utils/statusConfig";
import type { TaskStatus } from "../../utils/types";
import { AppText } from "./AppText";

type StatusDotProps = {
  dotClassName: string;
  pulse?: boolean;
};

function StatusDot({ dotClassName, pulse = false }: StatusDotProps) {
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (!pulse) {
      opacity.value = 1;
      scale.value = 1;
      return;
    }

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.45, { duration: 900 }),
        withTiming(1, { duration: 900 }),
      ),
      -1,
      false,
    );

    scale.value = withRepeat(
      withSequence(
        withTiming(1.35, { duration: 900 }),
        withTiming(1, { duration: 900 }),
      ),
      -1,
      false,
    );
  }, [pulse, opacity, scale]);

  const dotAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={dotAnimatedStyle}
      className={`h-2.5 w-2.5 rounded-full ${dotClassName}`.trim()}
    />
  );
}

type PillProps = {
  label: string;
  className?: string;
  textClassName?: string;
  dotClassName?: string;
  pulse?: boolean;
};

export function Pill({
  label,
  className = "",
  textClassName = "text-foreground",
  dotClassName,
  pulse = false,
}: PillProps) {
  return (
    <View
      className={`flex-row items-center gap-2 self-start border px-3 py-1 ${className}`.trim()}
    >
      {dotClassName ? (
        <StatusDot dotClassName={dotClassName} pulse={pulse} />
      ) : null}
      <AppText variant="label" className={`normal-case ${textClassName}`.trim()}>
        {label}
      </AppText>
    </View>
  );
}

type StatusPillProps = {
  status: TaskStatus;
};

export function StatusPill({ status }: StatusPillProps) {
  return (
    <Pill
      label={getStatusLabel(status)}
      className={getStatusPillClassName(status)}
      textClassName={getStatusTextClassName(status)}
      dotClassName={getStatusDotClassName(status)}
      pulse={shouldStatusPulse(status)}
    />
  );
}
