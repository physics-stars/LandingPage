"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// TypeScript definition for the Unity Instance to avoid errors
declare global {
  interface Window {
    createUnityInstance: (
      canvas: HTMLCanvasElement,
      config: Record<string, string>,
      onProgress: (progress: number) => void
    ) => Promise<{ SetFullscreen: (fullscreen: number) => void; Quit: () => void }>;
  }
}

type UnityInstance = { SetFullscreen: (fullscreen: number) => void; Quit: () => void };


  // Configuration - Matches your Unity Build Settings
  const buildUrl = "/Build";
  const loaderUrl = buildUrl + "/BuildProd.loader.js";
  
  const config = {
    dataUrl: buildUrl + "/BuildProd.data.br",
    frameworkUrl: buildUrl + "/BuildProd.framework.js.br",
    codeUrl: buildUrl + "/BuildProd.wasm.br",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "DefaultCompany",
    productName: "Physics Stars",
    productVersion: "0.1.0",
  };


export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [unityInstance, setUnityInstance] = useState<UnityInstance | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // Prevent double loading in React Strict Mode
    if (unityInstance) return;

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      if (!canvasRef.current) return;

      window.createUnityInstance(canvasRef.current, config, (progress: number) => {
        setLoadingProgress(progress);
      })
      .then((instance: UnityInstance) => {
        setUnityInstance(instance);
        setIsLoaded(true);
      })
      .catch((message: unknown) => {
        setError(String(message));
      });
    };

    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
      if (unityInstance) {
        // Unity WebGL cleanup is tricky, usually handled by page refresh
        // but we can try to quit if supported by the version
        try { (unityInstance as { Quit: () => void }).Quit(); } catch(e) {}
      }
    };
  }, [unityInstance]);

  const handleFullscreen = () => {
    if (unityInstance) {
      unityInstance.SetFullscreen(1);
    }
  };

  return (
    <>
      {/* Inject Fonts and Global Styles */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");
        
        .bg-midnight { background-color: #0a0e17; }
        .text-parchment { color: #f3e5ab; }
        .text-wood-dark { color: #3e2723; }
        .bg-wood-dark { background-color: #3e2723; }
        .text-primary { color: #ffca28; }
        .font-display { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-serif { font-family: 'Noto Serif', serif; }
      `}</style>

      <div className="bg-midnight text-parchment font-serif min-h-screen flex flex-col relative overflow-hidden">
        
        {/* --- Background Ambient Effects --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
           <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black/80 to-transparent"></div>
        </div>

        {/* --- Navigation (Simplified) --- */}
        <nav className="relative z-50 px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group hover:opacity-80 transition-opacity">
             <div className="relative w-8 h-8">
                {/* Placeholder for Logo if image fails */}
                <span className="material-symbols-outlined text-3xl text-primary">science</span>
             </div>
             <span className="text-white font-display font-bold text-lg tracking-wide drop-shadow-md">
               Physics Stars
             </span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-wood-dark bg-parchment/90 hover:bg-white px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(255,202,40,0.3)] transition-all">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Tornar al Gremi
          </Link>
        </nav>

        {/* --- Main Game Stage --- */}
        <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 relative z-10">
          
          {/* Game Container: The "Magic Mirror" Frame */}
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[960px] aspect-[16/10] bg-black rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.8)]"
          >
            
            {/* The Ornamental Frame (CSS Styled) */}
            <div className="absolute -inset-1 md:-inset-3 border-[6px] md:border-[12px] border-[#3e2723] rounded-lg z-20 pointer-events-none shadow-inner">
               {/* Gold Inlay */}
               <div className="absolute inset-0 border-[2px] border-[#ffca28]/40 rounded-sm"></div>
               {/* Corner Screws */}
               <div className="absolute -top-1 -left-1 w-4 h-4 bg-[#5d4037] rounded-full border border-black/50"></div>
               <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#5d4037] rounded-full border border-black/50"></div>
               <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-[#5d4037] rounded-full border border-black/50"></div>
               <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#5d4037] rounded-full border border-black/50"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-50 p-8 text-center">
                 <div className="bg-red-900/20 border border-red-500/50 p-6 rounded-lg max-w-md">
                    <span className="material-symbols-outlined text-4xl text-red-500 mb-4">warning</span>
                    <h3 className="text-xl font-bold text-red-100 mb-2">Error de Connexió</h3>
                    <p className="text-red-200/80">{error}</p>
                 </div>
              </div>
            )}

            {/* Loading Screen (Overlay) */}
            <AnimatePresence>
              {!isLoaded && !error && (
                <motion.div 
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0a0e17] z-30 flex flex-col items-center justify-center rounded-lg"
                >
                  <div className="relative mb-8">
                     {/* Pulsing Glow */}
                     <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse"></div>
                     <span className="material-symbols-outlined text-6xl text-primary relative z-10 animate-bounce">
                        rocket_launch
                     </span>
                  </div>

                  <h2 className="font-display text-2xl text-white font-bold mb-6 tracking-widest uppercase">
                    Carregant Physics Stars
                  </h2>

                  {/* Steampunk Progress Bar */}
                  <div className="w-64 h-6 bg-[#1a1a1a] border-2 border-[#5d4037] rounded-full relative overflow-hidden shadow-inner">
                    <motion.div 
                      className="h-full bg-linear-to-r from-amber-700 via-primary to-amber-200"
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadingProgress * 100}%` }}
                      transition={{ ease: "linear" }}
                    />
                    {/* Tick marks overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30 mix-blend-overlay"></div>
                  </div>
                  
                  <p className="mt-4 text-parchment/50 font-mono text-xs">
                    {Math.round(loadingProgress * 100)}% - Preparant motors físics...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* THE CANVAS */}
            <canvas 
              ref={canvasRef} 
              id="unity-canvas" 
              className="w-full h-full rounded-lg bg-black block"
              tabIndex={-1}
            />

            {/* Footer Control Bar (Inside the frame) */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/90 to-transparent z-20 flex items-center justify-between px-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
               <div className="text-xs text-white/50 font-display">Physics Stars v0.1.0</div>
               <button 
                 onClick={handleFullscreen}
                 className="text-white/70 hover:text-primary transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
               >
                 <span className="material-symbols-outlined text-lg">fullscreen</span>
                 Pantalla Completa
               </button>
            </div>

          </motion.div>

          {/* Instructions Plate */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="mt-8 max-w-2xl text-center"
          >
             <div className="inline-block bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full">
                <p className="text-parchment/80 text-sm font-serif italic">
                   <span className="text-primary font-bold not-italic mr-2">Consell del Mestre:</span> 
                   Fes servir les tecles WASD per moure&apos;t i ESPAI per interactuar amb el món.
                </p>
             </div>
          </motion.div>

        </main>
      </div>
    </>
  );
}