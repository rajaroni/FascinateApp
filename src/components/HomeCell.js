
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Text,
    Platform
} from 'react-native';

import Color from '../utilities/Color';

const width = Dimensions.get('window').width;
class HomeCell extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.props.navigation.navigate('Categories', { title: this.props.item.name })}>
                <Image resizeMode='cover' style={styles.banner} resizeMode='cover' source={{ uri: this.props.item.img_link }}></Image>
                {this.props.item.name != "" && <Text style={styles.nameTxt}>{this.props.item.name}</Text>}
                {this.props.item.country_slug != "" && <Text style={styles.tagTxt}>{this.props.item.country_slug}</Text>}
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    cell: {
        alignItems: 'center',
        margin: 10,
       

    },
    banner: {
        alignSelf: 'center',
        margin: 10,
        height: 200,
        width: '100%'


    },
    nameTxt: {
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' : 'FuturaPTBold',

    },
    tagTxt: {
        marginTop: 5,
        fontSize: 13,
        color: 'gray',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium',
        letterSpacing: 1
    }
});
export default HomeCell;
