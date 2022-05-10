import { errorActionTypes } from "../constants/errorConstant";
import { productsActionTypes } from "../constants/productConstant";
import productService from "../services/productService";

const getProducts = () => {
    const request = () => ({ type: productsActionTypes.GET_ALL_PRODUCTS_REQUEST });
    const success = (payload) => ({ type: productsActionTypes.GET_ALL_PRODUCTS_SUCCESS, payload });
    const failure = () => ({ type: productsActionTypes.GET_ALL_PRODUCTS_FAILURE });
    const setError = (error) => ({ type: errorActionTypes.SET_ERROR, error });

    return async (dispatch) => {
        dispatch(request());
        try {
            const response = await productService.getProducts();
            dispatch(success(response.data));
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

const setProductDetails = (item) => {
    const setProduct = (payload) => ({ type: productsActionTypes.SET_PRODUCT_DETAILS, payload});
    return async (dispatch) => {
        dispatch(setProduct(item));
    }
}

const addProductToCart = (item) => {
    const cartItem = {...item, qty: 1, itemTotalPrice: item.price * 1 };
    const addToCart = (payload) => ({ type: productsActionTypes.ADD_PRODUCT_TO_CART, payload});
    return async (dispatch) => {
        dispatch(addToCart(cartItem));
    }
}

const removeProductFromCart = (item) => {
    const removeFromCart = (payload) => ({ type: productsActionTypes.REMOVE_PRODUCT_FROM_CART, payload});
    return async (dispatch) => {
        dispatch(removeFromCart(item.id));
    }
}

const increaseCartQty = (item) => {
    const increaseCartQuantity = (payload) => ({ type: productsActionTypes.INCREASE_PRODUCT_QUANTITY, payload});
    return async (dispatch) => {
        dispatch(increaseCartQuantity(item.id));
    }
}

const decreaseCartQty = (item) => {
    const decreaseCartQuantity = (payload) => ({ type: productsActionTypes.DECREASE_PRODUCT_QUANTITY, payload});
    return async (dispatch) => {
        dispatch(decreaseCartQuantity(item.id));
    }
}

const productAction = {
    getProducts,
    setProductDetails,
    addProductToCart,
    removeProductFromCart,
    increaseCartQty,
    decreaseCartQty,
}

export default productAction;