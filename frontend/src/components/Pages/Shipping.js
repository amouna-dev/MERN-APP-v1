import React, { useState} from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../JS/actions/cartActions';
import { TextField } from '@material-ui/core/';
import CheckoutSteps from './CheckoutSteps';

const Shipping = ({history}) => {

    const {isAuth} = useSelector(state => state.AuthReducer)
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    
    if (!isAuth){
    history.push("/login")
    }
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
  
    // if (cartItems.length === 0) {
    //   history.push("/");
    // }
  
    const dispatch = useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
     dispatch(saveShippingAddress({ address, city, postalCode, country }));
      history.push("/payment");
    };
   
   
  return (
    <>
      <CheckoutSteps step1 step2 />
        
      <Form className="form" onSubmit={handleSubmit}>
        <h1>Shipping Address</h1>
        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="city"
          label="Enter City"
          name="city"
          autoComplete="city"
          autoFocus
          value={city}
          onChange={(e) => setCity(e.target.value)} 
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="postal code"
          label="Enter postal code"
          name="postal code"
          autoComplete="postal code"
          autoFocus
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />

        <TextField
          variant="outlined"
          type="text"
          margin="normal"
          required
          fullWidth
          id="country"
          label="Enter country"
          name="country"
          autoComplete="country"
          autoFocus
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <button type="submit" className="primary" >
          Continue
        </button>
      </Form>
    </>
    );
};

export default Shipping;