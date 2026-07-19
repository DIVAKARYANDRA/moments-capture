import { Pencil, Trash2 } from "lucide-react";
import { EmptyState, LoadingState } from "../site/States";

/**
 * columns: [{ key, label, render?: (row) => node }]
 */
export default function DataTable({ columns, rows, loading, onEdit, onDelete, emptyLabel }) {
  if (loading) return <LoadingState />;
  if (!rows || rows.length === 0) return <EmptyState title={emptyLabel || "No records yet"} />;

  return (
    <div className="overflow-x-auto border border-line">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-line bg-ink2 text-left">
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-xs tracking-widest2 uppercase text-ivory/50 font-normal">{c.label}</th>
            ))}
            <th className="px-4 py-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-0 hover:bg-ink2/60">
              {columns.map((c) => (
                <td key={c.key} className="px-4 py-3 text-ivory/80 align-middle">
                  {c.render ? c.render(row) : String(row[c.key] ?? "—")}
                </td>
              ))}
              <td className="px-4 py-3">
                <div className="flex items-center gap-3 justify-end">
                  <button onClick={() => onEdit(row)} className="text-ivory/50 hover:text-gold" aria-label="Edit"><Pencil size={15} /></button>
                  <button onClick={() => onDelete(row)} className="text-ivory/50 hover:text-red-400" aria-label="Delete"><Trash2 size={15} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
