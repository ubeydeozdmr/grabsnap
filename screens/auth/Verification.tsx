import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import FormButton from '../../components/FormButton';
import FormTitle from '../../components/FormTitle';
import { Colors } from '../../constants/colors';
import { Fonts } from '../../constants/fonts';
import { isCodeCorrect } from '../../utils/validation';

const { width, height } = Dimensions.get('window');

export default function Verification() {
  const [verifDataSet, setVerifDataSet] = useState({
    code: '',
  });

  const [codeWarning, setCodeWarning] = useState(null);
  const [showCodeWarning, setShowCodeWarning] = useState(false);
  const [codeWarningColor, setCodeWarningColor] = useState('red');

  return (
    <View style={styles.container}>
      <View style={styles.verificationCont}>
        <FormTitle title="Verification" />

        <TextInput
          style={styles.input}
          placeholder="Code"
          value={verifDataSet.code}
          onChangeText={(text) =>
            setVerifDataSet((prev) => ({ ...prev, code: text }))
          }
          keyboardType="numeric"
          maxLength={6} // the verification code consists of 6 digits.
        />

        {showCodeWarning && (
          <Text style={[styles.warningText, { color: codeWarningColor }]}>
            {codeWarning}
          </Text>
        )}

        <Text style={styles.haveAccountText}>
          Haven't you received a code?{' '}
          <TouchableOpacity>
            <Text style={styles.link}>Send again</Text>
          </TouchableOpacity>
        </Text>

        <FormButton
          name="Verify"
          mode="verify"
          regDataSet={verifDataSet}
          onResult={async (codeWarning) => {
            if (await isCodeCorrect(verifDataSet.code)) {
              setCodeWarning(codeWarning.codeWarning);
              setCodeWarningColor(codeWarning.codeWarningColor);
              setShowCodeWarning(true);
            } else {
              setCodeWarning(codeWarning.codeWarning);
              setCodeWarningColor(codeWarning.codeWarningColor);
              setShowCodeWarning(true);
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
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verificationCont: {
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
  haveAccountText: {
    textAlign: 'center',
    fontFamily: Fonts.Satoshi.Bold,
    color: 'grey',
  },
  link: {
    fontFamily: Fonts.Satoshi.Bold,
    color: 'blue',
    position: 'relative',
    top: 4,
  },
  warningText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 14,
    color: 'red',
    marginTop: -5,
    marginBottom: 5,
  },
});
