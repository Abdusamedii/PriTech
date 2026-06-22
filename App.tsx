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
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { RootNavigator } from "./navigation/RootNavigator";
import { APP_BACKGROUND, navigationTheme } from "./navigation/navigationTheme";
import { AppText } from "./components/ui/AppText";
import { initDatabase } from "./services/taskDatabase";

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
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: APP_BACKGROUND }}
    >
      <SQLiteProvider databaseName="pritech-tasks.db" onInit={initDatabase}>
        <SafeAreaProvider>
          <NavigationContainer theme={navigationTheme}>
            <RootNavigator />
          </NavigationContainer>
          <StatusBar style="light" />
        </SafeAreaProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
