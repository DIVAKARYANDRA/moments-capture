import { createCrudService } from "./firestoreCrud";

export const testimonialService = createCrudService("testimonials");

// Shape: { customerName, photo, review, eventType }
