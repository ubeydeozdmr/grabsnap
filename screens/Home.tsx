import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getCars, type Car } from '../api/data';
import Card from '../components/Card';
import { Colors } from '../constants/colors';
import { Fonts } from '../constants/fonts';

export default function Home(): JSX.Element {
  const [data, setData] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Lists</Text>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => <Card item={item} index={index} />}
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
    ...(Platform.OS === 'ios' && { fontWeight: '700' }),
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
  },
});
