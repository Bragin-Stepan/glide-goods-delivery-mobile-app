import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  BackHandler,
} from 'react-native';

import { formatPriceWithSpaces } from '../utils/formatPriceWitchSpaces';
import { themeColors } from '../theme';

import { useNavigation } from '@react-navigation/native';

export default function ProductCardForSearch({ searchResults, setSearchText }) {
  const navigation = useNavigation();

  // Очищает Input при кнопки назад
  React.useEffect(() => {
    const backAction = () => {
      setSearchText('');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);
  return (
    <View className="mx-auto">
      {searchResults === 0 ? (
        <Text className="text-center text-gray-400 ">Нет такого товара</Text>
      ) : (
        <View className="items-center">
          <FlatList
            data={searchResults}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 290,
            }}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => navigation.navigate('ProductCard', { ...item })}
              >
                <View
                  className=" bg-white rounded-2xl px-3 pt-3 mx-20 my-2"
                  key={item.id}
                >
                  <Image
                    className="w-full h-52 rounded-2xl"
                    source={item.image}
                  ></Image>
                  <View className="mb-5 mx-4 mt-2 items-center">
                    <Text
                      className="font-bold text-2xl mb-2"
                      style={{ color: themeColors.bgColor(1) }}
                    >
                      {formatPriceWithSpaces(item.price)} ₽
                    </Text>
                    <Text className="">{item.name}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
}
