import '../global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RequestsProvider } from '@/context/requests';
import { ReviewsProvider } from '@/context/reviews';
import { SessionProvider } from '@/context/session';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <RequestsProvider>
          <ReviewsProvider>
            <StatusBar style="dark" />
            <Stack screenOptions={{ headerShown: false }} />
          </ReviewsProvider>
        </RequestsProvider>
      </SessionProvider>
    </SafeAreaProvider>
  );
}
