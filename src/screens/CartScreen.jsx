import React, { useEffect } from 'react';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { formatPriceWithSpaces } from '../utils/formatPriceWitchSpaces';
import {
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../redux/slices/cartSlice';

import { themeColors } from '../theme';

export default function CartScreen() {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const deliveryCost = 5 * cartItems.length;
  const [groupedItems, setGroupedItems] = React.useState({});

  React.useEffect(() => {
    const items = cartItems.reduce((group, item) => {
      group[item.id] ? group[item.id].push(item) : (group[item.id] = [item]);
      return group;
    }, {});
    setGroupedItems(items);
  }, [cartItems]);

  return (
    <View className="pb-32">
      {/* ------- Шапка ------- */}
      <View className="pb-6 bg-white">
        <TouchableOpacity
          className="absolute left-4 top-10 bg-white rounded-full p-2 z-10"
          onPress={() => navigation.navigate('Main')}
          style={{ backgroundColor: themeColors.bgColor(1) }}
        >
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <View className="pt-11">
          <Text className="mx-auto pl-2 font-bold text-xl">Ваша корзина</Text>
        </View>
      </View>
      {/* ------- Пустая корзина ------- */}
      {!cartTotal ? (
        <View className=" bg-white" height={height} width={width}>
          <View className="items-center my-auto">
            <Image
              source={require('../../assets/images/cart.png')}
              style={{ width: 300, height: 300 }}
            />
            <Text className="font-semibold text-2xl uppercase mt-2">Пусто</Text>
            <View className="mx-12 my-4">
              <Text className=" text-gray-400 text-center">
                Воспользуйтесь каталогом, чтобы добавить товар
              </Text>
            </View>

            <View className="w-full mb-28">
              <TouchableOpacity
                onPress={() => navigation.navigate('Main')}
                className="mx-7 rounded-full p-3 py-3"
                style={{ backgroundColor: themeColors.bgColor(1) }}
              >
                <Text className="font-extrabold text-center uppercase text-lg text-white">
                  Вернуться
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View>
          {/* ------- Время ожидания ------- */}
          <View
            className="flex-row py-3 justify-between mt-8 px-6"
            style={{ backgroundColor: themeColors.bgColor(0.3) }}
          >
            <Text className="">Время ожидания ~ 15 минут</Text>
            <TouchableOpacity>
              <Text
                className="font-bold"
                style={{ color: themeColors.bgColor(1) }}
              >
                Изм
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 240,
            }}
            className="bg-gray-100 pt-8"
          >
            {/* ------- Товары ------- */}
            {Object.entries(groupedItems).map(([key, items]) => {
              let product = items[0];
              return (
                <View
                  key={key}
                  className="flex-row items-center justify-between mx-2 mb-4 px-4 py-3 bg-white rounded-2xl "
                >
                  <Text
                    className="font-black"
                    style={{ color: themeColors.bgColor(1) }}
                  >
                    {items.length} шт.
                  </Text>
                  <Image
                    className="h-14 w-14 rounded-2xl"
                    source={product.image}
                  />
                  <View className="w-28 h-9">
                    <Text className="overflow-hidden">{product.name}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="pr-2">
                      {formatPriceWithSpaces(product.price)} ₽
                    </Text>
                    <TouchableOpacity
                      className="rounded-full p-1"
                      onPress={() =>
                        dispatch(removeFromCart({ id: product.id }))
                      }
                      style={{ backgroundColor: themeColors.bgColor(1) }}
                    >
                      <Icon.Minus width={24} height={24} stroke={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
            {/* ------- Кнопка заказа ------- */}
            <View
              className="p-6 px-5 mt-4"
              style={{ backgroundColor: themeColors.bgColor(0.3) }}
            >
              <View className="mb-4 space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-700">Промежуточный итог</Text>
                  <Text className="text-gray-700">
                    {formatPriceWithSpaces(cartTotal)} ₽
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-700">Доставка</Text>
                  <Text className="text-gray-700">
                    {formatPriceWithSpaces(deliveryCost)} ₽
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="font-extrabold text-xl">
                    Итоговая стоимость
                  </Text>
                  <Text className="font-extrabold text-xl">
                    {formatPriceWithSpaces(cartTotal + deliveryCost)} ₽
                  </Text>
                </View>
              </View>

              <TouchableOpacity>
                <Text
                  className="uppercase text-center text-lg font-bold py-2 rounded-3xl text-white"
                  style={{ backgroundColor: themeColors.bgColor(1) }}
                >
                  Заказать
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}
