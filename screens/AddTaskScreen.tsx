import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { TaskForm } from "../components/TaskForm";
import { AppText } from "../components/ui/AppText";
import { UnderlineButton } from "../components/ui/UnderlineButton";
import { useTaskStore } from "../store/taskStore";
import type { RootStackParamList } from "../utils/types";
import { validateTaskInput } from "../utils/validation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddTask">;

export function AddTaskScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState<string | undefined>();
  const [descriptionError, setDescriptionError] = useState<string | undefined>();

  const handleSubmit = () => {
    const result = validateTaskInput(title, description);
    setTitleError(result.errors.title);
    setDescriptionError(result.errors.description);

    if (!result.valid) {
      return;
    }

    addTask(title, description);
    navigation.goBack();
  };

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <View className="flex-row items-center justify-between px-6 pb-4 pt-4">
        <AppText variant="h1">New task</AppText>
        <UnderlineButton
          label="Cancel"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-6 pb-8"
        >
          <TaskForm
            title={title}
            description={description}
            titleError={titleError}
            descriptionError={descriptionError} 
            onTitleChange={setTitle}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
