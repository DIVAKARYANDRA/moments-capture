import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { founderService } from "../../services/founderService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "role", label: "Role", type: "text" },
  { name: "image", label: "Photo", type: "image", folder: CLOUDINARY_FOLDERS.founders },
  { name: "story", label: "Story", type: "textarea" },
  { name: "order", label: "Display Order", type: "number" },
];

export default function FoundersManager() {
  return (
    <SimpleCrudManager
      title="Founders"
      subtitle="Manage founder profiles shown on the About page."
      service={founderService}
      fields={fields}
      orderByField="order"
      emptyLabel="No founders added yet"
    />
  );
}
