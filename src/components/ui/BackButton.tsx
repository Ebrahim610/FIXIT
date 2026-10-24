import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { colors } from '@/theme/tokens';

export default function BackButton({ label = 'Back' }: { label?: string }) {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => (router.canGoBack() ? router.back() : router.replace('/home'))}
      className="mb-3 flex-row items-center self-start">
      <Ionicons name="chevron-back" size={20} color={colors.primary} />
      <Text className="text-base font-medium text-brand">{label}</Text>
    </Pressable>
  );
}
