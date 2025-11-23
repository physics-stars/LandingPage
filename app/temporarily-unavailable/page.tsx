"use client";

export default function TemporarilyUnavailablePage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-main px-6 animate-fadeIn">
      <div className="max-w-xl w-full card shadow-theme-md p-8 text-center space-y-6 animate-zoomIn">
        <h1 className="text-3xl font-bold gradient-text">
          Servei temporalment no disponible
        </h1>

        <p className="text-secondary">
          El servei es troba temporalment inoperatiu per causes externes. Estem
          treballant per restablir-lo el més aviat possible.
        </p>

        <p className="text-muted">
          Gràcies per la vostra comprensió i paciència.
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
