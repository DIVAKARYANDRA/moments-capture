export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
      <div>
        <h1 className="font-display text-3xl text-ivory">{title}</h1>
        {subtitle && <p className="text-ivory/50 text-sm mt-1 font-light">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
