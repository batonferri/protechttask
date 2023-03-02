import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export const useUser = () => {
  return useContext(AuthContext);
};
