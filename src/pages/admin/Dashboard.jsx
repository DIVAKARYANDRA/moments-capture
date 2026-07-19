import { useEffect, useState } from "react";
import { Camera, Briefcase, MessageSquareQuote, Inbox } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { LoadingState } from "../../components/site/States";
import { portfolioService } from "../../services/portfolioService";
import { servicesService } from "../../services/servicesService";
import { testimonialService } from "../../services/testimonialService";
import { enquiryService } from "../../services/enquiryService";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      const [portfolio, services, testimonials, enquiries] = await Promise.all([
        portfolioService.getAll(),
        servicesService.getAll(),
        testimonialService.getAll(),
        enquiryService.getAll(),
      ]);
      setStats({
        portfolio: portfolio.length,
        services: services.length,
        testimonials: testimonials.length,
        enquiries: enquiries.length,
        newEnquiries: enquiries.filter((e) => e.status === "New").length,
      });
    })();
  }, []);

  const cards = stats && [
    { label: "Portfolio Items", value: stats.portfolio, icon: Camera },
    { label: "Services", value: stats.services, icon: Briefcase },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquareQuote },
    { label: "Enquiries", value: stats.enquiries, sub: `${stats.newEnquiries} new`, icon: Inbox },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="An overview of your website content and enquiries." />
      {!stats ? (
        <LoadingState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => (
            <div key={c.label} className="border border-line p-6 bg-ink2">
              <c.icon className="text-gold mb-4" size={20} />
              <div className="font-display text-4xl text-ivory">{c.value}</div>
              <div className="text-ivory/50 text-sm mt-1">{c.label}</div>
              {c.sub && <div className="text-gold text-xs mt-2">{c.sub}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
