import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Colors } from '../constants/colors';
import GroupedField from '../components/GroupedField';
import { Fonts } from '../constants/fonts';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  TabNavigator: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Settings() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="select">
          Language
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="select">
          Theme
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="select">
          Support
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="select">
          License Aggrement
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: Colors.gray },
          ]}
        >
          <Text style={[styles.buttonText, { color: '#0a58d0' }]}>
            Change Phone Number
          </Text>
        </Pressable>
      </View>
      <View style={{ height: 80 }} />
      <View style={styles.fieldContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: Colors.gray },
          ]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            Log out
          </Text>
        </Pressable>
      </View>
      <View style={styles.fieldContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: Colors.gray },
          ]}
          onPress={() =>
            Alert.alert(
              'Delete Account',
              'Are you sure you want to delete your account?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: () => {
                    navigation.navigate('Login');
                  },
                },
              ],
            )
          }
        >
          <Text style={[styles.buttonText, { color: Colors.primary }]}>
            DELETE ACCOUNT
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 12,
  },
  fieldContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Fonts.Satoshi.Medium,
    color: Colors.black,
    fontSize: 16,
  },
});
