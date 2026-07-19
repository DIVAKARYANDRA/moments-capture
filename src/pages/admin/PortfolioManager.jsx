import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Star } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import Modal from "../../components/admin/Modal";
import DataTable from "../../components/admin/DataTable";
import ImageUploader from "../../components/admin/ImageUploader";
import MultiImageUploader from "../../components/admin/MultiImageUploader";
import { TextInput, TextArea, SelectInput, CheckboxInput } from "../../components/admin/FormField";
import { portfolioService } from "../../services/portfolioService";
import { optimizedUrl, CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const CATEGORIES = ["Weddings", "Pre-Weddings", "Events", "Corporate", "Maternity", "Portraits"];

const emptyForm = {
  title: "", category: "", location: "", date: "", description: "",
  coverImage: "", images: [], videoUrl: "", featured: false,
};

export default function PortfolioManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      setRows(await portfolioService.getAll({ orderByField: "date", direction: "desc" }));
    } catch (e) {
      console.error(e);
      toast.error("Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing({}); };
  const openEdit = (row) => { setForm({ ...emptyForm, ...row }); setEditing(row); };
  const closeModal = () => { setEditing(null); setForm(emptyForm); };
  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const folderForCategory = () =>
    CLOUDINARY_FOLDERS.portfolio((form.category || "misc").toLowerCase().replace(/\s+/g, "-"));

  const onSave = async (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.coverImage) {
      toast.error("Title, category and cover image are required.");
      return;
    }
    setSaving(true);
    try {
      if (editing?.id) {
        await portfolioService.update(editing.id, form);
        toast.success("Portfolio item updated");
      } else {
        await portfolioService.add(form);
        toast.success("Portfolio item added");
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
    if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    try {
      await portfolioService.remove(row.id);
      toast.success("Deleted");
      load();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const columns = [
    { key: "cover", label: "", render: (r) => <img src={optimizedUrl(r.coverImage, { width: 100 })} alt="" className="w-12 h-12 object-cover" /> },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "date", label: "Date" },
    { key: "featured", label: "Featured", render: (r) => (r.featured ? <Star size={14} className="text-gold fill-gold" /> : "—") },
  ];

  return (
    <div>
      <PageHeader
        title="Portfolio"
        subtitle="Full CRUD for wedding stories and shoots displayed on the Portfolio page."
        action={
          <button onClick={openNew} className="flex items-center gap-2 bg-gold text-ink px-5 py-2.5 text-xs tracking-widest2 uppercase hover:bg-gold2">
            <Plus size={14} /> Add Portfolio Item
          </button>
        }
      />

      <DataTable columns={columns} rows={rows} loading={loading} onEdit={openEdit} onDelete={onDelete} emptyLabel="No portfolio items yet" />

      {editing !== null && (
        <Modal title={editing.id ? "Edit Portfolio Item" : "Add Portfolio Item"} onClose={closeModal} wide>
          <form onSubmit={onSave} className="space-y-5">
            <TextInput label="Title" value={form.title} onChange={(v) => setField("title", v)} required />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <SelectInput label="Category" value={form.category} onChange={(v) => setField("category", v)} options={CATEGORIES} />
              <TextInput label="Date" type="date" value={form.date} onChange={(v) => setField("date", v)} />
            </div>
            <TextInput label="Location" value={form.location} onChange={(v) => setField("location", v)} />
            <TextArea label="Description" value={form.description} onChange={(v) => setField("description", v)} />
            <ImageUploader label="Cover Image" value={form.coverImage} onChange={(v) => setField("coverImage", v)} folder={folderForCategory()} />
            <MultiImageUploader label="Gallery Images" value={form.images} onChange={(v) => setField("images", v)} folder={folderForCategory()} />
            <TextInput label="Video URL (optional)" value={form.videoUrl} onChange={(v) => setField("videoUrl", v)} placeholder="YouTube or Vimeo link" />
            <CheckboxInput label="Feature this story on the homepage" checked={form.featured} onChange={(v) => setField("featured", v)} />
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
