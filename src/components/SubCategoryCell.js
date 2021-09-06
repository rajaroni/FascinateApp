
import React, { PureComponent } from 'react';
import {
    Image,
    StyleSheet,
    Platform,
    TouchableOpacity,
    Text
} from 'react-native';
import Colors from '../utilities/Color';

import Keys from '../utilities/Keys';

getRandomColor = () => { return 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')'; }

class SubCategoryCell extends PureComponent {
    render() {
        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.props.navigation.navigate('ListingScreen', { title: this.props.item.name, mainCategory: this.props.mainCategory})}>
                <Image  style={styles.icon} source={{uri: Keys.img_base_url+this.props.item.slug}}></Image>
                <Text style={styles.catTxt}>{this.props.item.name}</Text>
                {/* <View style={styles.separator}></View> */}
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    cell: {
        flexDirection: 'row',
        // backgroundColor: '#F0F0F0',
        height: 70,
        // marginVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.heartBg,
        marginLeft: 20,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius:25,
        alignItems:'center',
        borderColor:'gray',
        borderWidth:0.2
    },
    catTxt: {
        fontSize: 15,
        marginLeft: 20,
        fontWeight: '300',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        letterSpacing: 1.5,
        color: '#000'
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: 'red'
    }
});

export default SubCategoryCell;
