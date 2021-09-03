/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useCallback } from 'react';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    StatusBar,
    View,
    Platform,
    Text,
    ScrollView,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import RBSheet from "react-native-raw-bottom-sheet";
import Color from '../../utilities/Color';
import { getObjectData, storeObjectData } from '../../utilities/LocalStorage';
import Keys from '../../utilities/Keys';
class ListingDetailScreen extends Component {
    constructor(props) {
        super(props)
        this.images = this.props.route.params.detail.images
    }
    state={
        isFavorite:false
    }

    async componentDidMount(){
        this.isFavorite(this.props.route.params.detail)
    }
    render() {
        console.log(this.props.route.params.detail)

        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <ScrollView>
                    <TouchableOpacity style={styles.backBtnView} onPress={() => this.props.navigation.goBack()}>
                        <Image style={styles.backBtn} source={require('../../../assets/header-back.png')}></Image>
                    </TouchableOpacity>
                    <SliderBox
                        images={this.images}
                        sliderBoxHeight={500}
                    // onCurrentImagePressed={index =>
                    //     console.warn(`image ${index} pressed`)
                    // }
                    />
                    <View style={styles.subContainer}>
                        <Text style={styles.nameTxt}>{this.props.route.params.detail.title}</Text>
                        <Text style={styles.priceTxt}>{'£' + this.props.route.params.detail.price}</Text>
                        <View style={styles.colorView}>
                            <View style={styles.colorLeftContainer}>
                                <View style={styles.colorBorderView}>
                                    <Text style={styles.colorTxt}>{this.props.route.params.detail.color.toUpperCase()}</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.colorRightContainer} onPress={() => this.RBSheet.open()} >
                                <Text style={styles.sizeTxt}>{"SIZE"}</Text>
                                <Image style={styles.vBtn} source={require('../../../assets/v.png')}></Image>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.cartBtn} onPress={() => this.OpenWEB(this.props.route.params.detail.link)}>
                                <Text style={styles.cartBtnTxt}>{"SHOP AS"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity  onPress={()=>this.addFavourite(this.props.route.params.detail)} style={styles.heartView}>
                                <Image style={styles.heartIcon} source={this.state.isFavorite ? require('../../../assets/heart.png') : require('../../../assets/heart-list.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.itemView}>
                            <Text style={styles.deliveryTxt}>{"DELIVERY & RETURN INFO"}</Text>
                        </View>
                        <View style={styles.itemView}>
                            <Text style={styles.deliveryTxt}>{"PRODUCT DETAILS"}</Text>
                        </View>
                        <View style={styles.detailView}>
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Availablity</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.availability ? this.props.route.params.detail.availability.toUpperCase() : "N/A"} </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Gender</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.gender ? this.props.route.params.detail.gender.toUpperCase() : "N/A"} </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Age</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.age ? this.props.route.params.detail.age.toUpperCase() : "N/A"} </Text>
                            </View>
                            {/* <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Brand</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.brand.toUpperCase() == undefined ? "" : this.props.route.params.detail.brand.toUpperCase()} </Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Category</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.sec_cate.toUpperCase()}</Text>
                            </View> */}
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Material</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.material ? this.props.route.params.detail.material.toUpperCase() : "N/A"}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.tdLeft}>Shop name</Text>
                                <Text style={styles.tdRight}>{this.props.route.params.detail.shop_name ? this.props.route.params.detail.shop_name.toUpperCase() : "N/A"}</Text>
                            </View>
                        </View>
                    </View>
                    <RBSheet
                        ref={ref => {
                            this.RBSheet = ref;
                        }}
                        height={300}
                        openDuration={250}
                        customStyles={{
                            container: {
                                justifyContent: "center",
                                alignItems: "center"
                            }
                        }}
                    >
                        <View style={styles.sheetListContainer}>
                            <TouchableOpacity style={styles.sheetItemView}>
                                <Text style={styles.sheetItemTxt}>{"S"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sheetItemView}>
                                <Text style={styles.sheetItemTxt}>{"M"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sheetItemView}>
                                <Text style={styles.sheetItemTxt}>{"L"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sheetItemView}>
                                <Text style={styles.sheetItemTxt}>{"XL"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sheetItemView}>
                                <Text style={styles.sheetItemTxt}>{"XXL"}</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                </ScrollView>
            </SafeAreaView>
        );
    }
    OpenWEB = (url) => {
        Linking.openURL(url);
    };

    async isFavorite(item) {
        console.log("I am in FUnctoin")
        let arr = await getObjectData(Keys.FAV_LIST_KEY) || []
        console.log(item)
       
        let index = arr.findIndex(x => x._id === item._id);
            if (index != (-1)) {
            console.log('Found')
            this.setState({ isFavorite: true })
        }
        else {
            console.log('not found')
            this.setState({ isFavorite: false })
        }
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


};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
    },
    backBtnView: {
        position: 'absolute',
        zIndex: 100
    },
    backBtn: {
        width: 30,
        height: 30,
        top: 20,
        left: 20
    },
    subContainer: {
        padding: 20,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },
    nameTxt: {
        marginTop: 10,
        marginRight: 'auto',
        fontSize: 13,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
        letterSpacing: 1.5
    },
    priceTxt: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '800',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',
        letterSpacing: 1.5
    },
    colorView: {
        flexDirection: 'row',
        marginTop: 25,
        width: '100%',
        height: 60,
        borderTopWidth: 0.5,
        borderTopColor: Color.separator,
        borderBottomWidth: 0.5,
        borderBottomColor: Color.separator,
        // alignItems: 'center'
    },
    colorLeftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorRightContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        alignItems: 'center'
    },
    colorBorderView: {
        width: '100%',
        alignItems: 'center',
        borderRightColor: Color.separator,
        borderRightWidth: 0.5,
        paddingVertical: 2
    },
    colorTxt: {
        // flex: 1,
        fontSize: 13,
        fontWeight: '800',
        color: Color.separator,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    },
    sizeTxt: {
        // flex: 1,
        fontSize: 13,
        fontWeight: '800',
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    },
    vBtn: {
        marginLeft: 'auto'
    },
    btnView: {
        flexDirection: 'row',
        paddingTop: 20
    },
    cartBtn: {
        backgroundColor: Color.green,
        height: 50,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartBtnTxt: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '800',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    },
    heartView: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.heartBg
    },
    heartIcon: {
        width: 35,
        height: 35,
        tintColor: Color.heartIcon
    },
    bottomContainer: {
        marginTop: 5,
        width: '100%',
        // backgroundColor: '#fff'
    },
    itemView: {
        paddingVertical: 25,
        borderBottomColor: Color.separator,
        borderBottomWidth: 1,
        backgroundColor: '#fff'
    },
    deliveryTxt: {
        marginLeft: 20,
        fontSize: 18,
        fontWeight: '800',
        color: '#999999',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    },
    sheetListContainer: {
        width: '100%'
    },
    sheetItemView: {
        height: 50
    },
    sheetItemTxt: {
        marginLeft: 20
    },
    detailView: {
        paddingTop: 10,
        paddingLeft: 20
    },
    detailRow: {
        flexDirection: 'row',
        height: 30
    },
    tdLeft: {
        flex: 1,
        fontSize: 15,
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5
    },
    tdRight: {
        flex: 1,
        fontSize: 13,
        color: '#000',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Book' : 'FuturaPTMedium',
        letterSpacing: 1.5
    }
});

export default ListingDetailScreen;
