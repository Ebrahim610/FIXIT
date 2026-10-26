import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import RatingStars from '@/components/ui/RatingStars';
import { Technician } from '@/data/technicians';
import { colors } from '@/theme/tokens';

type TechnicianCardProps = {
  technician: Technician;
  onPress: () => void;
};

export default function TechnicianCard({ technician, onPress }: TechnicianCardProps) {
  return (
    <Card onPress={onPress} className="mb-3">
      <View className="flex-row">
        <Avatar name={technician.name} />
        <View className="ml-3 flex-1">
          <View className="flex-row items-center">
            <Text className="text-base font-bold text-ink">{technician.name}</Text>
            {technician.verified ? (
              <Ionicons name="shield-checkmark" size={15} color={colors.primary} style={{ marginLeft: 4 }} />
            ) : null}
          </View>
          <Text className="text-sm text-ink-muted">{technician.services.join(' · ')}</Text>
          <View className="mt-1 flex-row items-center">
            <RatingStars value={technician.rating} size={13} />
            <Text className="ml-1 text-xs text-ink-muted">{technician.rating} ({technician.reviews})</Text>
          </View>
        </View>
        <View className="items-end">
          <Text className="text-sm font-bold text-brand">from {technician.priceFrom} EGP</Text>
          <Text className="text-xs text-ink-muted">{technician.distanceKm} km</Text>
          <Text className={`mt-1 text-xs font-semibold ${technician.available ? 'text-green-600' : 'text-ink-faint'}`}>
            {technician.available ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>
    </Card>
  );
}
