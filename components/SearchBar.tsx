import { TextInput, View } from "react-native";
import { Search } from "lucide-react-native";

type SearchBarProps = {
  value: string;
  onChangeText: (value: string) => void;
};

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="flex-row items-center gap-3 border border-border bg-input px-4">
      <Search size={18} color="#737373" strokeWidth={1.5} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search by title"
        placeholderTextColor="#737373"
        className="h-12 flex-1 text-base text-foreground"
      />
    </View>
  );
}
