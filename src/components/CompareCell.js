
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    View,
    Platform,
    Linking
} from 'react-native';

import Color from '../utilities/Color';
const width = Dimensions.get('window').width;

class CompareCell extends PureComponent {
    render() {
        // console.log('ITEM')
        // console.log(this.props.item)
        const index = this.props.index;
        const item = this.props.item;
        return (
            <View style={styles.cell}>
                <View style={{ height: 200, borderWidth: 0.5, borderColor: Color.separator, justifyContent: 'center', alignItems: 'center', width: '100%', padding: 20 }}>
                    <TouchableOpacity style={{ zIndex: 1, position: 'absolute', top: 4, right: 1 }} onPress={() => this.props.onDelete(item)}>
                        <Image style={{ width: 16, height: 16, opacity: index == 0 ? 0 : 1 }} source={require('../../assets/delete.png')}></Image>
                    </TouchableOpacity>
                    <Image style={{ width: 100, height: 150, opacity: index == 0 ? 0 : 1 }} source={{ uri: item.image }}></Image>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={styles.title}>{item.title}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Shop As' : this.shopAsButton(item.link)}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Price' : '$' + item.price}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Brand' : item.brand}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Color' : item.color}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Category' : item.main_cate}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Material' : item.material}</Text>
                </View>
                <View style={styles.td}>
                    <Text style={index == 0 ? styles.heading : styles.normal}>{index == 0 ? 'Size' : item.size}</Text>
                </View>
            </View>
        );
    }

    shopAsButton = (url) => {
        return (
            <TouchableOpacity style={styles.cartBtn} onPress={() => this.openWeb(url)}>
                <Text style={styles.cartBtnTxt}>{"SHOP AS"}</Text>
            </TouchableOpacity>
        )
    }

    openWeb = (url) => {
        Linking.openURL(url);
    };
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        width: (width / 3),
        alignItems: 'center',
        borderColor: Color.separator,
        borderWidth: 0.5
    },
    td: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: Color.separator,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    heading: {
        marginTop: 15,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        fontSize: 16,
        letterSpacing: 0.5
    },
    normal: {
        marginTop: 15,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Book' : 'FuturaPTBook',
        fontSize: 16,
        letterSpacing: 0.5
    },
    title: {
        marginTop: 5,

        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Book' : 'FuturaPTBook',
        fontSize: 16,
        letterSpacing: 0.5
    },
    cartBtn: {
        backgroundColor: Color.green,
        height: 30,
        width: 90,
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartBtnTxt: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '800',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    }
});

export default CompareCell;
