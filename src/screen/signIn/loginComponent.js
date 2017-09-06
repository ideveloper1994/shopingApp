import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Alert,
    AsyncStorage,
    View,
    TextInput,
    TouchableHighlight,
    Keyboard
} from 'react-native';
import { showAlert } from '../../services/apiCall';
import Constant from '../../helper/constant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    emailChanged,
    passChanged,
    loginUser,
} from '../../actions/userAction';
import { connect } from 'react-redux';
import Button from '../../commonComponent/button';

class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email || '',
            password: this.props.password || '',
            isLoading: false
        };
    }

    ////On Login Press validate the field and make call
    onLoginPress = () => {
        if(this.props.email.trim().length <= 0 || this.props.password.trim().length <= 0) {
            showAlert('Enter Data in all fields.');
        }
        else if(!this.validateEmail(this.props.email.trim())) {
            showAlert('Enter valid Email Address');
        }
        else {
            Keyboard.dismiss();
            this.props.loginUser(this.props.email, this.props.password)
                .then(()=>{
                    this.props.onSignInPress();
                })
                .catch((err)=>{showAlert("Login fail please try again")});

        }
    };

    //Email validation
    validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    //Focus on next field - onpress keyboard next
    focusNextField = (nextField) => {
        this.refs[nextField].focus();
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={ styles.titleFont }>
                    Account Login
                </Text>

                <View style={ styles.outerTextView }>
                    <View style={ styles.iconView }>
                        <Ionicons name='ios-mail-outline' size={30} color={Constant.lightTheamColor}/>
                    </View>
                    <View style={{justifyContent:'center', flex: 8.5}}>
                        <TextInput  ref="txtEmail"
                                    value={this.props.email}
                                    keyboardType={'email-address'}
                                    placeholder={"Email"}
                                    placeholderTextColor={ Constant.lightTheamColor }
                                    style={ styles.textBox }
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType={'next'}
                                    onChangeText={(text) => {this.props.emailChanged(text)}}
                                    onSubmitEditing={() => this.focusNextField('txtPassword')}
                                    underlineColorAndroid={Constant.transparent}
                        />
                    </View>
                </View>
                <View style={ styles.textBorder }/>
                <View style={ styles.outerTextView }>
                    <View style={ styles.iconView }>
                        <Ionicons name='ios-lock-outline' size={30} color={Constant.lightTheamColor}/>
                    </View>
                    <View style={{justifyContent:'center', flex: 8.5}}>
                        <TextInput ref="txtPassword"
                                   value={this.props.password}
                                   placeholder={"Password"}
                                   placeholderTextColor={ Constant.lightTheamColor }
                                   style={ styles.textBox }
                                   secureTextEntry={true}
                                   returnKeyType={"done"}
                                   blurOnSubmit={true}
                                   onChangeText={(text) => {this.props.passChanged(text);}}
                                   autoCapitalize="none"
                                   autoCorrect={false}
                                   underlineColorAndroid={Constant.transparent}/>
                    </View>
                </View>
                <View style={ styles.textBorder }/>

                <Button title="SIGN IN"
                        backColor="#FFF"
                        color={Constant.backColor}
                        onPress={this.onLoginPress}/>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        email: state.user.email,
        password: state.user.password,
        isLoading: state.user.isLoading,
        navigation:state.navigation
    };
};

export default connect(mapStateToProps, {
    loginUser,
    emailChanged,
    passChanged,

})(LoginComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Constant.backColor,
        paddingTop: 40
    },
    titleFont:{
        color: '#FFFFFF',
        fontSize: 15,
        marginBottom: 60,
        fontWeight: '700',
    },
    textView:{
        backgroundColor: '#FFF'
    },
    btnFont:{
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    btnCreateAcc:{
        color: Constant.lightTheamColor,
        fontSize: 15,
        marginTop: 20,
        padding:10,
        fontWeight: '700',
    },
    textBorder:{
        backgroundColor: Constant.lightTheamColor,
        height:1.5,
        alignSelf: 'center',
        width: Constant.screenWidth - 60
    },
    textBox:{
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 0,
        height:40,
    },
    btnLogin:{
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'center',
        backgroundColor: 'rgb(255,180,0)',
        width: Constant.screenWidth - 60,
        alignItems: 'center',
        justifyContent: 'center',
        padding:17,
        borderRadius: 30
    },
    outerTextView:{
        marginTop: 50,
        marginLeft: 30,
        marginRight: 30,
        height: 40,
        flexDirection: 'row'
    },
    iconView:{
        justifyContent:'center',
        flex: 1.5
    }

});