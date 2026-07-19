import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, Quote } from "lucide-react";
import { InstagramIcon } from "../../components/site/SocialIcons";
import Seo from "../../components/site/Seo";
import Button from "../../components/site/Button";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import { LoadingState } from "../../components/site/States";
import { useSettings } from "../../context/SettingsContext";
import { portfolioService } from "../../services/portfolioService";
import { servicesService } from "../../services/servicesService";
import { founderService } from "../../services/founderService";
import { testimonialService } from "../../services/testimonialService";
import { galleryService } from "../../services/galleryService";
import { optimizedUrl } from "../../firebase/cloudinary";

export default function Home() {
  const { settings } = useSettings();
  const [featured, setFeatured] = useState([]);
  const [services, setServices] = useState([]);
  const [founders, setFounders] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [f, s, fo, t, g] = await Promise.all([
          portfolioService.getFeatured(),
          servicesService.getAllOrdered(),
          founderService.getAll({ orderByField: "order" }),
          testimonialService.getAll(),
          galleryService.getAll(),
        ]);
        setFeatured(f.slice(0, 6));
        setServices(s.slice(0, 4));
        setFounders(fo.slice(0, 2));
        setTestimonials(t.slice(0, 4));
        setGallery(g.slice(0, 8));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const hero = settings.hero || {};

  return (
    <div>
      <Seo />

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden">
        {hero.backgroundVideo ? (
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={hero.backgroundVideo}
            autoPlay muted loop playsInline
          />
        ) : (
          <img
            src={optimizedUrl(hero.backgroundImage, { width: 1920 }) || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop"}
            alt="Wedding couple"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />

        <div className="relative z-10 max-w-content mx-auto w-full px-6 md:px-10 pb-24 md:pb-32">
          <motion.span
            className="eyebrow block mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Moments Capture — Andhra Pradesh &amp; Telangana
          </motion.span>
          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-ivory max-w-4xl leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.title || "Capturing emotions. Preserving memories forever."}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-ivory/70 font-light text-base md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
          >
            <Button to="/portfolio" variant="primary">{hero.ctaPrimaryText || "View Portfolio"}</Button>
            <Button to="/contact" variant="outline">{hero.ctaSecondaryText || "Contact Us"}</Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 right-8 md:right-10 text-ivory/50 hidden md:flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-[10px] tracking-widest2 uppercase rotate-90 origin-center translate-y-4">Scroll</span>
          <ArrowDown size={16} />
        </motion.div>
      </section>

      {loading ? (
        <LoadingState label="Loading stories" />
      ) : (
        <>
          {/* FEATURED STORIES */}
          <section className="max-w-content mx-auto px-6 md:px-10 py-28">
            <Reveal>
              <SectionHeading eyebrow="Featured Stories" title="Recently Told" subtitle="A glimpse into weddings and moments we were honored to capture." />
            </Reveal>
            {featured.length === 0 ? (
              <p className="text-ivory/40 text-sm">Add featured portfolio items from the admin dashboard to showcase them here.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
                {featured.map((item, i) => (
                  <Reveal key={item.id} delay={i * 0.08} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                    <Link to="/portfolio" className="group relative block overflow-hidden aspect-[4/5]">
                      <img
                        src={optimizedUrl(item.coverImage, { width: 900 })}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-silk group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6">
                        <span className="eyebrow">{item.category}</span>
                        <h3 className="font-display text-2xl text-ivory mt-1">{item.title}</h3>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </section>

          {/* SERVICES PREVIEW */}
          <section className="bg-ink2 py-28 border-y border-line">
            <div className="max-w-content mx-auto px-6 md:px-10">
              <Reveal>
                <SectionHeading eyebrow="What We Offer" title="Our Services" subtitle="From intimate portraits to grand weddings — every moment, thoughtfully documented." />
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.1}>
                    <div className="group">
                      <div className="overflow-hidden aspect-[3/4] mb-5">
                        <img src={optimizedUrl(s.image, { width: 500 })} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-silk" />
                      </div>
                      <h3 className="font-display text-xl text-ivory">{s.title}</h3>
                      <p className="text-ivory/50 text-sm mt-2 font-light line-clamp-2">{s.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal className="text-center mt-16">
                <Button to="/services" variant="ghost">View All Services →</Button>
              </Reveal>
            </div>
          </section>

          {/* WHY CHOOSE US */}
          <section className="max-w-content mx-auto px-6 md:px-10 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <Reveal>
              <span className="eyebrow mb-4 block">Why Moments Capture</span>
              <h2 className="font-display text-4xl md:text-5xl text-ivory mb-8">A Craft Built on Trust</h2>
              <div className="space-y-8">
                {[
                  { t: "Years of Experience", d: "Hundreds of weddings documented across two states, each with its own story." },
                  { t: "Professional Approach", d: "Punctual, unobtrusive, and organized — so you can simply be present in your day." },
                  { t: "Uncompromising Quality", d: "Premium equipment and a meticulous editing process for cinema-grade results." },
                  { t: "Genuine Storytelling", d: "We document real emotion, not just poses — memories you'll feel again and again." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-5 border-b border-line pb-6">
                    <span className="font-display text-gold text-2xl">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="text-ivory font-body font-medium mb-1">{f.t}</h4>
                      <p className="text-ivory/50 text-sm font-light leading-relaxed">{f.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop"
                  alt="Wedding photography detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </section>

          {/* FOUNDERS */}
          {founders.length > 0 && (
            <section className="bg-ink2 py-28 border-y border-line">
              <div className="max-w-content mx-auto px-6 md:px-10">
                <Reveal><SectionHeading eyebrow="The Studio" title="Meet the Founders" /></Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                  {founders.map((f, i) => (
                    <Reveal key={f.id} delay={i * 0.1} className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
                      <img src={optimizedUrl(f.image, { width: 400 })} alt={f.name} className="w-40 h-40 rounded-full object-cover flex-shrink-0" />
                      <div>
                        <h3 className="font-display text-2xl text-ivory">{f.name}</h3>
                        <span className="eyebrow block my-2">{f.role}</span>
                        <p className="text-ivory/50 text-sm font-light leading-relaxed">{f.story}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* TESTIMONIALS */}
          {testimonials.length > 0 && (
            <section className="max-w-content mx-auto px-6 md:px-10 py-28">
              <Reveal><SectionHeading eyebrow="Kind Words" title="From Our Couples" /></Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {testimonials.map((t, i) => (
                  <Reveal key={t.id} delay={i * 0.08} className="border border-line p-8">
                    <Quote className="text-gold mb-4" size={22} />
                    <p className="text-ivory/70 font-light leading-relaxed mb-6">{t.review}</p>
                    <div className="flex items-center gap-3">
                      {t.photo && <img src={optimizedUrl(t.photo, { width: 100 })} alt={t.customerName} className="w-10 h-10 rounded-full object-cover" />}
                      <div>
                        <div className="text-ivory text-sm">{t.customerName}</div>
                        <div className="text-ivory/40 text-xs">{t.eventType}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* GALLERY PREVIEW */}
          {gallery.length > 0 && (
            <section className="py-28 border-t border-line">
              <div className="max-w-content mx-auto px-6 md:px-10">
                <Reveal>
                  <div className="flex items-center justify-between mb-14">
                    <span className="eyebrow flex items-center gap-2"><InstagramIcon size={14} /> Follow Along</span>
                    {settings.instagram && <a href={settings.instagram} target="_blank" rel="noreferrer" className="text-xs tracking-widest2 uppercase text-ivory/60 hover:text-gold">@momentscapture</a>}
                  </div>
                </Reveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {gallery.map((g, i) => (
                    <Reveal key={g.id} delay={i * 0.05} className="aspect-square overflow-hidden group">
                      <img src={optimizedUrl(g.imageUrl, { width: 500 })} alt={g.caption || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-silk" />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FINAL CTA */}
          <section className="relative py-32 text-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1600&auto=format&fit=crop"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-ink/70" />
            <Reveal className="relative z-10 max-w-xl mx-auto px-6">
              <span className="eyebrow mb-6 block">Let's Talk</span>
              <h2 className="font-display text-4xl md:text-5xl text-ivory mb-8">Ready to Tell Your Story?</h2>
              <Button to="/contact" variant="primary">Enquire Now</Button>
            </Reveal>
          </section>
        </>
      )}
    </div>
  );
}
