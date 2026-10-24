import { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
};

export default function Card({ children, onPress, className = '' }: CardProps) {
  const style = `rounded-3xl border border-sand bg-white p-4 ${className}`;
  if (onPress) {
    return (
      <Pressable onPress={onPress} className={style}>
        {children}
      </Pressable>
    );
  }
  return <View className={style}>{children}</View>;
}
