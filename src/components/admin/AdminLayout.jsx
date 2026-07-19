import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard, Settings, Image, Briefcase, Users, GalleryHorizontalEnd,
  Video, MessageSquareQuote, Inbox, LogOut, Camera,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/hero", label: "Hero Section", icon: Image },
  { to: "/admin/portfolio", label: "Portfolio", icon: Camera },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/founders", label: "Founders", icon: Users },
  { to: "/admin/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { to: "/admin/videos", label: "Videos", icon: Video },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

export default function AdminLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-ink flex text-ivory">
      <aside className="w-64 flex-shrink-0 border-r border-line bg-ink2 hidden md:flex flex-col">
        <div className="px-6 py-6 border-b border-line">
          <span className="font-display text-xl">Moments Capture</span>
          <span className="block text-[10px] tracking-widest2 uppercase text-gold mt-1">Studio Admin</span>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive ? "text-gold bg-ink border-r-2 border-gold" : "text-ivory/60 hover:text-ivory hover:bg-ink/40"
                }`
              }
            >
              <l.icon size={16} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <div className="text-xs text-ivory/40 mb-3 truncate">{user?.email}</div>
          <button
            onClick={() => authService.logout()}
            className="flex items-center gap-2 text-xs tracking-widest2 uppercase text-ivory/60 hover:text-red-400"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Toaster position="bottom-center" toastOptions={{ style: { background: "#151210", color: "#F5F1E8", border: "1px solid #2A241E" } }} />
    </div>
  );
}
