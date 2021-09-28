import { ADD_TO_CART_LOAD, ADD_TO_CART_ITEM, ADD_TO_CART_FAIL, CART_REMOVE_ITEM, CART_RESET, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD, CART_EMPTY  } from "../constants/cart";



const cartReducer = (state= { cartItems: []}, {type, payload}) => {
    switch (type) {
        case ADD_TO_CART_LOAD :
            return {
                ...state,
                isLoading:true
            }
        case ADD_TO_CART_ITEM :
            const item = state.cartItems.find(el => el.product === payload.product)
            if(item){
                return {
                    ...state,
                    isLoading: false,
                    cartItems: state.cartItems.map(el => (el.product === item.product ? payload : el))
                }
            } else {
                return {
                    ...state,
                    isLoading:false,
                    cartItems: [...state.cartItems, payload]     
                }
            }     
        case ADD_TO_CART_FAIL :
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        case CART_REMOVE_ITEM :
            return {
                ...state,
                isLoading: false,
                cartItems: state.cartItems.filter(el => el.product !== payload)
            }
       
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                isLoading: false,
                shippingAddress: payload
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                isLoading: false,
                paymentMethod: payload
            }

        case CART_RESET :
            return {
                ...state,
                isLoading: false,
                cartItems: [],
                shippingAddress: {},
                paymentMethod: ''
            }
        case CART_EMPTY:
            return {
                ...state,
                isLoading: false,
                cartItems: []
            }
        default:
            return state;
    }
}

export default cartReducer;