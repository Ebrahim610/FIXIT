import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { RequestStatus } from '@/data/requests';
import { colors } from '@/theme/tokens';

const STEPS: { status: RequestStatus; label: string }[] = [
  { status: 'pending', label: 'Request sent' },
  { status: 'accepted', label: 'Accepted by technician' },
  { status: 'on_the_way', label: 'Technician on the way' },
  { status: 'in_progress', label: 'Job in progress' },
  { status: 'completed', label: 'Completed' },
];

export default function Timeline({ status }: { status: RequestStatus }) {
  const current = STEPS.findIndex((s) => s.status === status);
  return (
    <View>
      {STEPS.map((step, index) => {
        const done = index <= current;
        return (
          <View key={step.status} className="mb-3 flex-row items-center">
            <Ionicons name={done ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={done ? colors.primary : colors.border} />
            <Text className={`ml-3 text-sm ${done ? 'font-semibold text-ink' : 'text-ink-faint'}`}>{step.label}</Text>
          </View>
        );
      })}
    </View>
  );
}
