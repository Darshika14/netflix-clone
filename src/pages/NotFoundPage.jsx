import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brandBlack px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-brandRed">404</h1>
        <p className="mt-2 text-gray-300">Page not found.</p>
        <Link to="/" className="mt-5 inline-block rounded bg-brandRed px-4 py-2 font-medium">
          Go Home
        </Link>
      </div>
    </div>
  );
}

 