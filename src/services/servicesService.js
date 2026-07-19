import { createCrudService } from "./firestoreCrud";

const base = createCrudService("services");

export const servicesService = {
  ...base,
  getAllOrdered: () => base.getAll({ orderByField: "order", direction: "asc" }),
};

// Shape: { title, description, image, highlights: string[], order: number }
