import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, image }) {
  const fullTitle = title ? `${title} | Moments Capture` : "Moments Capture — Premium Wedding Photography & Films";
  const desc = description || "Premium wedding photography and cinematography studio serving Andhra Pradesh and Telangana. Capturing emotions, preserving memories forever.";
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
    </Helmet>
  );
}
