import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Fonts } from '../constants/fonts';
import { getMakes, Make } from '../api/data';
import ListItem from './ListItem';
import { Colors } from '../constants/colors';

export default function Makes() {
  const [data, setData] = useState<Make[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function setState() {
      try {
        setLoading(true);
        setError(null);
        setData(await getMakes());
      } catch (err) {
        setError('Failed to load makes');
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
      <Text style={styles.title}>MAKES</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem icon={item.image}>{item.name}</ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0,
  },
  title: {
    fontFamily: Fonts.Satoshi.Black,
    marginBottom: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: Fonts.Satoshi.Black,
  },
});
