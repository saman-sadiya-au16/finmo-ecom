import { authActionTypes } from "../constants/authConstant";
import { errorActionTypes } from "../constants/errorConstant";

const signupUser = (email, password, firstName, lastName) => {
    const request = () => ({ type: authActionTypes.SEND_SIGNUP_REQUEST });
    const success = (payload) => ({ type: authActionTypes.SEND_SIGNUP_SUCCESS, payload });
    const failure = () => ({ type: authActionTypes.SEND_SIGNUP_FAILURE });
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch) => {
        dispatch(request());
        try {
            dispatch(success({email, password, firstName, lastName}));
        } catch (e) {
            console.log(e);
            const error = {};
            error.message = e.response.data.error;
            error.statusCode = e.response.status
            dispatch(failure());
            dispatch(setError(error));
        }
    }
}

const loginUser = (fullName, password) => {
    const request = () => ({ type: authActionTypes.SEND_LOGIN_REQUEST });
    const success = (payload) => ({ type: authActionTypes.SEND_LOGIN_SUCCESS, payload });
    const failure = () => ({ type: authActionTypes.SEND_LOGIN_FAILURE });
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch) => {
        dispatch(request());
        try {
            dispatch(success({fullName, password}));
        } catch (e) {
            console.log(e);
            const error = {};
            error.message = e.response.data.error;
            error.statusCode = e.response.status
            dispatch(failure());
            dispatch(setError(error));
        }
    }
}

const authAction = {
    signupUser,
    loginUser,
}

export default authAction;