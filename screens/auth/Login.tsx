import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';

import FormButton from '../../components/FormButton';
import FormTitle from '../../components/FormTitle';
import LinkNavigator from '../../components/LinkNavigator';
import { isEmailTaken, isPasswordCorrect } from '../../utils/validation';
import { Fonts } from '../../constants/fonts';
import { Colors } from '../../constants/colors';
import { AuthProvider } from '../../context/AuthContext';
import { UserProvider } from '../../context/UserContext';

const { width, height } = Dimensions.get('window');

export default function Login() {

  const authContext = useContext(AuthProvider);
  const userContext = useContext(UserProvider)
  
    if (!authContext || !userContext) {
      throw new Error('Context API must be used within an AuthContext provider');
    }
  
  const { isAuthenticated, setIsAuthenticated } = authContext;
  const { userInfos, setUserInfos } = userContext;

  const [logDataSet, setLogDataSet] = useState({
    email: '',
    password: '',
  });

  // When the log-in process is totally on a proper level, turns into true.

//   useEffect(() => {
//   if (isAuthenticated) {
//     alert(true);
//   }
// }, [isAuthenticated]);


  // useEffect(()=>{
  //   alert(JSON.stringify(userInfos))
  // }, [])

  const [passwordWarning, setPasswordWarning] = useState(null);
  const [showPasswordWarning, setShowPasswordWarning] = useState(false);
  const [passwordWarningColor, setPasswordWarningColor] = useState('red');

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <FormTitle title="Login" />

        {/* Email - Phone */}
        <TextInput
          style={styles.input}
          placeholder="Email or Phone Number"
          value={logDataSet.email}
          keyboardType="email-address"
          onChangeText={(text) =>
            setLogDataSet((prev) => ({ ...prev, email: text }))
          }
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={logDataSet.password}
          onChangeText={(text) =>
            setLogDataSet((prev) => ({ ...prev, password: text }))
          }
        />

        {showPasswordWarning && (
          <Text style={[styles.warningText, { color: passwordWarningColor }]}>
            {passwordWarning}
          </Text>
        )}

        {/* Register redirect */}
        <LinkNavigator
          message="Don't have an account?"
          page="Register"
          link="Register"
        />

        {/* Login Button */}
        <FormButton
          name="Login"
          mode="login"
          regDataSet={logDataSet}
          onResult={async ({passwordWarning, passwordWarningColor, result}) => {
            // if (
            //   (await isEmailTaken(logDataSet.email)) &&
            //   (await isPasswordCorrect(logDataSet.password))
            // ) {
            //   setPasswordWarning(passwordWarning.passwordWarning);
            //   setPasswordWarningColor(passwordWarning.passwordWarningColor);
            //   setShowPasswordWarning(true);
            // } else {
            //   setPasswordWarning(passwordWarning.passwordWarning);
            //   setPasswordWarningColor(passwordWarning.passwordWarningColor);
            //   setShowPasswordWarning(true);
            // }
            if(logDataSet.email == userInfos.email && logDataSet.password == userInfos.password && userInfos.email != ""){
              setPasswordWarning(passwordWarning);
              setPasswordWarningColor(passwordWarningColor);
              setShowPasswordWarning(true);
            }
            else{
              setPasswordWarning(passwordWarning);
              setPasswordWarningColor(passwordWarningColor);
              setShowPasswordWarning(true);
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
  loginContainer: {
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
    fontSize: 13,
    color: 'red',
    marginTop: -5,
    marginBottom: 5,
  },
});
