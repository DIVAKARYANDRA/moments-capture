import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { servicesService } from "../../services/servicesService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  { name: "title", label: "Title", type: "text", required: true },
  { name: "description", label: "Description", type: "textarea" },
  { name: "image", label: "Image", type: "image", folder: CLOUDINARY_FOLDERS.services },
  { name: "highlights", label: "Highlights", type: "list" },
  { name: "order", label: "Display Order", type: "number" },
];

export default function ServicesManager() {
  return (
    <SimpleCrudManager
      title="Services"
      subtitle="Manage the services shown on your Services page and homepage."
      service={servicesService}
      fields={fields}
      orderByField="order"
      emptyLabel="No services yet — add your first one"
    />
  );
}
