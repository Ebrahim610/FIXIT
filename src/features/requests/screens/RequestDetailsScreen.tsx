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
import { EmptyState, SuccessBanner } from '@/components/ui/StateViews';
import StatusBadge from '@/components/ui/StatusBadge';
import Timeline from '@/components/ui/Timeline';
import { useRequests } from '@/context/requests';
import { validateDescription } from '@/lib/validators';

const REPORT_REASONS = ['Poor quality', 'Unprofessional behaviour', 'Overcharged', 'Did not show up'];

export default function RequestDetailsScreen() {
  const router = useRouter();
  const { id, created } = useLocalSearchParams<{ id: string; created?: string }>();
  const { getRequest, cancelRequest, decideEstimate, reportDispute } = useRequests();

  const [showReport, setShowReport] = useState(false);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [reasonError, setReasonError] = useState<string | undefined>();
  const [detailsError, setDetailsError] = useState<string | undefined>();

  const request = getRequest(id);
  if (!request) {
    return (
      <Screen>
        <BackButton />
        <EmptyState title="Request not found" icon="alert-circle-outline" />
      </Screen>
    );
  }

  const estimate = request.estimate;
  const isActive = request.status !== 'completed' && request.status !== 'cancelled';
  const canCancel = request.status === 'pending' || request.status === 'accepted';

  const submitReport = () => {
    const rError = reason ? undefined : 'Choose a reason.';
    const dError = validateDescription(details);
    setReasonError(rError);
    setDetailsError(dError);
    if (rError || dError) return;
    reportDispute(request.id);
    setShowReport(false);
  };

  return (
    <Screen>
      <BackButton />
      {created === '1' ? <SuccessBanner message="Request sent! A technician will respond soon." /> : null}

      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-ink">{request.service}</Text>
        <StatusBadge status={request.status} />
      </View>
      <Text className="mt-1 text-sm text-ink-muted">
        {request.technicianName ? `With ${request.technicianName}` : 'Waiting for a technician'}
      </Text>

      <Card className="mt-4">
        <InfoRow icon="calendar-outline" text={`${request.date}, ${request.time}`} />
        <InfoRow icon="location-outline" text={request.address} />
        <Text className="mt-1 text-sm text-ink-soft">{request.description}</Text>
        {request.photos > 0 ? <View className="mt-3"><PhotoGrid count={request.photos} /></View> : null}
      </Card>

      {estimate ? (
        <Card className="mt-3 border-accent/30 bg-accent-light">
          <Text className="text-xs font-semibold uppercase text-accent-dark">Estimate</Text>
          <Text className="mt-1 text-xl font-bold text-ink">{estimate.price} EGP</Text>
          <Text className="text-sm text-ink-soft">About {estimate.hours} hour(s) of work</Text>
          {estimate.decision === 'waiting' ? (
            <View className="mt-3 flex-row">
              <AppButton title="Approve" onPress={() => decideEstimate(request.id, true)} className="mr-2 flex-1" />
              <AppButton title="Decline" variant="danger" onPress={() => decideEstimate(request.id, false)} className="flex-1" />
            </View>
          ) : (
            <Text className="mt-2 text-sm font-semibold text-ink-soft">
              You {estimate.decision} this estimate.
            </Text>
          )}
        </Card>
      ) : null}

      {request.status !== 'cancelled' ? (
        <>
          <SectionTitle title="Progress" />
          <Timeline status={request.status} />
        </>
      ) : null}

      {isActive && request.status !== 'pending' ? (
        <>
          <MapPlaceholder label="Technician location" height={110} />
          <AppButton title="Get directions" variant="secondary" onPress={() => {}} className="mt-3" />
        </>
      ) : null}

      {canCancel ? (
        <AppButton title="Cancel request" variant="danger" onPress={() => cancelRequest(request.id)} className="mt-4" />
      ) : null}

      {request.status === 'completed' ? (
        <View className="mt-4">
          {!request.reviewed ? (
            <AppButton title="Rate the technician" onPress={() => router.push(`/review/${request.id}`)} />
          ) : (
            <Text className="text-center text-sm text-ink-muted">Thanks, you already reviewed this job.</Text>
          )}

          {request.disputed ? (
            <Text className="mt-3 text-center text-sm font-semibold text-accent-dark">
              Your report was sent to the FixIt team.
            </Text>
          ) : showReport ? (
            <Card className="mt-3">
              <Text className="mb-2 font-bold text-ink">Report a problem</Text>
              <View className="flex-row flex-wrap">
                {REPORT_REASONS.map((r) => (
                  <Chip key={r} label={r} selected={reason === r} onPress={() => { setReason(r); setReasonError(undefined); }} />
                ))}
              </View>
              {reasonError ? <Text className="mb-2 text-xs text-rose-600">{reasonError}</Text> : null}
              <Input
                label="Details"
                value={details}
                onChangeText={(t) => { setDetails(t); setDetailsError(undefined); }}
                placeholder="Tell us what happened"
                multiline
                error={detailsError}
              />
              <AppButton title="Submit report" onPress={submitReport} />
            </Card>
          ) : (
            <AppButton title="Report a problem" variant="ghost" onPress={() => setShowReport(true)} className="mt-2" />
          )}
        </View>
      ) : null}
    </Screen>
  );
}
