import { createCrudService } from "./firestoreCrud";

const base = createCrudService("gallery");

export const galleryService = {
  ...base,
  getByCategory: (category) =>
    base.getAll({ filters: [{ field: "category", op: "==", value: category }] }),
};

// Shape: { imageUrl, category, caption }
