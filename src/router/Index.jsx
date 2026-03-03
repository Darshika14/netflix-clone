import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import NotFoundPage from "../pages/NotFoundPage";
import { useAuth } from "../hooks/UseAuth";
import LayoutPage from "../pages/LayoutPage";
import About from "../pages/About";
import ProtectedRoute from "../components/commons/ProtectedRoute";
import AppShell from "../layout/AppShell";
import MovieDetails from "../pages/MovieDetails";
import Grid from "../pages/Grid";
import TableView from "../components/commons/TableView";

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/browse" : "/landingpage"} replace />;
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <AppShell>
        <Outlet />
      </AppShell>
    </ProtectedRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeRedirect />,
  },
  {
    path: "/landingpage",
    element: <LayoutPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/browse",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Grid />,
          },
          {
            path: "table-view",
            element: <TableView />,
          },
        ],
      },
      {
        path: "browse/:movieId",
        element: <MovieDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
