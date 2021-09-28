import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { deleteProduct, getProduct } from '../../JS/actions/productActions';
import { toggleTrue } from '../../JS/actions/edit';
import { Link } from 'react-router-dom';


const ProductCard = ({product}) => {
    const dispatch = useDispatch()

    return (
        <div>
        <div style={{display: "inline-flex", justifyContent: "space-evenly", flexWrap: "wrap", padding: "5px", margin: "5px"}} >
        <Card style={{ width: '18rem', height: '40rem', textAlign: "center", position:"relative", boxShadow: "rgba(0, 0, 0, 0.25) 0px 5px 7px" }}>
         <Card.Img variant="top" style={{width: "50%", marginLeft: "70px"}} src={product.imageProd} />
            <Card.Body>
             <Card.Title> {product.nameProd} </Card.Title>
            </Card.Body >

             <ListGroup className="list-group-flush" style={{height: '18rem'}}>
                 <ListGroupItem> Brand: {product.brand} </ListGroupItem>
                 <ListGroupItem> Price: {product.price} TND </ListGroupItem>
                 <ListGroupItem> 
                     <Rating name="read-only" value={product.rating} readOnly /> 
                </ListGroupItem>
                 <ListGroupItem> Description : {product.description.substring(0, 150)}... </ListGroupItem>
             </ListGroup>
         <Card.Body style={{display: "block", textAlign: "center"}}>
            <Link to={`/products/edit/${product._id}`}> 
                <Button style={{width: 100}} variant="success" 
                onClick={() =>{ dispatch(getProduct(product._id)); 
                            dispatch(toggleTrue())
                            }}> Edit 
                </Button> 
            </Link>
             <Button style={{width: 100}} variant="danger" onClick={()=> { if(window.confirm("Are you sure to delete this product?"))
                 dispatch(deleteProduct(product._id)) }} >Delete</Button>
         </Card.Body>
         </Card> 
            
        </div>
        </div>
    );
};

export default ProductCard;