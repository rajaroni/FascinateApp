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
    Platform,
    StyleSheet,
    StatusBar,
    FlatList,
    View,
    Text,
    Alert,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BallIndicator } from 'react-native-indicators';
import SubHeader from '../../components/SubHeader';
import ListingCell from '../../components/ListingCell';
import FilterHeader from '../../components/FilterHeader';
import ApiCalls from '../../Services/ApiCalls';
import Constants from '../../utilities/Constants';
import { getObjectData, storeObjectData } from '../../utilities/LocalStorage';
import Keys from '../../utilities/Keys';

Tab = createMaterialTopTabNavigator();

class FavoritesScreen extends Component {

    constructor(props) {
        super(props);
        this.selectedItems = []
    }
    state = {
        products: [],
        originalProducts: [],
        filters: [],
        loading: false,
        compare: false,
        selectedItem: '',
        searchEnabled: false
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <SubHeader
                    compare={this.state.compare}
                    navigation={this.props.navigation}
                    title={this.props.route.params.title}
                    searchEnabled={this.state.searchEnabled}
                    onPresscompare={() => this.props.navigation.navigate('CompareScreen', { data: this.selectedItems })}
                    onPressSearch={() => this.setState({ searchEnabled: true })}
                    closeSearch={() => this.setState({ searchEnabled: false, products: this.state.originalProducts })}
                    onSearchChange={(str) => this.onSearch(str)} />

                {this.state.loading ?
                    <BallIndicator
                        style={{ alignSelf: 'center' }}
                        color='black' /> :
                    <FlatList
                        removeClippedSubviews={true}
                        maxToRenderPerBatch={6}
                        initialNumToRender={6}
                        extraData={this.state.selectedItem}
                        data={this.state.products}
                        columnWrapperStyle={{ justifyContent: 'space-around' }}
                        renderItem={(item, index) => this.renderItem(item, index, this.props.navigation)}
                        keyExtractor={(item) => item._id}
                        numColumns={2}
                        // ListHeaderComponent={this.headerView}
                    />}

            </SafeAreaView>
        );
    }

    componentDidMount() {
        // this.getProducts("", 'get_all_products')
        // this.getFilter("", 'searchQueryCategory')
        this.getData()
    }

    async getData() {
        let arr = await getObjectData(Keys.FAV_LIST_KEY) || []
        console.log('FAV_LIST_KEY')
        console.log(arr || [])
        this.setState({ products: arr})
    }

    renderItem({ item, index }) {
        return (
            <ListingCell item={item} navigation={this.props.navigation} onLongPress={(item) => this.onLongpress(item)} />
        );
    }

    onSearch(str) {
        console.log(str)
        let searchlist = [... this.state.originalProducts]
        searchlist = this.state.originalProducts.filter(obj => obj.title.includes(str))
        this.setState( {products: searchlist})
    }

    onLongpress(item) {
        if (this.selectedItems.includes(item))
            this.selectedItems.pop(item)
        else
            this.selectedItems.push(item)

        this.setState({ selectedItem: item._id })
        let temparr = [...this.state.products]
        temparr.filter((parentItem) => parentItem._id !== item._id);
        item.selected = !item.selected;
        this.setState({ products: temparr })

        if (this.selectedItems.length > 0) {
            this.setState({ compare: true })
        }
        else {
            this.setState({ compare: false })
        }
    }

    // headerView = () => {
    //     let filtersparams = {
    //         "main_cate_slug": this.props.route.params.mainCategory[0],
    //         "brand_slug": this.props.route.params.title.toLowerCase()
    //     }

    //     return (
    //         <View style={{ justifyContent: 'center' }}>
    //             {this.state.filter && <FilterHeader filterquery={filtersparams} onPressSort={(type) => this.getSort(type)} nPressViewItem={(filterObj) => this.filterProducts(filterObj)} filter={this.state.filter} />}
    //             <View style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
    //                 <Text style={{ color: 'gray', fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold', fontSize: 15, letterSpacing: 1 }}>{this.state.products.length + " items found"}</Text>
    //             </View>
    //         </View>
    //     );
    // }

    filterProducts(filterObj) {
        this.getProducts(filterObj, 'get_all_products')
    }

    getSort(type) {
        let list = []
        switch (type) {
            case 'recommended':
                list = [... this.state.originalProducts]
                break
            case 'lh':
                list = this.state.products.sort((a, b) => a.price > b.price ? 1 : -1);
                break
            case 'hl':
                list = this.state.products.sort((a, b) => a.price < b.price ? 1 : -1);
                break
        }

        this.setState({
            products: list
        })
    }

    getProducts(params1, endPoint) { // get_all_products
        let params = {
            "sort": {
                "_id": -1
            },
            "query": {
                "main_cate_slug": this.props.route.params.mainCategory[0],
                "gender": Constants.selectedGender
            },
            "skip": 0,
            "limit": 50
        }
        if (typeof this.props.route.params.title.toLowerCase() !== 'undefined') {
            params.query.pri_cate_slug = this.props.route.params.title.toLowerCase();
        }
        if (typeof params1.brand_slug !== 'undefined') {
            params.query.brand_slug = params1.brand_slug;
        }
        if (typeof params1.size !== 'undefined' && params1.size.length > 0) {
            params.query.size = {
                "$in": params1.size
            }
        }
        if (typeof params1.color !== 'undefined' && params1.color.length > 0) {
            params.query.color = {
                "$in": params1.color
            }
        }
        if (typeof params1.age !== 'undefined' && params1.age.length > 0) {
            params.query.age = {
                "$in": params1.age
            }
        }
        if (typeof params1.material !== 'undefined' && params1.material.length > 0) {
            params.query.material = {
                "$in": params1.material
            }
        }

        ApiCalls.postApiCall(params, endPoint).then(data => {
            // console.log("DATA");
            // console.log(data)
            this.setState({
                loading: false
            })
            if (data) {
                this.setState({
                    products: data,
                    originalProducts: data
                })
                this.state.products.map((item) => {
                    item.selected = false;
                    return item;
                });

            } else {
                Alert.alert('Error', data.status);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    getFilter(params1, endPoint) {
        let params = {
            "sort": {
                "_id": -1
            },
            "query": {
                "main_cate_slug": this.props.route.params.mainCategory[0],
                "gender": Constants.selectedGender,
                // "$or": [
                //     {
                //         "brand_slug": this.props.route.params.title.toLowerCase() // "beachwear"
                //     }, {
                //         "pri_cate_slug": this.props.route.params.title.toLowerCase() // "beachwear"
                //     }
                // ]
            },
            "skip": 0,
            "limit": 50
        }

        ApiCalls.postApiCall(params, endPoint).then(data => {
            // console.log("DATA");
            // console.log(data)
            this.setState({
                loading: false
            })
            if (data) {

                this.setState({
                    filter: this.carveFilter(data.pri_cate)
                })
            } else {
                Alert.alert('Error', data.status);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    carveFilter(array) {
        let tmp = []
        for (let i = 0; i < array.length; i++) {
            let obj = {}
            obj.name = array[i]._id
            obj.filter = array[i]._id
            obj.isSelected = false
            obj.pri_cate_slug = array[i].data.pri_cate_slug
            tmp.push(obj)
        }
        return tmp
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default FavoritesScreen;
