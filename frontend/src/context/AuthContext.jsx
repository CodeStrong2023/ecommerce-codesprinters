/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import api from "../utils/api";
const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthProvider");
  }
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [errors, setErrors] = useState(null);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      api
        .get("/auth/perfil", {
          withCredentials: true,
        })
        .then((response) => {
          setUser(response.data);
          setIsAuth(true);
        })
        .catch((error) => {
          setUser(null);
          setIsAuth(false);
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    console.log(isAuth);
    console.log(Cookies.get("token"));
  }, [isAuth, user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        errorsAuth: errors,
        setErrorsAuth: setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
