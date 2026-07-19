import { useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import Seo from "../../components/site/Seo";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import { useSettings } from "../../context/SettingsContext";
import { enquiryService } from "../../services/enquiryService";

const EVENT_TYPES = ["Wedding", "Pre-Wedding", "Event", "Birthday", "Corporate", "Portrait", "Maternity", "Other"];

const emptyForm = { name: "", phone: "", email: "", eventType: "", eventDate: "", location: "", message: "" };

export default function Contact() {
  const { settings } = useSettings();
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.eventType) {
      toast.error("Please fill in your name, phone and event type.");
      return;
    }
    setSubmitting(true);
    try {
      await enquiryService.add({ ...form, status: "New" });
      toast.success("Thank you! We'll be in touch shortly.");
      setForm(emptyForm);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-28">
      <Seo title="Contact" description="Get in touch with Moments Capture for your wedding photography and videography needs." />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="Let's Talk" title="Plan Your Story With Us" align="left"
            subtitle="Tell us a little about your event and we'll get back to you within 24 hours." />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <Reveal className="lg:col-span-2 space-y-10">
            {settings.phone && (
              <div className="flex gap-4">
                <Phone className="text-gold flex-shrink-0" size={20} />
                <div>
                  <span className="eyebrow block mb-1">Call Us</span>
                  <a href={`tel:${settings.phone}`} className="text-ivory/80 hover:text-gold">{settings.phone}</a>
                </div>
              </div>
            )}
            {settings.whatsapp && (
              <div className="flex gap-4">
                <MessageCircle className="text-gold flex-shrink-0" size={20} />
                <div>
                  <span className="eyebrow block mb-1">WhatsApp</span>
                  <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="text-ivory/80 hover:text-gold">{settings.whatsapp}</a>
                </div>
              </div>
            )}
            {settings.email && (
              <div className="flex gap-4">
                <Mail className="text-gold flex-shrink-0" size={20} />
                <div>
                  <span className="eyebrow block mb-1">Email</span>
                  <a href={`mailto:${settings.email}`} className="text-ivory/80 hover:text-gold">{settings.email}</a>
                </div>
              </div>
            )}
            {settings.address && (
              <div className="flex gap-4">
                <MapPin className="text-gold flex-shrink-0" size={20} />
                <div>
                  <span className="eyebrow block mb-1">Studio</span>
                  <p className="text-ivory/80 font-light">{settings.address}</p>
                </div>
              </div>
            )}
            {settings.mapEmbedUrl && (
              <div className="aspect-video border border-line">
                <iframe src={settings.mapEmbedUrl} title="Studio location" className="w-full h-full" loading="lazy" />
              </div>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Full Name *" name="name" value={form.name} onChange={onChange} />
                <Field label="Phone *" name="phone" value={form.phone} onChange={onChange} type="tel" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Email" name="email" value={form.email} onChange={onChange} type="email" />
                <Field label="Event Date" name="eventDate" value={form.eventDate} onChange={onChange} type="date" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="eyebrow block mb-3">Event Type *</label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={onChange}
                    className="w-full bg-transparent border-b border-line focus:border-gold outline-none py-3 text-ivory font-light"
                  >
                    <option value="" className="bg-ink2">Select event type</option>
                    {EVENT_TYPES.map((t) => <option key={t} value={t} className="bg-ink2">{t}</option>)}
                  </select>
                </div>
                <Field label="Location" name="location" value={form.location} onChange={onChange} />
              </div>
              <div>
                <label className="eyebrow block mb-3">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  className="w-full bg-transparent border-b border-line focus:border-gold outline-none py-3 text-ivory font-light resize-none"
                  placeholder="Tell us about your event..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-3 bg-gold text-ink px-8 py-3 text-sm tracking-widest2 uppercase hover:bg-gold2 transition-colors disabled:opacity-50"
              >
                <Send size={16} /> {submitting ? "Sending..." : "Send Enquiry"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="eyebrow block mb-3">{label}</label>
      <input
        {...props}
        className="w-full bg-transparent border-b border-line focus:border-gold outline-none py-3 text-ivory font-light"
      />
    </div>
  );
}
