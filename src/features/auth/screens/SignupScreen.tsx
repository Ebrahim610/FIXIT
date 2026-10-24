import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import AppButton from '@/components/ui/AppButton';
import Input from '@/components/ui/Input';
import Screen from '@/components/ui/Screen';
import { useSession } from '@/context/session';
import { validateEmail, validatePassword, validatePhone, validateRequired } from '@/lib/validators';
import BrandHeader from '../components/BrandHeader';

type Errors = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirm?: string;
};

export default function SignupScreen() {
  const router = useRouter();
  const { signIn } = useSession();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  // clear the error of a field as soon as the user edits it
  const clearError = (field: keyof Errors) => setErrors((prev) => ({ ...prev, [field]: undefined }));

  const handleSignup = () => {
    const newErrors: Errors = {
      name: validateRequired(name, 'Full name'),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirm: confirm !== password ? 'Passwords do not match.' : undefined,
    };
    setErrors(newErrors);
    if (Object.values(newErrors).some((e) => e)) return;

    signIn(name.trim(), 'customer');
    router.replace('/home');
  };

  return (
    <Screen>
      <BrandHeader subtitle="Create your customer account" />

      <Input label="Full name" value={name} onChangeText={(t) => { setName(t); clearError('name'); }} placeholder="Your name" error={errors.name} />
      <Input label="Email" value={email} onChangeText={(t) => { setEmail(t); clearError('email'); }} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
      <Input label="Phone number" value={phone} onChangeText={(t) => { setPhone(t); clearError('phone'); }} placeholder="01012345678" keyboardType="phone-pad" error={errors.phone} />
      <Input label="Password" value={password} onChangeText={(t) => { setPassword(t); clearError('password'); }} placeholder="At least 6 characters" secureTextEntry error={errors.password} />
      <Input label="Confirm password" value={confirm} onChangeText={(t) => { setConfirm(t); clearError('confirm'); }} placeholder="Repeat your password" secureTextEntry error={errors.confirm} />

      <AppButton title="Sign up" onPress={handleSignup} className="mt-2" />

      <View className="mt-5 flex-row justify-center">
        <Text className="text-ink-soft">Already have an account? </Text>
        <Link href="/login" className="font-semibold text-brand">Log in</Link>
      </View>
    </Screen>
  );
}
