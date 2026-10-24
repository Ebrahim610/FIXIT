import { Text, View } from 'react-native';
import { RequestStatus } from '@/data/requests';

const LABELS: Record<RequestStatus, string> = {
  pending: 'Pending',
  accepted: 'Accepted',
  on_the_way: 'On the way',
  in_progress: 'In progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

const STYLES: Record<RequestStatus, { box: string; text: string }> = {
  pending: { box: 'bg-accent-light', text: 'text-accent-dark' },
  accepted: { box: 'bg-brand-light', text: 'text-brand-dark' },
  on_the_way: { box: 'bg-brand-light', text: 'text-brand-dark' },
  in_progress: { box: 'bg-brand-light', text: 'text-brand' },
  completed: { box: 'bg-green-100', text: 'text-green-700' },
  cancelled: { box: 'bg-sand', text: 'text-ink-soft' },
};

export default function StatusBadge({ status }: { status: RequestStatus }) {
  return (
    <View className={`self-start rounded-full px-3 py-1 ${STYLES[status].box}`}>
      <Text className={`text-xs font-semibold ${STYLES[status].text}`}>{LABELS[status]}</Text>
    </View>
  );
}
