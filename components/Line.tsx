import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type LineProps = Partial<{
  color: string;
  thickness: number;
  marginVertical: number;
}>;

const Line = ({
  color = Colors.background,
  thickness = 1,
  marginVertical = 10,
}: LineProps): JSX.Element => {
  return (
    <View
      style={[
        styles.line,
        { backgroundColor: color, height: thickness, marginVertical },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  line: {
    width: '100%',
  },
});

export default Line;
