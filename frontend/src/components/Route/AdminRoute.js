import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({component : Component, ...rest}) => {
    const { isAuth, user } = useSelector(state => state.AuthReducer )
    if(!isAuth){
        return <Redirect to="/login" />
    } if(user.role !== "admin") {
        return <Redirect to="/" />
    }
        return <Route component={Component} {...rest} />
};

export default AdminRoute;