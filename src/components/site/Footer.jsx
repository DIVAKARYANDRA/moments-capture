import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon, YoutubeIcon } from "./SocialIcons";
import { useSettings } from "../../context/SettingsContext";

export default function Footer() {
  const { settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-line pt-20 pb-8 px-6 md:px-10">
      <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <h3 className="font-display text-3xl text-ivory mb-4">{settings.businessName}</h3>
          <p className="text-ivory/50 text-sm leading-relaxed font-light">
            Premium wedding photography &amp; cinematography across Andhra Pradesh and Telangana.
          </p>
        </div>

        <div>
          <span className="eyebrow block mb-5">Explore</span>
          <ul className="space-y-3 text-sm text-ivory/60 font-light">
            <li><Link to="/portfolio" className="hover:text-gold">Portfolio</Link></li>
            <li><Link to="/services" className="hover:text-gold">Services</Link></li>
            <li><Link to="/films" className="hover:text-gold">Films</Link></li>
            <li><Link to="/about" className="hover:text-gold">About Us</Link></li>
          </ul>
        </div>

        <div>
          <span className="eyebrow block mb-5">Contact</span>
          <ul className="space-y-3 text-sm text-ivory/60 font-light">
            {settings.phone && <li className="flex items-center gap-2"><Phone size={14} /> {settings.phone}</li>}
            {settings.email && <li className="flex items-center gap-2"><Mail size={14} /> {settings.email}</li>}
            {settings.address && <li>{settings.address}</li>}
          </ul>
        </div>

        <div>
          <span className="eyebrow block mb-5">Follow</span>
          <div className="flex gap-4">
            {settings.instagram && (
              <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-ivory/60 hover:text-gold"><InstagramIcon size={18} /></a>
            )}
            {settings.facebook && (
              <a href={settings.facebook} target="_blank" rel="noreferrer" className="text-ivory/60 hover:text-gold"><FacebookIcon size={18} /></a>
            )}
            {settings.youtube && (
              <a href={settings.youtube} target="_blank" rel="noreferrer" className="text-ivory/60 hover:text-gold"><YoutubeIcon size={18} /></a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-content mx-auto border-t border-line pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-ivory/30 font-light tracking-wide">
        <span>© {year} {settings.businessName}. All rights reserved.</span>
        <Link to="/admin/login" className="hover:text-gold/60">Studio Login</Link>
      </div>
    </footer>
  );
}
