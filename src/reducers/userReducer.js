import { APP_SET_USER_DATA,USER_EMAIL_CHANGED,USER_PASS_CHANGED, REGISTERED_USER, START_LOADING } from '../actions/types'
const INITIAL_STATE = {
    email: "emiadda@gmail.com",
    password: "emiadda",
    token:"",
    isLoading:false,
    userDetail:{},
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case START_LOADING: {
            return {
                ...state,
                isLoading: action.payload,
            };
        }

        case APP_SET_USER_DATA: {
            return {
                ...state,
                email: state.email,
                password: state.password,
                token: action.payload.token
            };
        }

        case USER_EMAIL_CHANGED: {
            return {
                ...state,
                email: action.payload,

            };
        }
        case USER_PASS_CHANGED: {
            return {
                ...state,
                password: action.payload,

            };
        }

        case REGISTERED_USER: {
            return {
                ...state,
                userDetail: action.payload,

            };
        }

        default:
            return state;
    }
}