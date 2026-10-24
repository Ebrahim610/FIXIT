import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ScreenProps = {
  children: ReactNode;
  title?: string;
  scroll?: boolean;
  bottomPadding?: number;
};

// Wrapper every screen uses so padding and background stay the same.
export default function Screen({ children, title, scroll = true, bottomPadding = 24 }: ScreenProps) {
  const insets = useSafeAreaInsets();
  const content = (
    <>
      {title ? <Text className="mb-4 text-2xl font-bold text-ink">{title}</Text> : null}
      {children}
    </>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1 bg-bone">
      {scroll ? (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingTop: insets.top + 16, paddingBottom: bottomPadding }}>
          {content}
        </ScrollView>
      ) : (
        <View className="flex-1 p-4" style={{ paddingTop: insets.top + 16 }}>{content}</View>
      )}
    </KeyboardAvoidingView>
  );
}
