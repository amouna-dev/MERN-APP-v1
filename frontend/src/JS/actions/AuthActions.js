// eslint-disable-next-line
import {LOGIN_USER, LOGOUT_USER, REGISTER_USER, USER_LOAD, GET_AUTH_USER, AUTH_ERRORS } from "../constants/Actions-Types"

import axios from 'axios'

//Loading User
export const userLoding = ()  => async(dispatch)=> {
    dispatch({
        type: USER_LOAD
    })
}

//register user
export const registerUser = (FormData) => async(dispatch)=> {
    dispatch(userLoding())
    try {
        const res = await axios.post('/api/auth/register', FormData)
        dispatch({
            type: REGISTER_USER,
            payload: res.data //{msg, user, token}
        })

    } catch (error) {
        console.dir(error)
        const {errors, msg} = error.response.data
        if(Array.isArray(errors)){
            errors.forEach(err => alert(err.msg))
        }
        if(msg){
            return alert(msg)
        }
        dispatch({type: AUTH_ERRORS})
    }
}

//login
export const login = (FormData) => async(dispatch)=> {
    dispatch(userLoding())
    try {
        const res = await axios.post('/api/auth/login', FormData)
        dispatch({
            type: LOGIN_USER,
            payload: res.data //{msg, user, token}
        })

    } catch (error) {
        console.dir(error)
       //check errors for login form
        const {errors, msg} = error.response.data
        if(Array.isArray(errors)){
            errors.forEach(err => alert(err.msg))
        }
        if(msg){
            return alert(msg)
        }
        dispatch({type: AUTH_ERRORS})
    }
}

//Get auth user
export const getAuthUser = () => async(dispatch)=> {
    dispatch(userLoding())
    try {
        //headers
        const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        const res = await axios.get('/api/user', config)
        dispatch({
            type: GET_AUTH_USER,
            payload: res.data //{user: req.user}
        })
           
    } catch (error) {
        console.log(error)
        dispatch({type: AUTH_ERRORS})
    }
}
 //Logout
export const logoutUser = () => async(dispatch)=> {
    dispatch(userLoding())
    try {
        dispatch({
        type: LOGOUT_USER
        })  
        
    } catch (error) {
        console.log(error)
        dispatch({type: AUTH_ERRORS})
    }
    
}
