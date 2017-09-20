import React, {Component} from "react";
import {StyleSheet, Text, Alert, AsyncStorage, View, Keyboard, TextInput, ScrollView} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../commonComponent/navBar";
import Constant from "../../helper/constant";
import Spinner from '../../helper/loader';

import Button from "../../commonComponent/button";
import { showAlert } from '../../services/apiCall';
import { changePassword,sendForgotPassword } from '../../actions/userAction'

class ForgotPassword extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      isLoading: false,
    };
  }
  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  onForgotButtonPress = () => {

    if(this.state.email.trim().length <= 0) {
      showAlert('Enter Data in all fields.');
    }
    else if(!this.validateEmail(this.state.email.trim())) {
      showAlert('Enter valid Email Address');
    }
    else {
      this.setState({
        isLoading: true
      })
      this.props.sendForgotPassword(this.state.email).then((res) => {
        this.setState({
          isLoading: false
        })
        showAlert("Password has been sent successfully")
        this.props.navigator.pop();
      }).catch((err) => {
        this.setState({
          isLoading: false
        })
        showAlert("Fail to request for a new password, \n please try again.")
        debugger
      })
    }
  };


  onBackButtonPress = () => {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={{flex:1}}>
        <NavigationBar title="Forgot Password" onBackButtonPress={this.onBackButtonPress}/>

          <View style={styles.outerView}>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.formTextLabel}>Email</Text>
            </View>
            <TextInput  value={this.state.email}
                        placeholder={"Email"}
                        style={ styles.textBox }
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'done'}
                        onChangeText={(text) => {this.setState({
                          email: text
                        })}}
                        blurOnSubmit={true}
                        underlineColorAndroid={Constant.transparent}
            />
          </View>

          <Button title="Send"
                  backColor={Constant.backColor}
                  color="#FFF"
                  otherStyle={{marginBottom:20}}
                  onPress={this.onForgotButtonPress}/>
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
  sendForgotPassword
})(ForgotPassword);