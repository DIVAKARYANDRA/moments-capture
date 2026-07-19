import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import PageHeader from "./PageHeader";
import Modal from "./Modal";
import DataTable from "./DataTable";
import ImageUploader from "./ImageUploader";
import {
  TextInput, TextArea, SelectInput, CheckboxInput, ListInput,
} from "./FormField";

/**
 * Config-driven CRUD page for simple single-image collections
 * (services, founders, testimonials, videos, gallery).
 *
 * fields: [{ name, label, type: 'text'|'textarea'|'number'|'image'|'select'|'checkbox'|'list', options?, folder? }]
 * columns: table columns, defaults derived from fields if omitted
 */
export default function SimpleCrudManager({ title, subtitle, service, fields, columns, orderByField, emptyLabel }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, {...} = edit
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = orderByField
        ? await service.getAll({ orderByField })
        : await service.getAll();
      setRows(data);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    const defaults = {};
    fields.forEach((f) => { defaults[f.name] = f.type === "list" ? [] : f.type === "checkbox" ? false : ""; });
    setForm(defaults);
    setEditing({});
  };

  const openEdit = (row) => { setForm(row); setEditing(row); };
  const closeModal = () => { setEditing(null); setForm({}); };

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing?.id) {
        await service.update(editing.id, form);
        toast.success("Updated");
      } else {
        await service.add(form);
        toast.success("Added");
      }
      closeModal();
      load();
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (row) => {
    if (!confirm(`Delete "${row[fields[0].name] || "this item"}"? This cannot be undone.`)) return;
    try {
      await service.remove(row.id);
      toast.success("Deleted");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const tableColumns = columns || fields
    .filter((f) => f.type !== "image" && f.type !== "list" && f.type !== "textarea")
    .slice(0, 3)
    .map((f) => ({ key: f.name, label: f.label }));

  return (
    <div>
      <PageHeader
        title={title}
        subtitle={subtitle}
        action={
          <button onClick={openNew} className="flex items-center gap-2 bg-gold text-ink px-5 py-2.5 text-xs tracking-widest2 uppercase hover:bg-gold2">
            <Plus size={14} /> Add New
          </button>
        }
      />

      <DataTable columns={tableColumns} rows={rows} loading={loading} onEdit={openEdit} onDelete={onDelete} emptyLabel={emptyLabel} />

      {editing !== null && (
        <Modal title={editing.id ? "Edit" : "Add New"} onClose={closeModal} wide>
          <form onSubmit={onSave} className="space-y-5">
            {fields.map((f) => {
              const val = form[f.name];
              switch (f.type) {
                case "image":
                  return <ImageUploader key={f.name} label={f.label} value={val} onChange={(v) => setField(f.name, v)} folder={f.folder} />;
                case "textarea":
                  return <TextArea key={f.name} label={f.label} value={val} onChange={(v) => setField(f.name, v)} />;
                case "select":
                  return <SelectInput key={f.name} label={f.label} value={val} onChange={(v) => setField(f.name, v)} options={f.options} />;
                case "checkbox":
                  return <CheckboxInput key={f.name} label={f.label} checked={val} onChange={(v) => setField(f.name, v)} />;
                case "list":
                  return <ListInput key={f.name} label={f.label} value={val} onChange={(v) => setField(f.name, v)} />;
                case "number":
                  return <TextInput key={f.name} label={f.label} type="number" value={val} onChange={(v) => setField(f.name, v)} />;
                default:
                  return <TextInput key={f.name} label={f.label} value={val} onChange={(v) => setField(f.name, v)} required={f.required} />;
              }
            })}
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={closeModal} className="px-5 py-2.5 text-xs tracking-widest2 uppercase text-ivory/60 hover:text-ivory">Cancel</button>
              <button type="submit" disabled={saving} className="bg-gold text-ink px-6 py-2.5 text-xs tracking-widest2 uppercase hover:bg-gold2 disabled:opacity-50">
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
