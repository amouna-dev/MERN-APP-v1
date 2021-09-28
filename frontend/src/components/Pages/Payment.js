import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../../JS/actions/cartActions';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@material-ui/core/';
import CheckoutSteps from './CheckoutSteps'
import '../../App.css'


const Payment = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    //if logout and go to payment -> shipping -> login 
    if (!shippingAddress.address) {
        history.push('/shipping');
      }
      const [paymentMethod, setPaymentMethod] = useState('');
    
      const dispatch = useDispatch();
    
      const submitHandler = (e) => {
        e.preventDefault();
        if (paymentMethod === '') {
          return alert("you should select a payment method")
        }
        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
      };
    return (
        <div>
            <CheckoutSteps step1 step2 step3 ></CheckoutSteps>
            <div>
           
      <Form className="form" onSubmit={submitHandler}>
         <h1>Payment Method</h1>
         <Row>
        <FormControl component="fieldset">
          <FormLabel component="legend">Select Method</FormLabel>
          <Row>
            <Col md="8">
              <RadioGroup
                aria-label="paymemtMethod"
                name="paymemtMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="PayPal" control={<Radio color="primary" />} label="PayPal or Credit Card" />
              </RadioGroup>
            </Col>
            <Col md="8">
              <RadioGroup
                aria-label="paymemtMethod"
                name="paymemtMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="Cash" control={<Radio color="primary" />} label="Cash on delivery" />
              </RadioGroup>
            </Col>
          </Row>
        </FormControl>
        </Row>
        <button className="primary" type="submit" >
          Continue
        </button>
      </Form>
        </div>

        </div>
    )
}

export default Payment
