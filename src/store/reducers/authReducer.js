import { authActionTypes } from "../../constants/authConstant";

let initState = {
    isLoggedIn: false,
    isLoading: false,
    showLogin: true,
}

const authReducer = (state = initState, action) =>{
    switch (action.type) {
        case authActionTypes.SEND_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case authActionTypes.SEND_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.admin,
                token: action.payload.token,
                isLoading: false,
            }
        case authActionTypes.SEND_LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
            }
        case authActionTypes.SEND_SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case authActionTypes.SEND_SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountCreated: true,
                userCreated: action.payload,
            }
        case authActionTypes.SEND_SIGNUP_FAILURE:
            return {
                ...state,
                isLoading: false,
            }
        case authActionTypes.TOGGLE_SHOW_LOGIN_FORM:
            return {
                ...state,
                showLogin: !state.showLogin,
            }
        case authActionTypes.LOGOUT:
            return {
                isLoggedIn: false,
                isLoading: false,
                showLogin: true,
            }
        default:
            return state
    }
}

export default authReducer;