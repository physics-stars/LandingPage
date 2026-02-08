"use client";
import { useEffect, useRef, useState } from "react";

// Interfaz para nuestros datos de rendimiento
interface PerformanceMetrics {
  fps: number;
  frameTime: string;
  memory: string;
  cpuCores: number;
  pixelRatio: number;
}

export default function UnityGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unityInstance, setUnityInstance] = useState<any>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Estado para las métricas de rendimiento
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: "0.00",
    memory: "N/A",
    cpuCores: 0,
    pixelRatio: 1
  });

  // Efecto para calcular FPS y Memoria en tiempo real
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animationFrameId: number;

    // Obtener datos estáticos del hardware una sola vez
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 0 : 0;
    const pxRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    const loop = () => {
      const now = performance.now();
      frameCount++;

      // Actualizamos cada segundo (1000ms)
      if (now - lastTime >= 1000) {
        const delta = now - lastTime;
        const fps = Math.round((frameCount * 1000) / delta);
        const frameTime = (delta / frameCount).toFixed(2);
        
        // Memoria (Solo funciona en Chrome/Edge, devuelve 'N/A' en Firefox/Safari)
        // @ts-expect-error performance.memory es una API no estándar de Chrome
        const memoryRaw = performance.memory ? performance.memory.usedJSHeapSize : 0;
        const memoryMB = memoryRaw > 0 ? (memoryRaw / 1048576).toFixed(1) + " MB" : "N/A";

        setMetrics({
          fps,
          frameTime,
          memory: memoryMB,
          cpuCores: cores,
          pixelRatio: pxRatio
        });

        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    // 1. Configuración de Unity basada en tu index.html
    const buildUrl = "Build";
    const loaderUrl = `${buildUrl}/BuildProd3.loader.js`;
    const config = {
      dataUrl: `${buildUrl}/BuildProd3.data.br`,
      frameworkUrl: `${buildUrl}/BuildProd3.framework.br`,
      codeUrl: `${buildUrl}/BuildProd3.wasmfile.br`,
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
            // Asegúrate de que el nombre del GameObject en Unity sea exacto (a veces es "--- SYSTEM ---")
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
      // Limpieza segura
      if (typeof window !== 'undefined') {
          delete (window as any).dispatchGeminiRequest;
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 font-mono">
      
      {/* --- SECCIÓN DE RENDIMIENTO --- */}
      <div className="w-full max-w-5xl mb-4 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-lg text-xs md:text-sm text-green-400 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex flex-col">
           <span className="text-gray-400 font-bold">FPS</span>
           <span className="text-xl">{metrics.fps}</span>
        </div>
        <div className="flex flex-col">
           <span className="text-gray-400 font-bold">FRAME TIME</span>
           <span className="text-xl">{metrics.frameTime} ms</span>
        </div>
        <div className="flex flex-col">
           <span className="text-gray-400 font-bold">MEMORY (JS Heap)</span>
           <span className="text-xl">{metrics.memory}</span>
        </div>
        <div className="flex flex-col">
           <span className="text-gray-400 font-bold">CPU CORES</span>
           <span className="text-xl">{metrics.cpuCores}</span>
        </div>
        <div className="flex flex-col">
           <span className="text-gray-400 font-bold">VERSION</span>
           <span className="text-xl text-yellow-400">v0.1.0</span>
        </div>
      </div>
      {/* ----------------------------- */}

      {/* Añadimos el ID 'unity-container' al div principal */}
      <div id="unity-container" className="relative shadow-2xl border-4 border-gray-700 rounded-md overflow-hidden">
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
            <div className="mt-2 text-gray-400 text-sm">{Math.round(loadingProgress)}%</div>
          </div>
        )}
      </div>
      
      <button 
        id="unity-fullscreen-button" // <--- También es recomendable añadir este
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={() => unityInstance?.SetFullscreen(1)}
      >
        Pantalla Completa
      </button>
    </div>
  );
}