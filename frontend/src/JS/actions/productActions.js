import { GET_PRODUCT_LOAD, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAIL, ADD_PRODUCT, GET_PRODUCTS_LOAD, 
    GET_PRODUCTS_SUCCESS, GET_PRODUCTS_FAIL, FETCH_PRODUCTS_BY_CATEGORY, ORDER_PRODUCTS_BY_PRICE, GET_PRODUCT_RESET } from "../constants/product";

import axios from 'axios';


//Get all products
export const getProducts = () => async(dispatch) => {
    dispatch({type: GET_PRODUCTS_LOAD})
    try {
         const result = await axios.get('/api/product')
        dispatch({
            type: GET_PRODUCTS_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.dir(error)
        dispatch({
            type: GET_PRODUCTS_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Get product by id
export const getProduct = (id) => async(dispatch) => {
    dispatch({type: GET_PRODUCT_LOAD})
    try {
        let result = await axios.get(`/api/product/${id}`)
        dispatch({
            type: GET_PRODUCT_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.log(error)
        dispatch({type: GET_PRODUCT_FAIL,
        payload: error.response.data.msg})
    }
}

//Delete product
export const removeProduct = (id) => (dispatch) => {
        dispatch({
            type: GET_PRODUCT_RESET
        })
    
}

export const deleteProduct = (id) => async(dispatch) => {
     //headers
     const config = {
        headers:{
            'auth-token': localStorage.getItem('token')
        }
    }
    axios
    .delete(`/api/product/${id}`, config)
    .then((() => dispatch(getProducts())))
    .catch(err => console.log(err))
}

//Update product
export const updateProduct = (id, product) => async(dispatch) => {
    try {
        //headers
        const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        await axios.put(`/api/product/${id}`, product, config)
        dispatch(getProducts())
    } catch (error) {
        console.log(error)
        dispatch({type: GET_PRODUCT_FAIL})
    }
}

export const addProduct = (FormData) => async(dispatch) => {
    try {
        //headers
        const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        const res = await axios.post(`/api/product/add`, FormData, config)
        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
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
        dispatch({type: GET_PRODUCT_FAIL})
    }
}

//Fetch products by category
export const filterProductsByCategory = (products, category) => async(dispatch) => {
    return dispatch({
        type: FETCH_PRODUCTS_BY_CATEGORY,
        payload: {
            category: category,
            filterProducts: category === ''? products : products.filter((x) => x.category = category)
        }
    })
}
//Order products by price ASC or DES
export const sortProducts = (products, sort) => (dispatch) => {
    //do a copy form table
    const items = products.slice();
    //sort algo 
    if(sort !== "") {
        items.sort((a,b) => 
        sort === "lowest"?  //if ASC
           a.price > b.price ? 1 : -1 
        : 
           a.price < b.price ? 1 : -1 ) 
    }
    console.log(items)
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            filterProducts: items
        }
    })
}
