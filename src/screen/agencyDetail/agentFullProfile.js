import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Image,
    Alert, TouchableHighlight,
    AsyncStorage,
    View,
    Keyboard,
    TextInput, Dimensions,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import NavigationTitle from '../../commonComponent/navBarTitle';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import { isEmpty } from '../../helper/appHelper';
import { showAlert } from '../../services/apiCall';

const {width, height} =Dimensions.get('window');

class AgentFullProfile extends Component {

    constructor(props){
        super(props);
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    render() {
        return (
            <View style={{flex:1,}}>
                <NavigationBar title="Agent Profile" onBackButtonPress={this.onBackButtonPress}/>

                    <View style={{backgroundColor:'rgba(224,235,235,.8)',}}>
                        <View style={{alignItems:'center',   marginTop:5}}>
                            <Image source={require('../../assets/images/avatar-male.png')}
                                   style={{width:width/3.5, height:width/3.5, borderRadius:width/7 }} />
                        </View>
                    </View>

                    <View style={{alignItems:'center',padding:15, backgroundColor:'rgba(224,235,235,.8)', }}>
                        <Text style={[ {color:'black',}]}>John Doe</Text>
                        <Text style={[{color:'black',}]}>doe@sahusoft.com</Text>
                    </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                        <View style={styles.dataView}>
                            <View style={styles.headerView}>
                                <Text style={{fontWeight:'bold', fontSize:13}}>Personal Details</Text>
                            </View>
                            <View style={styles.detailsView}>
                                <Text style={styles.textDetails}>Full name: John Doe</Text>
                                <Text style={styles.textDetails}>Email ID: doe@sahusoft.com</Text>
                                <Text style={styles.textDetails}>Contact: 998 898 56 78</Text>
                                <Text style={styles.textDetails}>Username: johndoe</Text>
                            </View>
                        </View>

                        <View style={styles.dataView}>
                            <View style={styles.headerView}>
                                <Text style={{fontWeight:'bold', fontSize:13}}>Location Details</Text>
                            </View>
                            <View style={styles.detailsView}>
                                <Text style={styles.textDetails}>State: Alabama</Text>
                                <Text style={styles.textDetails}>Zone: Zone com</Text>
                                <Text style={styles.textDetails}>Branch name: Columbus</Text>
                            </View>
                        </View>

                        <View style={styles.dataView}>
                            <View style={styles.headerView}>
                                <Text style={{fontWeight:'bold', fontSize:13}}>Bank Details</Text>
                            </View>
                            <View style={styles.detailsView}>
                                <Text style={styles.textDetails}>Bank name: Bank of baroda</Text>
                                <Text style={styles.textDetails}>Branch name: Columbus</Text>
                                <Text style={styles.textDetails}>Account Holder name: John Doe wang</Text>
                                <Text style={styles.textDetails}>Account Number: 06789112391388</Text>
                                <Text style={styles.textDetails}>IFSC Code: BARB0CITYLT</Text>
                            </View>
                        </View>

                    <View style={styles.dataView}>
                        <View style={styles.headerView}>
                            <Text style={{fontWeight:'bold', fontSize:13}}>Documents Detail</Text>
                        </View>
                        <View style={{padding:5, flexDirection:'row', justifyContent:'space-around' }}>
                            <Image style={styles.docImages} source={require('../../assets/images/avatar-male.png')}/>
                            <Image style={styles.docImages} source={require('../../assets/images/avatar-male.png')}/>

                        </View>
                    </View>

                    </ScrollView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView:{
        width: "90%",
        alignSelf: 'center',
        paddingTop: 20
    },
    formTextLabel:{
        color: 'gray',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 5,
        paddingTop: 5,
    },
    textBox: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 0,
        height: 45,
        paddingLeft: 10,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
    },
    mainView: {
        flex:1,
    },
    dataView: {
        margin:10,
        marginBottom:0,
        backgroundColor:'rgba(224,235,235,.8)'
    },
    headerView: {
        opacity:0.75,
        padding:5,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    detailsView:{
        padding:5
    },
    textDetails:{
        padding:1,
        fontSize:12,
        color:'black',
    },
    docImages:{
        width:width/2.75,
        height:width/2.75
    }
});

const mapStateToProps = state => {
    return {
        bankName: state.agent.bankName,
        branchName: state.agent.branchName,
        acHolderName: state.agent.acHolderName,
        acNumber: state.agent.acNumber,
        IFSECode: state.agent.IFSECode,
    };
};

export default connect(mapStateToProps, null)(AgentFullProfile);