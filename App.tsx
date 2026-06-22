import "./global.css";

import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import {
  InterTight_400Regular,
  InterTight_600SemiBold,
} from "@expo-google-fonts/inter-tight";
import { JetBrainsMono_400Regular } from "@expo-google-fonts/jetbrains-mono";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation/RootNavigator";
import { AppText } from "./components/ui/AppText";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterTight_400Regular,
    InterTight_600SemiBold,
    JetBrainsMono_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <AppText variant="label">Loading</AppText>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
