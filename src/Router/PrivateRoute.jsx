import React from 'react'
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {currentUser,loading} = useAuth();

    // if(loading){ return <div>Loading...</div>}
    if(loading){
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    }

    if(!loading && !currentUser){
        return <Navigate to="/login" replace />
    }
    if(currentUser){
        return children;
    } 
    
    return currentUser ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute