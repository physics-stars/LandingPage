"use client";

import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";
import { FaKey } from "react-icons/fa";
import { useActionState, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { Result } from "../types";
import { loginUser } from "../actions/login";

function LoginForm() {
  
  const handleDispatch = async (
    _currentState: unknown,
    formData: FormData,
  ): Promise<Result<undefined>> => {
    return await loginUser(formData);
  };

  const [state, dispatch, pending] = useActionState(handleDispatch, undefined);

  const errorMessage = state && !state.success ? state.error || "Error desconegut" : null;

  return (
    <div className="bg-midnight text-parchment font-body selection:bg-primary selection:text-wood-dark">
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-midnight via-midnight/90 to-midnight z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-30 blur-sm"
          style={{ backgroundImage: "url('/bg.png')" }}
        ></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 z-20"></div>
      </div>

      {/* --- HEADER FIX (Sense navbar ni botó login) --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-10 bg-linear-to-b from-black/80 to-transparent">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex items-center group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/logo_black.svg"
                alt="Physics Stars Logo"
                width={160}
                height={48}
                className="object-contain drop-shadow-md"
              />
            </div>
            <span className="text-white font-display font-bold text-xl tracking-wide drop-shadow-md group-hover:text-primary transition-colors">
              Physics Stars
            </span>
          </Link>
        </div>
      </nav>

      {/* --- MAIN CONTENT (Ocupa tota la pantalla inicial) --- */}
      {/* pt-24 compensa el header fix per centrar el formulari perfectament */}
      <main className="relative z-20 min-h-screen flex items-center justify-center px-4 pt-16 pb-12">
        {/* Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // APLICACIÓ DELS ESTILS REFACTORITZATS
          className="rpg-paper p-8 md:p-12 w-full max-w-xl"
        >
          {/* Capçalera del Formulari */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-2 mb-2 text-wood">
              <span className="h-px w-8 bg-wood"></span>
              <span className="text-xs font-bold uppercase tracking-widest">
                Àrea de Membres
              </span>
              <span className="h-px w-8 bg-wood"></span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-wood-dark font-black drop-shadow-sm">
              Iniciar Sessió
            </h1>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-800/70 border border-red-600 text-red-200 rounded">
              {errorMessage}
            </div>
          )}

          <form action={dispatch} className="space-y-6">
            {/* Input Usuari */}
            <div className="space-y-1">
              <label htmlFor="username" className="rpg-label">
                Nom d&apos;usuari o correu
              </label>
              <input
                id="username"
                name="userName"
                type="text"
                required
                className="rpg-input"
                placeholder="El teu nom d'aventurer..."
              />
            </div>

            {/* Input Contrasenya */}
            <PasswordInput />

            {/* Checkbox i Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm gap-4 pt-2">
              <label className="flex items-start gap-2 cursor-pointer group select-none">
                <div className="relative flex items-center">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="w-4 h-4 border-2 border-wood-dark/60 rounded-sm bg-black/5 peer-checked:bg-wood-dark peer-checked:border-wood-dark transition-all"></div>
                  {/* Petit check simulat */}
                  <div className="absolute inset-0 hidden peer-checked:flex items-center justify-center text-parchment text-[10px] font-bold">
                    ✓
                  </div>
                </div>
                <span className="text-wood-dark/80 font-serif group-hover:text-wood-dark font-bold transition-colors">
                  Recorda&apos;m
                </span>
              </label>

              <a
                href="/forgot-password"
                className="text-wood-dark/80 hover:text-primary transition-colors font-serif italic text-sm underline decoration-wood-light/30 hover:decoration-primary"
              >
                Has perdut la clau?
              </a>
            </div>

            {/* Botó Login */}
            <div className="pt-4">
              <div className="relative group isolate">
                <button
                  type="submit"
                  disabled={pending}
                  className="rpg-btn-primary"
                >
                  <div className="rpg-btn-content">
                    <span className="rpg-btn-text">
                      {pending ? "Obrint Portal..." : "Entrar al Gremi"}
                    </span>
                    {/* Efecte de llum al fons del botó */}
                    <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  </div>
                </button>

                {/* Icona Clau simple al costat (sense segell complex) */}
                <div className="absolute -right-4 -bottom-4 z-20 text-wood-dark/20 rotate-12 pointer-events-none">
                  <FaKey className="w-12 h-12 drop-shadow-sm" />
                </div>
              </div>
            </div>
          </form>

          {/* Registre */}
          <div className="mt-8 pt-6 border-t-2 border-wood-light/20 text-center">
            <p className="text-wood-dark font-serif text-base">
              Encara no tens llicència?{" "}
              <a
                href="/register"
                className="font-bold text-wood-dark underline decoration-2 decoration-wood-dark/40 hover:text-primary hover:decoration-primary transition-all ml-1"
              >
                Demana-la aquí!
              </a>
            </p>
          </div>
        </motion.div>
      </main>

      {/* --- FOOTER (Visible amb scroll) --- */}
      <footer className="relative z-10 bg-black py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>
            © {new Date().getFullYear()} Physics Stars. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a className="hover:text-primary transition-colors" href="#">
              Termes del Servei
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Política de Privacitat
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LoginForm;
