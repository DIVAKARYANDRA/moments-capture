import { createCrudService } from "./firestoreCrud";

const base = createCrudService("portfolio");

export const portfolioService = {
  ...base,
  getFeatured: () => base.getAll({ filters: [{ field: "featured", op: "==", value: true }] }),
  getByCategory: (category) =>
    base.getAll({ filters: [{ field: "category", op: "==", value: category }] }),
};

// Shape reference (Firestore has no schema, this documents the contract):
// {
//   title: string, category: string, location: string, date: string (ISO),
//   description: string, coverImage: string (cloudinary url),
//   images: string[] (cloudinary urls), videoUrl: string, featured: boolean
// }
