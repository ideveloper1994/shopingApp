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
import {
  getBalance
} from '../../actions/agentRegistration'

const {width, height} =Dimensions.get('window');

class AgentFullProfile extends Component {

    constructor(props){
        super(props);
        this.state={
          userDetails: this.props.route.params.userDetails
        };
    }

  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()))
  }


  onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    render() {
        return (
            <View style={{flex:1,}}>
                <NavigationBar title="Agent Profile" onBackButtonPress={this.onBackButtonPress}/>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{backgroundColor:'rgba(224,235,235,.8)',}}>
                        <View style={{alignItems:'center',   marginTop:5}}>
                            <Image source={require('../../assets/images/avatar-male.png')}
                                   style={{width:width/3.5, height:width/3.5, borderRadius:width/7 }} />
                        </View>
                    </View>

                    <View style={styles.proView}>
                        <Text style={[ {color:'black',}]}>{this.state.userDetails.firstName+ ' '+this.state.userDetails.lastName}</Text>
                        <Text style={[{color:'black',}]}>{this.state.userDetails.email}</Text>
                    </View>


                    <View style={styles.dataView}>
                        <View style={styles.headerView}>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Personal Details</Text>
                        </View>
                        <View style={styles.detailsView}>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Full name:</Text>
                                <Text style={styles.textValue}>{this.props.firstName}{this.state.userDetails.firstName+ ' '+this.state.userDetails.lastName}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Email ID:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.email}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Contact:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.mobileNo}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.dataView}>
                        <View style={styles.headerView}>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Location Details</Text>
                        </View>
                        <View style={styles.detailsView}>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>State:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.stateName}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Zone:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.zoneName}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Branch name:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.branchName}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.dataView}>
                        <View style={styles.headerView}>
                            <Text style={{fontWeight:'bold', fontSize:15}}>Bank Details</Text>
                        </View>
                        <View style={styles.detailsView}>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Bank name:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.bankName}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Branch name:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.bankBranchName}</Text>
                            </View>

                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Account Holder name:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.accountHolderName}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>Account Number:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.awsAccountNumber}</Text>
                            </View>
                            <View style={styles.textView}>
                                <Text style={styles.textHeader}>IFSC Code:</Text>
                                <Text style={styles.textValue}>{this.state.userDetails.IFSCcode}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:15}}/>
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
    proView: {
        alignItems:'center',
        padding:15,
        backgroundColor:'rgba(224,235,235,.8)',
     },
    dataView: {
        margin:10,
        marginBottom:0,
        backgroundColor:'rgba(224,235,235,.8)'
    },
    headerView: {
        opacity:0.75,
        padding:10,
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    detailsView:{
        padding:5
    },
    textView:{
        flexDirection:'row'
    },
    textHeader:{
        padding:1,
        fontSize:15,
        color:'#000',
        lineHeight: 22,
    },
    textValue:{
        padding:1,
        fontSize:14,
        color:'#000',
        lineHeight: 22,
        opacity:0.9
    },
    docImages:{
        width:width/2.75,
        height:width/2.75
    }
});

const mapStateToProps = state => {
    return {
        firstName: state.agent.firstName,
        lastName: state.agent.lastName,
        mobileNo: state.agent.mobileNo,
        userName: state.agent.userName,
        email: state.agent.email,
        password: state.agent.password,

        stateName: state.agent.stateName,
        zone: state.agent.zone,
        agentBranch: state.agent.agentBranch,

        bankName: state.agent.bankName,
        branchName: state.agent.branchName,
        acHolderName: state.agent.acHolderName,
        acNumber: state.agent.acNumber,
        IFSECode: state.agent.IFSECode,
    };
};

export default connect(mapStateToProps, getBalance)(AgentFullProfile);