import { View } from "react-native";

type DividerProps = {
  className?: string;
};

export function Divider({ className = "" }: DividerProps) {
  return <View className={`border-t border-border ${className}`.trim()} />;
}
