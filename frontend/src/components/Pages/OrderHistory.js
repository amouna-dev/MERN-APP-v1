import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../../JS/actions/orderActions';
import { Spinner, Alert } from 'react-bootstrap'
import '../../App.css'

const OrderHistory = ({history}) => {

    const myOrders = useSelector((state) => state.orderMineListReducer);
    const { loading, error, orders } = myOrders;
    const dispatch = useDispatch();
    
    useEffect(() => {
    dispatch(listMyOrders());
    }, [dispatch]);

    return (
        <div>
            <h1>Order History</h1>
      {loading ? (
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">
            <Alert.Heading>{error}</Alert.Heading>
        </Alert> 
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? Date(order.paidAt).substring(0, 10) : 'No'}</td>
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </div>
    )
}

export default OrderHistory
