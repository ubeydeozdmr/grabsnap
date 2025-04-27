import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type TileProps = {
  children: JSX.Element;
  label: string;
  value: string;
};

export default function Tile({
  children,
  label,
  value,
}: TileProps): JSX.Element {
  return (
    <View style={styles.tile}>
      {children}
      <View style={styles.textbox}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: Colors.background,
    width: '48%',
    height: 80,
    marginBottom: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    paddingLeft: 8,
  },
  textbox: {
    marginLeft: 8,
  },
  label: {
    color: Colors.gray,
    fontFamily: Fonts.Satoshi.Bold,
  },
  value: {
    fontFamily: Fonts.Satoshi.Bold,
  },
});
