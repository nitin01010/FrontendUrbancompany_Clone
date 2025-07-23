import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/api";
import AuthenticationRender from "./authenticationRender";
import React from "react";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("auth");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify-auth"],
    queryFn: () =>
      fetchData(`${baseUrl}/account/profile/auth/check`, "GET", null, {
        Authorization: `Bearer ${token}`,
      }),
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <AuthenticationRender />;

  if (isError || data?.success === false) {
    sessionStorage.removeItem("auth");
    return <Navigate to="/login" replace />;
  }

  const user = data?.user;

  // ✅ Pass user data as props to children
  return React.cloneElement(children, {
    userName: user?.name,
    userNumber: user?.number,
  });
};

export default PrivateRoute;
