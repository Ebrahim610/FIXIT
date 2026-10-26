import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import Input from '@/components/ui/Input';
import Screen from '@/components/ui/Screen';
import Segmented from '@/components/ui/Segmented';
import { useSession } from '@/context/session';
import { validateEmail, validatePassword } from '@/lib/validators';
import BrandHeader from '../components/BrandHeader';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useSession();

  const [role, setRole] = useState('Customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const handleLogin = () => {
    const eError = validateEmail(email);
    const pError = validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);
    if (eError || pError) return;

    if (role === 'Technician') {
      signIn('Mahmoud Hassan', 'technician');
      router.replace('/dashboard');
    } else {
      signIn('Abdelrahman', 'customer');
      router.replace('/home');
    }
  };

  return (
    <Screen>
      <BrandHeader subtitle="Find a trusted technician near you" />

      <Segmented options={['Customer', 'Technician']} value={role} onChange={setRole} />

      <View className="mt-5">
        <Input
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setEmailError(undefined);
          }}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
        />
        <Input
          label="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(undefined);
          }}
          placeholder="At least 6 characters"
          secureTextEntry
          error={passwordError}
        />
        <AppButton title="Log in" onPress={handleLogin} className="mt-2" />
      </View>

      <View className="mt-5 flex-row justify-center">
        <Text className="text-ink-soft">New to FixIt? </Text>
        <Link href="/signup" className="font-semibold text-brand">Create an account</Link>
      </View>
    </Screen>
  );
}
