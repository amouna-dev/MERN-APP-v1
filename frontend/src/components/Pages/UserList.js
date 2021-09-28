import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../JS/actions/userActions';
import User from './User';
import { Spinner } from 'react-bootstrap';

const UserList = () => {
    const users = useSelector(state => state.userReducer.users)
    const userLoding = useSelector(state => state.userReducer.userLoding)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
        //eslint-disable-next-line
    },[])
    return (
        <div>
            <h2> Liste of Users </h2>
           { userLoding? (
               <Spinner animation="border" role="status">
               <span className="visually-hidden">Loading...</span>
           </Spinner>
           ) : users.length === 0? (
            <h3> No users in Database </h3>
           ) : (
               users.map(user => <User user={user} key={user._id} /> )
           )} 
        </div>
    );
};

export default UserList;