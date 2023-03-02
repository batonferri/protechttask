import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const RedirectLayout = () => {
  const navigate = useNavigate();
  const { me } = useUser();
  const pathName = location.pathname;
  useEffect(() => {
    if (!!me && (pathName === "/register" || pathName === "/login"))
      return navigate("/");
    if (pathName === "/register") return;
    if (!me) return navigate("/login");
  }, [me]);

  return <Outlet />;
};

export default RedirectLayout;
