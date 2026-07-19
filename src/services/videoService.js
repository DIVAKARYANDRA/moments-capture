import { createCrudService } from "./firestoreCrud";

export const videoService = createCrudService("videos");

// Shape: { title, thumbnail, videoUrl, category }
