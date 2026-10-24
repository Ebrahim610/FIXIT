import { Pressable, Text } from 'react-native';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  disabled?: boolean;
  className?: string;
};

const containerStyles = {
  primary: 'bg-brand',
  secondary: 'bg-white border border-brand',
  danger: 'bg-rose-600',
  ghost: 'bg-transparent',
};

const textStyles = {
  primary: 'text-white',
  secondary: 'text-brand',
  danger: 'text-white',
  ghost: 'text-ink-soft',
};

export default function AppButton({ title, onPress, variant = 'primary', disabled = false, className = '' }: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-xl px-4 py-3 ${containerStyles[variant]} ${disabled ? 'opacity-50' : ''} ${className}`}>
      <Text className={`text-base font-semibold ${textStyles[variant]}`}>{title}</Text>
    </Pressable>
  );
}
