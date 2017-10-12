import React, {Component} from "react";
import {StyleSheet, Text, Alert,
    AsyncStorage, View, Keyboard, TextInput,Linking,
    ScrollView ,Platform , Image} from "react-native";
import {connect} from "react-redux";
import NavigationBar from "../commonComponent/navBar";
import Constant from '../helper/constant'
import Spinner from '../helper/loader';

import Button from "../commonComponent/button";
import { showAlert } from '../services/apiCall';
import { changePassword,sendForgotPassword } from '../actions/userAction'

class UpdatePage extends Component {

    constructor(props){
        super(props);

    }

    goToStore = () => {
        const APP_STORE_LINK = 'itms://itunes.apple.com/us/app/apple-store/com.UBMe?mt=8';

         const PLAY_STORE_LINK = 'market://details?id=com.shopapp';
        if(Platform.OS =='ios'){
               Linking.openURL(APP_STORE_LINK).catch(err => console.error('An error occurred', err));
        }
        else{
            Linking.openURL(PLAY_STORE_LINK).catch(err => console.error('An error occurred', err));
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{paddingBottom:40}}>
                    <Image style={{width:Constant.screenWidth/3,height:Constant.screenWidth/3}}
                           resizeMode={'contain'}
                           source={require('../assets/images/appicon.jpg')}/>
                </View>
                <Text style={{fontSize:20,fontWeight:'600',color:'rgb(34,53,86)',textAlign:'center'}}>Update Available</Text>
                <Text style={{fontSize:16,fontWeight:'300',color:'rgb(34,53,86)',padding:10,textAlign:'center'}}>
                    {"This version of the app is outdated. Please update app from the "+(Platform.OS =='ios' ? 'App store' : 'play store')+"."}
                </Text>
                <View>
                    <Button title={"Go to "+(Platform.OS =='ios' ? 'App Store' : 'Play Store')}
                            onPress={this.goToStore}
                            color="white"
                            backColor="rgb(34,53,86)"/>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
});

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, {
    changePassword,
    sendForgotPassword
})(UpdatePage);