import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type GroupedButtonProps = {
  children: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => any;
};

export default function GroupedButton({
  children,
  isFirst,
  isLast,
  onPress,
}: GroupedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isFirst && styles.isFirst,
        isLast && styles.isLast,
        !isLast && styles.bordered,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
      <MaterialIcons name="keyboard-arrow-down" size={24} color={Colors.gray} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  isFirst: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  isLast: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  bordered: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontFamily: Fonts.Satoshi.Bold,
  },
});
