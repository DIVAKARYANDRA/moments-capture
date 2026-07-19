import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadMultipleToCloudinary, optimizedUrl } from "../../firebase/cloudinary";

/**
 * value: string[] of cloudinary urls
 * onChange: (urls:string[]) => void
 */
export default function MultiImageUploader({ label, value = [], onChange, folder }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFiles = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const results = await uploadMultipleToCloudinary(files, folder);
      onChange([...value, ...results.map((r) => r.url)]);
      toast.success(`${results.length} image(s) uploaded`);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeAt = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      {label && <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {value.map((url, i) => (
          <div key={i} className="relative aspect-square overflow-hidden bg-ink2">
            <img src={optimizedUrl(url, { width: 300 })} alt="" className="w-full h-full object-cover" />
            <button type="button" onClick={() => removeAt(i)} className="absolute top-1 right-1 bg-ink/80 text-ivory p-1 hover:text-red-400">
              <X size={12} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-square border border-dashed border-line hover:border-gold/60 flex flex-col items-center justify-center gap-1 text-ivory/40 hover:text-gold text-[10px] bg-ink2"
        >
          {uploading ? <Loader2 className="animate-spin" size={18} /> : <UploadCloud size={18} />}
          Add
        </button>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
