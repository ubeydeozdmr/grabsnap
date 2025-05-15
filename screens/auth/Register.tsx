import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { AuthProvider } from '../../context/AuthContext';

import FormButton from '../../components/FormButton';
import FormTitle from '../../components/FormTitle';
import LinkNavigator from '../../components/LinkNavigator';
import TextWarning from '../../components/TextWarning';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { isPasswordValid } from '../../utils/validation';

const { width, height } = Dimensions.get('window');

export default function Register() {

  const {isAuthenticated, setIsAuthenticated} = useContext(AuthProvider);

  const [regDataSet, setRegDataSet] = useState({
    email: '',
    password: '',
    passwordRep: '',
    phoneNumber: '',
  });


  // When the registration process is totally on a proper level, turns into true.

//   useEffect(() => {
//   if (isAuthenticated) {
//     alert(true);
//   }
// }, [isAuthenticated]);


  const [emailWarning, setEmailWarning] = useState(null);
  const [showEmailWarning, setShowEmailWarning] = useState(false);
  const [emailWarningColor, setEmailWarningColor] = useState('red');

  const [passwordWarning, setPasswordWarning] = useState(null);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [passwordWarningColor, setPasswordWarningColor] = useState('red');

  const [phoneWarning, setPhoneWarning] = useState(null);
  const [showPhoneWarning, setShowPhoneWarning] = useState(false);
  const [phoneWarningColor, setPhoneWarningColor] = useState('red');

  const [textWarningColor, setTextWarningColor] =
    useState('rgb(168, 168, 167)');

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <FormTitle title="Register" />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={regDataSet.email}
          onChangeText={(text) =>
            setRegDataSet((prev) => ({ ...prev, email: text }))
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />

        {showEmailWarning && (
          <Text style={[styles.warningText, { color: emailWarningColor }]}>
            {emailWarning}
          </Text>
        )}

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={regDataSet.password}
          onChangeText={(text) =>
            setRegDataSet((prev) => ({ ...prev, password: text }))
          }
        />

        <TextWarning
          warning={
            <Text>
              Password requirements: Avoid similarity to personal info,{' '}
              <Text style={{ color: textWarningColor }}>8+ characters</Text>, no
              common choices,{' '}
              <Text style={{ color: textWarningColor }}>no all numeric</Text>.
            </Text>
          }
        />

        {/* Repeat Password */}
        <TextInput
          style={styles.input}
          placeholder="Password Again"
          secureTextEntry
          value={regDataSet.passwordRep}
          onChangeText={(text) =>
            setRegDataSet((prev) => ({ ...prev, passwordRep: text }))
          }
        />

        {showPasswordWarning && (
          <Text style={[styles.warningText, { color: passwordWarningColor }]}>
            {passwordWarning}
          </Text>
        )}

        {/* Phone Number */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={regDataSet.phoneNumber}
          onChangeText={(text) =>
            setRegDataSet((prev) => ({ ...prev, phoneNumber: text }))
          }
          keyboardType="numeric"
          maxLength={11} // the phone number consists of 11 digits.
        />

        {showPhoneWarning && (
          <Text style={[styles.warningText, { color: phoneWarningColor }]}>
            {phoneWarning}
          </Text>
        )}

        <TextWarning
          warning={
            <Text>
              Make sure the phone number is yours. We'll send a code to verify.
            </Text>
          }
        />

        {/* Login redirect */}
        <LinkNavigator
          message="Do you already have an account?"
          page="Login"
          link="Login"
        />

        {/* Register Button */}
        <FormButton
          name="Register"
          mode="register"
          regDataSet={regDataSet}
          onResult={({
            emailWarning,
            passwordWarning,
            emailWarningColor,
            passwordWarningColor,
            phoneWarning,
            phoneWarningColor,
            result // PUT IT IN ALSO LOGIN
          }) => {
            if (emailWarning) {
              setEmailWarning(emailWarning);
              setEmailWarningColor(emailWarningColor);
              setShowEmailWarning(true);
            } else {
              setShowEmailWarning(false);
            }

            if (passwordWarning) {
              isPasswordValid(regDataSet.password)
                ? setTextWarningColor('rgb(168, 168, 167)')
                : setTextWarningColor('rgb(72, 224, 113)');
              setPasswordWarning(passwordWarning);
              setPasswordWarningColor(passwordWarningColor);
              setShowPasswordWarning(true);
            } else {
              setShowPasswordWarning(false);
            }

            if (phoneWarning) {
              setPhoneWarning(phoneWarning);
              setPhoneWarningColor(phoneWarningColor);
              setShowPhoneWarning(true);
            } else {
              setShowPhoneWarning(false);
            }
            result == 1 ? setIsAuthenticated(true) : setIsAuthenticated(false);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerContainer: {
    backgroundColor: '#fff',
    width: width * 0.85,
    borderRadius: 10,
    padding: 15,
    maxHeight: height * 0.85,
    gap: 10,
  },
  input: {
    fontFamily: Fonts.Satoshi.Bold,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'rgb(225, 231, 240)',
    borderWidth: 1,
    padding: 10,
    height: height * 0.05,
  },
  warningText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 14,
    color: 'red',
    marginTop: -5,
    marginBottom: 5,
  },
});
















