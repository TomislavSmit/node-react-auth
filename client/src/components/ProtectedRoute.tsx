import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../context/auth'

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext)

    return user ? <Outlet /> : <Navigate to='/register' />
}

export default ProtectedRoute
