import { createCrudService } from "./firestoreCrud";

const base = createCrudService("enquiries");

export const enquiryService = {
  ...base,
  getAllNewestFirst: () => base.getAll({ orderByField: "createdAt", direction: "desc" }),
  setStatus: (id, status) => base.update(id, { status }),
};

// Shape: { name, phone, email, eventType, eventDate, location, message,
//          status: 'New' | 'Contacted' | 'Completed', createdAt }
