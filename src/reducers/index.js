
import { combineReducers } from 'redux'
import user from './userReducer';
import agent from './agentRegistrationReducer';
import { NavigationReducer } from '@expo/ex-navigation';

export default combineReducers({
    navigation: NavigationReducer,
    user,
    agent
});