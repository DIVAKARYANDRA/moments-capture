import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

// Single-doc collection: settings/site holds business info + hero content
const SETTINGS_DOC = doc(db, "settings", "site");

const DEFAULT_SETTINGS = {
  businessName: "Moments Capture",
  logo: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  mapEmbedUrl: "",
  instagram: "",
  facebook: "",
  youtube: "",
  hero: {
    title: "Capturing emotions. Preserving memories forever.",
    subtitle: "Premium wedding photography & cinematography across Andhra Pradesh & Telangana.",
    backgroundImage: "",
    backgroundVideo: "",
    ctaPrimaryText: "View Portfolio",
    ctaSecondaryText: "Contact Us",
  },
};

export const settingsService = {
  async get() {
    const snap = await getDoc(SETTINGS_DOC);
    if (!snap.exists()) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...snap.data() };
  },
  async update(data) {
    await setDoc(
      SETTINGS_DOC,
      { ...data, updatedAt: serverTimestamp() },
      { merge: true }
    );
  },
  DEFAULT_SETTINGS,
};
