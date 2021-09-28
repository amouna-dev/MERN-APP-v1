 import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_MINE_LIST_REQUEST,
    ORDER_MINE_LIST_FAIL,
    ORDER_MINE_LIST_SUCCESS,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
    ORDER_SUMMARY_REQUEST,
    ORDER_SUMMARY_SUCCESS,
    ORDER_SUMMARY_FAIL,
  } from '../constants/order';
  import { CART_EMPTY } from '../constants/cart'
import axios from 'axios';


//Get orders
//For Admin : get all orders
export const getOrders = () => async(dispatch) => {
    dispatch({type: ORDER_SUMMARY_REQUEST})
    try {
         
        let result = await axios.get('/api/order', {
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        })
        dispatch({
            type: ORDER_SUMMARY_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.dir(error)
        dispatch({
            type: ORDER_SUMMARY_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Get order by orderId
export const getOrder = (id) => async(dispatch) => {
    dispatch({type: ORDER_DETAILS_REQUEST})
    try {
        let result = await axios.get(`/api/order/${id}`, {
            headers: {
                'auth-token': localStorage.getItem('token')
            }
        })
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.dir(error)
        dispatch({type: ORDER_DETAILS_FAIL, payload: error })
    }
}
//Get orders by userid
export const listOrders = (user) => async(dispatch) => {
    dispatch({type: ORDER_LIST_REQUEST})
    try {
        let result = await axios.get(`/api/order/user=${user}`, {
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        })
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: result.data.response
        })
    } catch (error) {
        console.log(error)
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response.data.msg
        })
    }
}

//create Order and empty the cart
export const createOrder = (order) => async (dispatch) => {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    try {
      const { data } = await axios.post('/api/order', order, {
        headers: {
            'auth-token': localStorage.getItem('token')        
        },
      });
      dispatch({ 
          type: ORDER_CREATE_SUCCESS, 
          payload: data.response 
        });
      dispatch({ type: CART_EMPTY });
      localStorage.removeItem('cartItems');
    } catch (error) {
        console.dir(error)
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error
      });
    }
  };
//Delete order
export const deleteOrder = (id) => async(dispatch) => {
    dispatch({type: ORDER_DELETE_REQUEST})
    try {
        //headers
        const config = {
            headers:{
                'auth-token': localStorage.getItem('token')
            }
        }
        const {data} = await axios.delete(`/api/order/${id}`, config)
         dispatch({
             type: ORDER_DELETE_SUCCESS,
             payload: data.response
            })
        dispatch(getOrders())
    } catch (error) {
        console.log(error)
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response.data.msg
        })
    }
}

//Update order
// export const updateProduct = (id, data) => async(dispatch) => {
//     try {
//         //headers
//         const config = {
//             headers:{
//                 'auth-token': localStorage.getItem('token')
//             }
//         }
//         await axios.put(`/api/order/${id}`, data, config)
//         dispatch(getOrders())
//     } catch (error) {
//         console.log(error)
//         dispatch({type: GET_ORDERS_FAIL})
//     }
// }

//Order is paid
export const payOrder = (order, paymentResult) => async (dispatch) => {
    dispatch({ 
        type: ORDER_PAY_REQUEST, 
        payload: { order, paymentResult } 
    });
   
    try {

      const result = axios.put(`/api/order/${order._id}/pay`, paymentResult, {
        headers: { 
            'auth-token': localStorage.getItem('token')
         },
      });
      
        dispatch({ 
          type: ORDER_PAY_SUCCESS, 
          payload: result.data
        });  
      
      
    } catch (error) {
         console.dir(error)
      dispatch({ 
          type: ORDER_PAY_FAIL, 
        payload: error.response.data.msg 
    });
    }

}
export const payOrderCach = (id) => async (dispatch) => {
    dispatch({ 
        type: ORDER_PAY_REQUEST, 
        payload:  id
    })
    try {
      const result = axios.put(`/api/order/${id}/paycash`, {}, {
        headers: { 
            'auth-token': localStorage.getItem('token')
         },
      })   
        dispatch({ 
          type: ORDER_PAY_SUCCESS, 
          payload: result.data
        });     
        dispatch(getOrder(id)) 
    } catch (error) {
         console.dir(error)
      dispatch({ 
          type: ORDER_PAY_FAIL, 
        payload: error.response.data.msg 
    });
    }
}
//Order is delivered
export const deliveredOrder = (id) => async(dispatch) => {
    dispatch({type: ORDER_DELIVER_REQUEST, payload: id})
    try {
        const result = await axios.put(`/api/order/${id}/deliver`, {}, {
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        })
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: result.data
        })
        dispatch(getOrder(id))
    } catch (error) {
        console.dir(error)
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response.data.msg
        })
    }
}
//Get my orders (history)
export const listMyOrders = () => async(dispatch) => {
    dispatch({type: ORDER_MINE_LIST_REQUEST})
    try {
        const result = await axios.get('/api/order/myorder', {
            headers: {
                'auth-token' : localStorage.getItem('token')
            }
        }) 
        dispatch({
            type: ORDER_MINE_LIST_SUCCESS,
            payload: result.data.response
        })
        
    } catch (error) {
        console.dir(error)
        dispatch({
            type: ORDER_MINE_LIST_FAIL,
            payload: error.response.data.msg
        })
    }
}



