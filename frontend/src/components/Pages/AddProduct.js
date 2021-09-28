import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProduct, addProduct  } from '../../JS/actions/productActions';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const AddProduct = () => {
    
    const productReducer = useSelector(state => state.productReducer.prod)
    const edit = useSelector(state => state.editReducer.edit) 
    const [product, setProduct] = React.useState({
        nameProd: '',
        imageProd: '',
        brand: '',
        price: 0,
        description: '',
        color: '',
        reference: '',
        category: '',
        rating: 0,
        countInStock: 0
      });
      
      const dispatch = useDispatch()

      const handleChange = (e) => {
          e.preventDefault()
        setProduct({ ...product, [e.target.name]: e.target.value });
      };

      const handleProducts = () => {
        if(!edit){
            dispatch(addProduct(product)) 
            setProduct({nameProd: '', imageProd: '', brand: '', price: 0, description: '', color: '', reference: '', category: '', rating: 0, countInStock: 0 })

          } else {
            dispatch(updateProduct(productReducer._id, product))
            setProduct({nameProd: '', imageProd: '', brand: '', price: 0, description: '', color: '', reference:'', category: '', rating: 0, countInStock: 0 })
        }
      }

      useEffect(() => {
          edit? setProduct(productReducer) : setProduct({nameProd: '',
          imageProd: '',
          brand: '',
          price: 0,
          description: '',
          color: '',
          reference: '',
          category: '',
          rating: 0,
          countInStock: 0
          })
         
      }, [productReducer, edit])
    return (
        <div style={{margin: "20px", width: "60%"}} >
          <div > <Link to="/products"> <span>Back</span></Link> </div>
           {edit? <h2> Edit Product </h2> : <h2> Add Product </h2>  } 
             
            <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product Name" required name="nameProd" value={product.nameProd.toUpperCase()} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" placeholder="Enter image url of product" required name="imageProd" value={product.imageProd} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control type="text" placeholder="Enter brand of product" required name="brand" value={product.brand} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control type="number" placeholder="Price" required min="0" name="price" value={product.price} onChange={handleChange}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" required name="category" value={product.category} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control type="number" placeholder="Enter rating" required min="0"  name="rating" value={product.rating} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicColor">
                <Form.Label>color </Form.Label>
                <Form.Control type="text" placeholder="Enter color of product" name="color" value={product.color} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicReference">
                <Form.Label>REF Product</Form.Label>
                <Form.Control type="text" placeholder="Enter a reference of product if it has" name="reference" value={product.reference.toUpperCase()} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" required name="description" value={product.description} onChange={handleChange}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control type="number" placeholder="Enter nbre of product in stock" name="countInStock" min="0" value={product.countInStock} onChange={handleChange}/>
            </Form.Group>

            <Button variant="primary" onClick={handleProducts}>
               {edit? "Edit Product" : "Add Product"}
            </Button>

          </Form>  
        </div>
    );
};

export default AddProduct;