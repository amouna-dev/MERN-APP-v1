import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { registerUser } from '../../JS/actions/AuthActions'
import { Link } from 'react-router-dom';

const Register = ({location}) => {
   
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const {isAuth} = useSelector((state) => state.AuthReducer);

    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
      if (isAuth) {
        setTimeout(() => {
          history.push({
            pathname: '/register',
            search: `?redirect=${redirect}`,
          });
        }, 3000);
      }
    }, [isAuth, history, redirect]);

    const handleRegister = () => {
        const newUser = {firstName, lastName, email, password, address, phone}
        if (password !== confirmPassword) {
          return alert("Verif your password");
        }
        dispatch(registerUser(newUser))
        //history.push("/dashbord")
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setAddress("")
        setPhone("")
    }
    //redirect User To Login Route
    const redirectLogin = redirect?  `/login?redirect=${redirect}` :'/login';
   


  return (
    <>
    <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
            <h2 style={{color: 'darkblue', fontWeight: 'bold', textAlign: "center"}}>REGISTER</h2>
    
            
        <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" name="address" value={address} onChange={e => setAddress(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone" name="phone" value={phone} onChange={e => setPhone(e.target.value)}/>
            </Form.Group>

          <Button variant="primary" onClick={handleRegister}>
            Sign Up
          </Button>
        </Form>
        <Row className="py-3">
        <Col>
          Have an Account? <Link to={redirectLogin}>Login</Link>
        </Col>
      </Row>
        </Col>
      </Row>
        </Container>
    </>
  );
};

export default Register;