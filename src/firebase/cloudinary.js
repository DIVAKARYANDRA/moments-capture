// Cloudinary unsigned-upload helper.
// Admin picks a file -> uploaded directly to Cloudinary -> secure_url stored in Firestore.
// Firebase Storage is intentionally NOT used per project requirements.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload a single file to Cloudinary inside a given folder.
 * @param {File} file
 * @param {string} folder e.g. "moments-capture/portfolio/weddings"
 * @param {(percent:number)=>void} [onProgress]
 * @returns {Promise<{url:string, publicId:string, width:number, height:number}>}
 */
export function uploadToCloudinary(file, folder, onProgress) {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(new Error("Cloudinary env vars are not configured."));
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    if (folder) formData.append("folder", folder);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      try {
        const data = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            url: data.secure_url,
            publicId: data.public_id,
            width: data.width,
            height: data.height,
            resourceType: data.resource_type,
          });
        } else {
          reject(new Error(data?.error?.message || "Cloudinary upload failed"));
        }
      } catch (err) {
        reject(err);
      }
    };

    xhr.onerror = () => reject(new Error("Network error during upload"));
    xhr.send(formData);
  });
}

/**
 * Upload multiple files in parallel, returns array of results in order.
 */
export async function uploadMultipleToCloudinary(files, folder, onEachProgress) {
  return Promise.all(
    Array.from(files).map((file, i) =>
      uploadToCloudinary(file, folder, (p) => onEachProgress?.(i, p))
    )
  );
}

/**
 * Build an optimized delivery URL from a Cloudinary secure_url,
 * inserting f_auto,q_auto and optional width for responsive images.
 */
export function optimizedUrl(url, { width } = {}) {
  if (!url || !url.includes("/upload/")) return url;
  const transform = width
    ? `f_auto,q_auto,w_${width}`
    : "f_auto,q_auto";
  return url.replace("/upload/", `/upload/${transform}/`);
}

export const CLOUDINARY_FOLDERS = {
  branding: "moments-capture/branding",
  hero: "moments-capture/hero",
  founders: "moments-capture/founders",
  portfolio: (category) => `moments-capture/portfolio/${category}`,
  services: "moments-capture/services",
  testimonials: "moments-capture/testimonials",
  gallery: "moments-capture/gallery",
  videos: "moments-capture/videos",
};
