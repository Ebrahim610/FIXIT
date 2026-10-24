import { Pressable, Text, View } from 'react-native';

type SectionTitleProps = { title: string; actionLabel?: string; onAction?: () => void };

export default function SectionTitle({ title, actionLabel, onAction }: SectionTitleProps) {
  return (
    <View className="mb-3 mt-6 flex-row items-center">
      <Text className="text-lg font-bold text-ink">{title}</Text>
      <View className="mx-3 h-px flex-1 bg-sand-dark" />
      {actionLabel ? (
        <Pressable onPress={onAction}>
          <Text className="text-sm font-semibold text-brand">{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
