import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container } from 'react-bootstrap';
import { updateUser } from '../../JS/actions/userActions';
import { Link } from 'react-router-dom';

const Edit = () => {
    const user = useSelector(state => state.userReducer.user);
    const dispatch = useDispatch();
    const [editUser, setEditUser] = useState({firstName: "", lastName: "", email: "", password: "", address: "", phone: "" });
    

    useEffect(() => {
        setEditUser(user)
       
    }, [user])

    const handleChange = (e) => {
        e.preventDefault();
       setEditUser({...editUser, [e.target.name]:e.target.value}) 
    }
    const handleEdit = () => {
        dispatch(updateUser(user._id, editUser))
        setEditUser({firstName: "", lastName: "", email: "", password: "", address: "", phone: "" })
    }
    
    return (
        <div>
            <Container>
            <div > <Link to="/users"> <span>Back</span></Link> </div>   
            <h2> Edit User </h2>
             <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" name="firstName" value={editUser.firstName} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" name="lastName" value={editUser.lastName} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" value={editUser.email} onChange={handleChange}/>
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password"  placeholder="Password" name="password" value={editUser.password} onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" name="address" value={editUser.address} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" placeholder="Enter Phone" name="phone" value={editUser.phone} onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" onClick={handleEdit}>
            Save Change
          </Button>

            </Form> 
            </Container>
        </div>
    );
};

export default Edit;