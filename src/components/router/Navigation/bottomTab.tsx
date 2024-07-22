import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RFPercentage} from 'react-native-responsive-fontsize';
const Tab = createBottomTabNavigator();
const StackNavigator = createStackNavigator();
import {createStackNavigator} from '@react-navigation/stack';
import { Provider, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import ProductList from "../../screens/ProductList";
import Cart from "../../screens/Cart";
import ProductDetail from "../../screens/ProductList/ProductDetail";
import { View, Text } from 'react-native';
import Favorites from "../../screens/Favorites";

const CartIconWithBadge = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View>
      <Image
        style={{width: 30, height: 30}}
        source={require('../../images/basket.png')}
      />
      {cartCount > 0 && (
        <View style={{
          position: 'absolute',
          right: -6,
          top: -3,
          backgroundColor: 'red',
          borderRadius: 6,
          width: 12,
          height: 12,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{ color: 'white', fontSize: 10 }}>{cartCount}</Text>
        </View>
      )}
    </View>
  );
};
const HomeStackScreen = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
        swipeEnabled: false,
      }}
      gestureHandlerProps={{
        maxPointers: 1,
        swipeEnabled: false,
      }}
      navigationOptions={{
        cardStack: {
          gesturesEnabled: false,
          swipeEnabled: false,
        },
      }}
      options={{
        gestureEnabled: false,
      }}
      initialRouteName="ProductList">
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="ProductList"
        component={ProductList}
      />
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="ProductDetail"
        component={ProductDetail}
      />
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="Favorites"
        component={Favorites}
      />

    </StackNavigator.Navigator>
  );
};
const FavoriesStackScreen = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
        swipeEnabled: false,
      }}
      gestureHandlerProps={{
        maxPointers: 1,
        swipeEnabled: false,
      }}
      navigationOptions={{
        cardStack: {
          gesturesEnabled: false,
          swipeEnabled: false,
        },
      }}
      options={{
        gestureEnabled: false,
      }}
      initialRouteName="Favorites">
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="Favorites"
        component={Favorites}
      />

    </StackNavigator.Navigator>
  );
};
const CartStackScreen = () => {
  return (
    <StackNavigator.Navigator
      screenOptions={{
        headerShown: false,
        gesturesEnabled: false,
        swipeEnabled: false,
      }}
      gestureHandlerProps={{
        maxPointers: 1,
        swipeEnabled: false,
      }}
      navigationOptions={{
        cardStack: {
          gesturesEnabled: false,
          swipeEnabled: false,
        },
      }}
      options={{
        gestureEnabled: false,
      }}
      initialRouteName="ProductList">
      <StackNavigator.Screen
        navigationOptions={{
          drawerLockMode: 'locked-closed',
          cardStack: {
            gesturesEnabled: false,
            swipeEnabled: false,
            header: null,
          },
        }}
        options={{
          gestureEnabled: false,
          swipeEnabled: false,
        }}
        name="Cart"
        component={Cart}
      />
    </StackNavigator.Navigator>
  );
};

const SearchStackScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="GetStarted"
      screenOptions={({route}) => ({
        safeAreaInset: {bottom: 'never', top: 'never'},
        labelStyle: {
          fontSize: RFPercentage(1.6),
        },
        tabStyle: {
          fontSize: RFPercentage(1.6),
        },
        tabBarActiveTintColor: '#28AF6E',
        tabBarInactiveTintColor: 'gray',
        style: {
          elevation: 0,
          backgroundColor: '#f2f2f2',
          borderBottomColor: '#f2f2f2',
          ...styles.shadow,
        },
        tabBarStyle: {backgroundColor: '#fff', height: 90},
        header: () => null,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case 'Ana Sayfa':
              iconName = focused
                ? require('../../images/home.png')
                : require('../../images/home.png');
              break;
            case 'Favoriler':
              iconName = focused
                ? require('../../images/heart.png')
                : require('../../images/heart.png');
              break;
            default:
              iconName = null;
          }
          return (
            iconName && (
              <Image source={iconName} style={{width: 30, height: 30}} />
            )
          );
        },
      })}>
      <Tab.Screen name={'Ana Sayfa'} component={HomeStackScreen} />
      <Tab.Screen name={'Favoriler'} component={FavoriesStackScreen} />
      <Tab.Screen name="Sepet" component={CartStackScreen} options={{ tabBarIcon: CartIconWithBadge }} />
    </Tab.Navigator>
  );
};
export default SearchStackScreen;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#f55524',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
