import { productsActionTypes } from "../../constants/productConstant";

let initState = {
    productsList: [],
    isLoading: false,
    productDetails: {},
    cart: [],
}

const productsReducer = (state = initState, action) =>{
    switch (action.type) {
        case productsActionTypes.GET_ALL_PRODUCTS_REQUEST:
            return {
                ...state,
                isLoading: true,
                productsList: [],
            };
        case productsActionTypes.GET_ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsList: action.payload,
                isLoading: false,
            };
        case productsActionTypes.GET_ALL_PRODUCTS_FAILURE:
            return{
                ...state,
                isLoading: false,
                productsList: [],
            }
        case productsActionTypes.SET_PRODUCT_DETAILS:
            return {
                ...state,
                productDetails: action.payload,
            }
        case productsActionTypes.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            }
        case productsActionTypes.REMOVE_PRODUCT_FROM_CART:
            const newCart = [...state.cart].filter((item) => item.id !== action.payload);
            return {
                ...state,
                cart: newCart,
            }
        case productsActionTypes.INCREASE_PRODUCT_QUANTITY:
            const newCartClone = [...state.cart].map((item) => {
                if (item.id === action.payload) {
                    return {...item, qty: item.qty + 1, itemTotalPrice: (item.qty + 1) * item.price}
                }
                return item;
            });
            return {
                ...state,
                cart: newCartClone,
            }
        case productsActionTypes.DECREASE_PRODUCT_QUANTITY:
            const newCartArr = [...state.cart].map((item) => {
                if (item.id === action.payload) {
                    if (item.qty > 1) {
                        return {...item, qty: item.qty - 1, itemTotalPrice: (item.qty - 1) * item.price}
                    }
                }
                return item;
            });
            return {
                ...state,
                cart: newCartArr,
            }
        default:
            return state
    }
}

export default productsReducer;