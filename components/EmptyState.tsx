import { View } from "react-native";

import { AppText } from "./ui/AppText";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View className="items-center justify-center px-6 py-20">
      <View className="relative items-center">
        <AppText
          variant="display"
          className="absolute text-muted opacity-30"
          aria-hidden
        >
          0
        </AppText>
        <View className="items-center gap-3 pt-8">
          <AppText variant="h2">{title}</AppText>
          <AppText variant="lead" className="text-center">
            {message}
          </AppText>
        </View>
      </View>
    </View>
  );
}
