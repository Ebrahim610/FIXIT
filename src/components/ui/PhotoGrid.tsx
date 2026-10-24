import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@/theme/tokens';

type PhotoGridProps = {
  count: number;
  max?: number;
  onAdd?: () => void;
  onRemove?: (index: number) => void;
};

// Photos are just placeholder tiles for now, the camera/gallery is a Phase 2 feature.
export default function PhotoGrid({ count, max = 4, onAdd, onRemove }: PhotoGridProps) {
  const tiles = [];
  for (let i = 0; i < count; i++) {
    tiles.push(
      <Pressable
        key={i}
        onPress={() => onRemove && onRemove(i)}
        className="mr-2 mb-2 h-20 w-20 items-center justify-center rounded-xl bg-brand-light">
        <Ionicons name="image-outline" size={26} color={colors.primary} />
        {onRemove ? <Text className="text-xs text-brand">remove</Text> : null}
      </Pressable>
    );
  }
  return (
    <View className="flex-row flex-wrap">
      {tiles}
      {onAdd && count < max ? (
        <Pressable onPress={onAdd} className="mb-2 h-20 w-20 items-center justify-center rounded-xl border border-dashed border-ink-faint">
          <Ionicons name="add" size={26} color={colors.muted} />
        </Pressable>
      ) : null}
    </View>
  );
}
