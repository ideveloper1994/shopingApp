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

const {width, height} =Dimensions.get('window');
const data = [
    {id:1, name:'PartyWear ', lname:'Glasses', zone:'INR 1596', uri: require('../../assets/images/avatar-male.png'),},
    {id:2, name:'Glasses ', lname:'Coat',zone:'INR 895', uri: require('../../assets/images/avatar-male.png'),},
    {id:3, name:'Wool Coat ', lname:'Glasses',zone:'INR 2569', uri: require('../../assets/images/avatar-male.png'),},
    {id:4, name:'Long Trench ', lname:'Coat',zone:'INR 956', uri: require('../../assets/images/avatar-male.png'),},
    {id:5, name:'Glasses ', lname:'Coat',zone:'INR 1862', uri: require('../../assets/images/avatar-male.png'),},
    {id:6, name:'Hombug ', lname:'Glasses',zone:'INR 939', uri: require('../../assets/images/avatar-male.png'),},
    {id:7, name:'Blend Coat ',lname:'Coat', zone:'INR 3955', uri: require('../../assets/images/avatar-male.png'),},
];

class AgentDetail extends Component {

    constructor(props){
        super(props);
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    renderAgents = () => {
        return data.map(item => {
            return(
                <View style={styles.agentView}>
                    <View style={styles.imageView}>
                        <Image onLayout={(event) => {this.setState({y: event.nativeEvent.layout.y})}} source={item.uri} style={styles.images} />
                    </View>
                    <View style={styles.textView}>
                        <View style={{flexDirection:'row'}}>
                            <Text>{item.name}</Text>
                            <Text>{item.lname}</Text>
                        </View>
                        <View>
                            <Text>{item.zone}</Text>
                        </View>
                        <View>
                            <Text>abc@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.moreView}>
                        <View style={{flex:1,justifyContent:'center',alignSelf:'flex-end', alignItems:'center'}}>
                            <View style={{margin:5}}>
                                {item.id % 2 === 0 ?
                                    <Image source={require('../../assets/images/icon-quiz-tick-red.png')} style={{height: 30, width: 30,}}/>
                                    :
                                    <Image source={require('../../assets/images/icon-quiz-tick.png')} style={{height: 30, width: 30,}}/>
                                }
                                    </View>
                            <View>
                                <TouchableHighlight underlayColor="transparent" onPress={()=>{this.props.navigator.push('agentFullProfile')}}>
                                    <Text style={{color:'blue',}}>Detail</Text>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                </View>
            )
        });
    };

    render() {
        return (
            <View style={{flex:1,}}>
                <NavigationTitle title="Agent Detail"/>

                <ScrollView showsVerticalScrollIndicator={false} style={{}}>
                    {this.renderAgents()}
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
        justifyContent:'space-between'
    },
    moreView:{
        flex:1,
        alignSelf:'center',
        marginRight:12
    }
});

const mapStateToProps = state => {
    return {
        bankName: state.agent.bankName,
        branchName: state.agent.branchName,
        acHolderName: state.agent.acHolderName,
        acNumber: state.agent.acNumber,
        IFSECode: state.agent.IFSECode,
    };
};

export default connect(mapStateToProps, null)(AgentDetail);