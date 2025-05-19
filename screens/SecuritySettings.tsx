import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { Fonts } from '../constants/fonts';

type RootStackParamList = {
  TabNavigator: undefined;
  Login: undefined;
  ChangePhone: undefined;
  ChangePass: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SecuritySettings() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.fieldContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: Colors.gray },
          ]}
          onPress={() => navigation.navigate('ChangePhone')}
        >
          <Text style={styles.buttonText}>Change Phone Number</Text>
        </Pressable>
      </View>
      <View style={styles.fieldContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && { backgroundColor: Colors.gray },
          ]}
          onPress={() => navigation.navigate('ChangePass')}
        >
          <Text style={styles.buttonText}>Change Password</Text>
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
                    navigation.reset({
                      index: 0,
                      routes: [{ name: 'Login' }],
                    });
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
