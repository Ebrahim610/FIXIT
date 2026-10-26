import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import BackButton from '@/components/ui/BackButton';
import Chip from '@/components/ui/Chip';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import Screen from '@/components/ui/Screen';
import Segmented from '@/components/ui/Segmented';
import { EmptyState } from '@/components/ui/StateViews';
import { CATEGORIES } from '@/data/categories';
import { TECHNICIANS } from '@/data/technicians';
import { colors } from '@/theme/tokens';
import TechnicianCard from '../components/TechnicianCard';

export default function TechnicianListScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ q?: string; category?: string }>();

  const [search, setSearch] = useState(params.q ?? '');
  const [category, setCategory] = useState(params.category ?? '');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [view, setView] = useState('List');

  const results = TECHNICIANS.filter((t) => {
    const text = search.trim().toLowerCase();
    const matchesText =
      text === '' ||
      t.name.toLowerCase().includes(text) ||
      t.services.some((s) => s.toLowerCase().includes(text));
    const matchesCategory = category === '' || t.services.includes(category);
    const matchesAvailable = !onlyAvailable || t.available;
    const matchesRating = !topRated || t.rating >= 4.5;
    return matchesText && matchesCategory && matchesAvailable && matchesRating;
  }).sort((a, b) => a.distanceKm - b.distanceKm); // nearest first

  return (
    <Screen title="Technicians">
      <BackButton />

      <View className="mb-3 flex-row items-center rounded-xl border border-sand-dark bg-white px-3">
        <Ionicons name="search" size={18} color={colors.muted} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name or service"
          placeholderTextColor={colors.placeholder}
          className="flex-1 px-2 py-3 text-base text-ink"
        />
      </View>

      <View className="flex-row flex-wrap">
        <Chip label="All" selected={category === ''} onPress={() => setCategory('')} />
        {CATEGORIES.map((c) => (
          <Chip key={c.id} label={c.label} selected={category === c.label} onPress={() => setCategory(c.label)} />
        ))}
      </View>
      <View className="mb-3 flex-row">
        <Chip label="Available now" selected={onlyAvailable} onPress={() => setOnlyAvailable(!onlyAvailable)} />
        <Chip label="Rating 4.5+" selected={topRated} onPress={() => setTopRated(!topRated)} />
      </View>

      <Segmented options={['List', 'Map']} value={view} onChange={setView} />

      <Text className="my-3 text-sm text-ink-muted">{results.length} technicians found</Text>

      {view === 'Map' ? <MapPlaceholder label="Map view (Google Maps comes in Phase 2)" height={180} /> : null}

      {results.length === 0 ? (
        <EmptyState title="No technicians found" message="Try another service or remove a filter." icon="search-outline" />
      ) : (
        results.map((technician) => (
          <TechnicianCard
            key={technician.id}
            technician={technician}
            onPress={() => router.push(`/technicians/${technician.id}`)}
          />
        ))
      )}
    </Screen>
  );
}
