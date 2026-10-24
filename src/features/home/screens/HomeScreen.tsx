import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import Card from '@/components/ui/Card';
import Screen from '@/components/ui/Screen';
import SectionTitle from '@/components/ui/SectionTitle';
import StatusBadge from '@/components/ui/StatusBadge';
import { useRequests } from '@/context/requests';
import { useSession } from '@/context/session';
import { CATEGORIES } from '@/data/categories';
import { TECHNICIANS } from '@/data/technicians';
import TechnicianCard from '@/features/technicians/components/TechnicianCard';
import { colors } from '@/theme/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { name } = useSession();
  const { requests } = useRequests();
  const [search, setSearch] = useState('');

  const activeRequest = requests.find(
    (r) => r.mine && r.status !== 'completed' && r.status !== 'cancelled'
  );
  const availableTechnicians = TECHNICIANS.filter((t) => t.available).slice(0, 3);

  const goToTechnicians = (query: string, category?: string) => {
    router.push({ pathname: '/technicians', params: { q: query, category: category ?? '' } });
  };

  return (
    <Screen>
      <View className="rounded-3xl bg-brand p-5">
        <Text className="text-sm text-brand-light">Welcome back</Text>
        <Text className="mb-4 text-2xl font-bold text-white">{name.split(' ')[0]}</Text>

        <View className="flex-row items-center rounded-2xl bg-white px-3">
          <Ionicons name="search" size={18} color={colors.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={() => goToTechnicians(search)}
            placeholder="Search a service or technician"
            placeholderTextColor={colors.placeholder}
            returnKeyType="search"
            className="flex-1 px-2 py-3 text-base text-ink"
          />
        </View>
      </View>

      {activeRequest ? (
        <Card onPress={() => router.push(`/requests/${activeRequest.id}`)} className="mt-5 border-brand-light bg-brand-light">
          <Text className="text-xs font-semibold uppercase text-brand">Active request</Text>
          <Text className="mt-1 text-base font-bold text-ink">{activeRequest.service}</Text>
          <Text className="mb-2 text-sm text-ink-soft">
            {activeRequest.date}, {activeRequest.time}
          </Text>
          <StatusBadge status={activeRequest.status} />
        </Card>
      ) : null}

      <SectionTitle title="Services" actionLabel="See all" onAction={() => goToTechnicians('')} />
      <View className="flex-row flex-wrap">
        {CATEGORIES.map((category) => (
          <Pressable
            key={category.id}
            onPress={() => goToTechnicians('', category.label)}
            className="mb-3 w-1/4 items-center">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-brand-light">
              <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} size={26} color={colors.primaryDark} />
            </View>
            <Text className="mt-1 text-center text-xs text-ink-soft">{category.label}</Text>
          </Pressable>
        ))}
      </View>

      <SectionTitle title="Available now" actionLabel="View all" onAction={() => goToTechnicians('')} />
      {availableTechnicians.map((technician) => (
        <TechnicianCard
          key={technician.id}
          technician={technician}
          onPress={() => router.push(`/technicians/${technician.id}`)}
        />
      ))}
    </Screen>
  );
}
