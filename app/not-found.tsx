import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-main px-6 animate-fadeIn">
      <div className="max-w-xl w-full card shadow-theme-md p-8 text-center space-y-6 animate-zoomIn">
        <h1 className="text-3xl font-bold gradient-text">
          Pàgina no trobada
        </h1>

        <p className="text-secondary">
          No hem pogut trobar la pàgina que esteu buscant. Potser s&apos;ha mogut o
          ja no existeix.
        </p>

        <Link
          href="/"
          className="btn-primary mt-4 inline-block text-white"
        >
          Tornar a l&apos;inici
        </Link>
      </div>
    </main>
  );
}
