import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');

type FormTitleProps = {
  title: string;
};

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <View style={styles.registerTitleCont}>
      <Text style={styles.registerTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  registerTitleCont: {
    width: width * 0.77,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  registerTitle: {
    fontSize: width * 0.07,
    fontFamily: Fonts.Satoshi.Bold,
  },
});
