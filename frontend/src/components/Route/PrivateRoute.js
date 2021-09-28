import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const PrivateRoute = ({component : Component, ...rest}) => {
    const isAuth = useSelector(state => state.AuthReducer.isAuth )
    if(isAuth){
        return <Route component={Component} {...rest} />
    }
    return <Redirect to="/login" />
};

export default PrivateRoute;