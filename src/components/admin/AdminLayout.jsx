import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {
  LayoutDashboard,
  Settings,
  Image,
  Briefcase,
  Users,
  GalleryHorizontalEnd,
  Video,
  MessageSquareQuote,
  Inbox,
  LogOut,
  Camera,
  Menu,
  X,
  FileText,
} from "lucide-react";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { authService } from "../../services/authService";


const ALL_LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/settings", label: "Site Settings", icon: Settings },
  { to: "/admin/hero", label: "Hero Section", icon: Image },
  { to: "/admin/portfolio", label: "Portfolio", icon: Camera },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/founders", label: "Founders", icon: Users },
  { to: "/admin/gallery", label: "Gallery", icon: GalleryHorizontalEnd },
  { to: "/admin/videos", label: "Videos", icon: Video },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/admin/quotations", label: "Quotations", icon: FileText },
  { to: "/admin/enquiries", label: "Enquiries", icon: Inbox },
];

const ROLE_PERMISSIONS = {
  developer: [
    "/admin",
    "/admin/settings",
    "/admin/hero",
    "/admin/portfolio",
    "/admin/services",
    "/admin/founders",
    "/admin/gallery",
    "/admin/videos",
    "/admin/testimonials",
    "/admin/enquiries",
    "/admin/quotations",
  ],

  admin: [
    "/admin",
    "/admin/portfolio",
    "/admin/gallery",
    "/admin/videos",
    "/admin/testimonials",
    "/admin/enquiries",
    "/admin/quotations",
  ],
};

export default function AdminLayout() {

  const { user, role } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const links =
  ALL_LINKS.filter(link =>
    ROLE_PERMISSIONS[role]?.includes(link.to)
  );


  const closeMobileMenu = () => {
    setMobileOpen(false);
  };


  return (

    <div className="min-h-screen bg-ink text-ivory">


      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-30 h-16 flex items-center justify-between px-5 border-b border-line bg-ink2">

        <span className="font-display text-lg">
          Moments Capture
        </span>


        <button
          onClick={() => setMobileOpen(true)}
          className="text-ivory"
          aria-label="Open menu"
        >
          <Menu size={24}/>
        </button>


      </header>




      {/* Mobile Overlay */}

      {mobileOpen && (

        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={closeMobileMenu}
        />

      )}






      {/* Mobile Drawer */}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 bg-ink2 z-50
          flex flex-col
          transform transition-transform duration-300
          md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >


        <div className="px-6 py-6 border-b border-line flex items-center justify-between">


          <div>

            <span className="font-display text-xl">
              Moments Capture
            </span>

            <span className="block text-[10px] tracking-widest2 uppercase text-gold mt-1">
              Studio Admin
            </span>

          </div>


          <button
            onClick={closeMobileMenu}
            className="text-ivory"
          >
            <X size={22}/>
          </button>


        </div>





        <nav className="flex-1 overflow-y-auto py-4">


          {links.map((l)=>(

            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={closeMobileMenu}
              className={({isActive})=>
                `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                  isActive
                  ? "text-gold bg-ink border-r-2 border-gold"
                  : "text-ivory/60 hover:text-ivory hover:bg-ink/40"
                }`
              }
            >

              <l.icon size={16}/>
              {l.label}

            </NavLink>

          ))}


        </nav>





        {/* Mobile Logout */}

        <div className="p-4 border-t border-line">


          <div className="text-xs text-ivory/40 mb-3 truncate">
            {user?.email}
          </div>


          <button
            onClick={() => authService.logout()}
            className="flex items-center gap-2 text-xs tracking-widest2 uppercase text-ivory/60 hover:text-red-400"
          >

            <LogOut size={14}/>
            Logout

          </button>


        </div>


      </aside>








      {/* Main Layout */}

      <div className="flex min-h-screen">


        {/* Desktop Sidebar */}

        <aside className="w-64 flex-shrink-0 border-r border-line bg-ink2 hidden md:flex flex-col">


          <div className="px-6 py-6 border-b border-line">

            <span className="font-display text-xl">
              Moments Capture
            </span>

            <span className="block text-[10px] tracking-widest2 uppercase text-gold mt-1">
              Studio Admin
            </span>

          </div>




          <nav className="flex-1 py-4 overflow-y-auto">


            {links.map((l)=>(

              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({isActive})=>
                  `flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                    isActive
                    ? "text-gold bg-ink border-r-2 border-gold"
                    : "text-ivory/60 hover:text-ivory hover:bg-ink/40"
                  }`
                }
              >

                <l.icon size={16}/>
                {l.label}

              </NavLink>

            ))}


          </nav>





          <div className="p-4 border-t border-line">


            <div className="text-xs text-ivory/40 mb-3 truncate">
              {user?.email}
            </div>


            <button
              onClick={() => authService.logout()}
              className="flex items-center gap-2 text-xs tracking-widest2 uppercase text-ivory/60 hover:text-red-400"
            >

              <LogOut size={14}/>
              Logout

            </button>


          </div>


        </aside>







        {/* Page Content */}

        <main className="flex-1 min-w-0">


          <div className="p-6 md:p-10 max-w-6xl mx-auto">

            <Outlet />

          </div>


        </main>


      </div>





      <Toaster
        position="bottom-center"
        toastOptions={{
          style:{
            background:"#151210",
            color:"#F5F1E8",
            border:"1px solid #2A241E"
          }
        }}
      />


    </div>

  );

}
