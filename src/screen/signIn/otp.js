import React, {Component} from "react";
import {StyleSheet, Text, Alert, AsyncStorage, View, Keyboard, TextInput, TouchableHighlight} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../commonComponent/navBar";
import Constant from "../../helper/constant";
import Button from "../../commonComponent/button";
import Spinner from '../../helper/loader';
import { showAlert } from '../../services/apiCall';
import {
  getBalance,
  registerAgency,
  generateOTP
} from "../../actions/agentRegistration";

class OptValidation extends Component {

  constructor(props){
    super(props);
    this.state = {
      otp: '',
      isLoading: false
    };
  }

  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()))
  }

  onNextButtonPress = () => {
    if(this.state.otp.trim().length <= 0){
      showAlert("Enter OTP")
    }else{
      this.setState({
        isLoading: true
      })

      this.props.registerAgency(this.state.otp).then((response) => {
        debugger
        this.setState({
          isLoading: false
        })

        this.props.navigator.push('agentDetail');
      }).catch((err) => {
        debugger
        this.setState({
          isLoading: false
        })
        if(err.response && err.response.data.message){
          showAlert(err.response.data.message)
        }else{
          showAlert("Fail to register agency, \n please try again.")
        }

      })
    }
  };

  resendOTP = () => {
    showAlert("resend")
    this.setState({
      isLoading: true
    })

    this.props.generateOTP().then((res) => {
      this.setState({
        isLoading: false
      })
      showAlert("OTP sent successfully, \n please check.")

    }).catch((err) => {
      if(err.response && err.response.data.error){
        showAlert(err.response.data.error)
      }else{
        showAlert("Fail to send OTP, \n please try again.")
      }


      this.setState({
        isLoading: false
      })
    });
  }
  onBackButtonPress = () => {
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={{flex:1}}>
        <NavigationBar title="OTP" onBackButtonPress={this.onBackButtonPress}/>

          <View style={styles.outerView}>
            <Text style={styles.formTextLabel}>Enter OTP:</Text>
            <TextInput  ref="txtFname"
                        value={this.state.otp}
                        style={ styles.textBox }
                        placeholder="Enter your 4 digit OTP here"
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType={'next'}
                        onChangeText={(text) => {
                          this.setState({
                            otp: text
                          })
                        }}
                        blurOnSubmit={false}
                        underlineColorAndroid={Constant.transparent}
            />
          </View>
        <TouchableHighlight onPress={() => {

        }}  underlayColor={Constant.transparent}>
          <Text style={styles.resendText} onPress={() => this.resendOTP()}>Resend OTP</Text>
        </TouchableHighlight>
        <Button title="Varify OTP"
                backColor={Constant.backColor}
                color="#FFF"
                onPress={this.onNextButtonPress}/>

        <Spinner visible={this.state.isLoading} />

      </View>
    );
  }

}

const styles = StyleSheet.create({
  outerView:{
    width: "90%",
    alignSelf: 'center',
    paddingTop: 35
  },
  formTextLabel:{
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 5,
    paddingTop: 5,
  },
  resendText:{
    color: Constant.backColor,
    fontSize: 15,
    fontWeight: '500',
    margin: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationColor: Constant.backColor
  },
  textBox: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '500',
    paddingBottom: 0,
    marginBottom: 10,
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
    birthDate: state.agent.birthDate,
  };
};

export default connect(mapStateToProps, {
  getBalance,
  registerAgency,
  generateOTP
})(OptValidation);