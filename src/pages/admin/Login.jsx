import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { authService } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!authLoading && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="w-14 h-14 rounded-full border border-gold flex items-center justify-center text-gold mx-auto mb-5"><Lock size={20} /></span>
          <h1 className="font-display text-3xl text-ivory">Studio Login</h1>
          <p className="text-ivory/40 text-sm mt-2 font-light">Moments Capture Admin Dashboard</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-ink2 border border-line focus:border-gold outline-none px-4 py-3 text-ivory text-sm" />
          </div>
          <div>
            <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-ink2 border border-line focus:border-gold outline-none px-4 py-3 text-ivory text-sm" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-gold text-ink py-3 text-xs tracking-widest2 uppercase hover:bg-gold2 disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
