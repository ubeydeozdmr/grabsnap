import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Car, getCars } from '../api/data';
import Card from '../components/Card';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';
import { AuthProvider } from '../context/AuthContext';

export default function Profile() {
  const [data, setData] = useState<Car[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const authContext = useContext(AuthProvider);

  if (!authContext) {
    throw new Error('Context API must be used within an AuthContext provider');
  }

  const { isAuthenticated } = authContext;

  type RootStackParamList = {
    TabNavigator: undefined;
    CarDetails: { car: Car };
    Makes: undefined;
    Models: { makeId: number };
    Filter: undefined;
  };

  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const listedCars = isAuthenticated
    ? data.filter((car) => car.city === 'Istanbul')
    : [];

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
        ListHeaderComponent={<Text style={styles.title}>My Lists</Text>}
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
