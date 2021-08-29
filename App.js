/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './src/screens/LandingScreens/MainScreen';
import ListingScreen from './src/screens/LandingScreens/ListingScreen';
import CompareScreen from './src/screens/LandingScreens/CompareScreen';
import ListingDetailScreen from './src/screens/LandingScreens/ListingDetailScreen';
import SubCategoryScreen from './src/screens/LandingScreens/SubCategoryScreen';
import AboutScreen from './src/screens/About'; 
import ContactUs from './src/screens/ContactUs';
import Categories from './src/screens/LandingScreens/Categories'
import Home from './src/screens/LandingScreens/Home';
import FavoritesScreen from './src/screens/LandingScreens/FavoritesScreen';
import RecyclerList from './src/screens/LandingScreens/RecyclerList'
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContent } from './src/components/Drawer/DrawerContent';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>} initialRouteName="Home">
          <Drawer.Screen name="ProductStack" component={this.productStack} options={{ headerShown: false }} />
          {<Drawer.Screen name="MainScreen" component={ListingScreen} options={{ headerShown: false }} />
          /*<Drawer.Screen name="ListingScreen" component={ListingScreen} />
          <Drawer.Screen name="ListingDetailScreen" component={ListingDetailScreen} />
          <Drawer.Screen name="SubCategoryScreen" component={SubCategoryScreen} /> */}
        </Drawer.Navigator>
      </NavigationContainer>

    );
  }
  SideNavigation(type) {
    switch (type) {
      case 'Home':
        console.log({ type })
        break
    }
  }
  onHomePress(action) {
    console.log(action)
  }

  productStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="ListingScreen" component={ListingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CompareScreen" component={CompareScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ListingDetailScreen" component={ListingDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{ headerShown: false }} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecyclerList" component={RecyclerList} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
  

  customDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Help"
          icon={({ focused, color, size }) => <Image style={{ width: 30, height: 30 }} source={require('./assets/heart.png')} />}
          onPress={() => props.navigation.navigate('ProductStack')}
        />
        <DrawerItem
          label="Help"
          icon={({ focused, color, size }) => <Image style={{ width: 30, height: 30 }} source={require('./assets/heart.png')} />}
          onPress={() => props.navigation.navigate('ProductStack')}
        />
        <DrawerItem
          label="Help"
          icon={({ focused, color, size }) => <Image style={{ width: 30, height: 30 }} source={require('./assets/heart.png')} />}
          onPress={() => props.navigation.navigate('ProductStack')}
        />
      </DrawerContentScrollView>
    );
  }
};

const styles = StyleSheet.create({

});

export default App;
