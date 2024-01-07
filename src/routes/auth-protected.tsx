import { Navigate, Outlet } from "react-router-dom";

interface AuthProtectedRouteProps {
  allowed: boolean;
  redirectURL?: string;
}

const AuthProtectedRoute = ({ allowed = false, redirectURL = "/" }: AuthProtectedRouteProps) => {
  if (allowed) return <Outlet />;

  return <Navigate to={redirectURL} />;
};

export default AuthProtectedRoute;
