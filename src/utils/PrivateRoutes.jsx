import { Navigate } from "react-router-dom";
import { get_token } from "./storage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ children }) => {

  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)

  const [isChecking, setIsChecking] = useState(true)

  const checkLoginStatus = () => {
        
    const token =  get_token();
    console.log("token in private layout :",token);
    if(token){
      console.log("Token hai bhai ")
        setIsLoggedIn(true);
    }
  else{
      setIsLoggedIn(false) 
  }

  setIsChecking(false);
  };
  
  useEffect(() => {
    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []); 

  useEffect(() => {
    console.log("isLoggedIn value updated:", isLoggedIn);
  }, [isLoggedIn]); // Log the updated value when `isLoggedIn` changes
 
  if (isChecking) {
    // Render nothing or a loader while checking login status
    return <div>Loading...</div>;
  }
 
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
