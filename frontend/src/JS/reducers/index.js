import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import userReducer from './userReducer';
import productReducer from './productReducer';
import {editReducer} from './edit';
import cartReducer from './cartReducer';
import {
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer,
    orderPayReducer,
    orderSummaryReducer,
  } from './orderReducer'
const rootReducer = combineReducers({
    AuthReducer,
    userReducer,
    productReducer,
    editReducer,
    cart: cartReducer,
    orderCreateReducer,
    orderDeleteReducer,
    orderDeliverReducer,
    orderDetailsReducer,
    orderListReducer,
    orderMineListReducer,
    orderPayReducer,
    orderSummaryReducer,
})

export default rootReducer;