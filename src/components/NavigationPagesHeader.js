import React, {PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    ColorPropType
} from 'react-native';

import Color from '../utilities/Color';

class NavigationPagesHeader extends PureComponent {
    render() {
     console.log(this.props)
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.menuBtn} source={require('../../assets/header-back.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.titleview}>
                    <Text numberOfLines={1} style={styles.titletxt}>{this.props.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        backgroundColor: Color.black,
        borderBottomColor: Color.separator,
        borderBottomWidth: 1
    },
    menuBtn: {
        width: 25,
        height: 25,
        marginLeft:10,
        tintColor: '#fff'
    },
    titleview: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'center',
        marginRight:50
       
        
    },
    titletxt: {
    color:'white',
    fontSize:20,
  alignSelf:'center',
    textAlign:'center',
    fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium',
    },

});

export default NavigationPagesHeader;
