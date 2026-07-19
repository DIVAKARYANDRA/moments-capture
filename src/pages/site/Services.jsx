import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import Seo from "../../components/site/Seo";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import Button from "../../components/site/Button";
import { LoadingState, EmptyState } from "../../components/site/States";
import { servicesService } from "../../services/servicesService";
import { optimizedUrl } from "../../firebase/cloudinary";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setServices(await servicesService.getAllOrdered());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-32 pb-28">
      <Seo title="Services" description="Wedding photography, cinematography, pre-wedding shoots, corporate and portrait photography services." />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="What We Offer" title="Our Services" align="left"
            subtitle="Each service is tailored to the moment it captures — from grand weddings to quiet portraits." />
        </Reveal>

        {loading ? (
          <LoadingState />
        ) : services.length === 0 ? (
          <EmptyState title="Services coming soon" />
        ) : (
          <div className="space-y-2">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-14 border-b border-line ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={optimizedUrl(s.image, { width: 900 })} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="eyebrow mb-3 block">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display text-3xl md:text-4xl text-ivory mb-4">{s.title}</h3>
                    <p className="text-ivory/60 font-light leading-relaxed mb-6">{s.description}</p>
                    {Array.isArray(s.highlights) && s.highlights.length > 0 && (
                      <ul className="space-y-2 mb-8">
                        {s.highlights.map((h, hi) => (
                          <li key={hi} className="flex items-center gap-3 text-sm text-ivory/70">
                            <Check size={14} className="text-gold flex-shrink-0" /> {h}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Button to="/contact" variant="ghost">Enquire About This →</Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
