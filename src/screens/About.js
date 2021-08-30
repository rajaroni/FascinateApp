

import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import NavigationPagesHeader from '../components/NavigationPagesHeader';
import Keys from '../utilities/Keys';
import ApiCalls from '../Services/ApiCalls'
class About extends Component {
    state = {
        aboutus: {}

    }
    render() {
        return (
            <View style={styles.container}>
                <NavigationPagesHeader navigation={this.props.navigation} title='About us'></NavigationPagesHeader>
                {/* <Text style={{ alignSelf: 'center', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium', margin: 20 }}>
                    {Keys.aboutus_content}
                   </Text> */}
                <ScrollView>
                    <HTMLView style={{ alignContent: 'center', alignSelf: 'center', textAlign: 'center', fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' : 'FuturaPTMedium', margin: 20 }} value={this.state.aboutus}>
                    </HTMLView>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        let params = {
            "query": {
                "page_slug": "terms-of-services"
            }
        }
        this.getaboutus(params, "get_pages")
    }
    getaboutus(params, endpoint) {

        ApiCalls.postApiCall(params, endpoint).then(data => {
            console.log("DATA");
            console.log(data[0].desc)
            this.setState({
                loading: false
            })
            if (data) {
                this.setState({
                    aboutus: data[0].desc
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

export default About;