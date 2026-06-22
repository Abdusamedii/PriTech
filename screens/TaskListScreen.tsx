import { useCallback, useState } from "react";
import { ActivityIndicator, Alert, Pressable, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedScreenEntrance } from "../components/AnimatedScreenEntrance";
import { EmptyState } from "../components/EmptyState";
import { SearchBar } from "../components/SearchBar";
import { StatusFilter } from "../components/StatusFilter";
import { TaskCard } from "../components/TaskCard";
import { AppText } from "../components/ui/AppText";
import { UnderlineButton } from "../components/ui/UnderlineButton";
import { useTaskDatabase } from "../hooks/useTaskDatabase";
import { useTaskFilters } from "../hooks/useTaskFilters";
import { useTaskStore } from "../store/taskStore";
import type { RootStackParamList, Task, TaskFilter } from "../utils/types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "TaskList">;

export function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  useTaskDatabase();

  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const clearError = useTaskStore((state) => state.clearError);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<TaskFilter>("all");
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  const filteredTasks = useTaskFilters(tasks, searchQuery, statusFilter);

  const handleDeleteAnimationEnd = useCallback(
    (taskId: string) => {
      void deleteTask(taskId).finally(() => {
        setDeletingTaskId(null);
      });
    },
    [deleteTask],
  );

  const handleDelete = useCallback(
    (task: Task) => {
      Alert.alert("Delete task", `Remove "${task.title}"?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => setDeletingTaskId(task.id),
        },
      ]);
    },
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: Task }) => (
      <TaskCard
        task={item}
        isDeleting={deletingTaskId === item.id}
        onPress={() => navigation.navigate("TaskDetail", { taskId: item.id })}
        onDelete={() => handleDelete(item)}
        onDeleteAnimationEnd={() => handleDeleteAnimationEnd(item.id)}
      />
    ),
    [
      navigation,
      handleDelete,
      deletingTaskId,
      handleDeleteAnimationEnd,
    ],
  );

  const emptyMessage =
    tasks.length === 0
      ? "Add your first task or retry loading from the API."
      : "Try a different search or filter.";

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <AnimatedScreenEntrance className="gap-6 px-6 pb-4 pt-4">
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
      </AnimatedScreenEntrance>

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
    </View>
  );
}
