import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import GroupedField from '../components/GroupedField';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { AuthProvider } from '../context/AuthContext';

type RootStackParamList = {
  TabNavigator: undefined;
  Login: undefined;
  ChangePhone: undefined;
  SecuritySettings: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Settings() {
  const navigation = useNavigation<NavigationProp>();
  const authContext = useContext(AuthProvider);

  if (!authContext) {
    throw new Error('Context API must be used within an AuthContext provider');
  }

  const { isAuthenticated } = authContext;

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
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
            Licence Agreement
          </GroupedField>
        </View>
        {isAuthenticated && (
          <View style={styles.fieldContainer}>
            <Pressable
              style={styles.button}
              onPress={() => navigation.navigate('SecuritySettings')}
            >
              <Text style={[styles.buttonText, { color: '#0a58d0' }]}>
                Security Settings
              </Text>
            </Pressable>
          </View>
        )}
      </View>
      {isAuthenticated ? (
        <View style={styles.fieldContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: Colors.gray },
            ]}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            }
          >
            <Text style={[styles.buttonText, { color: Colors.primary }]}>
              Log out
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.fieldContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && { backgroundColor: Colors.gray },
            ]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, { color: '#0a58d0' }]}>
              Log in
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  button: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    fontFamily: Fonts.Satoshi.Medium,
    color: Colors.black,
    fontSize: 16,
  },
});
