import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

import { Car } from '../api/data';
import GroupedButton from '../components/GroupedButton';
import GroupedField from '../components/GroupedField';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SellCar() {
  const navigation = useNavigation<NavigationProp>();

  function makeButtonOnPressHandler() {
    navigation.navigate('Makes');
  }

  function modelButtonOnPressHandler() {
    navigation.navigate('Models', { makeId: 101 });
  }

  async function openCameraOrGallery() {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: async () => {
            const { status } =
              await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              alert('Camera permission required!');
              return;
            }
            const result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [16, 9],
              quality: 1,
            });
            console.log(result);
          },
        },
        {
          text: 'Select from Gallery',
          onPress: async () => {
            const { status } =
              await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Gallery permission required!');
              return;
            }
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [16, 9],
              quality: 1,
            });
            console.log(result);
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          This car listing will use the registration number you provided (+90
          123 456 7890).
        </Text>
      </View>
      <GroupedButton isFirst onPress={makeButtonOnPressHandler}>
        Make
      </GroupedButton>
      <GroupedButton isLast onPress={modelButtonOnPressHandler}>
        Model
      </GroupedButton>
      <View style={styles.fieldContainer}>
        <View style={styles.pictureContainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 100,
              marginBottom: 12,
            }}
          ></View>
          <Text style={styles.pictureText}>
            You are required to provide clear photos of the car's front, rear,
            sides, and any other angles.
          </Text>
          <TouchableOpacity
            style={styles.pictureButton}
            onPress={() => {
              // Logic to open camera or gallery
              // This is a placeholder function, you need to implement the actual logic
              openCameraOrGallery();
            }}
          >
            <Text style={styles.pictureButtonText}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst fieldType="number" placeholder="0.00">
          Mileage (km)
        </GroupedField>
        <GroupedField fieldType="number" placeholder="0">
          Horsepower (HP)
        </GroupedField>
        <GroupedField fieldType="number" placeholder="0">
          Engine Size (L)
        </GroupedField>
        <GroupedField fieldType="select">Fuel Type</GroupedField>
        <GroupedField fieldType="select">Body Type</GroupedField>
        <GroupedField isLast fieldType="select">
          Gearbox
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst fieldType="text" placeholder="Baku">
          City
        </GroupedField>
        <GroupedField fieldType="number" placeholder="2020">
          Release Year
        </GroupedField>
        <GroupedField fieldType="text" placeholder="Red">
          Color
        </GroupedField>
        <GroupedField fieldType="select">Condition</GroupedField>
        <GroupedField isLast fieldType="select">
          New
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.textarea}
          placeholder="Description"
          placeholderTextColor={Colors.gray}
          multiline={true}
        />
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="select">
          Additional Features
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="text" placeholder="1234567890">
          VIN Number
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst isLast fieldType="number" placeholder="0.00">
          Price
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <GroupedField isFirst fieldType="text" placeholder="John Doe">
          Name
        </GroupedField>
        <GroupedField isLast fieldType="text" placeholder="john@doe.com">
          Email
        </GroupedField>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.warn}>
          Before you submit, please review your listing.
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  header: {
    borderColor: Colors.accent,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  headerText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 16,
    color: Colors.accent,
  },
  fieldContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  pictureContainer: {
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 8,
  },
  pictureText: {
    fontFamily: Fonts.Satoshi.Medium,
    fontSize: 12,
    color: Colors.black,
    marginBottom: 12,
  },
  pictureButton: {
    backgroundColor: Colors.black,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureButtonText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 16,
    color: Colors.white,
  },
  textarea: {
    borderRadius: 8,
    padding: 12,
    fontFamily: Fonts.Satoshi.Regular,
    fontSize: 16,
    color: Colors.gray,
    backgroundColor: Colors.white,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: Fonts.Satoshi.Bold,
    fontSize: 16,
    color: Colors.white,
  },
  warn: {
    fontFamily: Fonts.Satoshi.Medium,
    fontSize: 16,
    color: Colors.black,
    marginBottom: 12,
  },
});
