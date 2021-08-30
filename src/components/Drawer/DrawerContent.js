import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Color from '../../../src/utilities/Color';


export function DrawerContent(props) {
    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                {/* <Text style={styles.heading}>ASOS</Text> */}
                <Image resizeMode='contain' style={styles.icon} source={require('../../../assets/icon.png')} />
                <Text style={styles.tag}>Save, shop, and view orders</Text>
            </View>
            <DrawerContentScrollView {...props}>
                {/* <Drawer.Section></Drawer.Section> */}
                <DrawerItem
                    style={styles.drawerItem}

                    icon={({ color, size }) => (
                        <Image
                            style={styles.drawerItemImg}
                            source={require('../../../assets/home.png')}
                        />
                    )}
                    label={'HOME'}
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {props.navigation.closeDrawer()}}
                   
                />
                <DrawerItem
                    style={styles.drawerItem}
                    icon={({ color, size }) => (
                        <Image
                            style={styles.drawerItemImg}
                            source={require('../../../assets/about.png')}
                        />
                    )}
                    label={'ABOUT'}
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {props.navigation.navigate('AboutScreen')}}
                />
                <DrawerItem
                    style={styles.drawerItem}
                    icon={({ color, size }) => (
                        <Image
                            style={styles.drawerItemImg}
                            source={require('../../../assets/contact.png')}
                        />
                    )}
                    label={'CONTACT'}
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {props.navigation.navigate('ContactUs')}}
                />
                <DrawerItem
                    style={styles.drawerItem}
                    icon={({ color, size }) => (
                        <Image
                            style={styles.drawerItemImg}
                            source={require('../../../assets/faq.png')}
                        />
                    )}
                    label={'HELP & FAQS'}
                    labelStyle={styles.drawerItemLabel}
                    onPress={() => {props.navigation.navigate('Aboutus')}}
                />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    icon: {
        width: '100%',
        height: 80
    },
    headerView: {
        width: '100%',
        height: 200,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: Color.black
    },
    heading: {
        color: Color.white,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        fontSize: 30,
        letterSpacing: 3
    },
    tag: {
        marginTop: 15,
        color: Color.white,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Book' :'FuturaPTBook',
        fontSize: 16,
        letterSpacing: 0.5
    },
    drawerItem:{
        borderBottomColor: Color.separator,
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },
    drawerItemImg: {
        width: 25,
        height: 25,
        tintColor: Color.black
    },
    drawerItemLabel: {
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium',
        color: Color.black,
        marginLeft: -10, 
        fontSize: 13,
        letterSpacing: 2,
        paddingVertical: 8
    }
})