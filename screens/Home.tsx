import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCars, type Car } from '../api/data';
import Card from '../components/Card';
import GroupedButton from '../components/GroupedButton';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type RootStackParamList = {
  TabNavigator: undefined;
  CarDetails: { car: Car };
  Makes: undefined;
  Models: { makeId: number };
  Filter: undefined;
};

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  function makeButtonOnPressHandler() {
    navigation.navigate('Makes');
  }

  function modelButtonOnPressHandler() {
    navigation.navigate('Models', { makeId: 101 });
  }

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
      <FlatList
        data={data}
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
        ListHeaderComponent={
          <>
            <GroupedButton isFirst onPress={makeButtonOnPressHandler}>
              Make
            </GroupedButton>
            <GroupedButton isLast onPress={modelButtonOnPressHandler}>
              Model
            </GroupedButton>
            <Pressable
              style={({ pressed }) => [
                styles.filterButton,
                pressed && styles.pressed,
              ]}
              onPress={() => navigation.navigate('Filter')}
            >
              <MaterialIcons
                name="filter-list"
                size={24}
                color={Colors.primary}
              />
              <Text style={styles.filterButtonText}>FILTER</Text>
            </Pressable>
            <Text style={styles.title}>New Lists</Text>
          </>
        }
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
  pressed: {
    opacity: 0.5,
  },
  filterButton: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 100,
    marginVertical: 16,
  },
  filterButtonText: {
    color: Colors.black,
    fontSize: 14,
    fontFamily: Fonts.Satoshi.Bold,
    marginLeft: 4,
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.Satoshi.Black,
  },
});
