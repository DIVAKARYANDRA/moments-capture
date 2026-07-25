import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LoadingState } from "../site/States";

export default function ProtectedRoute({ children }) {
  const { canAccessAdmin, loading } = useAuth();

  if (loading) return <div className="min-h-screen bg-ink flex items-center justify-center"><LoadingState label="Checking access" /></div>;
  if (!canAccessAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}
