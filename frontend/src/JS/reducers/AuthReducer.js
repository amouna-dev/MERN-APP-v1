
import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, USER_LOAD, GET_AUTH_USER, AUTH_ERRORS } from "../constants/Actions-Types";
const initialState = {
    user: null,
    isLoding: true,
    token: localStorage.getItem('token'),
    isAuth: false,
    msg: null
}

const AuthReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case REGISTER_USER :
        case LOGIN_USER :

            localStorage.setItem('token', payload.token)
            return {
                ...state, 
                isLoding: false,
                isAuth: true,
                ...payload
            }
        case GET_AUTH_USER:                
            return{
                ...state,
                isLoding: false,
                isAuth: true,
                ...payload
            }
        case USER_LOAD:
            return {
                ...state,
                isLoding: true
            }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            localStorage.removeItem('cartItems')
            localStorage.removeItem('cart')
            localStorage.removeItem('shippingAddress')
            return {
                ...state,
                user: null,
                isLoding: false,
                token: null,
                isAuth: false        
            }
        case AUTH_ERRORS:
            return {
                ...state,
                isLoding: false,
                ...payload
            }
            
        default:
            return state
    }
}
export default AuthReducer;