import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const userInfo = useSelector((state) => state.userInfo);

    if (!userInfo.isLogged) {
        return <Navigate to="/login" replace="true" />
    }
    return children;
}

export default ProtectedRoute;
