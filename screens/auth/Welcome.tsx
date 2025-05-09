import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');

export default function Welcome() {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeText}>GRABSNAP</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: width * 0.09,
    color: '#fff',
    fontFamily: Fonts.Satoshi.Bold,
  },
});
