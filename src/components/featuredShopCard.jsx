import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

export default function ShopsCard({ shop }) {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Shop', { ...shop })}
    >
      <View className="mr-6 bg-white rounded-3xl shadow-2xl">
        <Image className="h-32 w-60 rounded-t-3xl" source={shop.image} />
        <View className="px-3 pb-4 space-y-2 space-x-1">
          <View className="flex-row justify-between">
            <Text className="text-lg pt-2">{shop.name}</Text>
            <View className="flex-row mt-3">
              <Image
                source={require('../../assets/images/star.png')}
                className="h-3 w-3 mt-1 mr-1"
              />
              <Text>{shop.stars}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
