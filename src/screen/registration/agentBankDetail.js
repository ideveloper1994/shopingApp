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
    TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    bankNameChanged,
    bankBranchChanged,
    accountNoChanged,
    acHolderNameChanged,
    IFSEChanged,
    agentActivate,
    registerAgency
} from '../../actions/agentRegistration';
import { isEmpty } from '../../helper/appHelper';
import { showAlert } from '../../services/apiCall';

class AgentBankDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onFinishButtonPress = () => {
        /*if(isEmpty(this.props.bankName) &&
         isEmpty(this.props.branchName) &&
         isEmpty(this.props.acHolderName) &&
         isEmpty(this.props.acNumber) &&
         isEmpty(this.props.IFSECode) ) {
         alert("all true")
         }else{
         showAlert('Enter Data in all fields.');
         }*/
        this.props.registerAgency();

        this.props.navigator.push('agentDetail');
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
                        <Text style={styles.formTextLabel}>
                            Bank Name
                        </Text>
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
                        <Text style={styles.formTextLabel}>Branch Name</Text>
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
                        <Text style={styles.formTextLabel}>Account Holder Name</Text>
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
                        <Text style={styles.formTextLabel}>Account Number</Text>
                        <TextInput  ref="txtAccNo"
                                    keyboardType={'number-pad'}
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
                        <Text style={styles.formTextLabel}>IFSE Code</Text>
                        <TextInput  ref="txtIFSE"
                                    value={this.props.IFSECode}
                                    keyboardType={'number-pad'}
                                    placeholder={"IFSE code"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'done'}
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
    };
};

export default connect(mapStateToProps, {
    bankNameChanged,
    bankBranchChanged,
    accountNoChanged,
    acHolderNameChanged,
    IFSEChanged,
    agentActivate,
    registerAgency
})(AgentBankDetail);