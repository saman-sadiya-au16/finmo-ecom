import { combineReducers } from "redux";
import error from './errorReducer';
import auth from './authReducer';
import products from './productReducer';

const rootReducer = combineReducers({
    auth,
    error,
    products,
});

export default rootReducer;