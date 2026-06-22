import { Pressable, View } from "react-native";

import { AppText } from "./AppText";

type UnderlineButtonVariant = "primary" | "secondary" | "ghost";

type UnderlineButtonProps = {
  label: string;
  onPress: () => void;
  variant?: UnderlineButtonVariant;
  disabled?: boolean;
  className?: string;
};

const containerClasses: Record<UnderlineButtonVariant, string> = {
  primary: "border border-accent px-6 py-3",
  secondary: "border border-foreground px-6 py-3",
  ghost: "border border-border px-6 py-3",
};

const textClasses: Record<UnderlineButtonVariant, string> = {
  primary: "text-accent",
  secondary: "text-foreground",
  ghost: "text-muted-foreground",
};

export function UnderlineButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
  className = "",
}: UnderlineButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${disabled ? "opacity-50" : "active:opacity-80"} ${className}`.trim()}
    >
      <View className={containerClasses[variant]}>
        <AppText
          variant="label"
          className={`${textClasses[variant]} normal-case tracking-wider font-heading`}
        >
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}
