import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { StatusFilter } from "../components/StatusFilter";
import { TaskCard } from "../components/TaskCard";
import { AppText } from "../components/ui/AppText";
import { UnderlineButton } from "../components/ui/UnderlineButton";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useTaskStore } from "../store/taskStore";
import type { RootStackParamList, Task, TaskFilter } from "../utils/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TaskList">;

export function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const hydrateFromApi = useTaskStore((state) => state.hydrateFromApi);
  const toggleTaskStatus = useTaskStore((state) => state.toggleTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const clearError = useTaskStore((state) => state.clearError);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");

  const filteredTasks = useTaskFilters(tasks, searchQuery, statusFilter);

  useEffect(() => {
    hydrateFromApi();
  }, [hydrateFromApi]);

  const handleDelete = useCallback(
    (task: Task) => {
      Alert.alert("Delete task", `Remove "${task.title}"?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTask(task.id),
        },
      ]);
    },
    [deleteTask],
  );

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
        onToggleStatus={() => toggleTaskStatus(item.id)}
        onDelete={() => handleDelete(item)}
      />
    ),
    [navigation, toggleTaskStatus, handleDelete],
  );

  const emptyMessage =
    tasks.length === 0
      ? "Add your first task or retry loading from the API."
      : "Try a different search or filter.";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <View className="gap-6 px-6 pb-4 pt-4">
        <View className="flex-row items-end justify-between">
          <AppText variant="display">Tasks</AppText>
          <Pressable
            onPress={() => navigation.navigate("AddTask")}
            className="h-12 w-12 items-center justify-center border border-accent active:bg-muted"
          >
            <Plus size={22} color="#FF3D00" strokeWidth={1.5} />
          </Pressable>
        </View>

        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />

        {error ? (
          <View className="gap-3 border border-border bg-muted p-4">
            <AppText variant="body">{error}</AppText>
            <UnderlineButton
              label="Dismiss"
              variant="ghost"
              onPress={clearError}
            />
          </View>
        ) : null}
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator color="#FF3D00" />
        </View>
      ) : filteredTasks.length === 0 ? (
        <EmptyState title="Nothing here" message={emptyMessage} />
      ) : (
        <View className="flex-1">
          <FlashList
            data={filteredTasks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View className="h-3" />}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 32 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
