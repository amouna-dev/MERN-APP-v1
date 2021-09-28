import { GET_PRODUCT_LOAD, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, ADD_PRODUCT, GET_PRODUCTS_LOAD, 
    GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, FETCH_PRODUCTS_BY_CATEGORY, ORDER_PRODUCTS_BY_PRICE, GET_PRODUCT_RESET } from "../constants/product";

const initialState = {
    products: [],
    loadProduct: false,
    prod: {},
    error: null,
    filterProducts: [],
    category: "",
    sort: ""
}

const productReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case GET_PRODUCT_LOAD :
            case GET_PRODUCTS_LOAD:
            return {
                ...state, 
                loadProduct: true
            }
        case GET_PRODUCT_SUCCESS :
            case ADD_PRODUCT:
            return {
                ...state,
                loadProduct: false,
                prod: payload
            }
        case GET_PRODUCT_FAIL :
            case GET_PRODUCTS_FAIL :
            return {
                ...state,
                loadProduct: false,
                error: payload
            }
            case GET_PRODUCTS_SUCCESS :
                return {
                    ...state,
                    loadProduct: false,
                    products: payload
                }
            case GET_PRODUCT_RESET:
                return {
                    ...state,
                    loadProduct: false,
                    prod: {}
                }
    
        case FETCH_PRODUCTS_BY_CATEGORY:
            return {
                ...state,
                loadProduct: false,
                filterProducts: payload.products,
                category: payload.category
            }
        case ORDER_PRODUCTS_BY_PRICE:
            return {
                ...state,
                loadProduct: false,
                filterProducts: payload.products,
                sort: payload.sort
            }
        default:
            return state
    }
}

export default productReducer;