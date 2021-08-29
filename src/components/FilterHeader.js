
import React, { PureComponent, createRef } from 'react';
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    TouchableWithoutFeedback,
    SectionList,
    Alert,
    Platform
} from 'react-native';
import OptionsMenu from "react-native-options-menu";
import PopoverTooltip from 'react-native-popover-tooltip';
import RBSheet from "react-native-raw-bottom-sheet";
import Color from '../utilities/Color';
import filterList from '../Data/FilterList';
import { Component } from 'react';
import Constants from '../utilities/Constants';
import ApiCalls from '../Services/ApiCalls'


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const filter = []
let filterObj = {}

const data = [
    { "data": ["technical"], "title": "material" },
    { "data": ["blue"], "title": "color" },
    { "data": ["4", "5"], "title": "size" }
]

const Item = ({ title }) => (
    <View>
        <Text>{title}</Text>
    </View>
);

class FilterHeader extends Component {
    constructor(props) {
        super(props)
        this.filterArr = []
    }

    state = {
        selectedFilter: null,
        filterList: this.props.filter,// filterList,
        filterparams: this.props.filterquery,
        // subFilterList: filterList[0].subFilter
        subFilterList: []
    }
    render() {
        // console.log('FILTER PROPS')
        // console.log(this.props.filter)
        return (
            <View style={styles.headerContainer}>
                {/* <OptionsMenu
                    customButton={<View style={styles.dropDownView}><Text style={styles.dropDownTxt}>{"RECOMMENDED"}</Text>
                        <Image style={styles.vBtn} source={require('../../assets/v.png')}></Image></View>}
                    buttonStyle={{ width: 32, height: 8, margin: 7.5, resizeMode: "contain" }}
                    // destructiveIndex={1}
                    options={["Recommended", "What's New", "Price - Low to High", "Price - High to Low", "Cancel"]}
                    actions={[() => this.setOrder(0), () => this.setOrder(1), () => this.setOrder(2), () => this.setOrder(3), () => this.setOrder(4)]} /> */}

                <PopoverTooltip
                    ref='tooltip1'
                    // style={{width: 400, flex: 1}}
                    // tooltipContainerStyle={{ width: WIDTH - 40, marginLeft: 50 }}
                    buttonComponent={<View style={styles.dropDownView}><Text style={styles.dropDownTxt}>{"RECOMMENDED"}</Text>
                        <Image style={styles.vBtn} source={require('../../assets/v.png')}></Image></View>}
                    items={[
                        {
                            label: 'Recommended',
                            // onPress: () => { this.sorter('recommended')},
                            onPress: () => { this.sorter('recommended') },
                        },
                        {
                            label: 'What\'s New',
                            onPress: () => { this.sorter('new') }
                        },
                        {
                            label: 'Price: High to Low',
                            onPress: () => { this.sorter('hl') }
                        },
                        {
                            label: 'Price: Low to High',
                            onPress: () => { this.sorter('lh') },

                        }
                    ]}
                    // animationType='timing'
                    // using the default timing animation

                    labelContainerStyle={{ height: 60, marginLeft: 20, paddingRight: 20, justifyContent: 'center' }}
                />
                <TouchableOpacity style={styles.filterBtn} onPress={() => this.RBSheet.open()}>
                    <Text style={styles.dropDownTxt}>{"FILTER"}</Text>
                </TouchableOpacity>

                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={HEIGHT}
                    openDuration={250}
                    customStyles={{
                        container: {
                            // justifyContent: "center",
                            // alignItems: "center"
                        }
                    }}
                >
                    <View style={styles.sheetContainer}>
                        <View style={styles.filterHeader}>
                            {/* <TouchableOpacity style={styles.closeIconView} onPress={() => this.RBSheet.close()}> */}
                            <TouchableWithoutFeedback style={styles.closeIconView} onPress={() => this.RBSheet.close()}>
                                <Image style={styles.closeIcon} source={require('../../assets/close.png')}></Image>
                            </TouchableWithoutFeedback>
                            <Text style={styles.heading}>{'FILTER'}</Text>
                        </View>
                        <FlatList
                            data={this.state.filterList}
                            style={{ marginTop: 20 }}
                            renderItem={(item) => this.renderItem(item, this.props.navigation)}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        <TouchableOpacity style={styles.viewItemBtn}>
                            <Text style={styles.btnText}>{"VIEW ITEMS"}</Text>
                        </TouchableOpacity>
                    </View>

                    <RBSheet
                        ref={ref => {
                            this.RBSheet1 = ref;
                        }}
                        height={HEIGHT}
                        openDuration={250}
                        customStyles={{
                            container: {
                                // justifyContent: "center",
                                // alignItems: "center"
                            }
                        }}
                    >
                        <View style={styles.sheetContainer}>
                            <View style={styles.filterHeader}>
                                {/* <TouchableOpacity style={styles.closeIconView} onPress={() => this.RBSheet1.close()}> */}
                                <TouchableWithoutFeedback style={styles.closeIconView} onPress={() => this.RBSheet1.close()}>
                                    <Image style={styles.closeIcon} source={require('../../assets/header-back.png')}></Image>
                                </TouchableWithoutFeedback>
                                <Text style={styles.heading}>{this.state.selectedFilter}</Text>
                            </View>
                   
                            <SectionList
                                sections={this.state.subFilterList}
                                keyExtractor={(item, index) => item + index}
                                renderItem={({ item, index, section }) => this.renderSubFilter(item, index, section)}

                                // renderItem={({ item, index, section }) =>
                                //     <TouchableOpacity style={styles.cell} onPress={() => this.onSelectSubFilter(item, index, section)}>
                                //         {/* <TouchableOpacity style={styles.cell} onPress={() => console.log("CLICKED_ITEM", item)}> */}
                                //         <View style={{ width: 20, height: 20, marginHorizontal: 20 }}>
                                //             {(item.isSelected) && <Image style={styles.tickIcon} source={require('../../assets/tick.png')}></Image>}
                                //         </View>
                                //         <Text ref={this.filter} style={styles.filterName}>{item.data}</Text>
                                //         <Text style={styles.optionTxt}>{item.count}</Text>
                                //     </TouchableOpacity>}

                                renderSectionHeader={({ section: { title }, index }) => {
                                    return (<Text style={styles.sectionheader}>{title}</Text>
                                    )
                                }
                                }
                            />
                            <TouchableOpacity style={styles.viewItemBtn} onPress={() => this.ViewItems()}>
                                <Text style={styles.btnText}>{"VIEW ITEMS"}</Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                </RBSheet>
            </View>
        );
    }

    componentDidMount() {
    }
    
    ViewItems=()=>{
        this.RBSheet.close()
        this.RBSheet1.close()
        this.props.nPressViewItem(filterObj)
    }


    renderItem({ item, index }) {
        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.onSelectFilter(item)}>
                <Text ref={this.filter} style={styles.filterName}>{item.filter}</Text>
                <Text style={styles.optionTxt}>{item.active}</Text>
            </TouchableOpacity>
        );
    }

    renderSubFilter = (item, itemindex, section) => {
        // console.log({ itemindex })
        return (
            <TouchableOpacity style={styles.cell} onPress={() => this.onSelectSubFilter(item, itemindex, section)}>
                {/* <TouchableOpacity style={styles.cell} onPress={() => console.log("CLICKED_ITEM", item)}> */}
                <View style={{ width: 20, height: 20, marginHorizontal: 20 }}>
                    {(item.isSelected) && <Image style={styles.tickIcon} source={require('../../assets/tick.png')}></Image>}
                </View>
                <Text ref={this.filter} style={styles.filterName}>{item.data}</Text>
                <Text style={styles.optionTxt}>{item.count}</Text>
            </TouchableOpacity>
        );
    }

    onSelectFilter(item) {
        console.log("Item Inner Filters List")
        // console.log(item.filter)
        this.setState({ selectedFilter: item.filter })
        this.getsubFilter(item.pri_cate_slug, "get_category_details_group_by_meta")
        this.RBSheet1.open()
    }
    
    onSelectSubFilter(item, itemindex, section) {

        
        console.log(filterObj)
        
        let tmp = [... this.state.subFilterList]
        const sectionindex = tmp.indexOf(section);

        if(filterObj[section.title].indexOf(item.data) !== -1){
           filterObj[section.title].splice(filterObj[section.title].indexOf(item.data),1)
        } else{
            filterObj[section.title].push(item.data)
        }
        console.log({filterObj})


        tmp[sectionindex].data[itemindex].isSelected = !(tmp[sectionindex].data[itemindex].isSelected)
        if (tmp[sectionindex].data[itemindex].isSelected == true) {
            this.filterArr.push(tmp[sectionindex].data[itemindex].data)
            // this.filterArr.push(tmp[sectionindex].data[itemindex].da)
        } else {
            const i = this.filterArr.indexOf(tmp[sectionindex].data[itemindex].data);
            if (i > -1) {
                this.filterArr.splice(i, 1);
            }
        }
        console.log(this.filterArr)
        this.setState({ subFilterList: tmp })
    }

    sorter(type) {
        this.props.onPressSort(type)
    }

    setOrder(order) {
        console.log(order)
    }

    getsubFilter(pri_cate_slug, endPoint) {
        let params = {
            "query": {
                "main_cate_slug": this.state.filterparams.main_cate_slug,
                "gender": Constants.selectedGender,
                "pri_cate_slug": pri_cate_slug
                // "brand_slug": this.state.filterparams.brand_slug,

            }
        }
        console.log("FILTER_SUBQUERY_PARAMS", params)
        ApiCalls.postApiCall(params, endPoint).then(data => {
            this.setState({
                loading: false
            })
            if (data) {
                console.log("DATA_____", data)


                let mainsubfilterarr = []
                // let arr = data.map(obj => {
                //      return obj.detail.map(inner => ({...inner, isSelected: false})
                //     )
                // })

                // console.log({arr})
                // this.setState({ subFilterList: arr }, () => console.log("MYSUBFILTERARR", this.state.subFilterList))

                for (const [i, subcategories] of data.entries()) {
                    filterObj[subcategories.meta] = []
                    let subfiltearr = []
                    for (const [j, metasubtype] of subcategories.detail.entries()) {
                        let subfilter = {
                            data: metasubtype,
                            isSelected: false
                        }
                        subfiltearr.push(subfilter)
                    }
                    let mainsubfilter = {
                        title: subcategories.meta,
                        data: subfiltearr
                    }
                    mainsubfilterarr.push(mainsubfilter)
                }

                console.log({filterObj})

                console.log("SUBFILTER", mainsubfilterarr)
                this.setState({ subFilterList: mainsubfilterarr }, () => console.log("MYSUBFILTERARR", this.state.subFilterList))

            } else {
                Alert.alert('Error', data.status);
            }
        }, error => {
            Alert.alert('Error', error);
        })
    }




};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomColor: Color.separator,
        borderBottomWidth: 1,
        // shadowColor: '#000000',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.75,

    },
    dropDownView: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    sectionheader: {
        backgroundColor: '#000',
        height: 40,
        padding: 8,
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        alignItems: 'center',
    },
    dropDownTxt: {
        fontSize: 13,
        // fontWeight: '700',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        letterSpacing: 1.5
    },
    vBtn: {
        width: 18,
        height: 20,
        tintColor: '#000',
        marginLeft: 10
    },
    filterBtn: {
        marginLeft: 'auto'
    },
    sheetContainer: {
        flex: 1,
        backgroundColor: Color.heartBg
    },
    filterHeader: {
        flexDirection: 'row',
        marginTop: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    closeIconView: {
        justifyContent: 'center',
        alignItems: 'center'

    },
    closeIcon: {
        position: 'absolute',
        width: 25,
        height: 25,
        left: 20,
        top: 'auto',
        bottom: 'auto'
    },
    heading: {
        fontSize: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
        letterSpacing: 1.5
    },
    viewItemBtn: {
        width: WIDTH - 20,
        height: 50,
        marginLeft: 10,
        marginTop: 'auto',
        marginBottom: 30,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
    },
    btnText: {
        fontSize: 13,
        color: '#fff',
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Bold' :'FuturaPTBold',
    },
    cell: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: Color.heartBg,
        borderBottomWidth: 1
    },
    filterName: {
        fontSize: 15,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium',
        letterSpacing: 1.0
    },
    optionTxt: {
        fontSize: 17,
        color: 'gray',
        marginLeft: 'auto',
        marginRight: 20,
        fontFamily: Platform.OS === 'ios' ? 'FuturaPT-Medium' :'FuturaPTMedium',
        letterSpacing: 1.0
    },
    tickIcon: {
        width: 20,
        height: 20,
        tintColor: 'blue',
        // marginRight: 20
    }
});

export default FilterHeader;
