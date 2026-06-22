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

const variantClasses: Record<UnderlineButtonVariant, string> = {
  primary: "text-accent",
  secondary: "text-foreground border border-foreground px-6 py-3",
  ghost: "text-muted-foreground",
};

const underlineClasses: Record<UnderlineButtonVariant, string> = {
  primary: "h-0.5 bg-accent",
  secondary: "h-0",
  ghost: "h-px bg-foreground",
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
      <View className={variant === "secondary" ? variantClasses.secondary : ""}>
        <AppText
          variant="label"
          className={`${variantClasses[variant]} normal-case tracking-wider font-heading`}
        >
          {label}
        </AppText>
        {variant !== "secondary" ? (
          <View className={`mt-1 ${underlineClasses[variant]}`} />
        ) : null}
      </View>
    </Pressable>
  );
}
