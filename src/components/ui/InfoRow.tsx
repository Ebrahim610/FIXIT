import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from '@/theme/tokens';

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
};

export default function InfoRow({ icon, text }: InfoRowProps) {
  return (
    <View className="mb-2 flex-row items-center">
      <Ionicons name={icon} size={18} color={colors.muted} />
      <Text className="ml-2 flex-1 text-sm text-ink-soft">{text}</Text>
    </View>
  );
}
