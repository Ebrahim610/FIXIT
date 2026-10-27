import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import BackButton from '@/components/ui/BackButton';
import Chip from '@/components/ui/Chip';
import Input from '@/components/ui/Input';
import RatingStars from '@/components/ui/RatingStars';
import Screen from '@/components/ui/Screen';
import { EmptyState } from '@/components/ui/StateViews';
import { useRequests } from '@/context/requests';
import { useReviews } from '@/context/reviews';
import { useSession } from '@/context/session';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme/tokens';

const TAGS = ['On time', 'Friendly', 'Clean work', 'Fair price', 'Good communication'];

export default function ReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRequest, markReviewed } = useRequests();
  const { addReview } = useReviews();
  const { name } = useSession();

  const [rating, setRating] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [comment, setComment] = useState('');
  const [ratingError, setRatingError] = useState<string | undefined>();
  const [done, setDone] = useState(false);

  const request = getRequest(id);
  if (!request || !request.technicianId) {
    return (
      <Screen>
        <BackButton />
        <EmptyState title="Nothing to review" icon="alert-circle-outline" />
      </Screen>
    );
  }

  const toggleTag = (tag: string) => {
    setTags((current) => (current.includes(tag) ? current.filter((t) => t !== tag) : [...current, tag]));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setRatingError('Please choose a star rating.');
      return;
    }
    const text = [tags.join(', '), comment.trim()].filter(Boolean).join('. ');
    addReview(request.technicianId as string, rating, text || 'No comment', name);
    markReviewed(request.id);
    setDone(true);
  };

  if (done) {
    return (
      <Screen>
        <View className="items-center py-16">
          <Ionicons name="checkmark-circle" size={72} color={colors.primary} />
          <Text className="mt-3 text-2xl font-bold text-ink">Thank you!</Text>
          <Text className="mt-1 text-center text-sm text-ink-muted">Your review helps other customers choose.</Text>
        </View>
        <BackButton label="Back to request" />
      </Screen>
    );
  }

  return (
    <Screen title="Rate your technician">
      <BackButton />
      <Text className="mb-3 text-base text-ink-soft">
        How was {request.technicianName} for your {request.service.toLowerCase()} job?
      </Text>

      <View className="items-center py-2">
        <RatingStars value={rating} size={40} onChange={(value) => { setRating(value); setRatingError(undefined); }} />
        {ratingError ? <Text className="mt-1 text-xs text-rose-600">{ratingError}</Text> : null}
      </View>

      <Text className="mb-2 mt-4 text-sm font-medium text-ink-soft">What went well?</Text>
      <View className="flex-row flex-wrap">
        {TAGS.map((tag) => (
          <Chip key={tag} label={tag} selected={tags.includes(tag)} onPress={() => toggleTag(tag)} />
        ))}
      </View>

      <Input label="Comment (optional)" value={comment} onChangeText={setComment} placeholder="Tell others about your experience" multiline />
      <AppButton title="Submit review" onPress={handleSubmit} />
    </Screen>
  );
}
