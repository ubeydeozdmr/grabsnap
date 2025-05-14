import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type GroupedFieldProps = {
  children: string;
  fieldType: 'text' | 'number' | 'select';
  placeholder?: string;
  isFirst?: boolean;
  isLast?: boolean;
  onPress?: () => any;
};

export default function GroupedField({
  children,
  fieldType,
  placeholder,
  isFirst,
  isLast,
  onPress,
}: GroupedFieldProps) {
  return (
    <View
      style={[
        styles.button,
        isFirst && styles.isFirst,
        isLast && styles.isLast,
        !isLast && styles.bordered,
      ]}
    >
      <Text style={styles.text}>{children}</Text>
      {fieldType === 'text' && (
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
        />
      )}
      {fieldType === 'number' && (
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder={placeholder}
          placeholderTextColor={Colors.gray}
        />
      )}
      {fieldType === 'select' && (
        <Pressable
          style={({ pressed }) => [styles.select, pressed && styles.pressed]}
          onPress={onPress}
        >
          <Text style={styles.selectText}>Choose</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={16}
            color={Colors.gray}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    /* height: 64, */
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
    fontSize: 16,
  },
  selectText: {
    fontFamily: Fonts.Satoshi.Regular,
    fontSize: 16,
    color: Colors.gray,
  },
  input: {
    fontFamily: Fonts.Satoshi.Regular,
    fontSize: 16,
    color: Colors.gray,
    width: '50%',
    padding: 0,
    textAlign: 'right',
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
