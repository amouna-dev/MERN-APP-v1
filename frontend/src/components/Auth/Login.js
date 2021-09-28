import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { login } from '../../JS/actions/AuthActions';
import { Link } from 'react-router-dom';

const Login = ({location}) => {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {user} = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
      if (user) {
        history.push(redirect);

      }
    }, [dispatch, user, redirect, history]);

    const handleLogin = () => {
        const user = {email, password}
        dispatch(login(user))
        //history.push("/dashbord")
        setEmail("")
        setPassword("")
    }
    //redirect User To Register Route 
   const redirectRegister = redirect ? `/register?redirect=${redirect}` : '/register';

  return (
    <>
<Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
        <h2 style={{color: 'darkblue', fontWeight: 'bold', textAlign: "center"}}>LOGIN</h2>

        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            
          <Button variant="primary" onClick={() => {
              handleLogin()
          }}>
            Login
          </Button>
        </Form>
        <Row className="py-3">
        <Col>
          Don't have an Account? <Link to={redirectRegister}>Register</Link>
        </Col>
      </Row>

        </Col>
      </Row>
        </Container>
    </>
  );
};

export default Login;