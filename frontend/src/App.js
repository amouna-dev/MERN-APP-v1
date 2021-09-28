import React,{ useEffect }from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuthUser } from './JS/actions/AuthActions';
//import Navigation from './components/Pages/Navigation';
import NavBar from './components/Header/NavBar';
import Home from './components/Pages/Home';
import Dashbord from './components/Pages/Dashbord';
import PrivateRoute from './components/Route/PrivateRoute';
import UserList from './components/Pages/UserList';
import AdminRoute from './components/Route/AdminRoute';
import EditUser from './components/Pages/Edit';
import Profile from './components/Pages/Profile';
import ProductDetails from './components/Pages/ProductDetails';
import ManageProduct from './components/Pages/ManageProduct';
import AddProduct from './components/Pages/AddProduct';
import Cart from './components/Pages/Cart';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Shipping from './components/Pages/Shipping';
import Payment from './components/Pages/Payment';
import OrderHistory from './components/Pages/OrderHistory';
import './App.css';
import PlaceOrder from './components/Pages/PlaceOrder';
import Order from './components/Pages/Order';
import OrderList from './components/Pages/OrderList';


function App() {
  const dispatch = useDispatch()
  const getUser = () => dispatch(getAuthUser())


  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  },[])
  
  return (
    <div className="App">
      <NavBar />
      
      <Switch>

        <Route exact path="/" component= {Home} />     
        <Route exact path="/login" component= {Login} />     
        <Route exact path="/register" component= {Register} />     
        <Route exact path="/profile/:id" component= {Profile} />
        <Route exact path="/users" component= {UserList} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/cart" component={Cart} />


        <PrivateRoute exact path="/dashbord" component={Dashbord} />
        <PrivateRoute exact path="/shipping" component={Shipping} />
        <PrivateRoute exact path="/payment" component={Payment} />
        <PrivateRoute exact path="/placeorder" component={PlaceOrder} />
        <Route exact path="/order/:id" component={Order} />
        <PrivateRoute exact path="/history" component={OrderHistory} />

        <AdminRoute exact path="/dashbord" component={Dashbord} />    
        
        <AdminRoute exact path="/edit/:id" component= {EditUser} />
        <AdminRoute exact path="/users" component={UserList} />
       
        <AdminRoute exact path="/products" component={ManageProduct} />
        <AdminRoute  path={["/products/edit/:id", "/products/add"]} component={AddProduct} />
        <AdminRoute exact path="/orderlist" component={OrderList} />
     
      </Switch>
    </div>
  );
}

export default App;
