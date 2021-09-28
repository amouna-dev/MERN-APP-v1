import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../JS/actions/productActions';
import { toggleFalse } from '../../JS/actions/edit';
import { Link } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';


const ManageProduct = () => {
    
    const products = useSelector(state => state.productReducer.products)
    const loadProd = useSelector(state => state.productReducer.loadProd)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts());
        //eslint-disable-next-line
    },[])
    return (
        <div >
            <h3> List of Products </h3>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Link to={`/products/add`}>  
            <Button variant="primary" onClick={() => dispatch(toggleFalse()) } >Add Product</Button> 
            </Link>
            </div> 
            <div style={{display: "flex", alignContent: "center", justifyContent: "space-around" , flexWrap: "wrap"}}>
            {loadProd? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : products.length === 0? (
                <h2> No Products in Database </h2>
            ) : (
                products.map(product => 
                    <ProductCard product= {product} key= {product._id} />
                ))}
            
            </div>
        </div>
    );
};

export default ManageProduct;