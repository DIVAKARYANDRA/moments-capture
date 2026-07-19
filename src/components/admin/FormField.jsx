export function TextInput({ label, value, onChange, type = "text", placeholder, required }) {
  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full bg-ink border border-line focus:border-gold outline-none px-4 py-2.5 text-ivory text-sm"
      />
    </div>
  );
}

export function TextArea({ label, value, onChange, rows = 4 }) {
  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full bg-ink border border-line focus:border-gold outline-none px-4 py-2.5 text-ivory text-sm resize-none"
      />
    </div>
  );
}

export function SelectInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-ink border border-line focus:border-gold outline-none px-4 py-2.5 text-ivory text-sm"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export function CheckboxInput({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} className="accent-gold w-4 h-4" />
      <span className="text-sm text-ivory/80">{label}</span>
    </label>
  );
}

export function ListInput({ label, value = [], onChange, placeholder }) {
  const items = Array.isArray(value) ? value : [];
  const update = (i, v) => onChange(items.map((it, idx) => (idx === i ? v : it)));
  const add = () => onChange([...items, ""]);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));

  return (
    <div>
      <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={it}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className="flex-1 bg-ink border border-line focus:border-gold outline-none px-4 py-2 text-ivory text-sm"
            />
            <button type="button" onClick={() => remove(i)} className="px-3 text-ivory/40 hover:text-red-400 text-sm">✕</button>
          </div>
        ))}
        <button type="button" onClick={add} className="text-xs tracking-widest2 uppercase text-gold hover:text-gold2">+ Add Item</button>
      </div>
    </div>
  );
}
