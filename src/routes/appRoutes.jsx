import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../components/home";
import ServicePackage from "../components/servicePackage";
import Login from "../components/login";
import ErrorPage from "../components/errorPage";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../pages/dashboard";
import PublicRoute from '../components/publicRoute';

export const appRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/service/:id',
        element: <ServicePackage />
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      },
      {
        path: '/profile/account/',
        element: (
          <PrivateRoute>
            <h1>profile account</h1>
          </PrivateRoute>
        )
      },
      {
        path: '/login',
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        )
      },
    ],
    errorElement: <ErrorPage />
  },

]);