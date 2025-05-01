import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCars, type Car } from '../api/data';
import Card from '../components/Card';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CarDetails'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Home({ navigation }: Props) {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function tileOnPressHandler(car: Car) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    async function setState() {
      try {
        setLoading(true);
        setError(null);
        setData(await getCars());
      } catch (err) {
        setError('Failed to load cars');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    setState();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {error || "We're encountered an error while getting data"}
        </Text>
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.container}>
        <Text>
          Wow, there's nothing to show! You may press "Sell Car" button to add
          the first car!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Lists</Text>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Card
            item={item}
            index={index}
            handler={() => tileOnPressHandler(item)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontSize: 16,
    /* fontWeight: 700, */
    marginBottom: 16,
    fontFamily: Fonts.Satoshi.Bold,
  },
  listContent: {
    paddingBottom: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.Satoshi.Black,
  },
});
