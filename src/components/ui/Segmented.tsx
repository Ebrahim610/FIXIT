import { Pressable, Text, View } from 'react-native';

type SegmentedProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

export default function Segmented({ options, value, onChange }: SegmentedProps) {
  return (
    <View className="flex-row rounded-xl bg-sand p-1">
      {options.map((option) => (
        <Pressable
          key={option}
          onPress={() => onChange(option)}
          className={`flex-1 items-center rounded-lg py-2 ${value === option ? 'bg-white' : ''}`}>
          <Text className={`text-sm font-semibold ${value === option ? 'text-brand' : 'text-ink-muted'}`}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
}
