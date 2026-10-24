import { Ionicons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { colors } from '@/theme/tokens';

type RatingStarsProps = {
  value: number;
  size?: number;
  onChange?: (value: number) => void; // if given, stars are tappable
};

export default function RatingStars({ value, size = 16, onChange }: RatingStarsProps) {
  return (
    <View className="flex-row">
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable key={star} disabled={!onChange} onPress={() => onChange && onChange(star)}>
          <Ionicons name={star <= Math.round(value) ? 'star' : 'star-outline'} size={size} color={colors.accent} />
        </Pressable>
      ))}
    </View>
  );
}
