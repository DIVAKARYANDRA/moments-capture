import { useEffect, useState } from "react";
import Seo from "../../components/site/Seo";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import { LoadingState, EmptyState } from "../../components/site/States";
import { founderService } from "../../services/founderService";
import { optimizedUrl } from "../../firebase/cloudinary";

export default function About() {
  const [founders, setFounders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setFounders(await founderService.getAll({ orderByField: "order" }));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="pt-32 pb-28">
      <Seo title="About Us" description="Meet the founders of Moments Capture, a premium wedding photography and videography studio." />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading
            eyebrow="Our Story"
            title="The People Behind the Lens"
            subtitle="Two storytellers, one shared belief: that the truest photographs are the ones nobody poses for."
          />
        </Reveal>

        {loading ? (
          <LoadingState />
        ) : founders.length === 0 ? (
          <EmptyState title="Founder stories coming soon" />
        ) : (
          <div className="space-y-24">
            {founders.map((f, i) => (
              <Reveal key={f.id} delay={i * 0.1}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div className="aspect-[3/4] overflow-hidden max-w-md mx-auto md:mx-0">
                    <img src={optimizedUrl(f.image, { width: 800 })} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-display text-4xl text-ivory mb-2">{f.name}</h3>
                    <span className="eyebrow block mb-6">{f.role}</span>
                    <p className="text-ivory/60 font-light leading-relaxed whitespace-pre-line">{f.story}</p>
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
