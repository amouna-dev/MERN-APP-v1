import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../JS/actions/productActions';

import { Spinner } from 'react-bootstrap';
import Product from './Product';
import '../../App.css'

const ProductList = () => {

    const productReducer = useSelector(state => state.productReducer)
    const {loadProd, products, error } = productReducer
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProducts());
        //eslint-disable-next-line
    },[dispatch])
    return (
        <div style={{display: "flex", alignContent: "center", justifyContent: "space-around" , flexWrap: "wrap"}}>
            {loadProd? (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : products.length === 0?  (             
                 <h2> No Products in Database </h2>
            ) : error? (
                <h2> {error} </h2> 
            ) :  (
                //products
                    // .filter((prod) => 
                    // prod.nameProd.toLowerCase().trim().includes(filterName.toLowerCase().trim()))
                products.map(product => 
                            <Product product={product} key={product._id} />
                ))}
            
        </div>
    );
};

export default ProductList;