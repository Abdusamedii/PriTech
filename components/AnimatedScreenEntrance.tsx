import type { ReactNode } from "react";
import Animated, { FadeIn, SlideInRight } from "react-native-reanimated";

type AnimatedScreenEntranceProps = {
  children: ReactNode;
  variant?: "fade" | "slide";
  duration?: number;
  delay?: number;
  className?: string;
};

export function AnimatedScreenEntrance({
  children,
  variant = "fade",
  duration = 250,
  delay = 0,
  className,
}: AnimatedScreenEntranceProps) {
  const entering =
    variant === "slide"
      ? SlideInRight.duration(duration).delay(delay)
      : FadeIn.duration(duration).delay(delay);

  return (
    <Animated.View entering={entering} className={className}>
      {children}
    </Animated.View>
  );
}
