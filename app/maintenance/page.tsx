"use client";

export default function MaintenancePage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-main px-6 animate-fadeIn">
      <div className="max-w-xl w-full card shadow-theme-md p-8 text-center space-y-6 animate-zoomIn">
        <h1 className="text-3xl font-bold gradient-text">
          Manteniment en curs
        </h1>

        <p className="text-secondary">
          Estem fent millores i actualitzacions per oferir-vos una experiència
          encara millor. Durant aquesta estona, el servei no està disponible.
        </p>

        <p className="text-muted">
          Normalment aquest procés no hauria de durar gaire. Si us plau, torneu
          a intentar-ho en uns minuts.
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
