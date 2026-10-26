import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export default function BrandHeader({ subtitle }: { subtitle: string }) {
  return (
    <View className="mb-6 mt-6 items-center">
      <View className="h-16 w-16 items-center justify-center rounded-2xl bg-brand">
        <Ionicons name="build" size={34} color="white" />
      </View>
      <Text className="mt-3 text-3xl font-bold text-ink">FixIt</Text>
      <Text className="mt-1 text-sm text-ink-muted">{subtitle}</Text>
    </View>
  );
}
