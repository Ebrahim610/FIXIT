import { Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/theme/tokens';

type InputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function Input({ label, error, multiline, ...rest }: InputProps) {
  return (
    <View className="mb-3">
      <Text className="mb-1 text-sm font-medium text-ink-soft">{label}</Text>
      <TextInput
        placeholderTextColor={colors.placeholder}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
        className={`rounded-2xl border bg-white px-3 py-3 text-base text-ink ${error ? 'border-rose-500' : 'border-sand-dark'} ${multiline ? 'min-h-24' : ''}`}
        {...rest}
      />
      {error ? <Text className="mt-1 text-xs text-rose-600">{error}</Text> : null}
    </View>
  );
}
