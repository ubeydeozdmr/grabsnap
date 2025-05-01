import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Car } from '../api/data';
import Line from '../components/Line';
import RoundedButton from '../components/RoundedButton';
import Tile from '../components/Tile';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { normalize } from '../utils/normalize';

type RootStackParamList = {
  CarDetails: { car: Car };
};

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

export default function CarDetails({ route }: Props): JSX.Element {
  const [favorite, setFavorite] = useState(false);
  const { car } = route.params;

  function onPressHandler() {
    setFavorite((f) => !f);
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <Image source={{ uri: car.image }} style={styles.image} />
        <View style={styles.content}>
          <View style={styles.aligner}>
            <View>
              <Text style={styles.title}>
                {car.model.make.name} {car.model.name}, {car.releaseYear}
              </Text>
              <Text style={styles.price}>${car.price.toLocaleString()}</Text>
            </View>
            <View>
              <RoundedButton onPress={onPressHandler}>
                {favorite ? (
                  <MaterialIcons name="favorite" size={32} color="white" />
                ) : (
                  <MaterialIcons
                    name="favorite-border"
                    size={32}
                    color="white"
                  />
                )}
              </RoundedButton>
            </View>
          </View>
          <Line />
          <View style={styles.tiles}>
            <Tile label="Mileage" value={`${car.mileage}km`}>
              <MaterialIcons name="add-road" size={24} color="#1c1b1f" />
            </Tile>
            <Tile label="Gear" value={normalize(car.gearbox)}>
              <MaterialCommunityIcons
                name="car-shift-pattern"
                size={24}
                color="#1c1b1f"
              />
            </Tile>
            <Tile label="Power" value={`${car.power}hp`}>
              <MaterialIcons name="speed" size={24} color="#1c1b1f" />
              {/* <MaterialCommunityIcons name="speedometer" size={24} color="#1c1b1f" /> */}
            </Tile>
            <Tile label="Fuel" value={normalize(car.fuel)}>
              <MaterialIcons
                name="local-gas-station"
                size={24}
                color="#1c1b1f"
              />
            </Tile>
          </View>
          <Line />
          <View style={styles.statsList}>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>City</Text>
              <Text style={styles.statsValue}>{car.city}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Release Year</Text>
              <Text style={styles.statsValue}>{car.releaseYear}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Body Type</Text>
              <Text style={styles.statsValue}>{normalize(car.bodyType)}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Color</Text>
              <Text style={styles.statsValue}>{normalize(car.color)}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Condition</Text>
              <Text style={styles.statsValue}>{normalize(car.condition)}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>New</Text>
              <Text style={styles.statsValue}>{car.isNew ? 'Yes' : 'No'}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsLabel}>Engine Size (L)</Text>
              <Text style={styles.statsValue}>
                {car.engineSize === 0 ? '-' : `${car.engineSize}L`}
              </Text>
            </View>
          </View>
          <Line />
          {/* NOTE: JSON/TypeScript integration will be implemented later */}
          <Text style={styles.addFeatTitle}>Additional Features</Text>
          <ScrollView style={styles.addFeatures} horizontal={true}>
            {car.addFeats.map((feat) => (
              <Text key={feat} style={styles.feature}>
                {normalize(feat)}
              </Text>
            ))}
          </ScrollView>
          <Line />
          <View style={styles.aligner}>
            <View>
              <Text style={styles.username}>{car.seller.fullName}</Text>
              <Text style={styles.phoneNumber}>{car.seller.phone}</Text>
            </View>
            <View>
              <MaterialIcons name="person-outline" size={40} color="black" />
            </View>
          </View>
          <Line />
          <Pressable
            style={({ pressed }) => [
              styles.reportButton,
              pressed && styles.pressed,
            ]}
          >
            <MaterialIcons
              name="warning-amber"
              size={40}
              color={Colors.primary}
            />
            <Text style={styles.reportButtonText}>Report List</Text>
          </Pressable>
        </View>
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          {
            /* NOTE: WORK IN PROGRESS */
            /*           position: 'absolute',
          bottom: 8, */
            /*             marginBottom: 8,
            marginHorizontal: 8,
            borderRadius: 8, */
            padding: 12,
            width: 'auto',
            backgroundColor: Colors.accent,
            alignItems: 'center',
          },
          pressed && { opacity: 0.7 },
        ]}
      >
        <Text style={{ fontFamily: Fonts.Satoshi.Black, color: Colors.white }}>
          CALL THE SELLER
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  aligner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.Satoshi.Bold,
    color: Colors.black,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: Fonts.Satoshi.Medium,
    color: Colors.black,
    marginBottom: 16,
  },
  tiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    /* padding: 10, */
  },
  statsList: {
    /*     borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.background, */
    marginVertical: 12,
    paddingVertical: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  statsLabel: {
    color: Colors.gray,
    fontFamily: Fonts.Satoshi.Regular,
    fontSize: 16,
    flex: 1,
  },
  statsValue: {
    color: Colors.black,
    fontFamily: Fonts.Satoshi.Medium,
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  addFeatTitle: {
    fontFamily: Fonts.Satoshi.Medium,
    marginBottom: 8,
  },
  addFeatures: {
    flexDirection: 'row',
  },
  feature: {
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.background,
    borderRadius: 1000,
    fontFamily: Fonts.Satoshi.Medium,
  },
  username: {
    marginBottom: 4,
    fontFamily: Fonts.Satoshi.Medium,
  },
  phoneNumber: {
    color: Colors.accent,
    fontFamily: Fonts.Satoshi.Medium,
  },
  reportButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButtonText: {
    color: Colors.primary,
    fontFamily: Fonts.Satoshi.Medium,
    marginLeft: 8,
  },
  pressed: {
    opacity: 0.7,
  },
});
