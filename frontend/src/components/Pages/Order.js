import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrder, payOrder, deliveredOrder, payOrderCach } from '../../JS/actions/orderActions';
//import { getUser } from '../../JS/actions/userActions';
import '../../App.css'
import { Col, Container, Row, Spinner, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../JS/constants/order';


const Order = ({match}) => {
    const orderId = match.params.id;
    //button paypal
   const [sdkReady, setSdkReady] = useState(false)

   const user = useSelector(state => state.userReducer.user)
    const userLogin = useSelector(state => state.AuthReducer.user)
   const OrderDetails = useSelector(state => state.orderDetailsReducer)
   const { order, loading, error} = OrderDetails 
   const orderPay = useSelector((state) => state.orderPayReducer);
  const {loading: loadingPay, error: errorPay , success: successPay} = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliverReducer);
  const {loading: loadingDeliver, error: errorDeliver, success: successDeliver} = orderDeliver;
    const dispatch = useDispatch();
    
    useEffect(() => {
      //console.log(order) 
     // dispatch(getUser(order.user))
      
        const addPayPalScript = async () => {
            const {data} = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async =true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script)
        }
        if (
            !order ||
            successPay ||
            successDeliver ||
            (order && order._id !== orderId)
          ) {

             dispatch({type: ORDER_PAY_RESET})
             dispatch({type: ORDER_DELIVER_RESET})
            dispatch(getOrder(orderId))
           
        }else {
            if(!order.isPaid){
                if(!window.paypal)
                addPayPalScript()
                else
                setSdkReady(true)
            }
        }
        
     // eslint-disable-next-line 
    }, [dispatch,order, orderId, sdkReady, user]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));

      };
      const deliverHandler = () => {
        dispatch(deliveredOrder(order._id));
      };
      const payHandler = () => {
        dispatch(payOrderCach(order._id));
      };
      // const handleName = () => {
      //    dispatch(getUser(String(order.user)))
      // }

    return (
        <div>
        {
        loading ?  (
            <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
            </Spinner>
        ) : error ? (
            <h2>{error}</h2>
        ) : (
        <>
        <Container>
        <Row>
            <Col xs={12} md={8}> 
            
                <Card className="card1">
                <Card.Header><h3>Shipping</h3></Card.Header>
                 
                  <p>
                    <strong>Id client :</strong> {order.user} <br />
                    <strong>Name:</strong>
                    
                    {user._id === userLogin._id ? userLogin.firstName + " " + userLogin.lastName : ''} <br />
                    <strong>Address: </strong> 
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                    ,{order.shippingAddress.country}
                  </p>
                  {order.isDelivered? (
                  <Alert variant="success">
                  <Alert.Heading>Delivered At : {Date(order.deliveredAt).substring(0, 10)} </Alert.Heading>
                </Alert>
                  ):(
                    <Alert variant="danger">
                    <Alert.Heading>Not Delivered </Alert.Heading>
                  </Alert> 
                  )
                }
                </Card>
              
                <Card className="card1">
                <Card.Header><h3>Payment</h3> </Card.Header>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid? (
                  <Alert variant="success">
                  <Alert.Heading>Paid At : {Date(order.PaidAt).substring(0, 10)} </Alert.Heading>
                </Alert>
                  ):(
                    <Alert variant="danger">
                    <Alert.Heading>Not Paid </Alert.Heading>
                  </Alert>
                  )}
                </Card>
              
                <Card className="card1">
                <Card.Header><h3>Order Items</h3> </Card.Header>
                  
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item.product}>
                        <Row>
                            {order.orderItems.indexOf(item)+1}
                          <Col xs lg="2"> 
                            <img
                              src={item.imageProd}
                              alt={item.name}
                              className="small"
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.nameProd}
                            </Link>
                          </Col>
  
                          <Col>
                           <span> {item.qty} x {item.price}TND = {item.qty * item.price}TND</span>
                          </Col>
                        </Row>
                      </li>
                    ))}
                  </ul>
                </Card>
            
            </Col>

          <Col>
        
          <Card className= "card1">    
              <Card.Header><h3>Order Summary</h3> </Card.Header>
              <ul>
                <li>
                  <Row>
                  <Col><strong>Items:</strong></Col>
                  <Col><span>{order.itemsPrice.toFixed(2)}TND</span></Col>
                  </Row>
                </li>
                <li>
                  <Row>
                  <Col><strong>Shipping:</strong></Col>  
                  <Col><span>{order.shippingPrice.toFixed(2)}TND</span></Col>
                  </Row>
                </li>
                <li>
                  <Row>
                  <Col>
                    <strong>Tax:</strong></Col>
                    <Col> <span>{order.taxPrice.toFixed(2)}TND</span></Col>
                  </Row>
                </li>
                <li>
                  <Row>
                    <Col>
                      <h6><strong> Order Total</strong></h6>
                    </Col>
                    <Col>
                      <strong>{order.totalPrice.toFixed(2)}TND</strong>
                    </Col>
                  </Row>
                </li>
                <li>
                  
                </li>
                </ul>
                {userLogin.role === "user" && !order.isPaid && (
                <>
                  {!sdkReady?  (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                  )  : (
                    <>
                      {errorPay && (
                        <Alert variant="danger">
                        <Alert.Heading> {errorPay} </Alert.Heading>
                      </Alert>
                      )}
                      {loadingPay &&  
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      }
                     
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                       
                      
                    </>
                  )}
                </>
              )}
                    {((userLogin.role === "admin" && !order.isPaid && order.paymentMethod === "Cash" && !order.isDelivered) || 
                    (userLogin.role === "admin" && order.isPaid && !order.isDelivered)) && (
                <>
                  {loadingDeliver && (
                  <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>)}
                  {errorDeliver && (
                    <Alert variant="danger">
                    <Alert.Heading> {errorDeliver} </Alert.Heading>
                    </Alert>                  
                    )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    Deliver Order
                  </button>
                  </>
              )}
              
              {(userLogin.role === "admin" && !order.isPaid && order.paymentMethod === "Cash" && order.isDelivered)  && (
                <>
                  {loadingPay && (
                  <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
              </Spinner>)}
                  {errorPay && (
                    <Alert variant="danger">
                    <Alert.Heading> {errorPay} </Alert.Heading>
                    </Alert>                  
                    )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={payHandler}
                  >
                    Paid Cach
                  </button>
                  </>
              )}
              
            </Card>
          </Col>
          </Row>
        </Container>
        </>
        )}
      </div>
    )
}

export default Order
