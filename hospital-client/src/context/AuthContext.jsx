import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
      async function checkLogin() {
        const cookies = Cookies.get()
        if (!cookies.token) {
            setIsAuthenticated(false);
            setLoading(false)
            return setUser(null);
        }
        try {
            const res = await verifyTokenRequest(cookies.token)
            if(!res.data) {
                setIsAuthenticated(false)
                setLoading(false)
                return
            }

            setIsAuthenticated(true)
            setUser(res.data)
            setLoading(false)
        } catch (error) {
            setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
        }

      }
      checkLogin();
    }, []);

    const signUp = async (user) => {
        try {
            const res = await registerRequest(user)
            if (res.status === 200) {
                console.log("Paciente registrado");
            }
        } catch (error) {
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            return setErrors(error.response.data.message)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            if (res.status === 200) {
                setIsAuthenticated(true);
                setUser(res.data);
            }
          } catch (error) {
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            return setErrors([error.response.data.message])
          }
    }

    const logout = () => {
        Cookies.remove("token")
        setIsAuthenticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
          const timer = setTimeout(() => {
            setErrors([]);
          }, 5000);
          return () => clearTimeout(timer);
        }
      }, [errors]);

    return (
        <AuthContext.Provider value={{
            signUp, 
            signIn,
            logout,
            user, 
            isAuthenticated, 
            errors,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;