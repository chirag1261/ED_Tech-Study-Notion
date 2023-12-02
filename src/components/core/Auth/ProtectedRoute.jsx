import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { authenticatedUser, logout } from '../../../services/operations/authAPI'
import { useEffect } from 'react'

function ProtectedRoute({children}) {
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      async function isAuthenticatedUser() {
        const response = await authenticatedUser(token, navigate);
        // console.log("Response", response);
        if(!response) {
          dispatch(logout(navigate));
        }
      }
      
      if(token) {
        isAuthenticatedUser();
      }
    }, [token]);

    if(token === null) {
      return <Navigate to="/login" />
    }

    return children
}

export default ProtectedRoute