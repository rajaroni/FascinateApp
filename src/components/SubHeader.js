
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';

import Color from '../utilities/Color';

class SubHeader extends PureComponent {
    render() {
        return (
            !this.props.searchEnabled ? this.header() : this.search()
        );
    }

    header = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.menuBtn} source={require('../../assets/header-back.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropDownView}>
                    <Text numberOfLines={1} style={styles.dropDownTxt}>{this.props.title}</Text>
                </TouchableOpacity>
                <View style={styles.rightView}>
                    {this.props.compare && <TouchableOpacity onPress={() => this.props.onPresscompare()}>
                        <Image style={styles.heartBtn} source={require('../../assets/compare.png')}></Image>
                    </TouchableOpacity>}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FavoritesScreen', { title: 'Favorites'})}>
                        <Image style={styles.heartBtn} source={require('../../assets/heart.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.onPressSearch()}>
                        <Image style={styles.searchBtn} source={require('../../assets/search.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    search = () => {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={'Search'}
                        onChangeText = {(str) => this.props.onSearchChange(str)}
                    />
                    <TouchableOpacity style={{alignSelf:'center'}} onPress={() => this.props.closeSearch()}>
                        <Image style={styles.searchBtn} source={require('../../assets/close.png')}></Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 20,
    },
    dropDownTxt: {
        fontSize: 15,
        // fontWeight: '700',
        textTransform: 'uppercase',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1.5,
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
        marginRight: 10
    },
    searchContainer: {
        flexDirection: 'row',
        flex: 1,
        // backgroundColor: 'red'
    },
    searchInput: {
        flex: 1, 
        paddingRight: 5,
        fontSize: 22,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Book' : 'FuturaPTBook',
        color: 'gray',
        letterSpacing: 1.5
    }
});

export default SubHeader;
