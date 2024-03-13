import React from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Swiper from 'react-native-swiper';

import { themeColors } from '../theme';
import { carousel } from '../db';

export default function Carousel() {
  const { width, height } = Dimensions.get('window');

  return (
    <View
      className="mx-4 mt-5 rounded-xl"
      style={{ height: 95, overflow: 'hidden' }}
    >
      <Swiper
        style={{ color: themeColors.bgColor(1) }}
        autoplayTimeout={8}
        showsPagination={false}
        autoplay={true}
        loop={true}
        bounces={true}
      >
        {carousel.map(item => (
          <View key={item.id} className="items-center ">
            <TouchableWithoutFeedback>
              <Image
                source={item.image}
                style={{
                  resizeMode: 'cover',
                  width: width,
                  height: 95,
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        ))}
      </Swiper>
    </View>
  );
}
