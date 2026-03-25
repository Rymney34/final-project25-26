import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../authFront/auth.js";
import { useAuth } from "../authFront/authContext.jsx"; 
import Spinner from "../../spinner/Spinner.jsx"

const ProtectedRoute = () => {
  const [authStatus, setAuthStatus] = useState(null);
  const location = useLocation(); 
  
  
  const { updateToken, token } = useAuth; 

  useEffect(() => {
    const checkAuth = async () => {
  
      const result = await isAuthenticated(updateToken); 
      
      setAuthStatus(result);
    };
    
    checkAuth();
  }, [location.pathname, token, updateToken]);

 
  if (authStatus === null) return <Spinner/>;

  if (!authStatus) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;