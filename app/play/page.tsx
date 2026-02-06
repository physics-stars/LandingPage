// app/game/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";

export default function UnityGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unityInstance, setUnityInstance] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // 1. Configuración de Unity basada en tu index.html
    const buildUrl = "Build";
    const loaderUrl = `${buildUrl}/BuildProd.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/BuildProd.data.br`,
      frameworkUrl: `${buildUrl}/BuildProd.framework.br`,
      codeUrl: `${buildUrl}/BuildProd.wasmfile.br`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Physics Stars",
      productVersion: "0.1.0",
    };

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      // @ts-expect-error (createUnityInstance viene del loader de Unity)
      createUnityInstance(canvasRef.current, config, (progress: number) => {
        setLoadingProgress(100 * progress);
      }).then((instance: any) => {
        setUnityInstance(instance);
        // Exponemos la función global para que Unity la encuentre
        (window as any).dispatchGeminiRequest = async (prompt: string) => {
          try {
            const res = await fetch("/api/gemini", {
              method: "POST",
              body: JSON.stringify({ prompt }),
            });
            const data = await res.json();
            
            // Enviamos la respuesta al objeto "--- MANAGERS ---"
            instance.SendMessage("--- SYSTEM ---", "OnGeminiResponse", data.text || data.error);
          } catch (e: any) {
            instance.SendMessage("--- SYSTEM ---", "OnGeminiResponse", "Error de red");
          }
        };
      });
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
      delete (window as any).dispatchGeminiRequest;
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
    {/* Añadimos el ID 'unity-container' al div principal */}
    <div id="unity-container" className="relative shadow-2xl border-4 border-gray-700">
      <canvas 
        ref={canvasRef} 
        id="unity-canvas" // <--- CRUCIAL: Añade este ID
        style={{ width: "960px", height: "600px" }} 
        className="bg-[#231f20]"
      />
      
      {loadingProgress < 100 && (
        <div id="unity-loading-bar" className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80">
          <div className="text-white mb-4 text-xl font-bold">Cargando Physics Stars...</div>
          <div id="unity-progress-bar-empty" className="w-64 h-2 bg-gray-700 rounded-full">
            <div 
              id="unity-progress-bar-full" // <--- Añade este ID para que querySelector no falle
              className="h-full bg-blue-500 rounded-full transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
    
    <button 
      id="unity-fullscreen-button" // <--- También es recomendable añadir este
      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      onClick={() => unityInstance?.SetFullscreen(1)}
    >
      Pantalla Completa
    </button>
  </div>
  );
}