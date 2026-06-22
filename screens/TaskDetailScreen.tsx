import { Alert, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppText } from "../components/ui/AppText";
import { Divider } from "../components/ui/Divider";
import { UnderlineButton } from "../components/ui/UnderlineButton";
import { useTaskStore } from "../store/taskStore";
import { formatDate } from "../utils/formatDate";
import type { RootStackParamList } from "../utils/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskDetail"
>;
type DetailRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

export function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const task = useTaskStore((state) =>
    state.tasks.find((item) => item.id === route.params.taskId),
  );
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (!task) {
    return (
      <SafeAreaView edges={["top"]}>
        <View className="flex-1 gap-6 bg-background px-6 py-6">
          <AppText variant="h2">Task not found</AppText>
          <UnderlineButton label="Go back" onPress={() => navigation.goBack()} />
        </View>
      </SafeAreaView>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete task", `Remove "${task.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deleteTask(task.id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <SafeAreaView edges={["top"]}>
      <View className="flex-1 bg-background">
        <ScrollView contentContainerClassName="gap-8 px-6 py-6">
        <View className="flex-row items-start justify-between gap-4">
          <AppText variant="h1" className="flex-1">
            {task.title}
          </AppText>
          <UnderlineButton
            label="Back"
            variant="ghost"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View className="h-1 w-16 bg-accent" />

        <View className="gap-3">
          <AppText variant="label">Status</AppText>
          <AppText variant="body">
            {task.status === "completed" ? "Completed" : "Pending"}
          </AppText>
        </View>

        <Divider />

        <View className="gap-3">
          <AppText variant="label">Description</AppText>
          <AppText variant="lead">
            {task.description || "No description provided."}
          </AppText>
        </View>

        <Divider />

        <View className="gap-3">
          <AppText variant="label">Created</AppText>
          <AppText variant="mono">{formatDate(task.createdAt)}</AppText>
        </View>

        <View className="gap-6 pt-4">
          <UnderlineButton
            label={
              task.status === "completed"
                ? "Mark as pending"
                : "Mark as completed"
            }
            onPress={() => toggleTaskStatus(task.id)}
          />
          <UnderlineButton
            label="Delete task"
            variant="ghost"
            onPress={handleDelete}
          />
        </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
