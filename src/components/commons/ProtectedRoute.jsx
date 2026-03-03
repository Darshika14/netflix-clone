import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/UseAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/landingpage" state={{ from: location }} replace />;
  }

  return children;
}
