export function buildEnquiryMessage({ businessName, form }) {
  return `
📸 *New Enquiry - ${businessName}*

👤 *Name:* ${form.name}

📞 *Phone:* ${form.phone}

📧 *Email:* ${form.email || "Not Provided"}

🎉 *Event Type:* ${form.eventType}

📅 *Event Date:* ${form.eventDate || "Not Provided"}

📍 *Location:* ${form.location || "Not Provided"}

📝 *Message:*
${form.message || "No additional message"}

Please contact me regarding this event.
`;
}

export function buildWhatsAppLink(phoneNumber, message) {
  const clean = String(phoneNumber || "").replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
