import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { videoService } from "../../services/videoService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "category", label: "Category", type: "select", options: ["Wedding Film", "Pre-Wedding", "Highlight Reel", "Event", "Corporate"] },
  { name: "thumbnail", label: "Thumbnail", type: "image", folder: CLOUDINARY_FOLDERS.videos },
  { name: "videoUrl", label: "YouTube / Vimeo URL", type: "text", required: true },
];

export default function VideosManager() {
  return (
    <SimpleCrudManager
      title="Videos"
      subtitle="Wedding films and cinematic videos — link to YouTube or Vimeo, don't upload raw video files."
      service={videoService}
      fields={fields}
      emptyLabel="No videos yet"
    />
  );
}
