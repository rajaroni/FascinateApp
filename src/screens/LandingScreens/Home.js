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
    StyleSheet,
    View,
    Alert
} from 'react-native';
import HomeCell from '../../components/HomeCell';
import ApiCalls from '../../Services/ApiCalls';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview'";


const list = [
    {
        id: 1,
        name: 'DAY DRESS',
        tag: 'Goin\' with the flow'
    },
    {
        id: 2,
        name: 'COLLUSION',
        tag: 'We see you in this'
    },
    {
        id: 3,
        name: 'NEW SWIM',
        tag: 'Your moment in the sun'
    },
    {
        id: 4,
        name: 'SUNDAY RILEY',
        tag: 'Hydration huns'
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

class Home extends Component {

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={list}
                    // columnWrapperStyle={{ justifyContent: 'space-around' }}
                    renderItem={(item) => this.renderItem(item, this.props.navigation)}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
            </View>
        );
    }

    componentDidMount() {
        // this.getCategories("getCategories")
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        //     console.log("DIDMOUNT")
        // });

        console.log("HOME DIDMOUNT")
        console.log(this.props.route.name)
    }

    renderItem({ item }) {
        return (
            <HomeCell item={item} navigation={this.props.navigation} />
        );
    }

    getCategories(endPoint) {
        ApiCalls.getApiCall(endPoint).then(data => {
            console.log("DATA");
            console.log(data);
            if (data.type == 200) {
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
        backgroundColor: '#fff',
    },

});

export default Home;
