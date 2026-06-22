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

import { AnimatedScreenEntrance } from "../components/AnimatedScreenEntrance";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    const result = validateTaskInput(title, description);
    setTitleError(result.errors.title);
    setDescriptionError(result.errors.description);

    if (!result.valid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addTask(title, description);
      navigation.goBack();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View
      className="flex-1 bg-background"
      style={{ paddingTop: insets.top }}
    >
      <AnimatedScreenEntrance
        variant="slide"
        className="flex-row items-center justify-between px-6 pb-4 pt-4"
      >
        <AppText variant="h1">New task</AppText>
        <UnderlineButton
          label="Cancel"
          variant="ghost"
          onPress={() => navigation.goBack()}
        />
      </AnimatedScreenEntrance>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-6 pb-8"
        >
          <AnimatedScreenEntrance variant="slide" delay={80}>
            <TaskForm
              title={title}
              description={description}
              titleError={titleError}
              descriptionError={descriptionError}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
              onSubmit={handleSubmit}
            />
          </AnimatedScreenEntrance>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
