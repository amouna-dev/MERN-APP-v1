import React, {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../JS/actions/AuthActions';
import { Link } from 'react-router-dom';
import Menu from './icon/menu.svg'
import Close from './icon/close.svg'
import Cart from './icon/cart.svg'
import '../../App.css';



const NavBar = () => {
    const [menu, setMenu] = useState(false)
    const {isAuth, user} = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch()
 
    const cartItems = useSelector(state => state.cart.cartItems)
      
    
  const getCartCount = () => {
        //return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
        
         return cartItems.length 
        
    }
    const logout = () => {
      dispatch(logoutUser())
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    const adminRouter = () =>{
        return(
            <>
                <li><Link to="/users"> Users</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/orderlist">Orders</Link></li>
                <li><Link to="/" onClick={logout}>Logout</Link></li>
            </>
        )
    }
    const userRouter = () =>{
        return(
        <>
            <li><Link to="/dashbord"> Shop </Link></li>
            <li><Link to="/history">History</Link></li>
            <li><Link to="/" onClick={logout}>Logout</Link></li>
        </>
    )}

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                <Link to= "/dashbord"> BestShop </Link>
                </h1>
            </div>
           
            <ul style={styleMenu}>            
                
                {
                    !isAuth? 
                    <li><Link to="/login">Login</Link></li> :
                        user.role === "admin"?  
                         adminRouter() : 
                         userRouter() 
                
                }         
                   
                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li> 
            
            </ul>
             
            {!isAuth ||(isAuth && user.role === "user")  ? 
                <div className="cart-icon">
                    <span>{getCartCount()}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
             : ''
            }
            
        </header>
    );
};

export default NavBar;