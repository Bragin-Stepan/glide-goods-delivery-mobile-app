import React from 'react';

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { themeColors } from '../theme';
import FeaturedShopCard from './featuredShopCard';

export default function FeaturedRow({ shops, title, description }) {
  return (
    <View className="mt-1">
      <View className="flex-row justify-between items-center px-4 mt-5">
        <View>
          <Text className="font-bold text-lg">{title}</Text>
          <Text className="text-gray-500 text-sm">{description}</Text>
        </View>
        <TouchableOpacity>
          <Text
            style={{ color: themeColors.bgColor(1) }}
            className="font-semibold"
          >
            Все
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className=" overflow-visible py-2"
      >
        {/* ------- Магазины ------- */}
        {shops.map((shopItem, index) => {
          return <FeaturedShopCard key={index} shop={shopItem} />;
        })}
      </ScrollView>
    </View>
  );
}
