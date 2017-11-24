import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard,
    TextInput,
    ScrollView,
    Image,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import Spinner from '../../helper/loader';

import {
    bankNameChanged,
    bankBranchChanged,
    accountNoChanged,
    acHolderNameChanged,
    IFSEChanged,
    agentActivate,
    generateOTP,
  getBalance,getAgencies
} from '../../actions/agentRegistration';
import { isEmpty, isOnlyAlphabets,isAccLength } from '../../helper/appHelper';
import { showAlert } from '../../services/apiCall';

class AgentBankDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
          isLoading: false
        };
        debugger
    }

  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()));
    this.props.getAgencies().then(res => {}).catch(err => {})

  }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onFinishButtonPress = () => {
        if(isEmpty(this.props.bankName) &&
            isEmpty(this.props.branchName) &&
            isEmpty(this.props.acHolderName) &&
            isEmpty(this.props.acNumber) &&
            isEmpty(this.props.IFSECode) ) {
            if(!isOnlyAlphabets(this.props.bankName)){
                showAlert('Please check your bank name.');
            }else{
                if(!isOnlyAlphabets(this.props.acHolderName)){
                    showAlert('Please enter valid account holder name.');
                }
                else if(!isAccLength(this.props.acNumber)){
                    showAlert('Please enter valid account number.');
                }
                else if(!isAccLength(this.props.IFSECode)){
                    showAlert('Please enter valid IFSC code');
                }
                else{
                    console.log('request for otp')
                  this.setState({
                    isLoading: true
                  })
                    this.props.generateOTP().then((res) => {
                      this.setState({
                        isLoading: false
                      })
                      this.props.navigator.push('OTP')
                    }).catch((err) => {
                      debugger;
                      console.log("=-=-=-=-=-=-=-=-=",err)
                      if(err.response && err.response.data.message){
                        showAlert(err.response.data.message)
                      }else{
                        showAlert("Fail to send OTP, \n please try again.")
                      }


                      this.setState({
                        isLoading: false
                      })
                    });
                }
            }

        }else{
            showAlert('Enter Data in all fields.');
        }
    };

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar title="Bank Detail"
                               onBackButtonPress={this.onBackButtonPress}
                />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>
                                Bank Name
                            </Text>
                        </View>
                        <TextInput  ref="txtBank"
                                    value={this.props.bankName}
                                    placeholder={"Bank Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.focusNextField('txtBranch')}
                                    onChangeText={(text) => {this.props.bankNameChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}/>
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Branch Name</Text>
                        </View>
                        <TextInput  ref="txtBranch"
                                    value={this.props.branchName}
                                    placeholder={"Branch Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.focusNextField('txtHolder')}
                                    underlineColorAndroid={Constant.transparent}
                                    onChangeText={(text) => {this.props.bankBranchChanged(text)}}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Account Holder Name</Text>
                        </View>
                        <TextInput  ref="txtHolder"
                                    value={this.props.acHolderName}
                                    placeholder={"Account Holder Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.focusNextField('txtAccNo')}
                                    underlineColorAndroid={Constant.transparent}
                                    onChangeText={(text) => {this.props.acHolderNameChanged(text)}}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>Account Number</Text>
                        </View>

                        <TextInput  ref="txtAccNo"
                                    keyboardType={'numeric'}
                                    value={this.props.acNumber}
                                    placeholder={"Account No."}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => this.focusNextField('txtIFSE')}
                                    onChangeText={(text) => {this.props.accountNoChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
                            <Text style={styles.formTextLabel}>IFSE Code</Text>
                        </View>
                        <TextInput  ref="txtIFSE"
                                    value={this.props.IFSECode}
                                    placeholder={"IFSE code"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    maxLength={11}
                                    underlineColorAndroid={Constant.transparent}
                                    onChangeText={(text) => {this.props.IFSEChanged(text)}}
                        />
                    </View>

                    <Button title="Finish"
                            backColor={Constant.backColor}
                            color="#FFF"
                            otherStyle={{marginBottom:20}}
                            onPress={this.onFinishButtonPress}/>
                </ScrollView>
                <Spinner visible={this.state.isLoading} />
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
    activeView:{
        width: "90%",
        alignSelf: 'center',
        paddingTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

const mapStateToProps = state => {
    return {
        bankName: state.agent.bankName,
        branchName: state.agent.branchName,
        acHolderName: state.agent.acHolderName,
        acNumber: state.agent.acNumber,
        IFSECode: state.agent.IFSECode,
        isActive:  state.agent.isActive,
        isLoading: state.user.isLoading,
    };
};

export default connect(mapStateToProps, {
    bankNameChanged,
    bankBranchChanged,
    accountNoChanged,
    acHolderNameChanged,
    IFSEChanged,
    agentActivate,
  generateOTP,
  getBalance,getAgencies
})(AgentBankDetail);