import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';

import { categories } from '../db';

export default function Categories() {
  {
    /* -------------- ! На данный момент не реализован ! -------------- */
  }
  const [activeCategory, setActiveCategory] = React.useState(null);
  return (
    <View>
      <ScrollView
        className="overflow-visible"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {/* ------- Категории ------- */}
        {categories.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnClass = isActive
            ? 'border-1 border-white bg-white'
            : 'bg-gray-100';
          let textClass = isActive ? 'font-semibold' : null;
          return (
            <View
              key={index}
              style={{
                width: 85,
                height: 85,
              }}
              className="flex justify-center mr-1"
            >
              <TouchableOpacity
                className="p-1 rounded-2xl items-center"
                onPress={() => setActiveCategory(category.id)}
              >
                <View
                  className={`rounded-xl border border-gray-100 ${btnClass}`}
                >
                  <Image
                    className="m-1"
                    style={{ width: 45, height: 45 }}
                    source={category.image}
                  />
                </View>

                <Text className={`text-xs mt-2 ${textClass}`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
