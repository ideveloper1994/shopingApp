import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard,
    TextInput,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import { showAlert } from '../../services/apiCall';

import {
    fnameChanged,
    lnameChanged,
    mobileChanged,
    emailChanged,
    passwordChanged,
    usernameChanged
} from '../../actions/agentRegistration';

import { isEmpty, isValidEmail } from '../../helper/appHelper';

class AgentFormPersonal extends Component {

    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            mobileNo: '',
            userName: '',
            email: '',
            password: '',

        };
    }

    onNextButtonPress = () => {
        // if(isEmpty(this.props.firstName) &&
        //     isEmpty(this.props.lastName) &&
        //     isEmpty(this.props.mobileNo) &&
        //     isEmpty(this.props.userName) &&
        //     isEmpty(this.props.email) &&
        //     isEmpty(this.props.password) ) {
        //     if(isValidEmail(this.props.email)){
        //         this.props.navigator.push('agentLocation');
        //     }else{
        //         showAlert('Enter valid Email Address');
        //     }
        //
        // }else{
        //     showAlert('Enter Data in all fields.');
        // }

        this.props.navigator.push('agentLocation');
    };

    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };


    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar title="Personal Detail" onBackButtonPress={this.onBackButtonPress}/>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>First Name</Text>
                        <TextInput  ref="txtFname"
                                    value={this.props.firstName}
                                    placeholder={"First Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.fnameChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtLname')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Last Name</Text>
                        <TextInput  ref="txtLname"
                                    value={this.props.lastName}
                                    placeholder={"Last Name"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.lnameChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtEmail')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Email Id</Text>
                        <TextInput  ref="txtEmail"
                                    keyboardType={'email-address'}
                                    value={this.props.email}
                                    placeholder={"Email"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.emailChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtPhone')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Mobile No</Text>
                        <TextInput  ref="txtPhone"
                                    keyboardType={'number-pad'}
                                    value={this.props.mobileNo}
                                    placeholder={"Mobile No."}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.mobileChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtUserName')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>User Name</Text>
                        <TextInput  ref="txtUserName"
                                    value={this.props.userName}
                                    placeholder={"UserName"}
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.usernameChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtPassword')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>

                    <View style={styles.outerView}>
                        <Text style={styles.formTextLabel}>Password</Text>
                        <TextInput  ref="txtPassword"
                                    value={this.props.password}
                                    placeholder={"Password"}
                                    style={ styles.textBox }
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'done'}
                                    onChangeText={(text) => {this.props.passwordChanged(text)}}
                                    underlineColorAndroid={Constant.transparent}/>
                    </View>

                    <Button title="Next"
                            backColor={Constant.backColor}
                            color="#FFF"
                            otherStyle={{marginBottom:20}}
                            onPress={this.onNextButtonPress}/>
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
    };
};

export default connect(mapStateToProps, {
    fnameChanged,
    lnameChanged,
    mobileChanged,
    emailChanged,
    passwordChanged,
    usernameChanged,
})(AgentFormPersonal);