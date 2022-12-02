import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { reset } from '../features/authSlice';

const ToLogin = (props) => {
    const dispatch = useDispatch();

    const { location } = props;

    React.useEffect(() => {
            dispatch(reset());
    })
    return (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

const RequireAuth = () => {
    const location = useLocation();
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');

    return (
        user && role ? <Outlet /> : <ToLogin {...location} />
    );
}

export default RequireAuth