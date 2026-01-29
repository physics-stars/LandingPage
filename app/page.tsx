"use client";

import { motion } from "framer-motion";
import { useActionState, useState, useEffect } from "react";
import { sendContactForm } from "./actions/contact"; // Assuming this exists in your project
import { Result } from "./types"; // Assuming this exists in your project
import Image from "next/image";
import { Brain, Gamepad2, Target } from "lucide-react";
import Link from "next/link";

// --- Data Mapping from Original TSX to New Style ---

// Mission/About Section Data
const missionData = [
  {
    icon: Brain, // Canviat string per component
    title: "Aprenentatge interactiu",
    desc: "Assimilar els conceptes estudiats resolent problemes versemblants i immersius.",
  },
  {
    icon: Gamepad2, // Canviat string per component
    title: "Gamificació",
    desc: "Emprar una narrativa atractiva, dinàmiques de videojoc i un sistema de recompenses.",
  },
  {
    icon: Target, // Canviat string per component
    title: "Resultats reals",
    desc: "Millorar el nivell en competències bàsiques i el rendiment i la motivació en física.",
  },
];

// Differentiation/Features Data
const featuresData = [
  {
    icon: "bolt",
    title: "Més enllà d'un software",
    desc: "Els reptes no són artificials ni abstractes; aquí la física és l'única eina per sobreviure.",
    list: [
      "Problemes versemblants.",
      "Narrativa immersiva.",
      "Aplicació pràctica real.",
    ],
  },
  {
    icon: "psychology",
    title: "Pensament crític",
    desc: "Oblida't de memoritzar fórmules buides. Els alumnes han de deduir, provar i descobrir.",
    list: [
      "Construcció d'hipòtesis.",
      "Aprenentatge per error.",
      "Interacció amb l'entorn.",
    ],
  },
  {
    icon: "emoji_events",
    title: "Motivador",
    desc: "Un sistema on l'esforç té recompensa i l'ajuda està disponible sense generar frustració.",
    list: [
      "Autonomia premiada.",
      "Corba de dificultat adaptada.",
      "Sense penalitzacions injustes.",
    ],
  },
  {
    icon: "group",
    title: "Per als professors",
    desc: "Una eina dissenyada per complementar les teves classes, no per substituir-les.",
    list: [
      "Informes automàtics.",
      "Seguiment del progrés.",
      "Integració curricular.",
    ],
  },
];

// Roadmap Data
const roadmapData = [
  {
    phase: "Fase 1: Pilot",
    status: "Completat",
    desc: "Prova pilot en format paper testada en múltipples aules de 4t d’ESO.",
  },
  {
    phase: "Fase 2: MVP Digital",
    status: "En curs",
    desc: "Implementació del primer món: Cinemàtica (MRU/MRUA) i mecàniques base.",
  },
  {
    phase: "Fase 3: Versió Completa",
    status: "Properament",
    desc: "Cerca d’inversors, desenvolupament complet i tests amb escoles.",
  },
  {
    phase: "Fase 4: Expansió",
    status: "Futur",
    desc: "Integració a les primeres escoles, facturació i escalat progressiu.",
  },
];

// Team Data
const teamData = [
  { name: "David Diestre", role: "Cofundador", img: "👨‍💼" },
  { name: "Juan Roset", role: "Cofundador", img: "🐴​" },
  { name: "Marcel Povill", role: "Dev Principal", img: "👨‍💻" },
  { name: "Aissam Khadraoui", role: "Disseny UX/UI", img: "🧑🏾‍🎨​" },
];

export default function PhysicsStarsLanding() {
  const handleDispatch = async (
    _currentState: unknown,
    formData: FormData,
  ): Promise<Result<null>> => {
    return await sendContactForm(formData);
  };

  const [state, dispatch, pending] = useActionState(handleDispatch, undefined);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }, // Detecta la secció quan és visible al 50%
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Framer motion variants (re-used from your TSX)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Injecting Fonts required for the style */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");
        @import url("https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap");
      `}</style>
      <div className="bg-midnight text-parchment font-body selection:bg-primary selection:text-wood-dark h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* --- Top Navigation (Floating) --- */}
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-10 transition-all duration-300 bg-linear-to-b from-black/80 to-transparent">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center">
                <Image
                  src="/logo_black.svg"
                  alt="Physics Stars Logo"
                  width={160}
                  height={48}
                  className="object-contain drop-shadow-md"
                  priority
                />
              </div>
              <span className="text-white font-display font-bold text-xl tracking-wide drop-shadow-md">
                Physics Stars
              </span>
            </div>
            {/* --- MODIFICAT: Navegació amb Highlighting Condicional --- */}
            <div className="hidden md:flex items-center gap-8 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
              <a
                className={`transition-all duration-300 text-sm font-medium ${
                  activeSection === "guild-hall"
                    ? "text-primary drop-shadow-[0_0_10px_rgba(255,170,0,0.8)] scale-110 font-bold"
                    : "text-parchment/80 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,170,0,0.5)]"
                }`}
                href="#guild-hall"
              >
                Missió
              </a>
              <a
                className={`transition-all duration-300 text-sm font-medium ${
                  activeSection === "notice-board"
                    ? "text-primary drop-shadow-[0_0_10px_rgba(255,170,0,0.8)] scale-110 font-bold"
                    : "text-parchment/80 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,170,0,0.5)]"
                }`}
                href="#notice-board"
              >
                Diferenciació
              </a>
              <a
                className={`transition-all duration-300 text-sm font-medium ${
                  activeSection === "roadmap"
                    ? "text-primary drop-shadow-[0_0_10px_rgba(255,170,0,0.8)] scale-110 font-bold"
                    : "text-parchment/80 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,170,0,0.5)]"
                }`}
                href="#roadmap"
              >
                Roadmap
              </a>
              <a
                className={`transition-all duration-300 text-sm font-medium ${
                  activeSection === "team"
                    ? "text-primary drop-shadow-[0_0_10px_rgba(255,170,0,0.8)] scale-110 font-bold"
                    : "text-parchment/80 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,170,0,0.5)]"
                }`}
                href="#team"
              >
                Equip
              </a>
            </div>
            <button className="hidden md:flex bg-wood-dark hover:bg-wood transition-colors text-primary border border-primary/50 px-5 py-2 rounded-lg font-bold text-sm shadow-lg items-center gap-2 group">
              <span>Login</span>
            </button>
          </div>
        </nav>

        {/* --- Hero Section: Village Square --- */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 snap-start"
        >
          {/* Background Layer */}
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
              style={{
                backgroundImage: "url('/bg.png')",
              }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-b from-midnight/30 via-midnight/60 to-midnight"></div>
            {/* Starry Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-8">
            {/* Lantern Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lantern-glow rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="animate-fade-in-up"
            >
              <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Pensa com un{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-amber-200 drop-shadow-glow">
                  Científic
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-parchment/90 max-w-2xl mx-auto font-medium drop-shadow-md">
                Transforma l&apos;ensenyament en una aventura interactiva per a
                l&apos;aprenentatge de la física.
              </p>
            </motion.div>

            {/* Hanging Sign CTA */}
            <div className="hanging-sign mt-8 relative group cursor-pointer ">
              <div className="absolute -top-16 left-8 w-1 h-16 bg-wood-light/80"></div>
              <div className="absolute -top-16 right-8 w-1 h-16 bg-wood-light/80"></div>
              <button className="relative bg-wood-dark border-[6px] border-[#5d4037] rounded-xl px-12 py-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-transform hover:scale-105 active:scale-95">
                <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none"></div>
                <div className="flex flex-col items-center">
                  <Link href={"/play"} className="font-display text-2xl font-bold text-primary tracking-wider uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
                    Comença l&apos;Aventura
                  </Link>
                  <span className="text-parchment/60 text-xs mt-1 font-serif italic">
                    Accés Gratuït
                  </span>
                </div>
                {/* Screws */}
                <div className="absolute top-2 left-2 size-3 bg-wood-light rounded-full shadow-inner"></div>
                <div className="absolute top-2 right-2 size-3 bg-wood-light rounded-full shadow-inner"></div>
                <div className="absolute bottom-2 left-2 size-3 bg-wood-light rounded-full shadow-inner"></div>
                <div className="absolute bottom-2 right-2 size-3 bg-wood-light rounded-full shadow-inner"></div>
              </button>
            </div>

            <div className="mt-12 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
              <span className="material-symbols-outlined text-primary animate-pulse">
                explore
              </span>
              <span className="text-sm text-parchment/80">
                Fes scroll per descobrir la innovació
              </span>
            </div>
          </div>
        </section>

        {/* --- Secció Missió: La Taula del Gremi --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center pt-18 pb-48 overflow-hidden snap-start"
          id="guild-hall"
          style={{
            backgroundColor: "#0a0e17",
            backgroundImage:
              "radial-gradient(circle at center, #1a2333 0%, #0a0e17 70%)",
          }}
        >
          {/* Textura de fusta antiga a la "taula" del fons */}
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/wood-pattern.png')",
            }}
          ></div>

          {/* Llum càlida central */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-4">
              {" "}
              {/* Marge reduït per guanyar espai */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Títol millorat: Tauló de fusta clavat */}
                <div className="relative inline-block">
                  {/* Suport del rètol (corda o metall darrere) */}
                  <div className="absolute -top-4 left-10 w-1 h-8 bg-wood-light/50 z-0"></div>
                  <div className="absolute -top-4 right-10 w-1 h-8 bg-wood-light/50 z-0"></div>

                  <div className="relative py-5 px-16 bg-wood-dark border-y-4 border-[#251614] rounded-sm shadow-2xl z-10">
                    {/* Claus a les cantonades */}
                    <div className="absolute top-3 left-3 size-3 bg-[#1a100e] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-black/50"></div>
                    <div className="absolute top-3 right-3 size-3 bg-[#1a100e] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-black/50"></div>
                    <div className="absolute bottom-3 left-3 size-3 bg-[#1a100e] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-black/50"></div>
                    <div className="absolute bottom-3 right-3 size-3 bg-[#1a100e] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-black/50"></div>

                    <h2 className="font-display text-3xl md:text-5xl text-parchment font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-widest uppercase border-b-2 border-parchment/10 pb-1">
                      La Missió del Gremi
                    </h2>
                  </div>
                </div>

                <p className="text-parchment/80 max-w-2xl mx-auto font-serif italic text-lg mt-4 leading-relaxed drop-shadow-md">
                  Acosta&apos;t a la taula, iniciat. Aquí tens els tres pilars
                  del nostre coneixement.
                </p>
              </motion.div>
            </div>

            {/* Graella de "Pergamins sobre la Taula" */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-12 max-w-6xl mx-auto perspective-1000"
            >
              {missionData.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative h-full cursor-pointer px-6 mt-8"
                >
                  {/* Contenidor Principal: Rotlle de Pergamí */}
                  <div className="relative h-full transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1 flex flex-col">
                    {/* --- RODET SUPERIOR (Estil Fusta Integral) --- */}
                    <div className="absolute -top-6 -left-7 -right-7 h-12 z-30 flex items-center justify-center pointer-events-none">
                      {/* Barra Central (Eix) - MODIFICAT: Color de fusta més clar amb gradient per volum */}
                      <div className="absolute inset-x-4 h-4 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.6)]"></div>

                      <div className="w-full relative flex items-center justify-between px-1">
                        {/* MANEC ESQUERRE */}
                        <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-l-md shadow-[5px_5px_10px_rgba(0,0,0,0.5)] border-r-2 border-black/30">
                          {/* Anella: Fusta fosca (sense metall ni blanc) */}
                          <div className="absolute right-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)] border-l border-white/5"></div>
                        </div>

                        {/* MANEC DRET */}
                        <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-r-md shadow-[-5px_5px_10px_rgba(0,0,0,0.5)] border-l-2 border-black/30">
                          {/* Anella: Fusta fosca */}
                          <div className="absolute left-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)] border-r border-white/5"></div>
                        </div>
                      </div>
                    </div>

                    {/* --- COS DEL PERGAMÍ --- */}
                    <div className="relative bg-parchment shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden w-full rounded-sm mx-auto flex-grow flex flex-col pb-12 pt-6 border-x border-[#d7ccc8]">
                      {/* Textura de mapa antic */}
                      <div
                        className="absolute inset-0 opacity-40 mix-blend-multiply"
                        style={{
                          backgroundImage:
                            "url('https://www.transparenttextures.com/patterns/old-map.png')",
                        }}
                      ></div>

                      {/* EFECTE CREMAT */}
                      <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_rgba(62,39,35,0.6)] pointer-events-none z-10"></div>

                      {/* Contingut */}
                      <div className="relative px-8 flex flex-col items-center text-center z-20 h-full justify-start">
                        {/* Ícon - MODIFICAT: Estil "Il·lustració de Manuscrit" (Tinta i Or vell) */}
                        <div className="relative mb-5 mt-4 shrink-0">
                          {/* Brillantor de fons difusa (Aura màgica subtil) */}
                          <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-75 group-hover:scale-125 transition-transform duration-700"></div>

                          {/* Contenidor Circular (Estil traç de ploma) */}
                          <div className="size-24 rounded-full flex items-center justify-center border-2 border-dashed border-[#5d4037]/60 bg-[#5d4037]/5 shadow-[inset_0_0_15px_rgba(62,39,35,0.1)] group-hover:border-[#5d4037] group-hover:bg-[#5d4037]/10 transition-all duration-300">
                            {/* Anella interior fina */}
                            <div className="size-20 rounded-full border border-[#5d4037]/20 flex items-center justify-center">
                              {/* Icona color tinta fosca (Lucide Component) */}
                              <item.icon
                                strokeWidth={1.5}
                                className="w-10 h-10 text-[#3e2723] drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Títol */}
                        <h3 className="font-display text-2xl text-wood-dark font-bold mb-3 tracking-wide drop-shadow-sm uppercase border-b-2 border-wood-dark/30 pb-3 w-full shrink-0">
                          {item.title}
                        </h3>

                        {/* Descripció */}
                        <p className="text-wood-dark font-serif text-lg leading-relaxed italic font-medium px-2 opacity-90">
                          &quot;{item.desc}&quot;
                        </p>
                      </div>
                    </div>

                    {/* --- RODET INFERIOR (Estil Fusta Integral) --- */}
                    <div className="absolute -bottom-6 -left-7 -right-7 h-12 z-30 flex items-center justify-center pointer-events-none">
                      {/* Barra Central (Eix) - MODIFICAT: Color de fusta més clar amb gradient per volum */}
                      <div className="absolute inset-x-4 h-4 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.6)]"></div>

                      <div className="w-full relative flex items-center justify-between px-1">
                        {/* MANEC ESQUERRE */}
                        <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-l-md shadow-[5px_5px_10px_rgba(0,0,0,0.5)] border-r-2 border-black/30">
                          {/* Anella: Fusta fosca */}
                          <div className="absolute right-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)] border-l border-white/5"></div>
                        </div>

                        {/* MANEC DRET */}
                        <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-r-md shadow-[-5px_5px_10px_rgba(0,0,0,0.5)] border-l-2 border-black/30">
                          {/* Anella: Fusta fosca */}
                          <div className="absolute left-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-[inset_0_0_2px_rgba(0,0,0,0.8)] border-r border-white/5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- Differentiation: The Notice Board --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center py-24 bg-midnight border-y border-white/5 snap-start"
          id="notice-board"
        >
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="relative bg-wood-dark p-4 rounded-lg shadow-2xl border-b-8 border-r-8 border-[#281815]">
              <div className="absolute inset-0 opacity-40 bg-wood-pattern rounded-lg pointer-events-none"></div>

              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#5d4037] px-8 py-2 rounded-t-lg border-t-2 border-x-2 border-wood-light shadow-lg z-10">
                <h2 className="font-display text-parchment font-bold text-lg uppercase tracking-widest text-shadow">
                  En que ens diferenciem?
                </h2>
              </div>

              <div className="relative z-10 flex flex-wrap justify-center items-stretch gap-6 py-10 px-6 min-h-[500px]">
                {featuresData.map((feature, i) => (
                  <motion.div
                    initial={{ opacity: 0, rotate: -2 }}
                    whileInView={{ opacity: 1, rotate: i % 2 === 0 ? 1 : -1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                    className={`relative w-full md:w-[45%] lg:w-[22%] bg-linear-to-br from-[#1a237e] to-[#0d47a1] text-white p-1 rounded-lg shadow-[0_0_20px_rgba(255,170,0,0.3)] hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className="h-full w-full border-2 border-primary/50 rounded-md p-6 relative overflow-hidden flex flex-col z-10 bg-midnight/40 backdrop-blur-sm">
                      {/* Decorative Pin */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 size-4 rounded-full bg-primary shadow-glow z-20"></div>
                      <div className="absolute top-4 right-4 text-primary animate-pulse opacity-50">
                        ✦
                      </div>

                      {/* Icon */}
                      <div className="mb-4 flex justify-center">
                        <div className="bg-linear-to-b from-primary/20 to-transparent p-3 rounded-full border border-primary/30">
                          <span className="material-symbols-outlined text-3xl text-primary drop-shadow-md">
                            {feature.icon}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-display font-bold text-xl mb-3 text-white drop-shadow-md text-center leading-tight">
                        {feature.title}
                      </h3>

                      {/* --- MILLORA DE L'ESTIL DE CONTINGUT --- */}
                      <div className="grow flex flex-col gap-4">
                        {/* 1. Description: Serif, Italic, Lighter Color (Lore style) */}
                        <p className="font-serif italic text-sm text-blue-100/80 text-center leading-relaxed border-b border-primary/20 pb-3">
                          {feature.desc}
                        </p>

                        {/* 2. Enumeration: Bold, List style */}
                        {feature.list && (
                          <ul className="space-y-1.5 px-1">
                            {feature.list.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-xs font-medium text-white/90"
                              >
                                <span className="material-symbols-outlined text-sm text-primary shrink-0 pt-0.5">
                                  check
                                </span>
                                <span className="text-left leading-snug">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Background Watermark Icon */}
                      <div className="absolute -bottom-6 -right-6 opacity-10 pointer-events-none rotate-12">
                        <span className="material-symbols-outlined text-8xl">
                          {feature.icon}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- Roadmap: The Steam Train --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center py-24 bg-[#0F1218] overflow-hidden snap-start"
          id="roadmap"
        >
          <div
            className="absolute inset-0 bg-contain bg-bottom bg-repeat-x opacity-30"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCbLaZiiaeu0uFhEeFSAMSb6LhqE8nKSy5nuksoB50Bybl4bCEA5065iharIsy95npziX9uGJfu5kBhTxpjH2KoldijphQwaSlDFGVxss0OiYbZrBBQefipNebTpY4TzUxOUJagEpp_tSK2OwvcnnFUXYKIyA93M-SC9cGFz2YvJBlFCnKm0gC3Ys8HOzyJmcH8mpFIU4cSi8QyEigfH21sM61uxLjwgljungSJjwoGi8751fKVPXaqH-JFXK5cvmDKqwvKSaR8yq_g')",
              filter: "blur(2px)",
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-display text-4xl text-center text-parchment font-bold mb-16 drop-shadow-md">
              La Jornada per Endavant
            </h2>

            <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
              {/* Vertical Train Tracks */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 flex flex-col items-center">
                {/* Rails */}
                <div className="w-2 h-full bg-[#2c2c2c] border-x border-[#1a1a1a] relative z-10"></div>
                {/* Sleepers (Travesses) - CANVI: Ajustat el gradient per ajuntar-les */}
                <div className="absolute inset-0 h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,#3e2723_8px,#3e2723_12px)] w-10 -left-3 z-0"></div>
              </div>

              {roadmapData.map((item, i) => {
                const isCompleted = item.status === "Completat";
                const isInProgress = item.status === "En curs";
                const isLeft = i % 2 === 0;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex flex-col md:flex-row items-center justify-between mb-24 relative ${
                      !isCompleted && !isInProgress ? "opacity-50" : ""
                    }`}
                  >
                    {/* Content Box */}
                    <div
                      className={`md:w-[45%] mb-4 md:mb-0 ${
                        isLeft
                          ? "md:text-right pr-8 order-2 md:order-1"
                          : "pl-8 order-3 md:order-3"
                      }`}
                    >
                      <div
                        className={`inline-block bg-[#1a1a1a] p-4 rounded-lg border ${
                          isInProgress
                            ? "border-primary shadow-[0_0_15px_rgba(255,170,0,0.1)]"
                            : "border-white/10"
                        }`}
                      >
                        <h3
                          className={`${
                            isInProgress ? "text-primary" : "text-parchment"
                          } font-display font-bold text-xl`}
                        >
                          {item.phase}
                        </h3>
                        <p className="text-gray-400 text-sm mt-2">
                          {item.desc}
                        </p>
                        {isCompleted && (
                          <span className="inline-block mt-2 text-xs text-green-500 font-bold border border-green-900 bg-green-900/20 px-2 py-1 rounded">
                            COMPLETAT
                          </span>
                        )}
                        {isInProgress && (
                          <span className="inline-block mt-2 text-xs text-amber-500 font-bold">
                            EN CURS
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Node / Train */}
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 order-1">
                      {isInProgress ? (
                        <div className="relative">
                          <div className="absolute top-1/2 left-1/2 w-[200px] h-[100px] -translate-y-1/2 bg-linear-to-r from-primary/40 to-transparent blur-xl rounded-full pointer-events-none"></div>
                          <div className="size-16 bg-black rounded-full border-4 border-primary flex items-center justify-center shadow-glow-strong">
                            <span className="material-symbols-outlined text-3xl text-primary">
                              train
                            </span>
                          </div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold text-xs whitespace-nowrap animate-bounce">
                            SOM AQUÍ
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`size-6 rounded-full border-4 border-black ${
                            isCompleted
                              ? "bg-primary shadow-glow"
                              : "bg-wood-dark"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Spacer for opposite side */}
                    <div
                      className={`md:w-[45%] ${
                        isLeft ? "order-3 md:order-3" : "order-2 md:order-1"
                      }`}
                    ></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- Team: The Adventurers' Party --- */}
        <section
          className="min-h-screen flex flex-col justify-center py-24 bg-midnight-light snap-start"
          id="team"
        >
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl text-center text-parchment font-bold mb-16 drop-shadow-md">
              Coneix els Mestres del Gremi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {teamData.map((member, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-wood p-1 rounded-lg shadow-xl hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="bg-midnight h-full p-4 border border-wood-light/30 rounded flex flex-col items-center">
                    <div className="size-32 rounded-lg bg-gray-700 mb-4 overflow-hidden border-4 border-wood-light relative flex items-center justify-center text-6xl">
                      {/* Using Emoji as placeholders since TSX had Emojis for images in data structure */}
                      <span className="filter grayscale group-hover:grayscale-0 transition-all duration-500 scale-125">
                        {member.img}
                      </span>
                      <div className="absolute inset-0 shadow-inner-wood pointer-events-none"></div>
                    </div>
                    <h3 className="text-primary font-display font-bold text-lg">
                      {member.name}
                    </h3>
                    <p className="text-xs text-parchment/60 font-serif italic mb-3">
                      {member.role}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Contact: The Post Office --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center items-center py-32 bg-midnight overflow-hidden snap-start"
          id="contact"
        >
          {/* Ambient Lighting */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

          {/* Magical Glow behind the scroll */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-5xl px-4">
            {/* Scroll/Envelope Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-parchment p-8 md:p-12 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)] relative border-4 border-double border-wood-light"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/paper.png')",
              }}
            >
              {/* Decorative Corner Stamps */}
              <div className="absolute top-4 right-4 opacity-60 rotate-12 pointer-events-none hidden md:block">
                <div className="size-24 border-4 border-red-900/40 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-red-900/40">
                    verified
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
                {/* --- LEFT COLUMN: Guild Info --- */}
                <div className="md:col-span-5 flex flex-col justify-start space-y-2 md:border-r-2 md:border-wood-light/30 md:pr-10">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2 text-wood">
                      <span className="h-px w-8 bg-wood"></span>
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Informació
                      </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl text-wood-dark font-black drop-shadow-sm mb-6">
                      Seu del Gremi
                    </h2>
                    <p className="text-wood font-serif italic mb-8">
                      Pots trobar els nostres mestres artesans i savis a les
                      següents coordenades.
                    </p>
                  </div>

                  {/* Info Item: Location */}
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-2xl">
                        castle
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-wood-dark text-lg">
                        Ciutadella del Coneixement
                      </h4>
                      <p className="text-wood font-serif text-sm">
                        Campus Sescelades,
                        <br />
                        Tarragona, Catalunya
                      </p>
                    </div>
                  </div>

                  {/* Info Item: Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-2xl">
                        mark_email_unread
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-wood-dark text-lg">
                        Correu Màgic
                      </h4>
                      <a
                        href="mailto:info@physicsstars.com"
                        className="text-wood font-serif text-sm hover:text-primary transition-colors"
                      >
                        info@physicsstars.com
                      </a>
                    </div>
                  </div>

                  {/* Info Item: Socials (LinkedIn/Twitter) */}
                  <div className="flex items-start gap-4 group">
                    <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <span className="material-symbols-outlined text-2xl">
                        hub
                      </span>
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-wood-dark text-lg">
                        Xarxa de Cristalls
                      </h4>
                      <div className="flex gap-3 mt-1">
                        <a
                          href="#"
                          className="text-xs font-bold uppercase tracking-wider text-wood border-b border-wood hover:text-primary hover:border-primary transition-colors"
                        >
                          LinkedIn
                        </a>
                        <span className="text-wood/30">|</span>
                        <a
                          href="#"
                          className="text-xs font-bold uppercase tracking-wider text-wood border-b border-wood hover:text-primary hover:border-primary transition-colors"
                        >
                          Instagram
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --- RIGHT COLUMN: Form --- */}
                <div className="md:col-span-7">
                  {/* Form Header */}
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 mb-2 text-wood">
                      <span className="h-px w-8 bg-wood"></span>
                      <span className="text-xs font-bold uppercase tracking-widest">
                        Missatgeria
                      </span>
                    </div>
                    <h3 className="font-display text-3xl text-wood-dark font-black">
                      Envia un Corb
                    </h3>
                    <p className="text-wood mt-2 font-serif italic text-sm">
                      Tens una proposta o dubte? Els nostres escribes et
                      respondran ràpidament.
                    </p>
                  </div>

                  {/* Functional React Form */}
                  <form action={dispatch} className="space-y-5">
                    {state && !state.success && (
                      <div className="p-3 bg-red-100 border-l-4 border-red-800 text-red-900 text-xs font-serif font-bold shadow-sm">
                        ⚠️ {state.error}
                      </div>
                    )}
                    {state && state.success && (
                      <div className="p-3 bg-green-100 border-l-4 border-green-800 text-green-900 text-xs font-serif font-bold shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">
                          check_circle
                        </span>
                        Corb enviat correctament!
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">
                        Nom de l&apos;Aventurer
                      </label>
                      <input
                        name="name"
                        className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md"
                        placeholder="Com et vols donar a conèixer?"
                        type="text"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">
                        Adreça del Pergamí (Email)
                      </label>
                      <input
                        name="email"
                        className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md"
                        placeholder="on.t@escrivim.com"
                        type="email"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">
                        Missatge
                      </label>
                      <textarea
                        name="message"
                        className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md resize-none"
                        placeholder="Explica'ns la teva odissea..."
                        rows={3}
                      ></textarea>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={pending}
                        className="w-full group relative bg-wood-dark hover:bg-[#2d1b18] text-parchment transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 p-1"
                      >
                        <div className="border border-parchment/20 rounded-md py-3 flex items-center justify-center gap-3 relative overflow-hidden">
                          <div className="relative flex items-center justify-center size-8">
                            <div className="absolute inset-0 bg-red-800 rounded-full border-2 border-red-900 shadow-inner group-hover:scale-110 transition-transform"></div>
                            <span className="material-symbols-outlined text-white/90 text-sm relative z-10">
                              mail
                            </span>
                          </div>

                          <span className="font-display font-bold text-lg tracking-wide">
                            {pending ? "Enviant..." : "Signar i Enviar"}
                          </span>

                          <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 text-sm snap-start">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © {new Date().getFullYear()} Physics Stars. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a className="hover:text-primary" href="#">
                Termes del Servei
              </a>
              <a className="hover:text-primary" href="#">
                Política de Privacitat
              </a>
            </div>
          </div>
        </footer>

        {/* --- Fixed Compass Menu Trigger --- */}
        {/* <div className="fixed bottom-6 right-6 z-50">
          <button className="size-14 bg-wood-dark rounded-full border-2 border-primary shadow-[0_0_20px_rgba(255,170,0,0.4)] flex items-center justify-center text-primary hover:rotate-90 transition-transform duration-500 group">
            <span className="material-symbols-outlined text-3xl">explore</span>
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
          </button>
        </div> */}
      </div>
    </>
  );
}
