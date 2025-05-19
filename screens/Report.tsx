import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Car } from '../api/data';
import GroupedField from '../components/GroupedField';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
  SubmissionCompleted: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Report() {
  const navigation = useNavigation<NavigationProp>();

  function onPressHandler() {
    navigation.navigate('TabNavigator');
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.fieldContainer}>
          <GroupedField isFirst isLast fieldType="select">
            Report Reason
          </GroupedField>
        </View>
        <View style={styles.fieldContainer}>
          <TextInput
            style={styles.textarea}
            placeholder="Add details (optional but helpful for review)"
            placeholderTextColor={Colors.gray}
            multiline={true}
          />
        </View>
      </View>
      <Pressable style={styles.button} onPress={onPressHandler}>
        <Text style={styles.buttonText}>Report Listing</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  formContainer: {
    flex: 1,
  },
  fieldContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  textarea: {
    borderRadius: 8,
    padding: 12,
    fontFamily: Fonts.Satoshi.Regular,
    fontSize: 16,
    color: Colors.gray,
    backgroundColor: Colors.white,
    minHeight: 100,
  },
  button: {
    backgroundColor: Colors.black,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 16,
    color: Colors.white,
  },
});
