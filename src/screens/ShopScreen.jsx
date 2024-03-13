import React from 'react';
import { useRoute } from '@react-navigation/native';

import { useDispatch } from 'react-redux';
import { View, Text, ScrollView, Image } from 'react-native';

import ProductsList from '../components/productsList';
import ButtonBack from '../components/buttonBack';
import CartBanner from '../components/cartBanner';
import { setShop } from '../redux/slices/shopSlice';

export default function ShopScreen() {
  const { params } = useRoute();
  let shop = params;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shop && shop.id) {
      dispatch(setShop({ ...shop }));
    }
  });
  return (
    <View>
      <ButtonBack />
      <CartBanner />
      <ScrollView>
        {/* ------- Шапка ------- */}
        <View className="relative">
          <Image className="w-full h-72" source={shop.image} />
        </View>
        {/* ------- Контент ------- */}
        <View className=" rounded-t-3xl bg-white -mt-8 pt-6">
          <View className="px-6">
            <View className="flex-row justify-between  my-1">
              <Text className="text-3xl font-bold">{shop.name}</Text>
              <View className="flex-row mt-2">
                <Image
                  source={require('../../assets/images/star.png')}
                  className="h-3 w-3 mt-1 mr-1"
                />
                <Text>{shop.stars}</Text>
                <Text> ({shop.reviews} отзывов)</Text>
              </View>
            </View>
            <Text className=" text-gray-500">{shop.description}</Text>
            {/* ------- Товары ------- */}
            <View className="pb-32 ">
              <Text className="text-2xl pt-6 font-bold">Товары</Text>
              <View className=" mt-1 flex flex-row flex-wrap justify-between">
                {shop.goods.map((item, index) => (
                  <ProductsList item={{ ...item }} key={index} />
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
