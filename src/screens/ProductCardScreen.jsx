import React from 'react';
import { useRoute } from '@react-navigation/native';
import {
  addToCart,
  removeFromCart,
  selectCartItemsById,
} from '../redux/slices/cartSlice';

import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { themeColors } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import * as Icon from 'react-native-feather';

import { formatPriceWithSpaces } from '../utils/formatPriceWitchSpaces';

import ButtonBack from '../components/buttonBack';
import CartBanner from '../components/cartBanner';

export default function ProductCardScreen() {
  const dispatch = useDispatch();
  const { params } = useRoute();
  let productCard = params;

  // ------- Считает кол-во карточек -------
  const totalCards = useSelector(state =>
    selectCartItemsById(state, productCard.id)
  );

  // ------- Добавляет и убирает -------
  const handleButtonPlus = () => {
    dispatch(addToCart({ ...productCard }));
  };
  const handleButtonMinus = () => {
    dispatch(removeFromCart({ id: productCard.id }));
  };
  return (
    <View>
      <ButtonBack />
      <CartBanner totalCards={totalCards} />
      <ScrollView className="mt-6">
        <View className="bg-white m-3 rounded-2xl">
          <View className="items-center">
            <Image
              className="w-full h-96 rounded-2xl"
              source={productCard.image}
            />
          </View>
        </View>

        {/* ------- Цена и название ------- */}
        <View className="mx-3 bg-white rounded-2xl mb-3 pb-4">
          <View className="px-5 mt-4">
            <View className="justify-between flex-row">
              <Text
                className="font-bold text-3xl"
                style={{ color: themeColors.bgColor(1) }}
              >
                {formatPriceWithSpaces(productCard.price)} ₽
              </Text>
              <View className="items-center flex-row">
                <TouchableOpacity
                  onPress={handleButtonMinus}
                  disabled={!totalCards.length}
                  className="rounded-full p-1 bg-gray-200"
                  style={
                    totalCards.length
                      ? { backgroundColor: themeColors.bgColor(1) }
                      : null
                  }
                >
                  <Icon.Minus width={24} height={24} stroke={'white'} />
                </TouchableOpacity>
                <Text className="px-3 text-2xl">{totalCards.length}</Text>
                <TouchableOpacity
                  onPress={handleButtonPlus}
                  className="rounded-full p-1"
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                >
                  <Icon.Plus width={24} height={24} stroke={'white'} />
                </TouchableOpacity>
              </View>
            </View>
            <Text className=" text-lg mt-2">{productCard.name}</Text>
          </View>
        </View>

        {/* ------- Состав ------- */}
        <View className="mx-3 bg-white rounded-2xl mb-20 pb-6">
          <View className="px-5">
            <Text
              className="text-center font-bold text-3xl mt-4"
              style={{ color: themeColors.bgColor(1) }}
            >
              Описание
            </Text>
            <Text className="mt-2 text-sm">{productCard.description}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
