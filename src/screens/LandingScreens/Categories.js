/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    StatusBar,
    View,
    Alert,
    Text
} from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import CategoryCell from '../../components/CategoryCell';
import ApiCalls from '../../Services/ApiCalls';
import Constants from '../../utilities/Constants';



class Categories extends Component {

    state = {
        categories: [],
        loading: true
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.loading ? <BallIndicator style={{ alignSelf: 'center' }} color='black' /> : <FlatList
                    data={this.state.categories}
                    renderItem={(item) => this.renderItem(item, this.props.navigation)}
                    keyExtractor={(item,index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                />}
            </View>
        );
    }

    componentDidMount() {

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            console.log("CATEGORY DIDMOUNT")
            // Constants.selectedGender = this.props.route.name
            console.log('CONSTANTS: '+Constants.selectedGender)
        });
        this.getCategories("getCategories")
    }

    renderItem({ item, index }) {
        return (
            <CategoryCell navigation={this.props.navigation} item={item} index={index} />
        );
    }

    getCategories(endPoint) {
        ApiCalls.getApiCall(endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            this.setState({
                loading: false
            })
            if (data) {
                this.setState({
                    categories: data[Constants.selectedGender]
                })
            } else {
                Alert.alert('Error', data.status);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff'
    },

});

export default Categories;
