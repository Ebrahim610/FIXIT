import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { colors } from '@/theme/tokens';

type MapPlaceholderProps = { label: string; height?: number };

// Real map comes in a later phase (Google Maps API). For now it is a grey box.
export default function MapPlaceholder({ label, height = 140 }: MapPlaceholderProps) {
  return (
    <View style={{ height }} className="items-center justify-center rounded-2xl border border-dashed border-sand-dark bg-sand">
      <Ionicons name="location" size={32} color={colors.primary} />
      <Text className="mt-1 text-sm text-ink-muted">{label}</Text>
    </View>
  );
}
