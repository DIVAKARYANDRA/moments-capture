import { Link } from "react-router-dom";

const base =
  "inline-flex items-center justify-center gap-2 px-8 py-3 text-sm tracking-widest2 uppercase transition-all duration-500 ease-silk";

const variants = {
  primary: "bg-gold text-ink hover:bg-gold2",
  outline: "border border-gold text-ivory hover:bg-gold hover:text-ink",
  ghost: "text-ivory border-b border-ivory/30 hover:border-gold hover:text-gold px-0 py-1",
};

export default function Button({ to, href, onClick, variant = "primary", children, type = "button", className = "" }) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
