import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Fonts } from '../constants/fonts';
import { Colors } from '../constants/colors';

type LinkNavigatorProps = {
  message: string;
  page: string;
  link: string;
};

export default function LinkNavigator({
  message,
  page,
  link,
}: LinkNavigatorProps) {
  const navigation = useNavigation();

  return (
    <Text style={styles.haveAccountText}>
      {message}{' '}
      <TouchableOpacity onPress={() => navigation.navigate(link as never)}>
        <Text style={styles.link}>{page}</Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  haveAccountText: {
    fontFamily: Fonts.Satoshi.Bold,
    textAlign: 'center',
    color: 'grey',
  },
  link: {
    fontFamily: Fonts.Satoshi.Bold,
    color: Colors.primary,
    position: 'relative',
    top: 4,
  },
});
