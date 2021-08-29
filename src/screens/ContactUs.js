import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import NavigationPagesHeader from '../components/NavigationPagesHeader';
import Keys from '../utilities/Keys';
class ContactUs extends Component {
    render() {
        return (
            <View style={styles.container}>
                <NavigationPagesHeader navigation={this.props.navigation} title='Contact Us'></NavigationPagesHeader>
                <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium', margin: 20 }}>
                    {Keys.contact_us}
                   </Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#fff'
    },

});

export default ContactUs;