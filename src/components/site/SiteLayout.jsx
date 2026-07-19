import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function SiteLayout() {
  return (
    <div className="bg-ink min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="bottom-center" toastOptions={{ style: { background: "#151210", color: "#F5F1E8", border: "1px solid #2A241E" } }} />
    </div>
  );
}
