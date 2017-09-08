import React, { Component } from 'react';
import {
    Text,
    Alert,
    AsyncStorage,
    View,
    Keyboard
} from 'react-native';
import LoginComponent from './loginComponent';
import Spinner from '../../helper/loader';
import { connect } from 'react-redux';

class Login extends Component {

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

    onSignInPress = () => {
        this.props.navigator.replace('welcome');
    };

    //Render signIn page component
    render() {
        return (
            <View style={{flex:1}}>
                <LoginComponent
                    email={this.props.email}
                    password={this.props.password}
                    onSignInPress={ this.onSignInPress }
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