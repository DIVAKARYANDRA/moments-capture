import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/admin/PageHeader";
import { TextInput } from "../../components/admin/FormField";
import ImageUploader from "../../components/admin/ImageUploader";
import { LoadingState } from "../../components/site/States";
import { settingsService } from "../../services/settingsService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";
import { useSettings } from "../../context/SettingsContext";

export default function SiteSettings() {
  const { refresh } = useSettings();
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => setForm(await settingsService.get()))();
  }, []);

  const setField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { hero, ...rest } = form;
      await settingsService.update(rest);
      await refresh();
      toast.success("Settings updated");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <LoadingState />;

  return (
    <div>
      <PageHeader title="Site Settings" subtitle="Business info shown across the website — contact, branding and social links." />
      <form onSubmit={onSave} className="space-y-8 max-w-2xl">
        <ImageUploader label="Logo" value={form.logo} onChange={(v) => setField("logo", v)} folder={CLOUDINARY_FOLDERS.branding} />
        <TextInput label="Business Name" value={form.businessName} onChange={(v) => setField("businessName", v)} required />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput label="Phone" value={form.phone} onChange={(v) => setField("phone", v)} />
          <TextInput label="WhatsApp Number" value={form.whatsapp} onChange={(v) => setField("whatsapp", v)} />
        </div>
        <TextInput label="Email" type="email" value={form.email} onChange={(v) => setField("email", v)} />
        <TextInput label="Studio Address" value={form.address} onChange={(v) => setField("address", v)} />
        <TextInput label="Google Maps Embed URL" value={form.mapEmbedUrl} onChange={(v) => setField("mapEmbedUrl", v)} placeholder="https://www.google.com/maps/embed?..." />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <TextInput label="Instagram URL" value={form.instagram} onChange={(v) => setField("instagram", v)} />
          <TextInput label="Facebook URL" value={form.facebook} onChange={(v) => setField("facebook", v)} />
          <TextInput label="YouTube URL" value={form.youtube} onChange={(v) => setField("youtube", v)} />
        </div>
        <button type="submit" disabled={saving} className="bg-gold text-ink px-8 py-3 text-xs tracking-widest2 uppercase hover:bg-gold2 disabled:opacity-50">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
