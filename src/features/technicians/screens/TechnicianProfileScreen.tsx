import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import Avatar from '@/components/ui/Avatar';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import RatingStars from '@/components/ui/RatingStars';
import Screen from '@/components/ui/Screen';
import SectionTitle from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/StateViews';
import { useReviews } from '@/context/reviews';
import { TECHNICIANS } from '@/data/technicians';
import { colors } from '@/theme/tokens';

export default function TechnicianProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { reviewsFor } = useReviews();

  const technician = TECHNICIANS.find((t) => t.id === id);
  if (!technician) {
    return (
      <Screen>
        <BackButton />
        <EmptyState title="Technician not found" icon="alert-circle-outline" />
      </Screen>
    );
  }

  const reviews = reviewsFor(technician.id);

  return (
    <Screen>
      <BackButton />

      <View className="items-center">
        <Avatar name={technician.name} size={80} />
        <View className="mt-3 flex-row items-center">
          <Text className="text-2xl font-bold text-ink">{technician.name}</Text>
          {technician.verified ? (
            <Ionicons name="shield-checkmark" size={20} color={colors.primary} style={{ marginLeft: 6 }} />
          ) : null}
        </View>
        <Text className="text-sm text-ink-muted">{technician.services.join(' · ')} · {technician.area}</Text>
        <View className="mt-2 flex-row items-center">
          <RatingStars value={technician.rating} size={16} />
          <Text className="ml-2 text-sm text-ink-soft">{technician.rating} ({technician.reviews} reviews)</Text>
        </View>
      </View>

      <View className="mt-5 flex-row">
        <Card className="mr-2 flex-1 items-center">
          <Text className="text-xl font-bold text-brand">{technician.experienceYears}</Text>
          <Text className="text-xs text-ink-muted">Years</Text>
        </Card>
        <Card className="mr-2 flex-1 items-center">
          <Text className="text-xl font-bold text-brand">{technician.jobsDone}</Text>
          <Text className="text-xs text-ink-muted">Jobs done</Text>
        </Card>
        <Card className="flex-1 items-center">
          <Text className="text-xl font-bold text-brand">{technician.priceFrom}</Text>
          <Text className="text-xs text-ink-muted">EGP from</Text>
        </Card>
      </View>

      <SectionTitle title="About" />
      <Text className="text-sm leading-5 text-ink-soft">{technician.about}</Text>

      <SectionTitle title="Services" />
      <View className="flex-row flex-wrap">
        {technician.services.map((service) => (
          <View key={service} className="mb-2 mr-2 rounded-full bg-brand-light px-3 py-1">
            <Text className="text-sm font-medium text-brand-dark">{service}</Text>
          </View>
        ))}
      </View>

      <SectionTitle title={`Reviews (${reviews.length})`} />
      {reviews.length === 0 ? (
        <Text className="text-sm text-ink-muted">No reviews yet.</Text>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} className="mb-3">
            <View className="flex-row items-center justify-between">
              <Text className="font-semibold text-ink">{review.author}</Text>
              <RatingStars value={review.rating} size={13} />
            </View>
            <Text className="mt-1 text-sm text-ink-soft">{review.comment}</Text>
            {review.reply ? (
              <View className="mt-2 rounded-lg bg-sand p-2">
                <Text className="text-xs font-semibold text-ink-soft">Reply from {technician.name.split(' ')[0]}</Text>
                <Text className="text-sm text-ink-soft">{review.reply}</Text>
              </View>
            ) : null}
          </Card>
        ))
      )}

      <AppButton
        title="Request this technician"
        className="mt-4"
        onPress={() =>
          router.push({
            pathname: '/request/new',
            params: { technicianId: technician.id, service: technician.services[0] },
          })
        }
      />
    </Screen>
  );
}
