import { createCrudService } from "./firestoreCrud";

export const founderService = createCrudService("founders");

// Shape: { name, role, image, story, order: number }
