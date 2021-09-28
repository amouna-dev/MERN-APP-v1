import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { deleteUser, getUser } from '../../JS/actions/userActions';
import { Link } from 'react-router-dom';

const User = ({user}) => {
    const dispatch = useDispatch()

    return (
        <div style={{display: "inline-flex", justifyContent: "space-evenly", flexWrap: "wrap", padding: "5px", margin: "5px"}} >
           <Card style={{ width: '18rem', height: '28rem', position:"relative", boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 7px" }} border="info">
            <Card.Img variant="top" style={{width: "50%", marginLeft: "70px"}} src="https://cdn.iconscout.com/icon/premium/png-256-thumb/profile-1413099-1199196.png" />
            <Card.Body>
                <Card.Title>Name: {user.firstName} {user.lastName}</Card.Title>
        
            </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem> Email: {user.email} </ListGroupItem>
                    <ListGroupItem> Address: {user.address} </ListGroupItem>
                    <ListGroupItem> Phone: {user.phone} </ListGroupItem>
                    <ListGroupItem> Role: {user.role} </ListGroupItem>
                </ListGroup>
            <Card.Body style={{display: "flex", justifyContent: "space-around", marginBottom: "10px"}}>
               <Link to={`/edit/${user._id}`}> <Button variant="success" onClick={() => dispatch(getUser(user._id))}>Edit</Button> </Link>
                <Button variant="danger" onClick={()=> {if(window.confirm('Are you sure to delete?')) dispatch(deleteUser(user._id)) }} >Delete</Button>
            </Card.Body>
            </Card> 
        </div>
    );
};

export default User;