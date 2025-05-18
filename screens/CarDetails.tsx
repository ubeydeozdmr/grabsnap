import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  NativeStackNavigationProp,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import { Car } from '../api/data';
import Line from '../components/Line';
import RoundedButton from '../components/RoundedButton';
import Tile from '../components/Tile';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { normalize } from '../utils/normalize';

import { AuthProvider } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { UserProvider } from '../context/UserContext';

type RootStackParamList = {
  CarDetails: { car: Car };
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CarDetails'>;

export default function CarDetails({ route }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const authContext = useContext(AuthProvider);
  const userContext = useContext(UserProvider);

  if (!authContext) {
    throw new Error('Context API must be used within an AuthContext provider');
  }
  if (!userContext) {
    throw new Error('UserContext must be used within a UserContext provider');
  }

  const { isAuthenticated } = authContext;
  const { userInfos, setUserInfos } = userContext;

  const { car } = route.params;
  const width = Dimensions.get('window').width;

  // Favori durumu, listed_cars içinde bu arabanın id'si var mı ona göre belirlenir
  const isFavorite = userInfos.listed_cars.includes(car.id);

  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSharedValue(0);

  function onPressHandler() {
    if (isAuthenticated) {
      if (isFavorite) {
        // Favorilerden çıkar
        setUserInfos((prev) => ({
          ...prev,
          listed_cars: prev.listed_cars.filter((id) => id !== car.id),
        }));
      } else {
        // Favorilere ekle
        setUserInfos((prev) => ({
          ...prev,
          listed_cars: [...prev.listed_cars, car.id],
        }));
      }
    } else {
      alert('Please login');
      navigation.navigate('Login');
    }
  }

  function callSeller() {
    Linking.openURL(`tel:${car.seller.phone}`);
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View style={{ position: 'relative', marginBottom: 16 }}>
          <Carousel
            data={car.image}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            width={width}
            height={300}
            onProgressChange={(_, absoluteProgress) =>
              setActiveIndex(Math.round(absoluteProgress))
            }
            snapEnabled
            pagingEnabled
            style={{ marginBottom: 0 }}
            loop
          />
          <View
            style={{
              position: 'absolute',
              bottom: 16,
              left: 0,
              right: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {car.image.map((_, idx) => (
              <View
                key={idx}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 4,
                  backgroundColor:
                    activeIndex === idx ? Colors.accent : Colors.gray,
                  opacity: activeIndex === idx ? 1 : 0.5,
                }}
              />
            ))}
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.aligner}>
            <View style={styles.textbox}>
              <Text style={styles.title}>
                {car.model.make.name} {car.model.name}, {car.releaseYear}
              </Text>
              <Text style={styles.price}>${car.price.toLocaleString()}</Text>
            </View>
            <View>
              <RoundedButton
                onPress={onPressHandler}
                accessibilityLabel="Toggle Favorite"
              >
                {isFavorite ? (
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
          <Text style={styles.description}>{car.description}</Text>
          <Line />
          <Text style={styles.addFeatTitle}>Additional Features</Text>
          <ScrollView style={styles.addFeatures} horizontal={true}>
            {car.addFeats?.map((feat) => (
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
        onPress={callSeller}
        style={({ pressed }) => [styles.ctsButton, pressed && styles.pressed]}
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
  textbox: {
    flex: 1,
    flexShrink: 1,
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
  },
  statsList: {
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
  description: {
    fontFamily: Fonts.Satoshi.Medium,
    fontSize: 16,
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
  ctsButton: {
    position: 'absolute',
    bottom: 28,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.accent,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});
