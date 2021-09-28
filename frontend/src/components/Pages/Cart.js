import React  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { useHistory } from 'react-router-dom';
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap';
import { addToCart, removeFromCart } from '../../JS/actions/cartActions';
//import { Button } from '@material-ui/core/';
import CartItem from './CartItem';



const Cart = ({history}) => {
    const dispatch = useDispatch();
    //const history = useHistory();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;
  
  //when change qty
    const handleQtyChange = (id, qty) => {
      dispatch(addToCart(id, qty));
    };
  
    const handleRemove = (id) => {
      dispatch(removeFromCart(id));
    };
  //nbre of products
    const getCartCount = () => {
     return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
    };
  
    const getCartSubTotal = () => {
      return cartItems
        .reduce((price, item) => price + item.price * item.qty, 0)
        .toFixed(2);
    };
    const handleCheckout = () => {
      
     history.push('/login?redirect=shipping')
    //  if(isAuth)
    //   history.push('/shipping');
    }

    return (
        <div>
           <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0? (
          <>
            Your cart is empty, go back to <Link to="/">Shop</Link>
          </>
        ) : (
            <>
            <Link to="/"> Back </Link>
            <h5> You have {cartItems.length} products </h5>

          <ListGroup variant="flush">
            {cartItems.map((item) => (
               <CartItem 
               key={item.product} 
               item={item} 
               handleQtyChange={handleQtyChange} 
               handleRemove={handleRemove} />
            ))}
          </ListGroup>
            </>

        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({getCartCount()}) items</h2>
              <h2>DTN ({getCartSubTotal()}) </h2>
              
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                variant="dark"
                
                onClick={handleCheckout}
                size="lg"
                disabled={!cartItems.length}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>  
        </div>
    );
};

export default Cart;
