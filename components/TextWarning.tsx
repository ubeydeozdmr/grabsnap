import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type TextWarningProps = {
  warning: React.JSX.Element;
};

export default function TextWarning({ warning }: TextWarningProps) {
  return <Text style={styles.textWarning}>*{warning}</Text>;
}

const styles = StyleSheet.create({
  textWarning: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: Fonts.Satoshi.Bold,
  },
});
