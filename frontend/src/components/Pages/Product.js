import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Rating } from '@material-ui/lab';
import { Link } from 'react-router-dom';


const Product = ({product}) => {
    return (
        <div>
          <Card style={{ width: '18rem', height: '550px' }}>
            <Card.Img variant="top" src={product.imageProd} />
            <Card.Body>
                <Card.Title>{product.nameProd}</Card.Title>
                
                <Card.Text>
                <Rating name="read-only" value={product.rating} readOnly />
                </Card.Text>
                <Card.Text>
                Category:  {product.category}
                </Card.Text>
                <Card.Text>
                Price:  DTN {product.price}
                </Card.Text>
            
                <Link to={`/product/${product._id}`} >
                  <Button variant="info">View Details</Button>
                </Link>
             </Card.Body>   
            </Card>  
        </div>
    );
};

export default Product;