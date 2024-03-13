import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { View, Text, Pressable } from 'react-native';
import { themeColors } from '../theme';
import { selectCartItems, selectCartTotal } from '../redux/slices/cartSlice';

export default function CartBanner({}) {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  return (
    <>
      {cartItems && cartItems.length ? (
        <View className="absolute bottom-3 w-full z-10">
          <Pressable
            onPress={() => navigation.navigate('Cart')}
            className="flex-row justify-between items-center mx-7 rounded-full p-3 py-2"
            style={{ backgroundColor: themeColors.bgColor(1) }}
          >
            <View className="rounded-full px-2 bg-white">
              <Text className="font-semibold text-lg m-1">
                {cartItems.length}
              </Text>
            </View>
            <Text className="font-extrabold  text-center uppercase text-lg text-white">
              Корзина
            </Text>
            <Text className="font-semibold text-lg uppercase text-white">
              {cartTotal} ₽
            </Text>
          </Pressable>
        </View>
      ) : null}
    </>
  );
}
