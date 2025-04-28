import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Car } from '../api/data';
import { Fonts } from '../constants/fonts';
import { normalize } from '../utils/normalize';

type CardProps = {
  item: Car;
  index: number;
  handler: () => void;
};

export default function Card({ item, index, handler }: CardProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const relativeDate = formatDistanceToNow(date, {
      addSuffix: true,
    });
    return `${relativeDate}, ${time}`;
  };

  const onPressHandler = (item: Car) => {
    handler();
    /*     Alert.alert(
      `${item.model.brand.name} ${item.model.name}, ${item.releaseYear}`,
      `${item.engineSize}L | ${item.mileage.toLocaleString()}km | ${normalize(
        item.gearbox,
      )} | ${item.city}, ${formatDateTime(item.datetime)}`,
    ); */
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.tile,
        pressed && styles.tilePressed,
        index % 2 === 0 ? styles.odd : styles.even,
      ]}
      onPress={() => onPressHandler(item)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        onError={() =>
          console.error(`Failed to load image for car #${item.id}`)
        }
      />
      <View style={styles.content}>
        <Text style={styles.title}>
          {item.model.make.name} {item.model.name}, {item.releaseYear}
        </Text>
        <Text style={styles.price}>${item.price.toLocaleString()}</Text>
        <Text style={styles.stats}>
          {item.engineSize}L | {item.mileage.toLocaleString()}km |{' '}
          {normalize(item.gearbox)}
        </Text>
        <Text style={styles.datetime}>
          {item.city}, {formatDateTime(item.datetime)}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    // elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  odd: {
    marginLeft: 0,
  },
  even: {
    marginRight: 0,
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  tilePressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 14,
    // fontWeight: 'bold',
    color: '#000',
    fontFamily: Fonts.Satoshi.Bold,
  },
  price: {
    fontSize: 12,
    color: '#333',
    // fontWeight: 'bold',
    marginTop: 4,
    fontFamily: Fonts.Satoshi.Medium,
  },
  stats: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
    fontFamily: Fonts.Satoshi.Regular,
  },
  datetime: {
    fontSize: 10,
    color: '#666',
    marginTop: 16,
    fontFamily: Fonts.Satoshi.Regular,
  },
});
