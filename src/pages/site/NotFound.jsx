import Button from "../../components/site/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span className="eyebrow mb-4">404</span>
      <h1 className="font-display text-5xl text-ivory mb-6">Page Not Found</h1>
      <p className="text-ivory/50 mb-10 font-light">The page you're looking for doesn't exist.</p>
      <Button to="/" variant="outline">Back to Home</Button>
    </div>
  );
}
