import axios from 'axios';
import {
    AGENT_FNAME_CHANGED,
    AGENT_LNAME_CHANGED,
    AGENT_EMAILID_CHANGED,
    AGENT_MOBILENO_CHANGED,
    AGENT_PASSWORD_CHANGED,
    AGENT_USERNAME_CHANGED,

    AGENT_STATE_CHANGED,
    AGENT_ZONE_CHANGED,
    AGENT_BRANCH_CHANGED,

    AGENT_BANKNAME_CHANGED,
    AGENT_BANKBRANCH_CHANGED,
    AGENT_ACHOLDER_CHANGED,
    AGENT_ACCNO_CHANGED,
    AGENT_IFSE_CHANGED,
    AGENT_ADDRESS_PROOF_TYPE,
    AGENT_ACTIVATION,
    AGENT_BIRTH_DATE

} from './types'
import {CallApi} from '../services/apiCall'
import Constant from '../services/apiConstant'
import { NavigationActions } from '@expo/ex-navigation';

export const registerAgency = () => {
    return (dispatch, getState) => {

        let agency = {

            firstName: getState().agent.firstName,
            lastName: getState().agent.lastName,
            mobileNo: getState().agent.mobileNo,
            userName: getState().agent.userName,
            email: getState().agent.email,
            password: getState().agent.password,
            addressProofType: getState().agent.addressProofType,
            stateName: getState().agent.stateName,
            zone: getState().agent.zone,
            agentBranch: getState().agent.agentBranch,
            bankName: getState().agent.bankName,
            branchName: getState().agent.branchName,
            acHolderName: getState().agent.acHolderName,
            acNumber: getState().agent.acNumber,
            IFSECode: getState().agent.IFSECode,
            isActive:  getState().agent.isActive,
            birthdate: ''
        };
debugger
        // return CallApi(Constant.baseUrl+Constant.signIn,'get',{},{"Accept":"application/json"})
        //     .then((response)=>{
        //         let user = {
        //             email:email,
        //             password:password,
        //             token:response.data.token
        //         };
        //         AsyncStorage.setItem('user',JSON.stringify(user),(res)=>{
        //         });
        //
        //     })
        //     .catch((error)=>{
        //         debugger;
        //         return Promise.reject(error);
        //     })
    };
};


export const fnameChanged = (text) => {
    return { type: AGENT_FNAME_CHANGED, payload: text };
};

export const lnameChanged = (text) => {
    return { type: AGENT_LNAME_CHANGED, payload: text };
};

export const emailChanged = (text) => {
    return { type: AGENT_EMAILID_CHANGED, payload: text };
};

export const mobileChanged = (text) => {
    return { type: AGENT_MOBILENO_CHANGED, payload: text };
};

export const passwordChanged = (text) => {
    return { type: AGENT_PASSWORD_CHANGED, payload: text };
};

export const usernameChanged = (text) => {
    return { type: AGENT_USERNAME_CHANGED, payload: text };
};

export const stateChanged = (text) => {
    return { type: AGENT_STATE_CHANGED, payload: text };
};

export const zoneChanged = (text) => {
    return { type: AGENT_ZONE_CHANGED, payload: text };
};

export const branchChanged = (text) => {
    return { type: AGENT_BRANCH_CHANGED, payload: text };
};

export const bankNameChanged = (text) => {
    return { type: AGENT_BANKNAME_CHANGED, payload: text };
};

export const bankBranchChanged = (text) => {
    return { type: AGENT_BANKBRANCH_CHANGED, payload: text };
};

export const acHolderNameChanged = (text) => {
    return { type: AGENT_ACHOLDER_CHANGED, payload: text };
};

export const accountNoChanged = (text) => {
    return { type: AGENT_ACCNO_CHANGED, payload: text };
};

export const IFSEChanged = (text) => {
    return { type: AGENT_IFSE_CHANGED, payload: text };
};

export const agentActivate = (text) => {
    return { type: AGENT_ACTIVATION, payload: text };
};

export const agentAddressProofType = (text) => {
    return { type: AGENT_ADDRESS_PROOF_TYPE, payload: text };
};

export const agentBirthDate = (text) => {
    return { type: AGENT_BIRTH_DATE, payload: text };
};
