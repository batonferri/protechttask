import axios from "axios";
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [me, setMe] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  const login = async (inputs) => {
    const { data } = await axios.post(
      "http://localhost:80/api/login.php",
      inputs
    );
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    setMe(data.userInfo);
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    setMe(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, me }}>
      {children}
    </AuthContext.Provider>
  );
};
