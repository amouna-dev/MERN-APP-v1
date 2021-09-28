import { GET_USER_LOAD, GET_USER_SUCCESS, GET_USER_FAIL, GET_USER, EDIT_USER, GET_USER_RESET } from "../constants/Actions-Types";

const initialState = {
    users: [],
    userLoding: true,
    errors: {},
    user: {},
    userInfo: localStorage.getItem('userInfo'),
}

const userReducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case GET_USER_LOAD:
            return {
               ...state,
               userLoding: true 
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                userLoding: false,
                users: payload
            }
        case GET_USER_FAIL:
            return {
                ...state,
                userLoding: false,
                errors: payload
            }
        case GET_USER:
            return {
                ...state,
                user: payload
            }
        case EDIT_USER:
            localStorage.setItem('userInfo', payload.userInfo)
            return {
                ...state,
                user: payload
            }
        case GET_USER_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}

export default userReducer;