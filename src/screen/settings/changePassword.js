import React, {Component} from "react";
import {StyleSheet, Text, Alert, AsyncStorage, View, Keyboard, TextInput, ScrollView} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../commonComponent/navBar";
import Constant from "../../helper/constant";
import Spinner from '../../helper/loader';

import Button from "../../commonComponent/button";
import { showAlert } from '../../services/apiCall';
import { changePassword ,logoutUser} from '../../actions/userAction'
import { getBalance,getAgencies, } from '../../actions/agentRegistration'

class ChangePassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      ispasswordMatched: true,
      isLoading: false,
      mobileError: '',
    };
  }
  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()))
    this.props.getAgencies().then().catch()
  }

  onChangeButtonPress = () => {

    if(this.state.currentPassword.trim().length <= 0 || this.state.newPassword.trim().length <= 0 || this.state.confirmPassword.trim().length <= 0) {
      showAlert('Enter Data in all fields.');
    }
    else if(this.state.newPassword !== this.state.confirmPassword) {
      showAlert("password must match confirm password.");
    }
    else {
      this.setState({
        isLoading: true
      })
      this.props.changePassword(this.state.currentPassword,this.state.newPassword).then((res) => {
        this.setState({
          isLoading: false
        })

        showAlert("Password has been changed successfully")
       // this.props.navigator.pop();
          AsyncStorage.clear();

          this.props.logoutUser().then(res => {
              this.props.navigator.replace('login');
          }).catch(err=>{
              if(err.response && err.response.data.message){
                  showAlert(err.response.data.message)
              }else{
                  showAlert("Fail to send OTP, \n please try asgain.")
              }
          })
        //  AsyncStorage.removeItem('user');
         // AsyncStorage.removeItem('user_role');
          //this.props.navigator.push('login');

      }).catch((err) => {
        this.setState({
          isLoading: false
        })

        showAlert('Please check your current password')
        debugger
      })
    }
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
        <NavigationBar title="Change Password" onBackButtonPress={this.onBackButtonPress}/>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.outerView}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
              <Text style={styles.formTextLabel}>Current Password</Text>
            </View>
            <TextInput  ref="current"
                        value={this.state.currentPassword}
                        placeholder={"Current Password"}
                        style={ styles.textBox }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'next'}
                        onChangeText={(text) => {this.setState({
                          currentPassword: text
                        })}}
                        onSubmitEditing={() => this.focusNextField('new')}
                        underlineColorAndroid={Constant.transparent}
                        secureTextEntry={true}
            />
          </View>

          <View style={styles.outerView}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
              <Text style={styles.formTextLabel}>New Password</Text>
            </View>
            <TextInput  ref="new"
                        value={this.state.newPassword}
                        placeholder={"New Password"}
                        style={ styles.textBox }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'next'}
                        onChangeText={(text) => {
                          this.setState({
                            newPassword: text
                        })
                        }}
                        onSubmitEditing={() => this.focusNextField('confirm')}
                        underlineColorAndroid={Constant.transparent}
                        secureTextEntry={true}
            />
          </View>

          <View style={styles.outerView}>
            <View style={{flexDirection:'row'}}>
              <Text style={{fontSize:15,color:'red'}}>{"* "}</Text>
              <Text style={styles.formTextLabel}>Confirm Password</Text>
            </View>

            <TextInput  ref="confirm"
                        value={this.state.confirmPassword}
                        placeholder={"Confirm Password"}
                        style={ styles.textBox }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'next'}
                        onChangeText={(text) => {this.setState({
                          confirmPassword: text
                        })}}
                        blurOnSubmit={true}
                        underlineColorAndroid={Constant.transparent}
                        secureTextEntry={true}
            />



          </View>

          <Button title="Change"
                  backColor={Constant.backColor}
                  color="#FFF"
                  otherStyle={{marginBottom:20}}
                  onPress={this.onChangeButtonPress}/>
        </ScrollView>
        <Spinner visible={this.state.isLoading} color={'rgba(0,0,0,0.5'} />

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
  };
};

export default connect(mapStateToProps, {
  changePassword,
  getBalance,getAgencies,logoutUser

})(ChangePassword);