import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Switch, Text, TextInput, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import Card from '@/components/ui/Card';
import RatingStars from '@/components/ui/RatingStars';
import Screen from '@/components/ui/Screen';
import SectionTitle from '@/components/ui/SectionTitle';
import StatusBadge from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/requests';
import { useReviews } from '@/context/reviews';
import { useSession } from '@/context/session';
import { DEMO_TECHNICIAN_ID, TECHNICIANS } from '@/data/technicians';
import { colors } from '@/theme/tokens';

export default function DashboardScreen() {
  const router = useRouter();
  const { name, available, setAvailable, signOut } = useSession();
  const { requests } = useRequests();
  const { reviewsFor, replyToReview } = useReviews();
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const me = TECHNICIANS.find((t) => t.id === DEMO_TECHNICIAN_ID);
  const jobs = requests.filter((r) => r.technicianId === DEMO_TECHNICIAN_ID && !r.mine);
  const newRequests = jobs.filter((r) => r.status === 'pending');
  const activeJobs = jobs.filter((r) => ['accepted', 'on_the_way', 'in_progress'].includes(r.status));
  const completedCount = jobs.filter((r) => r.status === 'completed').length;
  const reviews = reviewsFor(DEMO_TECHNICIAN_ID);

  const sendReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyToReview(reviewId, replyText.trim());
    setReplyingTo(null);
    setReplyText('');
  };

  const handleLogout = () => {
    signOut();
    router.replace('/login');
  };

  return (
    <Screen>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-ink-muted">Technician dashboard</Text>
          <Text className="text-2xl font-bold text-ink">{name}</Text>
        </View>
        <AppButton title="Log out" variant="ghost" onPress={handleLogout} />
      </View>

      <Card className="mt-4 flex-row items-center justify-between">
        <View>
          <Text className="text-base font-semibold text-ink">Available for work</Text>
          <Text className="text-xs text-ink-muted">{available ? 'Customers can request you' : 'You are hidden from search'}</Text>
        </View>
        <Switch
          value={available}
          onValueChange={setAvailable}
          trackColor={{ true: colors.primary, false: colors.border }}
        />
      </Card>

      <View className="mt-3 flex-row rounded-3xl bg-brand py-4">
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-white">{me?.rating ?? '-'}</Text>
          <Text className="text-xs text-brand-light">Rating</Text>
        </View>
        <View className="w-px bg-white/30" />
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-white">{activeJobs.length}</Text>
          <Text className="text-xs text-brand-light">Active</Text>
        </View>
        <View className="w-px bg-white/30" />
        <View className="flex-1 items-center">
          <Text className="text-xl font-bold text-white">{(me?.jobsDone ?? 0) + completedCount}</Text>
          <Text className="text-xs text-brand-light">Jobs done</Text>
        </View>
      </View>

      <SectionTitle title={`New requests (${newRequests.length})`} />
      {newRequests.length === 0 ? <Text className="text-sm text-ink-muted">No new requests right now.</Text> : null}
      {newRequests.map((job) => (
        <Card key={job.id} onPress={() => router.push(`/tech/jobs/${job.id}`)} className="mb-3">
          <Text className="font-bold text-ink">{job.service} · {job.customerName}</Text>
          <Text className="mb-2 text-sm text-ink-muted">{job.date}, {job.time}</Text>
          <Text className="text-sm text-ink-soft" numberOfLines={2}>{job.description}</Text>
        </Card>
      ))}

      <SectionTitle title="Active jobs" />
      {activeJobs.length === 0 ? <Text className="text-sm text-ink-muted">No active jobs.</Text> : null}
      {activeJobs.map((job) => (
        <Card key={job.id} onPress={() => router.push(`/tech/jobs/${job.id}`)} className="mb-3">
          <Text className="font-bold text-ink">{job.service} · {job.customerName}</Text>
          <Text className="mb-2 text-sm text-ink-muted">{job.date}, {job.time}</Text>
          <StatusBadge status={job.status} />
        </Card>
      ))}

      <SectionTitle title="Customer reviews" />
      {reviews.map((review) => (
        <Card key={review.id} className="mb-3">
          <View className="flex-row items-center justify-between">
            <Text className="font-semibold text-ink">{review.author}</Text>
            <RatingStars value={review.rating} size={13} />
          </View>
          <Text className="mt-1 text-sm text-ink-soft">{review.comment}</Text>
          {review.reply ? (
            <Text className="mt-2 rounded-lg bg-sand p-2 text-sm text-ink-soft">Your reply: {review.reply}</Text>
          ) : replyingTo === review.id ? (
            <View className="mt-2">
              <TextInput
                value={replyText}
                onChangeText={setReplyText}
                placeholder="Write a reply"
                placeholderTextColor={colors.placeholder}
                className="rounded-2xl border border-sand-dark px-3 py-2 text-ink"
              />
              <AppButton title="Send reply" onPress={() => sendReply(review.id)} className="mt-2" />
            </View>
          ) : (
            <AppButton title="Reply" variant="ghost" onPress={() => setReplyingTo(review.id)} className="self-start" />
          )}
        </Card>
      ))}
    </Screen>
  );
}
