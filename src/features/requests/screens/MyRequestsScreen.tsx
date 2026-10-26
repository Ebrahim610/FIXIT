import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text } from 'react-native';
import Card from '@/components/ui/Card';
import Screen from '@/components/ui/Screen';
import Segmented from '@/components/ui/Segmented';
import { EmptyState } from '@/components/ui/StateViews';
import StatusBadge from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/requests';

export default function MyRequestsScreen() {
  const router = useRouter();
  const { requests } = useRequests();
  const [tab, setTab] = useState('Active');

  const mine = requests.filter((r) => r.mine);
  const visible = mine.filter((r) => {
    const finished = r.status === 'completed' || r.status === 'cancelled';
    return tab === 'Active' ? !finished : finished;
  });

  return (
    <Screen title="My requests">
      <Segmented options={['Active', 'Completed']} value={tab} onChange={setTab} />

      {visible.length === 0 ? (
        <EmptyState
          title={tab === 'Active' ? 'No active requests' : 'Nothing completed yet'}
          message="Your requests will show up here."
        />
      ) : (
        visible.map((request) => (
          <Card key={request.id} onPress={() => router.push(`/requests/${request.id}`)} className="mt-3">
            <Text className="text-base font-bold text-ink">{request.service}</Text>
            <Text className="mb-2 text-sm text-ink-muted">
              {request.technicianName ?? 'Waiting for a technician'} · {request.date}, {request.time}
            </Text>
            <StatusBadge status={request.status} />
          </Card>
        ))
      )}
    </Screen>
  );
}
