import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from '@/theme/tokens';

type EmptyStateProps = {
  title: string;
  message?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function EmptyState({ title, message, icon = 'file-tray-outline' }: EmptyStateProps) {
  return (
    <View className="items-center py-10">
      <Ionicons name={icon} size={44} color={colors.border} />
      <Text className="mt-2 text-base font-semibold text-ink-soft">{title}</Text>
      {message ? <Text className="mt-1 text-center text-sm text-ink-muted">{message}</Text> : null}
    </View>
  );
}

export function ErrorBanner({ message }: { message: string }) {
  return (
    <View className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3">
      <Text className="text-sm text-rose-700">{message}</Text>
    </View>
  );
}

export function SuccessBanner({ message }: { message: string }) {
  return (
    <View className="mb-3 rounded-xl border border-brand-light bg-brand-light p-3">
      <Text className="text-sm text-brand-dark">{message}</Text>
    </View>
  );
}
