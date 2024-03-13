import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//----------- Экраны -----------
import LoadingScreen from './src/screens/LoadingScreen';
import Main from './src/screens/Main';
import ShopScreen from './src/screens/ShopScreen';
import ProductCardScreen from './src/screens/ProductCardScreen';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoadingScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{ title: 'Загрузка' }}
        />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Shop" component={ShopScreen} />
        <Stack.Screen name="ProductCard" component={ProductCardScreen} />

        <Stack.Screen
          name="Cart"
          options={{ presentation: 'modal' }}
          component={CartScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
