
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    View,
    Platform,
    Alert
} from 'react-native';

import Color from '../utilities/Color';
const width = Dimensions.get('window').width;
import Keys from '../utilities/Keys';
import { getObjectData, storeObjectData } from '../utilities/LocalStorage';

class ListingCell extends PureComponent {
    state = {
        isFavorite: false
    }
    render() {
        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.props.navigation.navigate('ListingDetailScreen', { detail: this.props.item })} onLongPress={() => this.props.onLongPress(this.props.item)}>
                <Image resizeMode='contain' style={styles.banner} source={{ uri: this.props.item.image }}></Image>
                {(this.props.item.selected) && <Image resizeMode='contain' style={styles.overlay} source={require('../../assets/checked.png')}></Image>}
                <View style={styles.priceView}>
                    <View style={styles.priceCol}>
                        <Text numberOfLines={1} style={this.props.item.discount_perc == 0 ? styles.priceTxt : styles.oldPriceTxt}>{'$' + this.props.item.price}</Text>
                        {this.props.item.discount_perc > 0 && <Text numberOfLines={1} style={styles.discountPriceTxt}>{'$' + this.getDiscountedPrice(this.props.item.price, this.props.item.discount_perc)}</Text>}
                    </View>
                    <TouchableOpacity onPress={() => this.addFavourite(this.props.item)}>
                        <Image style={styles.heartIcon} source={this.props.item.isFavorite || this.state.isFavorite ? require('../../assets/heart.png') : require('../../assets/heart-list.png')}></Image>
                    </TouchableOpacity>
                </View>
                <Text numberOfLines={2} style={styles.nameTxt}>{this.props.item.title}</Text>
            </TouchableOpacity>
        );
    }

    async addFavourite(item) {
        let arr = await getObjectData(Keys.FAV_LIST_KEY) || []
        let index = arr.findIndex(x => x._id === item._id);
        if (index === (-1)) {
            arr.push(item)
            storeObjectData(Keys.FAV_LIST_KEY, arr)
            this.setState({ isFavorite: true })
        } else {
            Alert.alert('Alert', 'Item already in favorites')
        }
    }

    getDiscountedPrice(actualPrice, discountPercentage) {
        let discountedPrice = actualPrice * (discountPercentage / 100)
        let sellingPrice = actualPrice - discountedPrice
        return parseFloat(sellingPrice).toFixed(2) // sellingPrice
    }
};

const styles = StyleSheet.create({
    cell: {
        flex: 1,
        width: (width / 2),
        marginVertical: 20,
        marginHorizontal: 15,
        alignItems: 'center',
    },
    selectedcell: {
        flex: 1,
        width: (width / 2),
        marginVertical: 20,
        marginHorizontal: 15,
        borderColor: 'green',
        borderWidth: 2,
        alignItems: 'center',
    },
    banner: {
        width: (width / 2),
        height: 200,
        // backgroundColor: 'yellow'
    },
    priceView: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    priceCol: {
        marginRight: 'auto',
    },
    priceTxt: {
        // marginRight: 'auto',
        fontSize: 20,
        // textDecorationLine: 'line-through',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
        letterSpacing: 2
    },
    oldPriceTxt: {
        // marginRight: 'auto',
        fontSize: 20,
        textDecorationLine: 'line-through',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
        letterSpacing: 2
    },
    discountPriceTxt: {
       fontSize: 20,
       color: Color.maroon,
       fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
       letterSpacing: 2 
    },
    nameTxt: {
        marginTop: 10,
        marginRight: 'auto',
        fontSize: 13,
        color: '#242526',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        lineHeight: 25,
        letterSpacing: 1
    },
    heartIcon: {
        marginRight: 20,
        width: 20,
        height: 20
    },
    tagTxt: {
        marginTop: 10,
        marginRight: 'auto',
        fontSize: 16,
        color: 'gray',
        fontFamily: 'FuturaPT-Book'
    },
    overlay: {
        height: 20,
        width: 20,
        position: 'absolute',
        right: 5

    }
});

export default ListingCell;
