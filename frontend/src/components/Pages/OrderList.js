import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, getOrders, payOrderCach } from '../../JS/actions/orderActions';
import { Spinner, Alert } from 'react-bootstrap';
//import { ORDER_DELETE_RESET } from '../../JS/constants/order';
import { getUsers } from '../../JS/actions/userActions';
import '../../App.css'


export default function OrderList({history}) {
    const users = useSelector(state => state.userReducer.users)
  const orderList = useSelector((state) => state.orderSummaryReducer);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDeleteReducer);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

 // const users = useSelector((state) => state.userReducer);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers())
    //dispatch({ type: ORDER_DELETE_RESET });
    dispatch(getOrders( ));

  }, [dispatch, successDelete]);
  const deleteHandler = (order) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteOrder(order._id));
    }
  };
  const updatePriceHandler = (id) =>{
        dispatch(payOrderCach(id))
        dispatch(getOrders())
  } 
  const getName = (order)=> {
    let user = users.find(x => order.user === x._id);
    if(user) {
        return user.firstName + " " + user.lastName
    }
  }
  return (
    <div>
      <h2>Orders</h2>
      
      {loadingDelete && 
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner> }
      {errorDelete && <Alert variant="danger">
        <Alert.Heading> {errorDelete} </Alert.Heading>
        </Alert>
    }
      {loading ? (
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner> 
      ) : error ? (
        <Alert variant="danger">
        <Alert.Heading> {error} </Alert.Heading>
        </Alert>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{getName(order) }</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? Date(order.paidAt).substring(0, 10)  : 
                String(order.paymentMethod) === "Cash" ?
                <div> <span>No</span>
                    <button
                    type="button"
                    className="small"
                    onClick={() => updatePriceHandler(order._id)}>
                    Paid
                  </button>
                </div>
                : 'No'
                }
            
                </td>
                <td>
                  {order.isDelivered
                    ? Date(order.deliveredAt).substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(order)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}