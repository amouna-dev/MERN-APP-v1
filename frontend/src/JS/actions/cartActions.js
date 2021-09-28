import { ADD_TO_CART_LOAD, ADD_TO_CART_ITEM, ADD_TO_CART_FAIL, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cart";
import axios from "axios";


//add to cart
export const addToCart = (id, qty) => async(dispatch, getState) => {
    dispatch({type: ADD_TO_CART_LOAD})
    try {
        const result = await axios.get(`/api/product/${id}`);
   
        dispatch({
            type: ADD_TO_CART_ITEM,
            payload: {
              product: result.data.response._id,
              nameProd: result.data.response.nameProd,
              imageProd: result.data.response.imageProd,
              price: result.data.response.price,
              countInStock: result.data.response.countInStock,
              qty, 
            }
        })
        //save the cart to the localStorage
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
        
    } catch (error) {
        console.log(error)
        dispatch({
          type: ADD_TO_CART_FAIL,
          payload: error.response
        })
    }
}

//Remove from the cart
export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
  
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  }

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ 
      type: CART_SAVE_SHIPPING_ADDRESS, 
      payload: data 
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ 
    type: CART_SAVE_PAYMENT_METHOD, 
    payload: data 
  })
  localStorage.getItem('paymentMethod', JSON.stringify(data))
};