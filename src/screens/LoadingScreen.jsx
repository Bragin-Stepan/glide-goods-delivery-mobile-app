import React from 'react';

import { View, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() {
  const { width, height } = Dimensions.get('window');

  // Псевдо загрузка
  const navigation = useNavigation();
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <View height={height} width={width * 0.6}>
        <LottieView
          className="flex-1"
          source={require('../../assets/animation/loading.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}
