import { Pressable, Text } from 'react-native';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export default function Chip({ label, selected = false, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`mr-2 mb-2 rounded-full border px-4 py-2 ${selected ? 'border-brand bg-brand' : 'border-sand-dark bg-white'}`}>
      <Text className={`text-sm font-medium ${selected ? 'text-white' : 'text-ink-soft'}`}>{label}</Text>
    </Pressable>
  );
}
