import React from 'react';
import { useSelector } from 'react-redux';
import ProductList from './ProductList';
import { Link } from 'react-router-dom';

const Dashbord = () => {
    const user = useSelector(state => state.AuthReducer.user)
    return (
        <div>
            <div className = "filter">
            {!user? (
              <h2> You are not connect, Please SignIn </h2>
            ) : (
            <>
                <h3> Welcome Mr/Mme: {" "} 
                 <Link to={`/profile/${user._id}`} > 
                    {user.firstName} {user.lastName} 
                 </Link>  
                </h3>  
            </>
            )
            }
            </div>
            <ProductList />
            
        </div>
    );
};

export default Dashbord;