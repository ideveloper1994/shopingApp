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
    TouchableOpacity,
    Image
} from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../commonComponent/navBar';
import Constant from '../../helper/constant';
import Button from '../../commonComponent/button';

var ImagePicker = require('react-native-image-picker');

class AgentDocument extends Component {

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            pancardSrc: '',
            otherIdSrc: ''
        };
    }

    onBackButtonPress = () => {
        this.props.navigator.pop();
    };

    onNextButtonPress = () => {
        this.props.navigator.push('agentBankDetail');
    };

    onPancardPress = () => {
        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    pancardSrc: source
                });
            }
        });
    };


    onOtherIdPress = () => {

        ImagePicker.showImagePicker((response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    otherIdSrc: source
                });
            }
        });
    };


    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render() {
        return (
            <View style={{flex:1}}>
                <NavigationBar title="Documents"
                               onBackButtonPress={this.onBackButtonPress}
                />
                <ScrollView showsVerticalScrollIndicator={false}>

                    <View style={{flexDirection: 'row', marginTop: 30, justifyContent:'space-around'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>
                                {"* "}
                            </Text>
                            <Text style={{fontSize:15}}>
                                Pan Card
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onPancardPress()}>
                            <View style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                         justifyContent: 'center',
                         alignItems: 'center',
                        backgroundColor: Constant.backColor}}>
                                <Text style={{fontSize:30,color:'#FFF'}}>+</Text>
                            </View>

                            <Image source={this.state.pancardSrc}
                                   style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                                   position:'absolute'
                                   }}/>
                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30, justifyContent:'space-around'}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize:15,color:'red'}}>
                                {"* "}
                            </Text>
                            <Text style={{fontSize:15}}>
                                Other Id
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.onOtherIdPress()}>
                            <View style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                         justifyContent: 'center',
                         alignItems: 'center',
                        backgroundColor: Constant.backColor}}>
                                <Text style={{fontSize:30,color:'#FFF'}}>+</Text>
                            </View>

                            <Image source={this.state.otherIdSrc}
                                   style={{height:Constant.screenWidth/5, width:Constant.screenWidth/5,
                                   position:'absolute'
                                   }}/>
                        </TouchableOpacity>

                    </View>
                    <View style={{alignItems:'center'}}>
                        <Text style={{fontSize:13, paddingTop:20, width:'90%', alignSelf:'center'}}>
                            For other Id you can use your Aadhar card, Voting card or Driving licence.
                        </Text>
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
    };
};

export default connect(mapStateToProps, {

})(AgentDocument);