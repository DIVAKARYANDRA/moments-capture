import { useEffect, useMemo, useState } from "react";
import { Play, X } from "lucide-react";
import Seo from "../../components/site/Seo";
import SectionHeading from "../../components/site/SectionHeading";
import Reveal from "../../components/site/Reveal";
import { LoadingState, EmptyState } from "../../components/site/States";
import { videoService } from "../../services/videoService";
import { optimizedUrl } from "../../firebase/cloudinary";

function toEmbedUrl(url) {
  if (!url) return "";
  const yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
  return url;
}

export default function Films() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setVideos(await videoService.getAll());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const embedUrl = useMemo(() => (playing ? toEmbedUrl(playing.videoUrl) : ""), [playing]);

  return (
    <div className="pt-32 pb-28">
      <Seo title="Wedding Films" description="Cinematic wedding films and highlight videos by Moments Capture." />
      <div className="max-w-content mx-auto px-6 md:px-10">
        <Reveal>
          <SectionHeading eyebrow="In Motion" title="Wedding Films" align="left"
            subtitle="Where photographs preserve a moment, film relives it — every voice, every glance, every tear." />
        </Reveal>

        {loading ? (
          <LoadingState />
        ) : videos.length === 0 ? (
          <EmptyState title="Films coming soon" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <Reveal key={v.id} delay={(i % 6) * 0.06}>
                <button onClick={() => setPlaying(v)} className="group relative block w-full text-left aspect-video overflow-hidden">
                  <img src={optimizedUrl(v.thumbnail, { width: 700 })} alt={v.title} className="w-full h-full object-cover transition-transform duration-700 ease-silk group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors flex items-center justify-center">
                    <span className="w-16 h-16 rounded-full border border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-ink transition-colors">
                      <Play size={20} fill="currentColor" />
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 p-5">
                    {v.category && <span className="eyebrow block mb-1">{v.category}</span>}
                    <h3 className="font-display text-xl text-ivory">{v.title}</h3>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {playing && (
        <div className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-sm flex items-center justify-center px-4" onClick={() => setPlaying(null)}>
          <button className="absolute top-6 right-6 text-ivory hover:text-gold" onClick={() => setPlaying(null)} aria-label="Close video">
            <X size={30} />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe src={embedUrl} title={playing.title} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen />
          </div>
        </div>
      )}
    </div>
  );
}
