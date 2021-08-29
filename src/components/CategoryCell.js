
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Keys from '../utilities/Keys';

getRandomColor = () => { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; }

class CategoryCell extends PureComponent {

    render() {

        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.props.navigation.navigate('SubCategoryScreen', { subCategories: this.props.item })}>
                <Text style={styles.catTxt}>{Object.keys(this.props.item)}</Text>
                <Image resizeMode='contain' style={{height: 130, width: 100, marginLeft: 'auto' }} source={{ uri: Keys.img_base_url + this.props.item[Object.keys(this.props.item)][0].slug }}></Image>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        height: 130,
        marginVertical: 10,
        borderRadius: 2,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        alignItems: 'center'
    },
    catTxt: {
        marginLeft: 20,
        fontSize: 15,
        fontWeight: '900',
        textTransform: 'uppercase',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        letterSpacing: 1.5
    }
});

export default CategoryCell;
