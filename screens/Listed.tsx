import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Car, getCars } from '../api/data';
import Card from '../components/Card';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { UserProvider } from '../context/UserContext';

export default function Listed() {
  const [data, setData] = useState<Car[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const userContext = useContext(UserProvider);

  type RootStackParamList = {
    TabNavigator: undefined;
    CarDetails: { car: Car };
    Makes: undefined;
    Models: { makeId: number };
    Filter: undefined;
  };

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  if (!userContext) {
    throw new Error('UserContext must be used within a UserContext provider');
  }

  const { userInfos } = userContext;

  const listedCars = data.filter((car) =>
    userInfos.listed_cars.includes(car.id),
  );

  useEffect(() => {
    async function setState() {
      setData(await getCars());
    }
    setState();
  }, []);

  function tileOnPressHandler(car: Car) {
    navigation.navigate('CarDetails', { car });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listedCars}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Card
            item={item}
            index={index}
            handler={() => tileOnPressHandler(item)}
          />
        )}
        ListHeaderComponent={<Text style={styles.title}>Favorites</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
  },
  pressed: {
    opacity: 0.5,
  },
  title: {
    fontSize: 16,
    marginVertical: 16,
    fontFamily: Fonts.Satoshi.Bold,
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
