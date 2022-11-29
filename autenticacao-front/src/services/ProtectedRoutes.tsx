import { destroyCookie, parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { api } from "./api";
const useAuth = () => {
  const user = { loggedIn: false };
  return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const cookie = parseCookies(undefined, "authorization_token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkToken() {
      try {
        await api.get(`/oauth/check_token?token=${cookie.authorization_token}`);
        setLoading(true);
      } catch (err) {
        setLoading(false);
        destroyCookie(undefined, "authorization_token");
        destroyCookie(undefined, "refresh_token");
      }
    }

    checkToken();
  }, []);

  return loading && cookie.authorization_token ? (
    <Outlet />
  ) : (
    <Navigate to="/"></Navigate>
  );
};

export default ProtectedRoutes;
