import axios from 'axios';
import {
    USER_EMAIL_CHANGED,
    USER_PASS_CHANGED,
    REGISTERED_USER,
    APP_SET_USER_DATA,
    START_LOADING,
    LOGOUT_USER
} from './types'
import { AsyncStorage } from 'react-native';
import {CallApi} from '../services/apiCall'
import Constant from '../services/apiConstant'
import { NavigationActions } from '@expo/ex-navigation';
import { getAgencies,
    getAllBranches,
    getAllStates,
    getAllZones } from './agentRegistration';

export const loginUser = (email, password) => {
    return (dispatch, getState) => {

        dispatch({
            type: START_LOADING,
            payload: true,
        });

        return CallApi(Constant.baseUrl+Constant.signIn,'post',{ email: email, password: password},{})

            .then((response)=>{
                let user = {
                    email:email,
                    password:password,
                    token:response.data.token,
                    balance: response.data.user.Balance
                };
                AsyncStorage.setItem('user',JSON.stringify(user),(res)=>{
                });
debugger
                dispatch({
                    type: APP_SET_USER_DATA,
                    payload: user
                });

                dispatch({
                    type: REGISTERED_USER,
                    payload: response.data.user
                });

                // return Promise.all([
                    dispatch(getAgencies());
                // ]).then(res => {
                    dispatch({
                        type: START_LOADING,
                        payload: false,
                    });
                    return Promise.resolve(true);
                // }).catch(err => {
                //     return Promise.reject(err);
                // });

            })
            .catch((error)=>{
                dispatch({
                    type: START_LOADING,
                    payload: false,
                });
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

export const emailValidate = (email) => {
    return (dispatch, getState) => {
        let token = 'Bearer ' + getState().user.token;
        return CallApi(Constant.baseUrl+Constant.validateEmail+email,'get',{},{"Authorization": token})

            .then((response)=>{
                return Promise.resolve(true);
            })
            .catch((error)=>{
                return Promise.reject(false);
            })
    };
};

export const phoneValidate = (phoneNo) => {
    return (dispatch, getState) => {
        let token = 'Bearer ' + getState().user.token;
        return CallApi(Constant.baseUrl+Constant.validatePhoneNo+phoneNo,'get',{},{"Authorization": token})

            .then((response)=>{
                return Promise.resolve(true);
            })
            .catch((error)=>{
                return Promise.reject(false);
            })
    };
};
export const changePassword = (oldPass, newPass) => {
    return (dispatch, getState) => {
        debugger
        let token = 'Bearer ' + getState().user.token;
        console.log(getState().user.userDetail._id)
        console.log(Constant.baseUrl+Constant.changePassword+getState().user.userDetail._id)
        debugger
        return CallApi(Constant.baseUrl+Constant.changePassword+getState().user.userDetail._id+Constant.password,'put',{oldPassword:oldPass,newPassword:newPass},{"Authorization": token})

            .then((response)=>{
            debugger
                return Promise.resolve('Password has changed successfully');
            })
            .catch((error)=>{
            debugger
                return Promise.reject('something went wrong. Please try again');
            })
    };
};

export const logoutUser = () => {
    return (dispatch, getState) => {
        dispatch({
            type: LOGOUT_USER,
            payload: '',
        });
        return Promise.resolve(true);
    };
};