import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageHeader from "../../components/admin/PageHeader";
import { TextInput, TextArea } from "../../components/admin/FormField";
import ImageUploader from "../../components/admin/ImageUploader";
import { LoadingState } from "../../components/site/States";
import { settingsService } from "../../services/settingsService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";
import { useSettings } from "../../context/SettingsContext";
import VideoUploader from "../../components/admin/VideoUploader";

export default function HeroManagement() {
  const { refresh } = useSettings();
  const [hero, setHero] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const s = await settingsService.get();
      setHero(s.hero);
    })();
  }, []);

  const setField = (name, value) => setHero((h) => ({ ...h, [name]: value }));

  const onSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsService.update({ hero });
      await refresh();
      toast.success("Hero section updated");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!hero) return <LoadingState />;

  return (
    <div>
      <PageHeader title="Hero Section" subtitle="The first thing visitors see on your homepage." />
      <form onSubmit={onSave} className="space-y-8 max-w-2xl">
        <ImageUploader label="Background Image" value={hero.backgroundImage} onChange={(v) => setField("backgroundImage", v)} folder={CLOUDINARY_FOLDERS.hero} />
        <TextInput label="Background Video URL (optional, overrides image)" value={hero.backgroundVideo} onChange={(v) => setField("backgroundVideo", v)} />
        <TextArea label="Hero Title" value={hero.title} onChange={(v) => setField("title", v)} rows={2} />
        <TextArea label="Hero Subtitle" value={hero.subtitle} onChange={(v) => setField("subtitle", v)} rows={2} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextInput label="Primary Button Text" value={hero.ctaPrimaryText} onChange={(v) => setField("ctaPrimaryText", v)} />
          <VideoUploader
              label="Desktop Background Video"
              value={hero.backgroundVideo}
              onChange={(v)=>setField("backgroundVideo",v)}
              folder={CLOUDINARY_FOLDERS.hero}
          />
        </div>
        <button type="submit" disabled={saving} className="bg-gold text-ink px-8 py-3 text-xs tracking-widest2 uppercase hover:bg-gold2 disabled:opacity-50">
          {saving ? "Saving..." : "Save Hero Section"}
        </button>
      </form>
    </div>
  );
}
