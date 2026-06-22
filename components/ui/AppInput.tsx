import { TextInput, View } from "react-native";

import { AppText } from "./AppText";

type AppInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
};

export function AppInput({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline = false,
}: AppInputProps) {
  return (
    <View className="gap-2">
      <AppText variant="label">{label}</AppText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#737373"
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        className={`border border-border bg-input px-4 text-base text-foreground ${
          multiline ? "min-h-28 py-3" : "h-12"
        } ${error ? "border-accent" : ""}`}
      />
      {error ? (
        <AppText variant="caption" className="text-accent">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
