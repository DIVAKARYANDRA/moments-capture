import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import logo from "../../assets/logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/services", label: "Services" },
  { to: "/films", label: "Films" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/90 backdrop-blur-md border-b border-line" : "bg-gradient-to-b from-ink/70 to-transparent"
      }`}
    >
      <div className="max-w-content mx-auto flex items-center justify-between px-6 md:px-10 py-5">
        <Link
          to="/"
          className="flex items-center gap-3"
        >
        
          <img
            src={logo}
            alt="Moments Capture"
            className="h-10 w-auto object-contain"
          />
        
          <span className="font-display text-2xl tracking-wide text-ivory">
            {settings.businessName || "Moments Capture"}
          </span>
        
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-xs tracking-widest2 uppercase transition-colors ${
                  isActive ? "text-gold" : "text-ivory/80 hover:text-gold"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button className="md:hidden text-ivory" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-ink z-50 flex flex-col items-center justify-center gap-8">
          <button className="absolute top-6 right-6 text-ivory" onClick={() => setOpen(false)} aria-label="Close menu">
            <X size={28} />
          </button>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-display text-3xl ${isActive ? "text-gold" : "text-ivory"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
