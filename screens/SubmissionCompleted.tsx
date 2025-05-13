import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Car } from '../api/data';
import { Colors } from '../constants/colors';

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
  SellCar: undefined;
  SubmissionCompleted: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SubmissionCompleted() {
  const navigation = useNavigation<NavigationProp>();

  function onPressHandler() {
    navigation.navigate('TabNavigator');
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name="check-circle" size={60} color={Colors.primary} />
      <Text style={styles.title}>Submission Completed</Text>
      <Text style={styles.description}>
        Your list has been successfully completed and has been sent for review.
        Please check your email for further updates.
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPressHandler}>
        <Text style={styles.buttonText}>RETURN TO HOME PAGE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.gray,
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
