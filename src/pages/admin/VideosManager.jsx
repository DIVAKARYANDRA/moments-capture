import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { videoService } from "../../services/videoService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
  },

  {
    name: "category",
    label: "Category",
    type: "select",
    options: [
      "Wedding Film",
      "Pre-Wedding",
      "Highlight Reel",
      "Event",
      "Corporate",
    ],
  },

  {
    name: "thumbnail",
    label: "Thumbnail",
    type: "image",
    folder: CLOUDINARY_FOLDERS.videos,
  },

  {
    name: "videoUrl",
    label: "Video",
    type: "video",
    folder: CLOUDINARY_FOLDERS.videos,
    required: true,
  },
];

export default function VideosManager() {
  return (
    <SimpleCrudManager
      title="Videos"
      subtitle="Upload cinematic videos directly from your computer/mobile."
      service={videoService}
      fields={fields}
      emptyLabel="No videos yet"
    />
  );
}
