import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../api/api";
import AuthenticationRender from "./authenticationRender";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("auth");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify-auth-public"],
    queryFn: () =>
      fetchData(`${baseUrl}/account/profile/auth/check`, "GET", null, {
        Authorization: `Bearer ${token}`,
      }),
    enabled: !!token, // only run if token exists
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Show loading animation while checking auth
  if (isLoading) {
    return <AuthenticationRender />;
  }

  // If token is invalid or error in API → remove token and show children
  if (isError || data?.success === false) {
    sessionStorage.removeItem("auth");
    return children;
  }

  // ✅ Token is valid → redirect to dashboard
  if (data?.success) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
