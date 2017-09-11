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
    AGENT_ACTIVATION,

    AGENT_ADDRESS_PROOF_TYPE,
    AGENT_BIRTH_DATE,

    GET_ALL_STATES_FAILED,
    GET_ALL_STATES_SUCCESS,

    GET_ALL_ZONES_SUCCESS,
    GET_ALL_ZONES_FAILED,

    GET_ALL_BRANCHES_FAILED,
    GET_ALL_BRANCHES_SUCCESS,
    GET_ALL_AGENCIES,
    AGENT_IMAGES,
    CHANGE_ACTIVATION,
    CLEAR_AGENT,
    REDEEM_BALANCE

} from '../actions/types';
const INITIAL_STATE = {

    firstName: '',
    lastName: '',
    mobileNo: '',
    userName: '',
    email: '',
    password: '',
    birthDate: '',

    stateName: [],
    zone: [],
    agentBranch: [],

    agencies: [],

    bankName: '',
    branchName: '',
    acHolderName: '',
    acNumber: '',
    IFSECode: '',
    isActive: false,
    addressProofType: 'Aadhar card',

    selectedState: {},
    selectedBranch: {},
    selectedZone: {},

    agentImages: {
        addressImage: null,
        pancardImage: null,
        profileImage: null
    },


};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case AGENT_FNAME_CHANGED: {
            return {
                ...state,
                firstName: action.payload,

            };
        }
        case AGENT_LNAME_CHANGED: {
            return {
                ...state,
                lastName: action.payload,

            };
        }
        case AGENT_EMAILID_CHANGED: {
            return {
                ...state,
                email: action.payload,
            };
        }
        case AGENT_MOBILENO_CHANGED: {
            return {
                ...state,
                mobileNo: action.payload,
            };
        }
        case AGENT_PASSWORD_CHANGED: {
            return {
                ...state,
                password: action.payload,
            };
        }
        case AGENT_USERNAME_CHANGED: {
            return {
                ...state,
                userName: action.payload,
            };
        }
        case AGENT_STATE_CHANGED: {
            return {
                ...state,
                selectedState: action.payload,
            };
        }
        case AGENT_ZONE_CHANGED: {
            return {
                ...state,
                selectedZone: action.payload,
            };
        }
        case AGENT_BRANCH_CHANGED: {
            return {
                ...state,
                selectedBranch: action.payload
            };
        }
        case AGENT_BANKNAME_CHANGED: {
            return {
                ...state,
                bankName: action.payload
            };
        }
        case AGENT_BANKBRANCH_CHANGED: {
            return {
                ...state,
                branchName: action.payload
            };
        }
        case AGENT_ACHOLDER_CHANGED: {
            return {
                ...state,
                acHolderName: action.payload
            };
        }
        case AGENT_ACCNO_CHANGED: {
            return {
                ...state,
                acNumber: action.payload
            };
        }
        case AGENT_IFSE_CHANGED: {
            return {
                ...state,
                IFSECode: action.payload
            };
        }
        case AGENT_ACTIVATION: {
            return {
                ...state,
                isActive: action.payload
            };
        }
        case AGENT_ADDRESS_PROOF_TYPE: {
            return {
                ...state,
                addressProofType: action.payload
            };
        }
        case AGENT_BIRTH_DATE: {
            return {
                ...state,
                birthDate: action.payload
            };
        }
        case GET_ALL_STATES_SUCCESS: {
            return {
                ...state,
                stateName: action.payload
            };
        }
        case GET_ALL_STATES_FAILED: {
            return {
                ...state,
            };
        }
        case GET_ALL_ZONES_SUCCESS: {
            return {
                ...state,
                zone: action.payload
            };
        }
        case GET_ALL_ZONES_FAILED: {
            return {
                ...state,
            };
        }
        case GET_ALL_BRANCHES_SUCCESS: {
            return {
                ...state,
                agentBranch: action.payload
            };
        }
        case GET_ALL_BRANCHES_FAILED: {
            return {
                ...state,
            };
        }
        case GET_ALL_AGENCIES: {
            return {
                ...state,
                agencies: action.payload
            };
        }
        case AGENT_IMAGES: {
            return {
                ...state,
                agentImages: action.payload
            };
        }
        case CHANGE_ACTIVATION: {
            return {
                ...state,
                agencies: action.payload
            };
        }
        case CLEAR_AGENT: {
            return {
                ...state,
                firstName: '',
                lastName: '',
                mobileNo: '',
                userName: '',
                email: '',
                password: '',
                birthDate: '',

                bankName: '',
                branchName: '',
                acHolderName: '',
                acNumber: '',
                IFSECode: '',
                isActive: false,
                addressProofType: 'Aadhar card',
                selectedState: {},
                selectedBranch: {},
                selectedZone: {},
            };
        }

        default:
            return state;
    }
}