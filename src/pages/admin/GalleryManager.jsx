import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { galleryService } from "../../services/galleryService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  { name: "imageUrl", label: "Image", type: "image", folder: CLOUDINARY_FOLDERS.gallery, required: true },
  { name: "category", label: "Category", type: "select", options: ["Weddings", "Pre-Weddings", "Events", "Corporate", "Maternity", "Portraits"] },
  { name: "caption", label: "Caption", type: "text" },
];

export default function GalleryManager() {
  return (
    <SimpleCrudManager
      title="Gallery"
      subtitle="Instagram-style gallery preview shown on the homepage."
      service={galleryService}
      fields={fields}
      columns={[{ key: "category", label: "Category" }, { key: "caption", label: "Caption" }]}
      emptyLabel="No gallery images yet"
    />
  );
}
