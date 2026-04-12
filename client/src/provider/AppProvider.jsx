import { useCallback, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContextProvider = ({ children }) => {
  axios.defaults.withCredentials = true;
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(false);

  //to fetch the user data upon login i.e. user name
  const getUserData = useCallback(async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendURL]);

  //to check whether the user is authenticated or not

  const getAuthState = useCallback(async () => {
    try {
      const { data } = await axios.post(backendURL + "/api/auth/is-auth");

      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendURL, getUserData]);

  //when the component mounts. This ensures the app checks if the user is logged in (via the JWT cookie) every time the page loads.
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  const value = {
    backendURL,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
