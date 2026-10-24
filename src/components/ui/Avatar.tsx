import { Text, View } from 'react-native';

type AvatarProps = { name: string; size?: number };

export default function Avatar({ name, size = 48 }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2 }} className="items-center justify-center bg-brand-light">
      <Text style={{ fontSize: size / 2.6 }} className="font-bold text-brand">{initials}</Text>
    </View>
  );
}
