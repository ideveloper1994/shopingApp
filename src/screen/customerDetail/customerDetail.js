import React, { Component } from 'react';
import {
    StyleSheet,
    Text, Image,
    Alert, TouchableHighlight,
    AsyncStorage,
    View,
    Keyboard,
    TextInput, Dimensions,
    ScrollView,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import NavigationTitle from '../../commonComponent/navBarTitle';
import {
    getAgencies,
    callAgencyActivation,
    updateAgencyActivation,
  getBalance,
    getCustomer,
    getParent,
    getProfile
} from '../../actions/agentRegistration'
import { showAlert } from '../../services/apiCall';
import Constant from '../../helper/constant';
import Spinner from '../../helper/loader';
import _ from 'lodash';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} =Dimensions.get('window');

class AgentDetailRow extends Component {

    render() {
        return (
            <TouchableHighlight onPress={()=>{this.props.onSelectRow(this.props.item)}}
                                underlayColor={"transparent"}>
                <View style={styles.agentView}>
                    <View style={styles.imageView}>
                        <Image onLayout={(event) => {this.setState({y: event.nativeEvent.layout.y})}}
                               source={(this.props.item.uri)? {uri: this.props.item.uri}:
                                   require('../../assets/images/avatar-male.png')} style={styles.images} />
                    </View>
                    <View style={[styles.textView,{flexDirection:'column'}]}>
                        <View style={{flexDirection:'row'}}>
                            <Text>{(this.props.item.firstName)? this.props.item.firstName:'N/A'}</Text>
                            <Text>{' '}</Text>
                            <Text>{(this.props.item.lastName)? this.props.item.lastName:'N/A'}</Text>
                        </View>
                        {/*<View>*/}
                            {/*<Text>{(this.props.item.zoneName)? this.props.item.zoneName: 'N/A'}</Text>*/}
                        {/*</View>*/}
                        <View>
                            <Text>{(this.props.item.email)? this.props.item.email:'N/A'}</Text>
                        </View>
                    </View>
                    {/*<TouchableHighlight style={styles.moreView}*/}
                                        {/*onPress={() => {*/}
                                            {/*debugger;*/}
                                            {/*if(this.props.isActive) {*/}
                                              {/*this.props.onActivateCall(this.props.index, this.props.item)*/}
                                            {/*}else {*/}
                                              {/*showAlert("Please contact admin to activate user")*/}
                                            {/*}*/}
                                        {/*}*/}
                                        {/*}*/}
                                        {/*underlayColor={"transparent"}>*/}
                        {/*<View style={{margin:5}}>*/}
                            {/*{(this.props.item.isActive) ?*/}
                                {/*<Image source={require('../../assets/images/icon-quiz-tick.png')} style={{height: 30, width: 30,}}/>*/}
                                {/*:*/}
                                {/*<Image source={require('../../assets/images/icon-quiz-tick-red.png')} style={{height: 30, width: 30,}}/>*/}
                            {/*}*/}
                        {/*</View>*/}

                    {/*// </TouchableHighlight>*/}
                </View>
            </TouchableHighlight>
        );
    }
}

class AgentDetail extends Component {

    constructor(props){
        super(props);
        this.state={
            agencyDetail:[]
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    componentDidMount(){
        debugger
      this.props.getBalance().then((responseJSON) => console.log(responseJSON.toString())).catch((err) => console.log(err.toString()))
      this.props.getCustomer().then(res => {}).catch(err => {})
        this.props.getParent().then(res => {}).catch(err => {})
        this.props.getProfile().then(res => {}).catch(err => {})
    }

    onActivateCall = (index, agency) => {
        this.props.getBalance().then((responseJSON) => {
          if(!agency.isActive) {
            if(this.props.balance >= 1000) {
                debugger
              Alert.alert("",
                "Are you sure, you want to activate this agency?",
                [
                  {text: 'Yes', onPress: () => {
                      debugger
                    this.props.callAgencyActivation(agency.userId,{isActive: true})
                      .then(res => {
                          debugger
                        let arr =  _.cloneDeep(this.props.agencies);
                        arr[index].isActive = true;
                        this.props.updateAgencyActivation(arr);
                      })
                      .catch(err => {
                        if(err.response && err.response.data.message){
                          showAlert(err.response.data.message)
                        }else{
                          showAlert("Login fail please try again")
                        }
                      });

                  }},
                  {text: 'No', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              );
            }else{
              Alert.alert("Not able to register agency," +
                " \n please check your balance.");

            }
            }
          }).catch((error) => {
            debugger
        })
  /*      this.props.getBalance().then((response) => {
          if(!agency.isActive) {
            if(this.props.balance >= 1000){
                debugger
              Alert.alert("Are you sure, you want to activate this agency?",
                [
                  {text: 'Yes', onPress: () => {
debugger
                  }},
                  {text: 'No', onPress: () => {
                      debugger
                    console.log('OK Pressed')
                  }},
                ],
                { cancelable: false }
              );


            }else{
              Alert.alert("Not able to register agency," +
                " \n please check your balance.");
            }
          }
        }).catch((err) => {
debugger
        })*/
    };


    onAddAgencyCall = () => {
        if(this.props.isActive){
          this.props.navigator.push('agentForm');
        } else {
            showAlert("Please contact admin to activate user")
        }

    };

    onSelectRow = (item) => {
        debugger
        this.props.navigator.push('customerPersonalDetail',{userDetails: item});
    };

    renderAgents = () => {
      debugger;
        return this.props.customers.map((item,index) => {

            return(
                <AgentDetailRow item={item} onSelectRow={this.onSelectRow}/>
            )
        });
    };

    onLogOut = () =>{
      this.props.navigator.push('settings');
    };

    render() {
        debugger
        console.log('customers-->',this.props.customers)
        return (
            <View style={{flex:1,backgroundColor: '#fff'}}>
                <NavigationTitle title="Customer Detail"/>
                <View style={{height:10}}/>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    removeClippedSubviews={false}
                    data={this.props.customers}
                    renderItem={({item, index}) => <AgentDetailRow item={item}
                                                                   isActive={this.props.isActive}
                                                                   index={index}
                                                                   onSelectRow={this.onSelectRow}
                                                                   onActivateCall={this.onActivateCall}
                     />
                    }
                />


              {
                (this.props.role === 'do' || this.props.role === 'agn' || this.props.role === 'agency' )?
                  <View style={{position:'absolute',backgroundColor:'transparent',
                    marginTop:height-width*0.2-15, marginLeft: width-width*0.2-15}}>
                      <TouchableHighlight underlayColor="transparent"
                                          onPress={() => this.onAddAgencyCall()}
                                          style={{width:width*0.2, height:width*0.2,backgroundColor:'transparent'}} >
                          <Image source={require('../../assets/images/plus.png')}
                                 style={{ alignSelf:'center', borderRadius:30}}/>
                      </TouchableHighlight>
                  </View>:<View/>

              }

                <View style={{position:'absolute', top: (Constant.IOS) ? 25 : 15, left: 20, height:30,width:30}}>
                    <TouchableHighlight underlayColor="transparent"
                                        onPress={() => this.onLogOut()}>
                        <FontAwesome name='user-circle' size={30} color={"#FFF"}/>
                    </TouchableHighlight>
                </View>
                <Spinner visible={this.props.isLoading} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    outerView:{
        width: "90%",
        alignSelf: 'center',
        paddingTop: 20,

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
    agentView:{
        flex:1,
        width: width-20,
        height: height*0.14,
        backgroundColor:'rgba(224,235,235,.8)',
        alignSelf:'center',
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        marginTop:0,
        flexDirection:'row',
        borderRadius:6
    },
    imageView: {
        alignSelf:'center',
        marginLeft:12
    },
    images: {
        width: height*0.1,
        height: height*0.1,
    },
    textView:{
        margin:12,
        justifyContent:'center',
        flex:1,
    },
    moreView:{
        marginRight:12,
        justifyContent:'center',
        alignItems:'center',
    }
});

const mapStateToProps = state => {
    return {
        agencies: state.agent.agencies,
        customers:state.agent.customers,
        balance: (state.user.userDetail.Balance) ? state.user.userDetail.Balance : 0,
        role: (state.user.userDetail.role) ? state.user.userDetail.role : 0,
        isActive:(state.user.userDetail.isActive)?state.user.userDetail.isActive:false
    };
};

export default connect(mapStateToProps, {
    getAgencies,
    callAgencyActivation,
    updateAgencyActivation,
  getBalance,
    getCustomer,
    getParent,
    getProfile
})(AgentDetail);
/*Alert.alert(
                "Are you sure, you want to activate this agency?",
                [
                  {text: 'Yes', onPress: () => {
                      debugger
                    this.props.callAgencyActivation(agency._id,{isActive: true})
                      .then(res => {
                        let arr =  _.cloneDeep(this.props.agencies);
                        arr[index].isActive = true;
                        this.props.updateAgencyActivation(arr);
                      })
                      .catch(error => {
                          debugger
                      });

                  }},
                  {text: 'No', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              );

*/