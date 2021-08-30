import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import HTML from 'react-native-render-html';
import NavigationPagesHeader from '../components/NavigationPagesHeader';
import Keys from '../utilities/Keys';
import ApiCalls from '../Services/ApiCalls';
import HTMLView from 'react-native-htmlview';
class ContactUs extends Component {

    state={
        contact_us:[]
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationPagesHeader navigation={this.props.navigation} title='Contact Us'></NavigationPagesHeader>
                <ScrollView>
                <HTMLView style={{ alignContent:'center', alignSelf: 'center', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium', margin: 20 }} value= {this.state.contact_us}>
                   
                   </HTMLView>
                   </ScrollView>
            </View>
        );
    }
    componentDidMount()
    {
        let params = {
            "query": {
                "page_slug": "contact-us"
            }
        }
        this.getCategories(params,"get_pages")
    }
    getCategories(params,endpoint) {

        ApiCalls.postApiCall(params,endpoint).then(data => {
            console.log("DATA");
            console.log(data[0].desc)
            this.setState({
                loading: false
            })
            if (data) {
                this.setState({
                    contact_us: data[0].desc
                })
            } else {
                Alert.alert('Error', "Something went wrong");
            }
        }, error => {
            // Alert.alert('Error', error);
        })
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