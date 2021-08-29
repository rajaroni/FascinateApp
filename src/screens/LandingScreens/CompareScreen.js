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
import SubHeader from '../../components/SubHeader';
import CompareCell from '../../components/CompareCell';

class CompareScreen extends Component {

    constructor(props) {
        super(props);
        this.data = [{ 'item': 'dummy' }]
        this.state = {
            prodcucts: this.data.concat(this.props.route.params.data)
        }
    }

    render() {
        // let data = [{ 'item': 'dummy' }]
        // data = data.concat(this.props.route.params.data)
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'light-content'} />
                <SubHeader
                    navigation={this.props.navigation}
                    title={'Compare'}
                    onPressHeart={() => { console.log(this.selectedItems) }}
                />

                <FlatList
                    removeClippedSubviews={true}
                    data={this.state.prodcucts}
                    horizontal
                    renderItem={(item, index) => this.renderItem(item, index, this.props.navigation)}
                    keyExtractor={(item) => item._id}
                />
            </SafeAreaView>
        );
    }

    componentDidMount() {
    }

    renderItem({ item, index }) {
        return (
            <CompareCell
                item={item}
                index={index}
                navigation={this.props.navigation}
                onLongPress={(item) => { this.selectedItems.push(item) }}
                onDelete={(item) => {
                    let index = this.state.prodcucts.indexOf(item)
                    let tmpArr = [... this.state.prodcucts]
                    tmpArr.splice(index, 1)
                    this.setState({
                        prodcucts: tmpArr
                    })
                    console.log('DELETEING ... ', index)
                }} />
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default CompareScreen;
