import { Text, type TextProps } from "react-native";

type AppTextVariant =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "lead"
  | "label"
  | "mono"
  | "caption";

type AppTextProps = TextProps & {
  variant?: AppTextVariant;
  className?: string;
};

const variantClasses: Record<AppTextVariant, string> = {
  display: "text-5xl font-heading tracking-tighter text-foreground",
  h1: "text-4xl font-heading tracking-tight text-foreground",
  h2: "text-2xl font-heading tracking-tight text-foreground",
  h3: "text-xl font-heading text-foreground",
  body: "text-base text-foreground font-sans",
  lead: "text-lg text-muted-foreground font-sans",
  label: "text-xs uppercase tracking-widest text-muted-foreground font-mono",
  mono: "text-sm text-muted-foreground font-mono",
  caption: "text-sm text-muted-foreground font-sans",
};

export function AppText({
  variant = "body",
  className = "",
  ...props
}: AppTextProps) {
  return (
    <Text
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
