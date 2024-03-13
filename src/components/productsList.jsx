import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import { formatPriceWithSpaces } from '../utils/formatPriceWitchSpaces';

import { useNavigation } from '@react-navigation/native';

export default function ProductsList({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('ProductCard', { ...item })}
    >
      <View className="mt-5">
        <Image className="rounded-3xl w-40 h-40" source={item.image}></Image>
        <View className="ml-2 mt-1">
          <Text className="font-bold text-xl">
            {formatPriceWithSpaces(item.price)} ₽
          </Text>
          <View className=" w-36 h-9">
            <Text className="text-ellipsis overflow-hidden">{item.name}</Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
