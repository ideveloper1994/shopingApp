import { APP_SET_USER_DATA,USER_EMAIL_CHANGED,USER_PASS_CHANGED } from '../actions/types'
const INITIAL_STATE = {
    email: "test1@gmail.com",
    password: "dfgdfg",
    token:"",
    isLoading:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

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
        default:
            return state;
    }
}