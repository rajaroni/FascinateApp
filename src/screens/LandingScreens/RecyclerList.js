import React, { Component } from "react";
import { Alert, Dimensions } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import HomeCell from "../../components/HomeCell";
import { BallIndicator } from 'react-native-indicators';
import ApiCalls from '../../Services/ApiCalls';
import Constants from '../../utilities/Constants';
const ViewTypes = {
    FULL: 0,
    HALF_LEFT: 1,
    HALF_RIGHT: 2
};


export default class RecycleTestComponent extends React.Component {
    constructor(args) {
        super(args);
        this.state = {
            dataProvider: [],
            loading: false
        }

        const window = Dimensions.get('window');
        const width = window.width - 10
        // layout provider setting layout steps
        this._layoutProvider = new LayoutProvider(
            index => {
                if (index % 3 === 0) {
                    return ViewTypes.FULL;
                } else if (index % 3 === 1) {
                    return ViewTypes.HALF_LEFT;
                } else {
                    return ViewTypes.HALF_RIGHT;
                }
            },
            (type, dim) => {
                switch (type) {
                    case ViewTypes.HALF_LEFT:
                        dim.width = width / 2;
                        dim.height = 300;

                        break;
                    case ViewTypes.HALF_RIGHT:
                        dim.width = width / 2;
                        dim.height = 300;
                        break;
                    case ViewTypes.FULL:
                        dim.width = width;
                        dim.height = 300;
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
    }
    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getcategories()
        });

    }
    getcategories() {
        ApiCalls.getApiCall('homepagesettings/' + Constants.selectedGender).then(data => {
            this.setState({
                loading: false
            })
            if (data) {
                let list = [{
                    "img_link": "https://24urbanshop.com/summernote_img/attachment-2021072795333.jpeg",
                    "name": "",
                    "country_slug": ""
                },
                {
                    "img_link": data.sectionSecondItems[0].image,
                    "name": "",
                    "country_slug": ""
                },
                {
                    "img_link": data.sectionSecondItems[1].image,
                    "name": "",
                    "country_slug": ""
                }]
                // let list = data.categories
                list = list.concat(data.categories)
                let dataProvider = new DataProvider((r1, r2) => {
                    return r1 !== r2;
                });

                this.setState({ dataProvider: dataProvider.cloneWithRows(list) })
            } else {
                Alert.alert('Error', data.status);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {

        //You can return any view here, CellContainer has no special significance
        switch (type) {
            case ViewTypes.HALF_LEFT:
                return (
                    <HomeCell item={data} navigation={this.props.navigation} />
                );
            case ViewTypes.HALF_RIGHT:
                return (
                    <HomeCell item={data} navigation={this.props.navigation} />
                );
            case ViewTypes.FULL:
                return (
                    <HomeCell item={data} navigation={this.props.navigation} />
                );
            default:
                return null;
        }
    }

    render() {
        return this.state.dataProvider.length == 0 ? <BallIndicator style={{ alignSelf: 'center' }} color='black' /> : <RecyclerListView layoutProvider={this._layoutProvider} dataProvider={this.state.dataProvider} rowRenderer={this._rowRenderer} />;
    }
}
const styles = {
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
};