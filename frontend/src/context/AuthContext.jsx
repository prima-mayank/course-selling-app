import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     const token = localStorage.getItem("token");
    if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }

    const loadUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

 const logout = () => {
  localStorage.removeItem("token"); 
  setUser(null);                    
};


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        isAuth: !!user,
        isAdmin: user?.role === "admin",
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
