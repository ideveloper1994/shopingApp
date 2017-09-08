import {
    START_LOADING,
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
    AGENT_BIRTH_DATE,

    GET_ALL_STATES_FAILED,
    GET_ALL_STATES_SUCCESS,

    GET_ALL_ZONES_FAILED,
    GET_ALL_ZONES_SUCCESS,

    GET_ALL_BRANCHES_SUCCESS,
    GET_ALL_BRANCHES_FAILED,

    GET_ALL_AGENCIES,

    AGENT_IMAGES,
    CHANGE_ACTIVATION,
    CLEAR_AGENT,
    REDEEM_BALANCE,
    REGISTERED_USER

} from './types'
import {CallApi} from '../services/apiCall'
import Constant from '../services/apiConstant'
import { NavigationActions } from '@expo/ex-navigation';
import axios from 'axios';

export const registerAgency = () => {
    return (dispatch, getState) => {

        // let agency = {
        //     firstName: getState().agent.firstName,
        //     lastName: getState().agent.lastName,
        //     mobileNo: getState().agent.mobileNo,
        //     userName: getState().agent.userName,
        //     email: getState().agent.email,
        //     password: getState().agent.password,
        //     addressProofType: getState().agent.addressProofType,
        //     stateName: getState().agent.stateName,
        //     zone: getState().agent.zone,
        //     agentBranch: getState().agent.agentBranch,
        //     bankName: getState().agent.bankName,
        //     branchName: getState().agent.branchName,
        //     acHolderName: getState().agent.acHolderName,
        //     acNumber: getState().agent.acNumber,
        //     IFSECode: getState().agent.IFSECode,
        //     isActive:  getState().agent.isActive,
        //     birthdate: getState().agent.birthDate
        // };
        debugger;

        let token = 'Bearer ' + getState().user.token;
        const config = { headers: { "Content-Type": "multipart/form-data", "Authorization": token } };
        let formData = new FormData();
        formData.append('firstName',getState().agent.firstName);
        formData.append('lastName',getState().agent.lastName);
        formData.append('mobileNo',getState().agent.mobileNo);
        formData.append('role',"agency");
        formData.append('email',getState().agent.email);
        formData.append('password',getState().agent.password);
        formData.append('zoneId',getState().agent.selectedZone._id || 0);
        formData.append('stateId',getState().agent.selectedState._id || 0);
        formData.append('branchId',getState().agent.selectedBranch._id || 0);
        formData.append('birthDate',getState().agent.birthDate);

        if(getState().agent.agentImages.addressImage != null){
            formData.append("image", {uri: getState().agent.agentImages.addressImage.uri,
                name: getState().agent.agentImages.addressImage.fileName,
                type: 'multipart/form-data'});
        }

        if(getState().agent.agentImages.pancardImage != null){
            formData.append("image", {uri: getState().agent.agentImages.pancardImage.uri,
                name: getState().agent.agentImages.pancardImage.fileName,
                type: 'multipart/form-data'});
        }

        if(getState().agent.agentImages.profileImage != null){

            formData.append("image",{uri: getState().agent.agentImages.profileImage.uri,
                name: getState().agent.agentImages.profileImage.fileName,
                type: 'multipart/form-data'});
        }

        // formData.append("image", images);



        debugger

        let agencyDetail = {
            name: getState().agent.firstName + " " + getState().agent.lastName,
            proofType: getState().agent.addressProofType,
            bankName: getState().agent.bankName,
            bankBranchName: getState().agent.branchName,
            accountHolderName: getState().agent.acHolderName,
            awsAccountNumber: getState().agent.acNumber,
            IFSCcode: getState().agent.IFSECode,
            branchName: getState().agent.selectedBranch.name,
            zoneName: getState().agent.selectedZone.name,
            stateName: getState().agent.selectedState.name,
            isActive:  false,
        };
        formData.append('agency',JSON.stringify(agencyDetail));

        return axios.post(Constant.baseUrl+Constant.registerUser, formData, config)
            .then(res => {
                dispatch({
                    type: CLEAR_AGENT,
                });
                return Promise.resolve(res);
            }).catch(err => {
                return Promise.reject(res);
            });

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

export const getAllStates = () => {
    return (dispatch, getState) => {
        return CallApi(Constant.baseUrl + Constant.state, 'get', {}, {})
            .then((response)=>{
                dispatch({
                    type: GET_ALL_STATES_SUCCESS,
                    payload: response,
                });
            })
            .catch((error)=>{
                dispatch({
                    type: GET_ALL_STATES_FAILED,
                });
                return Promise.reject(error);
            })
    };
};

export const getAllZones = () => {
    return (dispatch, getState) => {
        return CallApi(Constant.baseUrl + Constant.zones, 'get', {}, {})
            .then((response)=>{
                dispatch({
                    type: GET_ALL_ZONES_SUCCESS,
                    payload: response,
                });
            })
            .catch((error)=>{
                dispatch({
                    type: GET_ALL_ZONES_FAILED,
                });
                return Promise.reject(error);
            })
    };
};

export const getAllBranches = () => {
    return (dispatch, getState) => {
        return CallApi(Constant.baseUrl + Constant.branch, 'get', {}, {})
            .then((response)=>{
                dispatch({
                    type: GET_ALL_BRANCHES_SUCCESS,
                    payload: response,
                });
            })
            .catch((error)=>{
                dispatch({
                    type: GET_ALL_BRANCHES_FAILED,
                });
                return Promise.reject(error);
            })
    };
};

export const getAgencies = () => {
    return (dispatch, getState) => {
        let token = 'Bearer '+getState().user.token;
        return CallApi(Constant.baseUrl + Constant.agencies, 'get', {}, {"Authorization": token})
            .then((response)=> {
                let agencyArray = [];
                response.map((agency) => {
                    let agencyObj = {
                        profile: agency.profile,
                        email: agency.email,
                        firstName: agency.firstName,
                        lastName: agency.lastName,
                        mobileNo: agency.mobileNo
                    };
                    agencyObj = Object.assign(agencyObj, agency.Agencies[0]);
                    agencyArray.push(agencyObj);
                });
                dispatch({
                    type: GET_ALL_AGENCIES,
                    payload: agencyArray,
                });
            })
            .catch((error)=>{
                return Promise.reject(error);
            })
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

export const agentImages = (text) => {
    return { type: AGENT_IMAGES, payload: text };
};

export const updateAgencyActivation = (text) => {
    return { type: CHANGE_ACTIVATION, payload: text };
};

export const callAgencyActivation = (agencyId, bodyData) => {
    return (dispatch, getState) => {
        dispatch({
            type: START_LOADING,
            payload: true,
        });
        let token = 'Bearer '+getState().user.token;
        return CallApi(Constant.baseUrl + "api/users/" + agencyId + Constant.updateActive, 'put', bodyData, {"Authorization": token})
            .then((response)=> {
                dispatch({
                    type: REDEEM_BALANCE,
                    payload: ''
                });
                dispatch({
                    type: START_LOADING,
                    payload: false,
                });
                return Promise.resolve(response);
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

