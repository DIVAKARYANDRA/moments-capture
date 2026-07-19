import { useEffect, useMemo, useState } from "react";
import Seo from "../../components/site/Seo";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import Lightbox from "../../components/site/Lightbox";
import { LoadingState, EmptyState } from "../../components/site/States";
import { portfolioService } from "../../services/portfolioService";
import { optimizedUrl } from "../../firebase/cloudinary";
import { MapPin, Calendar } from "lucide-react";

const CATEGORIES = ["All", "Weddings", "Pre-Weddings", "Events", "Corporate", "Maternity", "Portraits"];

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null); // portfolio item being lightboxed
  const [lbIndex, setLbIndex] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await portfolioService.getAll({ orderByField: "date", direction: "desc" });
        setItems(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  return (
    <div className="pt-32 pb-28">
      <Seo title="Portfolio" description="Explore weddings, pre-weddings, events and more captured by Moments Capture across Andhra Pradesh and Telangana." />

      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="Our Work" title="Portfolio" subtitle="Every story is different. Here is a collection of the moments we've had the honor to preserve." align="left" />
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap gap-3 mb-16 border-b border-line pb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`text-xs tracking-widest2 uppercase px-5 py-2 border transition-colors ${
                  category === c ? "border-gold text-gold" : "border-line text-ivory/50 hover:text-ivory hover:border-ivory/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {loading ? (
          <LoadingState label="Loading portfolio" />
        ) : filtered.length === 0 ? (
          <EmptyState title="No stories in this category yet" subtitle="Check back soon, or browse another category." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((item, i) => (
              <Reveal key={item.id} delay={(i % 6) * 0.06}>
                <button
                  onClick={() => { setActive(item); setLbIndex(0); }}
                  className="group relative block w-full text-left overflow-hidden aspect-[4/5]"
                >
                  <img
                    src={optimizedUrl(item.coverImage, { width: 800 })}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1000ms] ease-silk group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    {item.featured && <span className="eyebrow mb-2 block">Featured</span>}
                    <h3 className="font-display text-2xl text-ivory">{item.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-ivory/50 text-xs">
                      {item.location && <span className="flex items-center gap-1"><MapPin size={12} />{item.location}</span>}
                      {item.date && <span className="flex items-center gap-1"><Calendar size={12} />{item.date}</span>}
                    </div>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {active && (
        <Lightbox
          images={[active.coverImage, ...(active.images || [])].filter(Boolean)}
          index={lbIndex}
          onNav={setLbIndex}
          onClose={() => { setActive(null); setLbIndex(null); }}
        />
      )}
    </div>
  );
}
