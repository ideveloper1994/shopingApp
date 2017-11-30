import React, {Component} from "react";
import {StyleSheet, Text, Alert, TouchableHighlight, View, Image, Dimensions, ScrollView, AsyncStorage} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../../commonComponent/navBar";
import { showAlert } from '../../services/apiCall';
import {
  emailChanged,
  passChanged,
  logoutUser
} from '../../actions/userAction'

import {
  getBalance,getAgencies,
  getProfile,
  getParent
} from '../../actions/agentRegistration'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

class Settings extends Component {

  constructor(props){
    super(props);
    debugger
    console.log(this.props.userDetail)
    debugger
    this.state = {
      firstName: (this.props.userDetail.firstName)?this.props.userDetail.firstName:'N/A',
      lastName:(this.props.userDetail.lastName)?this.props.userDetail.lastName:'N/A',
      email: (this.props.userDetail.email)?this.props.userDetail.email:'N/A',
      mobile: (this.props.userDetail.mobileNo)?this.props.userDetail.mobileNo:'N/A',
      userRole:'',
      parentRole:'',
      parentName:''
    };
  }

  componentDidMount(){
    this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()));
    this.props.getAgencies().then().catch();

  }
  componentWillMount(){
    this.props.getProfile().then().catch();
    this.props.getParent().then().catch();
    AsyncStorage.getItem('user_role').then((value) => {
      const t=value;
      debugger
      console.log('setting--',value)
      this.setState({userRole:t.substring(1, t.length-1)})
    })
    AsyncStorage.getItem('parent_role').then((value) => {
      const t=value;
      debugger
      this.setState({parentRole:t.substring(1, t.length-1)})
    })
    AsyncStorage.getItem('parent_name').then((value)=>{
      this.setState({parentName:value})
    })
  }

  onChangeButtonPress = () => {

    if(this.state.currentPassword.trim().length <= 0 || this.state.newPassword.trim().length <= 0 || this.state.confirmPassword.trim().length <= 0) {
      showAlert('Enter Data in all fields.');
    }
    else if(this.state.newPassword !== this.state.confirmPassword) {
      showAlert("password must match confirm password.");
    }
    else {
      console.log("call change password api")
    }
  };

  onChangePasswordPressed = () => {
    this.props.navigator.push('changePassword')
  };


  onBackButtonPress = () => {
    this.props.navigator.pop();
  };
  logoutPressed = () => {
    Alert.alert("Warning!!",
      "\nAre you sure, you want to log out?",
      [
        {text: 'Yes', onPress: () => {
          AsyncStorage.clear();
          this.props.emailChanged('');
          this.props.passChanged('');
          this.props.logoutUser().then(res => {
            this.props.navigator.replace('login');
          }).catch(err=>{
            if(err.response && err.response.data.message){
              showAlert(err.response.data.message)
            }else{
              showAlert("Fail to send OTP, \n please try again.")
            }
          })
        }},
        {text: 'No', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <View style={{flex:1}}>
        <NavigationBar title="Settings" onBackButtonPress={this.onBackButtonPress}/>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.outerView}>
            <View style={styles.listItem}>
              <View style={{alignItems:'center', margin:30}}>
                <Image source={require('../../assets/images/avatar-male.png')}
                       style={{width:width/3.5, height:width/3.5, borderRadius:width/7 }} />
              </View>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Name:</Text>
              <Text style={styles.detailText}>{this.state.firstName + ' ' + this.state.lastName}</Text>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Email:</Text>
              <Text style={styles.detailText}>{this.state.email}</Text>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Mobile:</Text>
              <Text style={styles.detailText}>{this.state.mobile}</Text>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Designation:</Text>
              <Text style={styles.detailText}>{this.state.userRole}</Text>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Parent Designation:</Text>
              <Text style={styles.detailText}>{this.state.parentRole}</Text>
            </View>
            <View style={styles.proView}>
              <Text style={styles.fieldText}>Parent Name:</Text>
              <Text style={styles.detailText}>{this.state.parentName}</Text>
            </View>


            <TouchableHighlight style={{marginTop:50}} onPress={()=>{this.onChangePasswordPressed()}}
                                underlayColor={"transparent"}>

              <View style={styles.proView} >
                <MaterialCommunityIcons name='key-variant' size={25} color={"#000"}/>
                <Text style={[{width: '100%',paddingLeft:15, fontWeight: '500'}]}>Change Password</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=>{this.logoutPressed()}}
                                underlayColor={"transparent"}>

              <View style={styles.proView} >
                <MaterialCommunityIcons name='logout' size={25} color={"#000"}/>
                <Text style={[{width: '100%',paddingLeft:15, fontWeight: '500'}]}>Log Out</Text>
              </View>
            </TouchableHighlight>

          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  outerView:{
    backgroundColor: '#fff'
  },
  listItem:{
    padding:10,
    borderBottomColor:'lightgray',
    borderBottomWidth: 0.7

  },
  listItemText:{
    fontSize: 17
  },
  proView: {
    flexDirection: 'row',
    alignItems:'center',
    padding:10,
    borderBottomColor:'lightgray',
    borderBottomWidth: 0.7
  },
  fieldText:{
    color:'black',
    fontWeight:'800',
    width:100
  },
  detailText:{
    color:'black'
  }
});

const mapStateToProps = state => {
  debugger
  return {
    userDetail: state.user.userDetail
  };
};

export default connect(mapStateToProps, {
  logoutUser,
  getBalance,getAgencies,
  getProfile,
  emailChanged,
  passChanged,
  getParent
})(Settings);