
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import OptionsMenu from "react-native-options-menu";

import Color from '../utilities/Color';

class MainHeader extends PureComponent {
    render() {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                    <Image style={styles.menuBtn} source={require('../../assets/menu.png')}></Image>
                </TouchableOpacity>
                {/* <OptionsMenu
                    customButton={<View style={styles.dropDownView}><Text style={styles.dropDownTxt}>WOMEN</Text>
                        <Image style={styles.vBtn} source={require('../../assets/v.png')}></Image></View>}
                    buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain"}}
                    // destructiveIndex={1}
                    options={["WOMEN", "MEN", "Cancel"]}
                
                    actions={[() => this.setGender('women'), () => this.setGender('men'), () => this.setGender('women')]} /> */}
                <View style={styles.rightView}>
                    <TouchableOpacity>
                      <Image style={styles.heartBtn} source={require('../../assets/heart.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        {this.props.istoshow==true && <Image style={styles.searchBtn} source={require('../../assets/search.png')}></Image>}
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    setGender(gender) {
        console.log(gender)
    }
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomColor: Color.separator,
        borderBottomWidth: 1
    },
    menuBtn: {
        width: 30,
        height: 30,
        tintColor: '#000'
    },
    dropDownView: {
        alignItems: 'center',
        flexDirection: 'row',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        backgroundColor: 'white',
        marginLeft: 40
    },
    dropDownTxt: {
        fontSize: 13,
        // fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
        letterSpacing: 1
    },
    vBtn: {
        marginLeft: 10
    },
    rightView: {
        flexDirection: 'row',
        marginLeft: 'auto'
    },
    searchBtn: {
        width: 20,
        height: 20,
        tintColor: '#000',
        marginLeft: 'auto'
    },
    heartBtn: {
        width: 20,
        height: 20,
        marginRight: 15
    }
});

export default MainHeader;
