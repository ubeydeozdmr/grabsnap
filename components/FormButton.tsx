import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  doPasswordsMatch,
  isCodeCorrect,
  isEmailTaken,
  isEmailValid,
  isPasswordCorrect,
  isPasswordValid,
  isPhoneNumberValid,
} from '../utils/validation';

import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');

type FormButtonProps = {
  name: string;
  regDataSet: any;
  onResult: (result: any) => void;
  mode: string;
};

export default function FormButton({
  name,
  regDataSet,
  onResult,
  mode,
}: FormButtonProps) {
  const handlePress = async () => {
    let emailWarning = null;
    let passwordWarning = null;
    let phoneWarning = null;
    let emailWarningColor = 'red';
    let passwordWarningColor = 'red';
    let phoneWarningColor = 'red';

    let compWarning = null;
    let compWarningColor = 'red';

    let codeWarning = null;
    let codeWarningColor = 'red';

    let result = 1;

    // Register Mode
    if (mode == 'register') {
      // Email validation
      if (!isEmailValid(regDataSet.email)) {
        emailWarning = 'Please enter a valid email address!';
        result *= 0;
      } else {
        emailWarning = 'Email address is valid!';
        emailWarningColor = 'green'; // Set to green if email is valid
      }

      // Password validation
      const isMatch = doPasswordsMatch(
        regDataSet.password,
        regDataSet.passwordRep,
      );
      const isValid = isPasswordValid(regDataSet.password);

      if (!isMatch) {
        passwordWarning = 'Passwords do not match!';
        passwordWarningColor = 'red'; // Ensure red color if passwords don't match
        result *= 0;
      } else if (!isValid) {
        passwordWarning = 'Password you entered is not valid!';
        passwordWarningColor = 'red'; // Ensure red color if password is invalid
        result *= 0;
      } else {
        passwordWarning = 'Passwords correctly match!';
        passwordWarningColor = 'green';
      }

      // Phone Number Validation
      const isPhoneNumValid = isPhoneNumberValid(regDataSet.phoneNumber);

      // Check if the phone number is valid or not
      if (isPhoneNumValid) {
        phoneWarning = 'Phone number is valid!';
        phoneWarningColor = 'green';
      } else {
        phoneWarning = 'Phone number not valid!';
        phoneWarningColor = 'red';
        result *= 0;
      }
    }

    // Login Mode
    else if (mode == 'login') {
      // Check if the email entered not taken and the password is correct
      if (
        (await isEmailTaken(regDataSet.email)) &&
        (await isPasswordCorrect(regDataSet.password))
      ) {
        passwordWarning = 'Correct Password, welcome!';
        passwordWarningColor = 'green';
      } else {
        passwordWarning = 'Wrong credentials!';
        passwordWarningColor = 'red';
        result *= 0;
      }
    }

    // Change-Password Mode
    else if (mode == 'change-password') {
      // Check if the old password is correct
      if (await isPasswordCorrect(regDataSet.password)) {
        passwordWarning = 'Password is correct!';
        passwordWarningColor = 'green';

        // Check if the password entered is valid or not
        if (isPasswordValid(regDataSet.newPassword)) {
          if (
            doPasswordsMatch(regDataSet.newPassword, regDataSet.passwordRep)
          ) {
            compWarning = 'Your password has successfully been changed!';
            compWarningColor = 'green';
          } else {
            compWarning = 'Passwords do not match!';
            compWarningColor = 'red';
          }
        } else {
          compWarning = 'Password is not valid!';
          compWarningColor = 'red';
        }
      } else {
        passwordWarning = 'Your password is wrong!';
        passwordWarningColor = 'red';
      }
    }

    // Change-Phone Mode
    else if(mode == "change-phone"){
      if(isPhoneNumberValid(regDataSet.phoneNumber)){
        phoneWarning = "Phone number has successfully been changed!";
        phoneWarningColor = "green";
      }
      else{
        phoneWarning = "Phone number not valid!";
        phoneWarningColor = "red";
      }
    }

    // Verification Mode
    else if (mode == 'verify') {
      if (await isCodeCorrect(regDataSet.code)) {
        codeWarning = 'The code you entered is correct!';
        codeWarningColor = 'green';
      } else {
        codeWarning = 'The code you entered is wrong!';
        codeWarningColor = 'red';
      }
    }

    onResult({
      emailWarning, // email warning
      passwordWarning,
      phoneWarning,
      emailWarningColor, // email warning color
      passwordWarningColor,
      phoneWarningColor,
      compWarning, // password comparison warning
      compWarningColor,
      codeWarning, // verification code warning
      codeWarningColor,
      result
    });
  };

  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.registerBtn} onPress={handlePress}>
        <Text style={styles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: height * 0.07
  },
  registerBtn: {
    backgroundColor: Colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.4,
    padding: 5,
    borderRadius: 50,
  },
  buttonText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: width * 0.04,
    color: '#fff',
  },
});
