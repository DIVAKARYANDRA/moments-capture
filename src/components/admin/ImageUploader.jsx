import { useRef, useState } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { uploadToCloudinary, optimizedUrl } from "../../firebase/cloudinary";

/**
 * Single-image uploader bound to a Cloudinary folder.
 * value: cloudinary secure_url string | ""
 * onChange: (url:string) => void
 */
export default function ImageUploader({ label, value, onChange, folder }) {
  const inputRef = useRef(null);
  const [progress, setProgress] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setProgress(0);
    try {
      const res = await uploadToCloudinary(file, folder, setProgress);
      onChange(res.url);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Upload failed");
    } finally {
      setProgress(null);
    }
  };

  return (
    <div>
      {label && <label className="text-xs tracking-widest2 uppercase text-ivory/50 block mb-2">{label}</label>}
      <div className="relative border border-dashed border-line hover:border-gold/60 transition-colors aspect-video flex items-center justify-center overflow-hidden bg-ink2">
        {value ? (
          <>
            <img src={optimizedUrl(value, { width: 500 })} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute top-2 right-2 bg-ink/80 text-ivory p-1.5 hover:text-red-400"
            >
              <X size={14} />
            </button>
          </>
        ) : progress !== null ? (
          <div className="flex flex-col items-center gap-2 text-ivory/50">
            <Loader2 className="animate-spin" size={22} />
            <span className="text-xs">{progress}%</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center gap-2 text-ivory/40 hover:text-gold text-xs p-6"
          >
            <UploadCloud size={22} />
            Click to upload
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
