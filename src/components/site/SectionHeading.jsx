export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  const alignCls = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";
  return (
    <div className={`flex flex-col ${alignCls} max-w-2xl mb-14`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className={`font-display text-4xl md:text-5xl ${light ? "text-ink" : "text-ivory"}`}>{title}</h2>
      {subtitle && (
        <p className={`mt-5 text-sm md:text-base font-light leading-relaxed ${light ? "text-ink/70" : "text-ivory/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
