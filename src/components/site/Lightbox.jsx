import { useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { optimizedUrl } from "../../firebase/cloudinary";

export default function Lightbox({ images, index, onClose, onNav }) {
  const go = useCallback(
    (dir) => onNav((index + dir + images.length) % images.length),
    [index, images.length, onNav]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, go]);

  if (index === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-ink/97 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button className="absolute top-6 right-6 text-ivory hover:text-gold" onClick={onClose} aria-label="Close">
          <X size={30} />
        </button>
        <button
          className="absolute left-3 md:left-8 text-ivory hover:text-gold"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          aria-label="Previous image"
        >
          <ChevronLeft size={36} />
        </button>
        <motion.img
          key={images[index]}
          src={optimizedUrl(images[index], { width: 1600 })}
          alt=""
          className="max-h-[85vh] max-w-[88vw] object-contain shadow-2xl"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="absolute right-3 md:right-8 text-ivory hover:text-gold"
          onClick={(e) => { e.stopPropagation(); go(1); }}
          aria-label="Next image"
        >
          <ChevronRight size={36} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
