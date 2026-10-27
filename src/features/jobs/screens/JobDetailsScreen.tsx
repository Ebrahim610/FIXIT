import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import Chip from '@/components/ui/Chip';
import InfoRow from '@/components/ui/InfoRow';
import Input from '@/components/ui/Input';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import PhotoGrid from '@/components/ui/PhotoGrid';
import Screen from '@/components/ui/Screen';
import SectionTitle from '@/components/ui/SectionTitle';
import { EmptyState } from '@/components/ui/StateViews';
import StatusBadge from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/requests';
import { validatePositiveNumber } from '@/lib/validators';

const REJECT_REASONS = ['Fully booked', 'Outside my area', 'Not my service', 'Need more details'];

export default function JobDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getRequest, sendEstimate, rejectRequest, setStatus } = useRequests();

  const [price, setPrice] = useState('');
  const [hours, setHours] = useState('');
  const [priceError, setPriceError] = useState<string | undefined>();
  const [hoursError, setHoursError] = useState<string | undefined>();
  const [declining, setDeclining] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const job = getRequest(id);
  if (!job) {
    return (
      <Screen>
        <BackButton />
        <EmptyState title="Job not found" icon="alert-circle-outline" />
      </Screen>
    );
  }

  const handleSendEstimate = () => {
    const pError = validatePositiveNumber(price, 'Price');
    const hError = validatePositiveNumber(hours, 'Hours');
    setPriceError(pError);
    setHoursError(hError);
    if (pError || hError) return;
    sendEstimate(job.id, Number(price), Number(hours));
  };

  const handleDecline = () => {
    if (!rejectReason) return;
    rejectRequest(job.id, rejectReason);
    router.replace('/dashboard');
  };

  // the next button depends on where the job is in its life
  let nextLabel = '';
  let nextStatus: 'on_the_way' | 'in_progress' | 'completed' | null = null;
  if (job.status === 'accepted' && job.estimate?.decision === 'approved') {
    nextLabel = 'I am on the way';
    nextStatus = 'on_the_way';
  } else if (job.status === 'on_the_way') {
    nextLabel = 'Start the job';
    nextStatus = 'in_progress';
  } else if (job.status === 'in_progress') {
    nextLabel = 'Mark as completed';
    nextStatus = 'completed';
  }

  return (
    <Screen>
      <BackButton label="Dashboard" />

      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-ink">{job.service}</Text>
        <StatusBadge status={job.status} />
      </View>
      <Text className="mt-1 text-sm text-ink-muted">Customer: {job.customerName}</Text>

      <Card className="mt-4">
        <InfoRow icon="calendar-outline" text={`${job.date}, ${job.time}`} />
        <InfoRow icon="location-outline" text={job.address} />
        <Text className="mt-1 text-sm text-ink-soft">{job.description}</Text>
        {job.photos > 0 ? <View className="mt-3"><PhotoGrid count={job.photos} /></View> : null}
      </Card>

      <View className="mt-3">
        <MapPlaceholder label="Customer location" height={100} />
      </View>

      {job.status === 'pending' ? (
        <>
          <SectionTitle title="Send an estimate" />
          <Input label="Price (EGP)" value={price} onChangeText={(t) => { setPrice(t); setPriceError(undefined); }} keyboardType="numeric" placeholder="e.g. 300" error={priceError} />
          <Input label="Estimated hours" value={hours} onChangeText={(t) => { setHours(t); setHoursError(undefined); }} keyboardType="numeric" placeholder="e.g. 2" error={hoursError} />
          <AppButton title="Accept and send estimate" onPress={handleSendEstimate} />

          {declining ? (
            <Card className="mt-4">
              <Text className="mb-2 font-bold text-ink">Why are you declining?</Text>
              <View className="flex-row flex-wrap">
                {REJECT_REASONS.map((r) => (
                  <Chip key={r} label={r} selected={rejectReason === r} onPress={() => setRejectReason(r)} />
                ))}
              </View>
              <AppButton title="Confirm decline" variant="danger" onPress={handleDecline} disabled={!rejectReason} />
            </Card>
          ) : (
            <AppButton title="Decline request" variant="ghost" onPress={() => setDeclining(true)} className="mt-3" />
          )}
        </>
      ) : null}

      {job.estimate && job.status !== 'pending' ? (
        <Card className="mt-4 border-accent/30 bg-accent-light">
          <Text className="text-xs font-semibold uppercase text-accent-dark">Your estimate</Text>
          <Text className="text-xl font-bold text-ink">{job.estimate.price} EGP · {job.estimate.hours} h</Text>
          <Text className="text-sm text-ink-soft">
            {job.estimate.decision === 'waiting' ? 'Waiting for the customer to approve.' : `Customer ${job.estimate.decision} it.`}
          </Text>
        </Card>
      ) : null}

      {nextStatus ? (
        <AppButton title={nextLabel} onPress={() => setStatus(job.id, nextStatus)} className="mt-4" />
      ) : null}
    </Screen>
  );
}
