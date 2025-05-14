import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import { Colors } from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Car } from '../api/data';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GroupedButton from '../components/GroupedButton';
import GroupedField from '../components/GroupedField';
import { Fonts } from '../constants/fonts';

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Filter() {
  const navigation = useNavigation<NavigationProp>();

  const [listing, setListing] = useState<'ALL' | 'NEW' | 'USED'>('ALL');

  function makeButtonOnPressHandler() {
    navigation.navigate('Makes');
  }

  function modelButtonOnPressHandler() {
    navigation.navigate('Models', { makeId: 101 });
  }

  function submitButtonOnPressHandler() {
    navigation.navigate('TabNavigator');
  }

  return (
    <ScrollView style={styles.container}>
      <GroupedButton isFirst onPress={makeButtonOnPressHandler}>
        Make
      </GroupedButton>
      <GroupedButton isLast onPress={modelButtonOnPressHandler}>
        Model
      </GroupedButton>

      {/* Price */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Price</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Min</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MIN"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Max</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MAX"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>
      </View>

      {/* Mileage */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Millage</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Min</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MIN(KM)"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Max</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MAX(KM)"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>
      </View>

      {/* Release Year */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Release Year</Text>
        <View style={styles.rowContainer}>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Min</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MIN"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
          <View style={styles.inputWrapper}>
            {/* <Text style={styles.inputLabel}>Max</Text> */}
            <TextInput
              style={styles.inputField}
              placeholder="MAX"
              keyboardType="numeric"
              placeholderTextColor={Colors.gray}
            />
          </View>
        </View>
      </View>

      {/* Listing */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>Listing</Text>
        <View style={styles.listingRow}>
          <Pressable
            style={[
              styles.listingButton,
              listing === 'ALL' && styles.listingButtonActive,
            ]}
            onPress={() => setListing('ALL')}
          >
            <Text
              style={[
                styles.listingButtonText,
                listing === 'ALL' && styles.listingButtonTextActive,
              ]}
            >
              ALL
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.listingButton,
              listing === 'NEW' && styles.listingButtonActive,
            ]}
            onPress={() => setListing('NEW')}
          >
            <Text
              style={[
                styles.listingButtonText,
                listing === 'NEW' && styles.listingButtonTextActive,
              ]}
            >
              NEW
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.listingButton,
              listing === 'USED' && styles.listingButtonActive,
            ]}
            onPress={() => setListing('USED')}
          >
            <Text
              style={[
                styles.listingButtonText,
                listing === 'USED' && styles.listingButtonTextActive,
              ]}
            >
              USED
            </Text>
          </Pressable>
        </View>
        <View style={styles.fieldContainer}>
          <GroupedField fieldType="select" isFirst>
            Body Type
          </GroupedField>
          <GroupedField fieldType="select">Color</GroupedField>
          <GroupedField fieldType="select">Fuel</GroupedField>
          <GroupedField fieldType="select" isLast>
            Gearbox
          </GroupedField>
        </View>
        <View style={styles.fieldContainer}>
          <GroupedField fieldType="select" isFirst isLast>
            Additional Features
          </GroupedField>
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={submitButtonOnPressHandler}
        >
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    paddingBottom: 0,
  },
  fieldContainer: {
    marginTop: 12,
    marginBottom: 12,
  },
  sectionContainer: {
    marginTop: 12,
    marginBottom: 0,
  },
  sectionLabel: {
    fontWeight: '500',
    fontSize: 13,
    color: '#888',
    marginBottom: 6,
    marginLeft: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 2,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
    marginLeft: 2,
  },
  inputField: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: '#222',
    width: '100%',
  },
  listingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  listingButton: {
    flex: 1,
    marginHorizontal: 2,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  listingButtonActive: {
    borderColor: Colors.primary,
  },
  listingButtonText: {
    color: '#d9d9d9',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listingButtonTextActive: {
    color: Colors.primary,
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
});
