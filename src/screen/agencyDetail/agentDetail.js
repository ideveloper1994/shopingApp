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
import {
  getAgencies
} from '../../actions/agentRegistration'
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';
import { isEmpty } from '../../helper/appHelper';
import { showAlert } from '../../services/apiCall';

const {width, height} =Dimensions.get('window');

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
    this.props.getAgencies()
    // this.setState({
    //     agencyDetail: data
    // });
  }

  onActivateCall = (index, flag) => {
      /*
    if(!flag) {
      Alert.alert("Warning!!",
        "\nAre you sure, you want to activate this agency?",
        [
          {text: 'Yes', onPress: () => {
            let arr = this.state.agencyDetail;
            arr[index].isActive = !flag;
            this.setState({
              agencyDetail: arr
            });
          }},
          {text: 'No', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      );
    }*/
  };

  renderAgents = () => {
    return this.props.agencies.map((item,index) => {
        debugger
      return(
        <TouchableHighlight onPress={()=>{this.props.navigator.push('agentFullProfile',{userDetails: item})}}
                            underlayColor={"transparent"}
        >
            <View style={styles.agentView}>
                <View style={styles.imageView}>
                    <Image onLayout={(event) => {this.setState({y: event.nativeEvent.layout.y})}}
                           source={(item.uri)? {uri: item.uri}: require('../../assets/images/avatar-male.png')} style={styles.images} />
                </View>
                <View style={styles.textView}>
                    <View style={{flexDirection:'row'}}>
                        <Text>{(item.firstName)? item.firstName:'N/A'}</Text>
                        <Text>{' '}</Text>
                        <Text>{(item.lastName)? item.lastName:'N/A'}</Text>
                    </View>
                    <View>
                        <Text>{(item.zoneName)? item.zoneName: 'N/A'}</Text>
                    </View>
                    <View>
                        <Text>{(item.email)?item.email:'N/A'}</Text>
                    </View>
                </View>
                <TouchableHighlight style={styles.moreView}
                                    onPress={()=> this.onActivateCall(index, item.isActive)} underlayColor={"transparent"}>
                    <View style={{margin:5}}>
                      {(item.isActive) ?
                        <Image source={require('../../assets/images/icon-quiz-tick.png')} style={{height: 30, width: 30,}}/>
                        :
                        <Image source={require('../../assets/images/icon-quiz-tick-red.png')} style={{height: 30, width: 30,}}/>
                      }
                    </View>

                </TouchableHighlight>
            </View></TouchableHighlight>
      )
    });
  };

  render() {
    return (
      <View style={{flex:1,}}>
          <NavigationTitle title="Agent Detail"/>

          <ScrollView showsVerticalScrollIndicator={false} style={{}}>
            {this.renderAgents()}
              <View style={{height:100}}/>
          </ScrollView>

          <View style={{position:'absolute',
            marginTop:height-width*0.2-15, marginLeft: width-width*0.2-15}}>
              <TouchableHighlight underlayColor="transparent"
                                  onPress={() => {this.props.navigator.push('agentFormPersonal');}}
                                  style={{width:width*0.2, height:width*0.2,}} >
                  <Image source={require('../../assets/images/plus.png')}
                         style={{ alignSelf:'center', backgroundColor:'white', borderRadius:30}}/>
              </TouchableHighlight>
          </View>

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
  agentView:{
    flex:1,
    width: width-20,
    height: height*0.14,
    backgroundColor:'rgba(224,235,235,.8)',
    alignSelf:'center',
    margin:10,
    marginBottom:0,
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
    justifyContent:'space-between',
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
  };
};

export default connect(mapStateToProps, {
  getAgencies
})(AgentDetail);