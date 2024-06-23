import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast"; 

const isSessionExpired = () => {
  const expiryTime = localStorage.getItem("expiryTime");
  return expiryTime && new Date().getTime() > parseInt(expiryTime, 10);
};

const isAuthenticated = () => {
  const secretKey = localStorage.getItem("secretKey");
  return Boolean(secretKey) && !isSessionExpired();
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation(); 
  const sessionExpired = isSessionExpired(); 

  if (sessionExpired) {
    localStorage.removeItem("secretKey");
    localStorage.removeItem("expiryTime");
    toast.error("Session expired. Please log in again.");
    
    return <Navigate to="/authentication/login" state={{ from: location }} />; 
  }

  if (!isAuthenticated()) {
    setTimeout(()=> {
        toast.error("Unauthorise user. Please log in.")
    }, 1000)
    return <Navigate to="/authentication/login" state={{ from: location }} />; 
  }

  return children; 
};

export default ProtectedRoute;
