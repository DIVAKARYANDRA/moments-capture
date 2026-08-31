import React, { useState } from "react";
import { Plus, Trash2, Download } from "lucide-react";
import toast from "react-hot-toast";
import html2pdf from "html2pdf.js";
import { useSettings } from "../../context/SettingsContext";
import defaultLogo from "../../assets/logo.png";

export default function QuotationManager() {
  const { settings } = useSettings();
  const [isGenerating, setIsGenerating] = useState(false);

  const [clientInfo, setClientInfo] = useState({
    clientName: "",
    phone: "",
    email: "",
    quoteDate: new Date().toISOString().split("T")[0],
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      eventName: "Marriage & Reception",
      date: "",
      deliverables:
        "Traditional Photography + Candid Photography, Drone Coverage, 1 Highlight Film, All Raw Files in HDD",
      price: 0,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [terms, setTerms] = useState(
    "1. 40% advance payment required to block dates.\n2. Balance amount due on completion of event shooting.\n3. Hard drive for raw video/photo data must be provided by the client."
  );

  const addEvent = () => {
    setEvents([
      ...events,
      {
        id: Date.now(),
        eventName: "",
        date: "",
        deliverables: "",
        price: 0,
      },
    ]);
  };

  const removeEvent = (id) => {
    if (events.length === 1) {
      toast.error("At least one event package is required.");
      return;
    }
    setEvents(events.filter((e) => e.id !== id));
  };

  const updateEvent = (id, field, value) => {
    setEvents(
      events.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const subtotal = events.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const grandTotal = Math.max(0, subtotal - (Number(discount) || 0));

  const handleDownloadPDF = async () => {
    const element = document.getElementById("quotation-document");
    if (!element) return;

    setIsGenerating(true);
    const fileName = `${clientInfo.clientName || "Client"}_Quotation.pdf`;

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    try {
      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-6">
        <div>
          <h1 className="font-display text-2xl text-ivory">Quotation System</h1>
          <p className="text-xs text-ivory/60 mt-1">Generate customized photography packages for clients</p>
        </div>

        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-gold text-ink rounded hover:bg-gold/90 transition-colors disabled:opacity-50"
        >
          <Download size={15} /> {isGenerating ? "Generating PDF..." : "Download PDF"}
        </button>
      </div>

      {/* Admin Input Form */}
      <div className="space-y-6">
        {/* Client Details */}
        <div className="p-6 bg-ink2 border border-line rounded-lg space-y-4">
          <h2 className="text-xs font-semibold tracking-widest text-gold uppercase">Client Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Client Name</label>
              <input
                type="text"
                value={clientInfo.clientName}
                onChange={(e) => setClientInfo({ ...clientInfo, clientName: e.target.value })}
                className="w-full bg-ink border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                placeholder="e.g. Ramesh & Priya"
              />
            </div>
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Phone</label>
              <input
                type="text"
                value={clientInfo.phone}
                onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                className="w-full bg-ink border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                placeholder="+91 98765 43210"
              />
            </div>
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Email</label>
              <input
                type="email"
                value={clientInfo.email}
                onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                className="w-full bg-ink border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                placeholder="client@gmail.com"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Package Events */}
        <div className="p-6 bg-ink2 border border-line rounded-lg space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xs font-semibold tracking-widest text-gold uppercase">Event Packages</h2>
            <button
              onClick={addEvent}
              className="flex items-center gap-1.5 text-xs text-gold hover:underline"
            >
              <Plus size={14} /> Add Event
            </button>
          </div>

          {events.map((evt, idx) => (
            <div key={evt.id} className="p-4 bg-ink border border-line/60 rounded-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-ivory/40 uppercase tracking-widest">Event #{idx + 1}</span>
                <button
                  onClick={() => removeEvent(evt.id)}
                  className="text-ivory/40 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Event Name (Marriage, Haldi, Sangeet, etc.)"
                  value={evt.eventName}
                  onChange={(e) => updateEvent(evt.id, "eventName", e.target.value)}
                  className="bg-ink2 border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                />
                <input
                  type="date"
                  value={evt.date}
                  onChange={(e) => updateEvent(evt.id, "date", e.target.value)}
                  className="bg-ink2 border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                />
                <input
                  type="number"
                  placeholder="Package Amount (₹)"
                  value={evt.price || ""}
                  onChange={(e) => updateEvent(evt.id, "price", e.target.value)}
                  className="bg-ink2 border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none"
                />
              </div>

              <textarea
                rows="2"
                placeholder="Deliverables & Team Coverage"
                value={evt.deliverables}
                onChange={(e) => updateEvent(evt.id, "deliverables", e.target.value)}
                className="w-full bg-ink2 border border-line p-2 text-xs text-ivory rounded focus:border-gold outline-none resize-y"
              />
            </div>
          ))}
        </div>

        {/* Pricing Adjustments & Terms */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-ink2 border border-line rounded-lg space-y-3">
            <h2 className="text-xs font-semibold tracking-widest text-gold uppercase">Discount / Adjustment</h2>
            <div className="flex items-center gap-3">
              <label className="text-xs text-ivory/60">Discount Amount (₹):</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="bg-ink border border-line px-3 py-2 text-sm text-ivory rounded focus:border-gold outline-none w-36"
              />
            </div>
          </div>

          <div className="p-6 bg-ink2 border border-line rounded-lg space-y-3">
            <h2 className="text-xs font-semibold tracking-widest text-gold uppercase">Terms & Guidelines</h2>
            <textarea
              rows="4"
              value={terms}
              onChange={(e) => setTerms(e.target.value)}
              className="w-full bg-ink border border-line p-2 text-xs text-ivory rounded focus:border-gold outline-none resize-y"
            />
          </div>
        </div>
      </div>

      {/* Document Preview */}
      <div className="pt-4">
        <h3 className="text-xs tracking-widest uppercase text-gold mb-4">Document Preview</h3>

        <div
          id="quotation-document"
          className="bg-white text-gray-900 p-8 md:p-12 rounded shadow-2xl max-w-4xl mx-auto"
        >
          {/* Header with Site Settings Info */}
          <div className="flex justify-between items-start border-b-2 border-gray-900 pb-6">
            <div>
              <img
                src={defaultLogo}
                alt={settings?.businessName || "Studio Logo"}
                className="h-20 w-auto max-w-[200px] object-contain mb-3"
              />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 uppercase">
                {settings?.businessName || "Moments Capture"}
              </h1>
              <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mt-1">
                Photography & Videography Studio
              </p>
              
              <div className="text-xs text-gray-600 mt-2 space-y-0.5">
                <p>
                  Email: {settings?.email || "contact@momentscapture.com"} | Phone:{" "}
                  {settings?.phone || "+91 98765 43210"}
                </p>
                {settings?.address && (
                  <p>Address: {settings.address}</p>
                )}
                {settings?.instagram && (
                  <p>
                    Instagram:{" "}
                    <a
                      href={settings.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      {settings.instagram}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-gray-900 text-white text-xs font-bold uppercase px-3 py-1 rounded tracking-wider">
                Quotation Estimate
              </span>
              <p className="text-xs text-gray-500 mt-2">Date: {clientInfo.quoteDate}</p>
            </div>
          </div>

          {/* Client Details */}
          <div className="my-6 bg-gray-100 p-4 rounded text-xs space-y-1">
            <p className="text-xs uppercase font-bold tracking-wider text-gray-500">Prepared For:</p>
            <p className="font-bold text-gray-900 text-base">{clientInfo.clientName || "Client Name"}</p>
            {clientInfo.phone && <p className="text-gray-700">Phone: {clientInfo.phone}</p>}
            {clientInfo.email && <p className="text-gray-700">Email: {clientInfo.email}</p>}
          </div>

          {/* Package Breakdown */}
          <table className="w-full text-left text-xs mb-6 border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-900 text-gray-900 uppercase tracking-wider">
                <th className="py-2 px-1 font-bold">Event & Coverage Breakdown</th>
                <th className="py-2 px-1 font-bold text-center w-28">Date</th>
                <th className="py-2 px-1 font-bold text-right w-28">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-1">
                    <p className="font-bold text-gray-900 text-sm">{item.eventName || "Event Package"}</p>
                    <p className="text-gray-600 whitespace-pre-line mt-1 text-[11px] leading-relaxed">
                      {item.deliverables}
                    </p>
                  </td>
                  <td className="py-3 px-1 text-center text-gray-600">{item.date || "-"}</td>
                  <td className="py-3 px-1 text-right font-semibold text-gray-900">
                    ₹{Number(item.price || 0).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pricing Totals */}
          <div className="flex justify-end border-t border-gray-300 pt-4 mb-8">
            <div className="w-64 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {Number(discount) > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Discount:</span>
                  <span>- ₹{Number(discount).toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold text-gray-900 border-t-2 border-gray-900 pt-2">
                <span>Total Package:</span>
                <span>₹{grandTotal.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          {terms && (
            <div className="border-t border-gray-200 pt-4 text-[11px] text-gray-600 space-y-1">
              <p className="font-bold text-gray-800 uppercase tracking-wider">Terms & Guidelines</p>
              <p className="whitespace-pre-line leading-relaxed">{terms}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-10 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-500">
            Thank you for choosing {settings?.businessName || "Moments Capture"} to preserve your special memories!
          </div>
        </div>
      </div>
    </div>
  );
}