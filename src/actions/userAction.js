import axios from 'axios';
import {
    USER_EMAIL_CHANGED,
    USER_PASS_CHANGED,
} from './types'
import { AsyncStorage } from 'react-native';
import {CallApi} from '../services/apiCall'
import Constant from '../services/apiConstant'
import { NavigationActions } from '@expo/ex-navigation';

export const loginUser = (email, password) => {
    return (dispatch, getState) => {

        return CallApi(Constant.baseUrl+Constant.signIn,'get',{},{"Accept":"application/json"})
            .then((response)=>{
                let user = {
                    email:email,
                    password:password,
                    token:response.data.token
                };
                AsyncStorage.setItem('user',JSON.stringify(user),(res)=>{
                });

            })
            .catch((error)=>{
                debugger;
                return Promise.reject(error);
            })
    };
};

export const createUser = (email, password) => {
    return (dispatch, getState) => {
        return CallApi(Constant.baseUrl + Constant.signUp, 'post', {email: email, password: password}, {})
            .then((response) => {
                return Promise.resolve(response);
            })
            .catch((error) => {
                return Promise.reject(error);
            })
    };
};

export const emailChanged = (text) => {
    return { type: USER_EMAIL_CHANGED, payload: text };
};

export const passChanged = (text) => {
    return { type: USER_PASS_CHANGED, payload: text };
};