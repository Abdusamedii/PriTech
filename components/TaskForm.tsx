import { View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import { AppInput } from "./ui/AppInput";
import { UnderlineButton } from "./ui/UnderlineButton";

type TaskFormProps = {
  title: string;
  description: string;
  titleError?: string;
  descriptionError?: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: () => void;
};

export function TaskForm({
  title,
  description,
  titleError,
  descriptionError,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
}: TaskFormProps) {
  return (
    <View className="gap-8">
      <Animated.View entering={FadeInUp.delay(80).springify()}>
        <AppInput
          label="Title"
          value={title}
          onChangeText={onTitleChange}
          placeholder="What needs to be done?"
          error={titleError}
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(160).springify()}>
        <AppInput
          label="Description"
          value={description}
          onChangeText={onDescriptionChange}
          placeholder="Add a short description"
          error={descriptionError}
          multiline
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(240).springify()}>
        <UnderlineButton label="Save task" onPress={onSubmit} />
      </Animated.View>
    </View>
  );
}
