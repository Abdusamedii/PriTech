import { Alert, Pressable, ScrollView, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";

import { AnimatedScreenEntrance } from "../components/AnimatedScreenEntrance";
import { Pill, StatusPill } from "../components/ui/Pill";
import { AppText } from "../components/ui/AppText";
import { Divider } from "../components/ui/Divider";
import { UnderlineButton } from "../components/ui/UnderlineButton";
import { useTaskStore } from "../store/taskStore";
import {
  getStatusDotClassName,
  getStatusLabel,
  getStatusPillClassName,
  getStatusTextClassName,
  shouldStatusPulse,
  TASK_STATUSES,
} from "../utils/statusConfig";
import { formatDate } from "../utils/formatDate";
import type { RootStackParamList, TaskStatus } from "../utils/types";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "TaskDetail"
>;
type DetailRouteProp = RouteProp<RootStackParamList, "TaskDetail">;

export function TaskDetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const insets = useSafeAreaInsets();
  const task = useTaskStore((state) =>
    state.tasks.find((item) => item.id === route.params.taskId),
  );
  const setTaskStatus = useTaskStore((state) => state.setTaskStatus);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (!task) {
    return (
      <View
        className="flex-1 bg-background px-6 py-6"
        style={{ paddingTop: insets.top }}
      >
        <AnimatedScreenEntrance className="gap-6">
          <AppText variant="h2">Task not found</AppText>
          <UnderlineButton label="Go back" onPress={() => navigation.goBack()} />
        </AnimatedScreenEntrance>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert("Delete task", `Remove "${task.title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          void deleteTask(task.id).then(() => {
            navigation.goBack();
          });
        },
      },
    ]);
  };

  const handleStatusChange = (status: TaskStatus) => {
    void setTaskStatus(task.id, status);
  };

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <ScrollView contentContainerClassName="gap-8 px-6 py-6">
        <AnimatedScreenEntrance variant="slide">
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
        </AnimatedScreenEntrance>

        <Animated.View entering={FadeInUp.delay(80).springify()}>
          <View className="h-1 w-16 bg-accent" />
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(140).springify()}>
          <View className="gap-3">
            <AppText variant="label">Status</AppText>
            <StatusPill status={task.status} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(180).springify()}>
          <View className="gap-3">
            <AppText variant="label">Change status</AppText>
            <View className="flex-row flex-wrap gap-2">
              {TASK_STATUSES.map((status) => {
                const isSelected = task.status === status;

                return (
                  <Pressable
                    key={status}
                    onPress={() => handleStatusChange(status)}
                    className="active:opacity-80"
                  >
                    <View className={isSelected ? "border-2 border-accent" : ""}>
                      <Pill
                        label={getStatusLabel(status)}
                        className={
                          isSelected
                            ? getStatusPillClassName(status)
                            : "border-border bg-muted"
                        }
                        textClassName={
                          isSelected
                            ? getStatusTextClassName(status)
                            : "text-muted-foreground"
                        }
                        dotClassName={getStatusDotClassName(status)}
                        pulse={isSelected && shouldStatusPulse(status)}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </Animated.View>

        <Divider />

        <Animated.View entering={FadeInUp.delay(200).springify()}>
          <View className="gap-3">
            <AppText variant="label">Description</AppText>
            <AppText variant="lead">
              {task.description || "No description provided."}
            </AppText>
          </View>
        </Animated.View>

        <Divider />

        <Animated.View entering={FadeInUp.delay(260).springify()}>
          <View className="gap-3">
            <AppText variant="label">Created</AppText>
            <AppText variant="mono">{formatDate(task.createdAt)}</AppText>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInUp.delay(320).springify()}>
          <View className="gap-6 pt-4">
            <UnderlineButton
              label="Delete task"
              variant="ghost"
              onPress={handleDelete}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
