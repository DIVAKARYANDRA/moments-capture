import SimpleCrudManager from "../../components/admin/SimpleCrudManager";
import { testimonialService } from "../../services/testimonialService";
import { CLOUDINARY_FOLDERS } from "../../firebase/cloudinary";

const fields = [
  { name: "customerName", label: "Customer Name", type: "text", required: true },
  { name: "eventType", label: "Event Type", type: "select", options: ["Wedding", "Pre-Wedding", "Event", "Birthday", "Corporate", "Portrait", "Maternity"] },
  { name: "photo", label: "Customer Photo", type: "image", folder: CLOUDINARY_FOLDERS.testimonials },
  { name: "review", label: "Review", type: "textarea" },
];

export default function TestimonialsManager() {
  return (
    <SimpleCrudManager
      title="Testimonials"
      subtitle="Client reviews shown on the homepage."
      service={testimonialService}
      fields={fields}
      emptyLabel="No testimonials yet"
    />
  );
}
