import { TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

import * as Icon from 'react-native-feather';
import { themeColors } from '../theme';

export default function ButtonBack() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="absolute left-4 top-10 bg-white rounded-full p-2 z-10"
      onPress={() => navigation.goBack()}
    >
      <Icon.ArrowLeft strokeWidth={3} stroke={themeColors.bgColor(1)} />
    </TouchableOpacity>
  );
}
