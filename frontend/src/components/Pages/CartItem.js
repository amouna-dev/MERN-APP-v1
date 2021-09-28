import React from 'react'
import { Row, Col, ListGroup, Image } from 'react-bootstrap';
import { Select, Button, FormControl, makeStyles, MenuItem } from '@material-ui/core/';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

const CartItem = ({item, handleQtyChange, handleRemove}) => {
    const classes = useStyles();
 
    return (
        <div>
           <ListGroup.Item key={item.product}>
               <Row>
                 <Col md={2}>
                   <Image src={item.imageProd} alt={item.nameProd} fluid rounded />
                 </Col>
                 <Col md={3}>
                   <Link
                     to={`/product/${item.product}`}
                   >
                     {item.nameProd}
                   </Link>
                 </Col>
                 <Col md={2}>DTN{item.price}</Col>
                 <Col md={2}>
                   <FormControl className={classes.formControl}>
                     <Select
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       label="Qty"
                       value={item.qty}
                       onChange={(e) => handleQtyChange(item.product, Number(e.target.value))}
                     >
                       
                       {[...Array(item.countInStock).keys()].map(x => (
                         <MenuItem key={x + 1} value={x + 1}>
                           {x + 1}
                         </MenuItem>
                       ))}
                     </Select>
                   </FormControl>
                 </Col>
                 
                 <Col md={2}>
                   <Button type="button" variant="light" onClick={() => handleRemove(item.product)}>
                     <i className="fas fa-trash"></i>
                   </Button>
                 </Col>
               </Row>
             </ListGroup.Item> 
        </div>
    )
}

export default CartItem
