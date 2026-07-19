import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import PageHeader from "../../components/admin/PageHeader";
import { LoadingState, EmptyState } from "../../components/site/States";
import { enquiryService } from "../../services/enquiryService";

const STATUSES = ["New", "Contacted", "Completed"];
const statusColor = { New: "text-gold border-gold", Contacted: "text-blue-300 border-blue-300", Completed: "text-green-300 border-green-300" };

export default function EnquiryManager() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const load = async () => {
    setLoading(true);
    try {
      setRows(await enquiryService.getAllNewestFirst());
    } catch (e) {
      console.error(e);
      toast.error("Failed to load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (row, status) => {
    setRows((rs) => rs.map((r) => (r.id === row.id ? { ...r, status } : r)));
    try {
      await enquiryService.setStatus(row.id, status);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
      load();
    }
  };

  const filtered = filter === "All" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <PageHeader title="Enquiries" subtitle="Customer enquiries submitted through the Contact page." />

      <div className="flex flex-wrap gap-3 mb-8">
        {["All", ...STATUSES].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs tracking-widest2 uppercase px-4 py-2 border ${filter === s ? "border-gold text-gold" : "border-line text-ivory/50 hover:text-ivory"}`}
          >
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingState />
      ) : filtered.length === 0 ? (
        <EmptyState title="No enquiries here" subtitle="New enquiries from the website will appear automatically." />
      ) : (
        <div className="space-y-4">
          {filtered.map((r) => (
            <div key={r.id} className="border border-line p-6 bg-ink2">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl text-ivory">{r.name}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-ivory/60 text-sm">
                    {r.phone && <span className="flex items-center gap-1.5"><Phone size={13} />{r.phone}</span>}
                    {r.email && <span className="flex items-center gap-1.5"><Mail size={13} />{r.email}</span>}
                    {r.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{r.location}</span>}
                    {r.eventDate && <span className="flex items-center gap-1.5"><Calendar size={13} />{r.eventDate}</span>}
                  </div>
                  {r.eventType && <span className="inline-block mt-3 text-xs tracking-widest2 uppercase text-gold border border-gold px-3 py-1">{r.eventType}</span>}
                  {r.message && <p className="text-ivory/50 text-sm mt-3 font-light max-w-xl">{r.message}</p>}
                </div>
                <select
                  value={r.status || "New"}
                  onChange={(e) => updateStatus(r, e.target.value)}
                  className={`bg-ink border px-4 py-2 text-xs tracking-widest2 uppercase ${statusColor[r.status] || "border-line text-ivory"}`}
                >
                  {STATUSES.map((s) => <option key={s} value={s} className="bg-ink text-ivory">{s}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
