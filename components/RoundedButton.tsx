import React, { type JSX } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Colors } from '../constants/colors';

type RoundedButtonProps = {
  children: JSX.Element;
  onPress?: () => void;
  accessibilityLabel?: string;
};

export default function RoundedButton({
  children,
  onPress,
  accessibilityLabel,
}: RoundedButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      accessibilityLabel={accessibilityLabel}
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
