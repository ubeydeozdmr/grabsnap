import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type RoundedButtonProps = {
  children: JSX.Element;
  onPress?: () => void;
};

export default function RoundedButton({
  children,
  onPress,
}: RoundedButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
