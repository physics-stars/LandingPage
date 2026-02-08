"use client";
import { useEffect, useRef, useState } from "react";

// --- TYPE DEFINITIONS ---

declare global {
  interface Window {
    dispatchGeminiRequest?: (prompt: string) => Promise<void>;
  }
}

interface ChromePerformanceMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface PerformanceWithMemory extends Performance {
  memory?: ChromePerformanceMemory;
}

interface UnityInstance {
  SendMessage: (
    gameObject: string,
    methodName: string,
    parameter?: string | number | boolean,
  ) => void;
  SetFullscreen: (mode: 0 | 1) => void;
  Quit: () => Promise<void>;
}

interface UnityConfig {
  dataUrl: string;
  frameworkUrl: string;
  codeUrl: string;
  streamingAssetsUrl: string;
  companyName: string;
  productName: string;
  productVersion: string;
  devicePixelRatio?: number; // <--- ADD THIS
}

interface PerformanceMetrics {
  fps: number;
  frameTime: string;
  memory: string;
  cpuCores: number;
  pixelRatio: number;
}

declare function createUnityInstance(
  canvas: HTMLCanvasElement,
  config: UnityConfig,
  onProgress: (progress: number) => void,
): Promise<UnityInstance>;

export default function UnityGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unityInstance, setUnityInstance] = useState<UnityInstance | null>(
    null,
  );

  // --- LOADING STATE ---
  const [nativeProgress, setNativeProgress] = useState(0);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [activePixelRatio, setActivePixelRatio] = useState(1);

  // --- METRICS STATE ---
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: "0.00",
    memory: "N/A",
    cpuCores: 0,
    pixelRatio: 1,
  });

  // --- LOGIC: DOWNLOAD VS COMPILE ---
  // If nativeProgress is >= 0.9, we force the bar to be FULL (100%) visually.
  // This ensures that even if the freeze happens at 0.91, the bar snaps to full.
  const isCompiling = nativeProgress >= 0.9 && nativeProgress < 1;
  const progressPercent = isCompiling
    ? 100
    : Math.min((nativeProgress / 0.9) * 100, 100);

  // Calculate scale for CSS Transform (0.0 to 1.0)
  const progressScale = progressPercent / 100;

  // --- 1. PERFORMANCE MONITOR LOOP ---
  useEffect(() => {
    let lastTime = performance.now();
    let frameCount = 0;
    let animationFrameId: number;

    const cores =
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency || 0 : 0;
    const pxRatio =
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const loop = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 1000) {
        const delta = now - lastTime;
        const fps = Math.round((frameCount * 1000) / delta);
        const frameTime = (delta / frameCount).toFixed(2);

        const perf = performance as PerformanceWithMemory;
        const memoryRaw = perf.memory ? perf.memory.usedJSHeapSize : 0;
        const memoryMB =
          memoryRaw > 0 ? (memoryRaw / 1048576).toFixed(1) + " MB" : "N/A";

        setMetrics({
          fps,
          frameTime,
          memory: memoryMB,
          cpuCores: cores,
          pixelRatio: pxRatio,
        });

        frameCount = 0;
        lastTime = now;
      }
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // --- 2. UNITY LOADER ---
  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SMART RESOLUTION LOGIC ---
    const systemDpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    
    // Default to the system's preference (e.g., 2.0 or 3.0)
    let targetDpr = systemDpr;

    // RULE 1: Cap at 2.0 (Nobody needs 3.0 for a game, it's just heat waste)
    targetDpr = Math.min(targetDpr, 2.0);

    // RULE 2: If the CPU is weak (< 4 cores), force Low Quality (1.0)
    // This saves old laptops and cheap phones from melting.
    if (cores < 4) {
        targetDpr = 1.0;
        console.log("Weak hardware detected. Downgrading to 1080p.");
    }

    setActivePixelRatio(targetDpr);

    const buildUrl = "Build";
    const loaderUrl = `${buildUrl}/BuildProd3.loader.js`;

    const config: UnityConfig = {
      dataUrl: `${buildUrl}/BuildProd3.data.br`,
      frameworkUrl: `${buildUrl}/BuildProd3.framework.br`,
      codeUrl: `${buildUrl}/BuildProd3.wasmfile.br`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "Physics Stars",
      productVersion: "0.1.0",
      devicePixelRatio: targetDpr, // <--- INSTRUCT UNITY TO USE THIS RATIO
    };

    const script = document.createElement("script");
    script.src = loaderUrl;

    script.onload = () => {
      createUnityInstance(canvasRef.current!, config, (progress: number) => {
        setNativeProgress(progress);
      })
        .then((instance: UnityInstance) => {
          setUnityInstance(instance);
          setNativeProgress(1);
          setIsGameLoaded(true);

          // --- MANUAL FALLBACK FOR OLDER UNITY VERSIONS ---
          // Some Unity loaders ignore the config.devicePixelRatio. 
          // This ensures the canvas buffer size matches our desired performance target.
          const canvas = canvasRef.current!;
          if (canvas) {
             const width = canvas.clientWidth * targetDpr;
             const height = canvas.clientHeight * targetDpr;
             if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
             }
          }

          // ... [Keep Gemini Bridge Logic] ...
        })
        .catch((err: unknown) => {
          console.error("Unity failed to load", err);
        });
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      if (typeof window !== "undefined") {
        delete window.dispatchGeminiRequest;
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-950 flex flex-col overflow-hidden font-sans text-gray-100 select-none">
      {/* --- HEADER --- */}
      <header className="h-12 flex-none bg-gray-900/80 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-6 z-10 text-xs font-mono">
        <div className="flex items-center gap-4">
          <span className="font-bold text-lg tracking-widest text-gray-400">
            PHYSICS STARS
          </span>
        </div>

        <div className="flex items-center gap-6 text-gray-400">
          <div className="flex flex-col sm:flex-row sm:gap-2 items-end sm:items-center">
            <span className="text-gray-600 font-bold">FPS</span>
            <span className="text-white">{metrics.fps}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2 items-end sm:items-center">
            <span className="text-gray-600 font-bold">TIME PER FRAME</span>
            <span>{metrics.frameTime}ms</span>
          </div>
          <div className="hidden sm:flex gap-2 items-center">
            <span className="text-gray-600 font-bold">MEM.</span>
            <span>{metrics.memory}</span>
          </div>
          {/* DISPLAY THE ACTIVE RATIO */}
            <div className="hidden md:flex gap-2 items-center">
                <span className="text-gray-600 font-bold">QUALITY</span>
                {/* Color code the quality setting */}
                <span className="font-bold">
                    {activePixelRatio.toFixed(1)}x 
                    {activePixelRatio < 1.5 ? ' (Low Quality)' : ' (High Quality)'}
                </span>
            </div>
        </div>
      </header>

      {/* --- MAIN GAME AREA --- */}
      <main className="flex-1 w-full relative bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          id="unity-canvas"
          className="w-full h-full object-contain focus:outline-none block"
          tabIndex={1}
        />

        {/* --- LOADING OVERLAY --- */}
        {!isGameLoaded && (
          <div className="absolute inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center transition-opacity duration-500">
            <div className="w-80 flex flex-col items-center">
              <h1 className="text-3xl font-bold text-white mb-8 tracking-tighter">
                PHYSICS STARS
              </h1>

              {/* PROGRESS BAR */}
              <div className="w-full space-y-2 mb-8">
                {/* KEY CHANGE: We use 'relative' on container and 'absolute' on the fill. 
                   We use 'scaleX' instead of 'width' because Transforms run on the GPU.
                */}
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden relative">
                  <div
                    className={`absolute top-0 left-0 h-full w-full bg-blue-500 origin-left transition-transform duration-300 ease-out will-change-transform ${isCompiling ? "shadow-[0_0_15px_rgba(59,130,246,0.6)]" : ""}`}
                    // Use scaleX(0.5) instead of width: 50%
                    style={{ transform: `scaleX(${progressScale})` }}
                  />
                </div>

                <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                  <span>
                    {isCompiling
                      ? "Descàrrega Completa!"
                      : "Descarregant Physics Stars..."}
                  </span>
                  <span>{Math.floor(progressPercent)}%</span>
                </div>
              </div>

              {/* COMPILING SPINNER */}
              <div
                className={`flex flex-col items-center space-y-4 transition-all duration-700 ease-out ${
                  isCompiling
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 border-2 border-gray-800 rounded-full"></div>
                  <div className="absolute inset-0 border-2 border-t-blue-500 rounded-full animate-spin"></div>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest animate-pulse">
                    Iniciant Physics Stars...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {isGameLoaded && (
          <button
            onClick={() => unityInstance?.SetFullscreen(1)}
            className="cursor-pointer absolute bottom-6 right-6 p-3 bg-gray-800/80 hover:bg-blue-600 text-white rounded-full transition-all shadow-lg border border-white/10 z-50 backdrop-blur-sm group"
            title="Fullscreen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:scale-110 transition-transform w-5 h-5"
            >
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
            </svg>
          </button>
        )}
      </main>
    </div>
  );
}
