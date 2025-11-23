"use client";

export default function ErrorPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-main px-6 animate-fadeIn">
      <div className="max-w-xl w-full card shadow-theme-md p-8 text-center space-y-6 animate-zoomIn">
        <h1 className="text-3xl font-bold gradient-text">
          S&apos;ha produït un error inesperat
        </h1>

        <p className="text-secondary">
          Ho sentim, alguna cosa no ha anat com esperàvem. Estem treballant per
          solucionar-ho el més aviat possible.
        </p>

        <p className="text-muted">
          Si us plau, torneu-ho a intentar d&apos;aquí uns instants.
        </p>

        <button
          onClick={() => location.reload()}
          className="btn-primary mt-4 text-white"
        >
          Recarregar pàgina
        </button>
      </div>
    </main>
  );
}
