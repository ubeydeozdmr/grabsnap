import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native';
import React, { useState } from 'react';
import FormTitle from '../../components/FormTitle';
import FormButton from '../../components/FormButton';
import { Colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

interface PhoneDataSet {
  phoneNumber: string;
}

interface PhoneWarningData {
  phoneWarning: string;
  phoneWarningColor: string;
}

export default function ChangePhone() {
  const [phoneDataSet, setPhoneDataSet] = useState<PhoneDataSet>({
    phoneNumber: '',
  });

  const [phoneWarning, setPhoneWarning] = useState<string | null>(null);
  const [showPhoneWarning, setShowPhoneWarning] = useState<boolean>(false);
  const [phoneWarningColor, setPhoneWarningColor] = useState<string>('red');

  return (
    <View style={styles.container}>
      <View style={styles.phoneContainer}>
        <FormTitle title="Change Phone Number" />
        {/* Phone Number */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneDataSet.phoneNumber}
          onChangeText={(text: string) =>
            setPhoneDataSet((prev) => ({ ...prev, phoneNumber: text }))
          }
          keyboardType="numeric"
          maxLength={11} // the phone number consists of 11 digits.
        />

        {showPhoneWarning && (
          <Text style={[styles.warningText, { color: phoneWarningColor }]}>
            {phoneWarning}
          </Text>
        )}

        <FormButton
          name="Change"
          mode="change-phone"
          regDataSet={phoneDataSet}
          onResult={(phoneWarning: PhoneWarningData) => {
            setPhoneWarning(phoneWarning.phoneWarning);
            setPhoneWarningColor(phoneWarning.phoneWarningColor);
            setShowPhoneWarning(true);
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
  phoneContainer: {
    backgroundColor: '#fff',
    width: width * 0.85,
    borderRadius: 10,
    padding: 15,
    maxHeight: height * 0.85,
    gap: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: 'rgb(225, 231, 240)',
    borderWidth: 1,
    padding: 10,
    height: height * 0.05,
  },
  warningText: {
    fontSize: 13,
    color: 'red',
    marginTop: -5,
    marginBottom: 5,
  },
});
