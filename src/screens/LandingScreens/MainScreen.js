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
    StyleSheet,
    StatusBar,
    Dimensions,
    Platform
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainHeader from '../../components/MainHeader';
import Categories from './Categories'
import Constants from '../../utilities/Constants';
import Recyclerlist from './RecyclerList';

Tab = createMaterialTopTabNavigator();

const tabsConfig = () => {
    const width = Dimensions.get('window').width;

    return {
        lazy: true,
        tabBarOptions: {
            showLabel: true,
            style: {
            },
            labelStyle: {
                fontSize: 11,
                margin: 0,
                padding: 0,
                fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
                letterSpacing: 1
            },
            tabStyle: {
                // here you can set the tab width , in this case , 3 tabs , width / 3
                // width: width / 4,
                // justifyContent: 'center',
                // alignItems: 'center',
                // alignSelf: 'center',

            },
            indicatorStyle: {
                borderWidth: 1,
                borderColor: 'blue',
            }
        },
    }
}

const Stack = createStackNavigator();
class MainScreen extends Component {

    Tabs(navigation) {
        return (
            <Tab.Navigator {...tabsConfig()}>

                <Tab.Screen listeners={{
                    tabPress: e => {
                        Constants.selectedGender = 'women'
                    },
                }} name="women" component={this.CategoiresStack} options={{ tabBarLabel: "Women" }} navigation={navigation} />


                <Tab.Screen listeners={{
                    tabPress: e => {
                        Constants.selectedGender = 'men'
                    },
                }} name="men" component={this.CategoiresStack} options={{ tabBarLabel: "Men" }} navigation={navigation} />
                
            </Tab.Navigator>
        );
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <MainHeader navigation={this.props.navigation} />
                {this.Tabs(this.props.navigation)}
            </SafeAreaView>
        );
    }

    CategoiresStack() {
        //  console.log(this.props)
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Recyclerlist} options={{ headerShown: false }}>
                </Stack.Screen>
                <Stack.Screen name="Categories" component={Categories} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
});

export default MainScreen;
