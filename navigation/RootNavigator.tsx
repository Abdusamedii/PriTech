import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AddTaskScreen } from "../screens/AddTaskScreen";
import { TaskDetailScreen } from "../screens/TaskDetailScreen";
import { TaskListScreen } from "../screens/TaskListScreen";
import type { RootStackParamList } from "../utils/types";
import { APP_BACKGROUND } from "./navigationTheme";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: APP_BACKGROUND },
        animation: "slide_from_right",
        navigationBarColor: APP_BACKGROUND,
      }}
    >
      <Stack.Screen name="TaskList" component={TaskListScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
}
