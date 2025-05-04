import React from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';

import { Fonts } from '../constants/fonts';

type ListItemProps = {
  children: string;
  icon?: string;
};

export default function ListItem({ children, icon }: ListItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.listItem, pressed && styles.pressed]}
    >
      {icon && (
        <Image
          source={{ uri: icon }}
          style={styles.icon}
          onError={() => {
            console.error(`Failed to load icon for ${children}`);
          }}
        />
      )}
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: '#ddd',
  },
  text: {
    fontFamily: Fonts.Satoshi.Medium,
  },
});
