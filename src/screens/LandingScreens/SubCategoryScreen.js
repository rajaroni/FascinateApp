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
    SafeAreaView,
    View,
    Alert,
    Text
} from 'react-native';
import Colors from '../../utilities/Color';
import SubCategoryCell from '../../components/SubCategoryCell';
import SubHeader from '../../components/SubHeader';
import ApiCalls from '../../Services/ApiCalls';

const list = [
    {
        id: 1,
        name: 'ALL SALE TOPS'
    },
    {
        id: 2,
        name: 'SALE'
    },
    {
        id: 3,
        name: 'NEW IN'
    },
    {
        id: 4,
        name: 'TOPSHOP'
    },
    {
        id: 5,
        name: 'CLOTING'
    },
    {
        id: 6,
        name: 'SHOES'
    },
    {
        id: 7,
        name: 'ACCESSORIES'
    },
    {
        id: 8,
        name: 'TRENDING NOW'
    },
    {
        id: 9,
        name: 'FACE + BODY'
    },
]

class SubCategoryScreen extends Component {

    state = {
        categories: []
    }

    render() {
        console.log(this.props.route.params.subCategories[Object.keys(this.props.route.params.subCategories)])
        let subCategories = this.props.route.params.subCategories[Object.keys(this.props.route.params.subCategories)]
        return (
            <SafeAreaView style={styles.container}>
                <SubHeader navigation={this.props.navigation} title={Object.keys(this.props.route.params.subCategories)} />
                <FlatList
                    data={subCategories}
                    renderItem={(item) => this.renderItem(item, this.props.navigation)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        );
    }

    componentDidMount(){
        // this.getCategories("getCategories")
    }

    renderItem = ({ item, index }) => {
        return (
            <SubCategoryCell item={item} index={index} mainCategory={Object.keys(this.props.route.params.subCategories)} navigation={this.props.navigation} />
        );
    }

    getCategories(endPoint) {
        ApiCalls.getApiCall(endPoint).then(data => {
            console.log("DATA");
            console.log(data)
            if (data) {
                this.setState({
                    categories: data.men
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

export default SubCategoryScreen;
