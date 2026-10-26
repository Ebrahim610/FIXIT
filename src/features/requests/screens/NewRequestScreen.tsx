import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import BackButton from '@/components/ui/BackButton';
import Chip from '@/components/ui/Chip';
import Input from '@/components/ui/Input';
import MapPlaceholder from '@/components/ui/MapPlaceholder';
import PhotoGrid from '@/components/ui/PhotoGrid';
import Screen from '@/components/ui/Screen';
import SectionTitle from '@/components/ui/SectionTitle';
import { useRequests } from '@/context/requests';
import { useSession } from '@/context/session';
import { CATEGORIES } from '@/data/categories';
import { validateDescription, validateRequired } from '@/lib/validators';

const DATES = ['Today', 'Tomorrow', 'In 3 days'];
const TIME_SLOTS = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];

export default function NewRequestScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ technicianId?: string; service?: string }>();
  const { addRequest } = useRequests();
  const { name } = useSession();

  const [service, setService] = useState(params.service ?? '');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState(0);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const clearError = (field: string) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSubmit = () => {
    const newErrors = {
      service: service ? undefined : 'Choose a service.',
      description: validateDescription(description),
      address: validateRequired(address, 'Address'),
      date: date ? undefined : 'Choose a date.',
      time: time ? undefined : 'Choose a time slot.',
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    const id = addRequest(
      {
        service,
        description: description.trim(),
        photos,
        address: address.trim(),
        date,
        time,
        technicianId: params.technicianId ?? null,
      },
      name
    );
    router.replace({ pathname: '/requests/[id]', params: { id, created: '1' } });
  };

  const ErrorText = ({ message }: { message?: string }) =>
    message ? <Text className="mb-2 text-xs text-rose-600">{message}</Text> : null;

  return (
    <Screen title="New request">
      <BackButton />

      <Text className="mb-2 text-sm font-medium text-ink-soft">Service</Text>
      <View className="flex-row flex-wrap">
        {CATEGORIES.map((c) => (
          <Chip key={c.id} label={c.label} selected={service === c.label} onPress={() => { setService(c.label); clearError('service'); }} />
        ))}
      </View>
      <ErrorText message={errors.service} />

      <Input
        label="Describe the problem"
        value={description}
        onChangeText={(t) => { setDescription(t); clearError('description'); }}
        placeholder="What is wrong? When did it start?"
        multiline
        error={errors.description}
      />

      <Text className="mb-2 text-sm font-medium text-ink-soft">Photos (optional, up to 4)</Text>
      <PhotoGrid count={photos} onAdd={() => setPhotos(photos + 1)} onRemove={() => setPhotos(photos - 1)} />

      <SectionTitle title="Location" />
      <MapPlaceholder label="Pin your location" height={110} />
      <View className="mt-3">
        <Input
          label="Address"
          value={address}
          onChangeText={(t) => { setAddress(t); clearError('address'); }}
          placeholder="Street, building, floor"
          error={errors.address}
        />
        <AppButton title="Use my current location" variant="secondary" onPress={() => { setAddress('Nasr City, Cairo (current location)'); clearError('address'); }} />
      </View>

      <SectionTitle title="Date and time" />
      <View className="flex-row flex-wrap">
        {DATES.map((d) => (
          <Chip key={d} label={d} selected={date === d} onPress={() => { setDate(d); clearError('date'); }} />
        ))}
      </View>
      <ErrorText message={errors.date} />
      <View className="flex-row flex-wrap">
        {TIME_SLOTS.map((t) => (
          <Chip key={t} label={t} selected={time === t} onPress={() => { setTime(t); clearError('time'); }} />
        ))}
      </View>
      <ErrorText message={errors.time} />

      <AppButton title="Send request" onPress={handleSubmit} className="mt-4" />
    </Screen>
  );
}
