import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

import FormButton from '../../components/FormButton';
import FormTitle from '../../components/FormTitle';
import TextWarning from '../../components/TextWarning';
import { Fonts } from '../../constants/fonts';
import {
  doPasswordsMatch,
  isPasswordCorrect,
  isPasswordValid,
} from '../../utils/validation';

const { width, height } = Dimensions.get('window');

export default function ChangePass() {
  const [changeDataSet, setChangeDataSet] = useState({
    password: '',
    newPassword: '',
    passwordRep: '',
  });

  const [passwordWarning, setPasswordWarning] = useState(null);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [passwordWarningColor, setPasswordWarningColor] = useState('red');

  const [compWarning, setCompWarning] = useState(null);
  const [showCompWarning, setShowCompWarning] = useState(false);
  const [compWarningColor, setCompWarningColor] = useState('red');

  const [textWarningColor, setTextWarningColor] =
    useState('rgb(168, 168, 167)');

  return (
    <View style={styles.container}>
      <View style={styles.changePassCont}>
        <FormTitle title="Change Password" />

        {/* Old Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={changeDataSet.password}
          onChangeText={(text) =>
            setChangeDataSet((prev) => ({ ...prev, password: text }))
          }
        />

        {showPasswordWarning && (
          <Text style={[styles.warningText, { color: passwordWarningColor }]}>
            {passwordWarning}
          </Text>
        )}

        <TextWarning
          warning={
            <Text style={{ fontSize: 14, fontFamily: Fonts.Satoshi.Bold }}>
              Password requirements: Avoid similarity to personal info,{' '}
              <Text
                style={{
                  color: textWarningColor,
                  fontFamily: Fonts.Satoshi.Bold,
                }}
              >
                8+ characters
              </Text>
              , no common choices,{' '}
              <Text
                style={{
                  color: textWarningColor,
                  fontFamily: Fonts.Satoshi.Bold,
                }}
              >
                no all numeric
              </Text>
              .
            </Text>
          }
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={changeDataSet.newPassword}
          onChangeText={(text) =>
            setChangeDataSet((prev) => ({ ...prev, newPassword: text }))
          }
        />

        {/* Repeat Password */}
        <TextInput
          style={styles.input}
          placeholder="Password Again"
          secureTextEntry
          value={changeDataSet.passwordRep}
          onChangeText={(text) =>
            setChangeDataSet((prev) => ({ ...prev, passwordRep: text }))
          }
        />

        {showCompWarning && (
          <Text style={[styles.warningText, { color: compWarningColor }]}>
            {compWarning}
          </Text>
        )}

        <FormButton
          name="Change"
          mode="change-password"
          regDataSet={changeDataSet}
          onResult={async (passwordWarning) => {
            if (await isPasswordCorrect(changeDataSet.password)) {
              setPasswordWarning(passwordWarning.passwordWarning);
              setPasswordWarningColor(passwordWarning.passwordWarningColor);
              setShowPasswordWarning(true);

              isPasswordValid(changeDataSet.newPassword)
                ? setTextWarningColor('rgb(168, 168, 167)')
                : setTextWarningColor('rgb(72, 224, 113)');

              if (
                doPasswordsMatch(
                  changeDataSet.newPassword,
                  changeDataSet.passwordRep,
                )
              ) {
                setCompWarning(passwordWarning.compWarning);
                setCompWarningColor(passwordWarning.compWarningColor);
                setShowCompWarning(true);
              } else {
                setCompWarning(passwordWarning.compWarning);
                setCompWarningColor(passwordWarning.compWarningColor);
                setShowCompWarning(true);
              }
            } else {
              setPasswordWarning(passwordWarning.passwordWarning);
              setPasswordWarningColor(passwordWarning.passwordWarningColor);
              setShowPasswordWarning(true);
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(245, 76, 76)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePassCont: {
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
    fontSize: 14,
    color: 'red',
    marginTop: -5,
    marginBottom: 5,
    fontFamily: Fonts.Satoshi.Bold,
  },
});
