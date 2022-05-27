import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateRoute = () => {
    const user = useSelector((state) => state.user.user);

  return (
    user ? <Home/> : <Navigate to='/register' />  
  )
}

export default PrivateRoute;