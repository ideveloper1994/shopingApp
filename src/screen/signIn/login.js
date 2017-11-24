import React, { Component } from 'react';
import {
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard,
    BackHandler
} from 'react-native';
import LoginComponent from './loginComponent';
import Spinner from '../../helper/loader';
import { connect } from 'react-redux';

class Login extends Component {

    static route = {
        styles: {
            gestures: null
        },
    };
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false
        };
    }

    //On Login Press make api call
    //@param - {email, password}
    //Response token on success or error message
    handleBackPress1 = () => {
        BackHandler.exitApp();
        return true
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress1', this.handleBackPress1);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress1', this.handleBackPress1);
    }
    onSignInPress = () => {


                this.props.navigator.replace('welcome');

    };
  forgotPasswordClicked = () =>{
    this.props.navigator.push('forgotPassword');
  }
    //Render signIn page component
    render() {
        return (
            <View style={{flex:1}}>
                <LoginComponent
                    email={this.props.email}
                    password={this.props.password}
                    onSignInPress={ this.onSignInPress }
                    forgotPasswordClicked={ this.forgotPasswordClicked }
                />
                <Spinner visible={this.props.isLoading} />

            </View>
        );
    }

}

const mapStateToProps = state => {
    return {
        email: state.user.email,
        password: state.user.password,
        isLoading: state.user.isLoading,
    };
};

export default connect(mapStateToProps, {

})(Login);