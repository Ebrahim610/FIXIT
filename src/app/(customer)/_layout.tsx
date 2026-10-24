import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { colors } from '@/theme/tokens';

// Bottom tabs for the customer: Home and My requests.
export default function CustomerTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="home-outline" size={size} color={focused ? colors.primary : colors.muted} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: 'My requests',
          tabBarIcon: ({ focused, size }) => (
            <Ionicons name="list-outline" size={size} color={focused ? colors.primary : colors.muted} />
          ),
        }}
      />
    </Tabs>
  );
}
