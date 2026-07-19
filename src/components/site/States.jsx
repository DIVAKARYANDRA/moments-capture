export function LoadingState({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border border-gold/30 border-t-gold rounded-full animate-spin" />
      <span className="text-xs tracking-widest2 uppercase text-ivory/40">{label}</span>
    </div>
  );
}

export function EmptyState({ title = "Nothing here yet", subtitle }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-2">
      <span className="font-display text-2xl text-ivory/70">{title}</span>
      {subtitle && <span className="text-sm text-ivory/40 font-light">{subtitle}</span>}
    </div>
  );
}
