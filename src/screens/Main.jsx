import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Icon from 'react-native-feather';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../redux/slices/cartSlice';
import { themeColors } from '../theme';
import { featured } from '../db';

import Categories from '../components/categories';
import FeaturedRow from '../components/featuredRow';
import PromotionsCarousel from '../components/promotionsCarousel';
import ProductCardForSearch from '../components/productCardForSearch';

export default function Main() {
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);

  //------- Поиск товаров
  const [searchText, setSearchText] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    } else {
      const filteredGoods = featured
        .flatMap(item => item.shops.flatMap(shop => shop.goods))
        .filter(good =>
          good.name.toLowerCase().includes(searchText.toLowerCase())
        );
      setSearchResults(filteredGoods);
    }
  };

  //------- Показывает результат динамически
  const onChangeText = query => {
    setSearchText(query);
  };

  React.useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  return (
    <SafeAreaView className="bg-gray-100">
      <StatusBar barStyle="dark-content" />

      {/* ------- Поиск ------- */}
      <View className="flex-row items-center space-x-3 mt-4 px-4 mb-5 rounded-b-2xl">
        <View className="flex-row flex-1 items-center p-3 rounded-xl bg-white ">
          <Icon.Search height={20} width={20} stroke="gray" />
          <TextInput
            className="flex-1 ml-3"
            placeholder="Найти"
            value={searchText}
            onChangeText={onChangeText}
            onSubmitEditing={handleSearch}
          ></TextInput>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          {cartItems && cartItems.length ? (
            <View className="relative z-10">
              <LottieView
                className="absolute w-12 h-12 -top-5 -right-5 justify-center items-center "
                source={require('../../assets/animation/dotAnimation.json')}
                autoPlay
                loop
              />
            </View>
          ) : null}

          <View
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-xl"
          >
            <Icon.ShoppingCart
              className="mr-1"
              height={28}
              width={28}
              strokeWidth={2.0}
              stroke="white"
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* ------- Результат поиска ------- */}
      {searchText ? (
        <View className="flex-row flex-wrap">
          <ProductCardForSearch
            searchResults={searchResults}
            setSearchText={setSearchText}
          />
        </View>
      ) : (
        <ScrollView
          showVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 4 }}
        >
          {/* ------- Категории и акции ------- */}
          <Categories />
          <PromotionsCarousel />
          {/* ------- Избранные ------- */}
          <View className="mb-32">
            {featured.map((item, index) => {
              return (
                <FeaturedRow
                  key={index}
                  index={index}
                  id={item.id}
                  shops={item.shops}
                  title={item.title}
                  description={item.description}
                />
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
