"use client";

import { motion } from "framer-motion";
import { useActionState, useState, useEffect } from "react";
import { sendContactForm } from "./actions/contact";
import { Result } from "./types";
import Image from "next/image";
import { Brain, ExternalLink, Gamepad2, Target } from "lucide-react";
import Link from "next/link";
import { FaCompass, FaFeather, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  MdCastle,
  MdEmojiEvents,
  MdMarkEmailUnread,
  MdPsychologyAlt,
  MdVerified,
  MdVpnKey,
} from "react-icons/md";
import { FaBoltLightning } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { IoIosMail, IoMdTrain } from "react-icons/io";
import { SiGmail } from "react-icons/si";

// --- DADES ESTÀTIQUES (Sense canvis, mateixes que abans) ---
const missionData = [
  {
    icon: Brain,
    title: "Aprenentatge interactiu",
    desc: "Assimilar els conceptes estudiats resolent problemes versemblants i immersius.",
  },
  {
    icon: Gamepad2,
    title: "Gamificació",
    desc: "Emprar una narrativa atractiva, dinàmiques de videojoc i un sistema de recompenses.",
  },
  {
    icon: Target,
    title: "Resultats reals",
    desc: "Millorar el nivell en competències bàsiques i el rendiment i la motivació en física.",
  },
];

const featuresData = [
  {
    icon: <FaBoltLightning className="w-7 h-7" />,
    title: "Més enllà d'un simple software",
    desc: (
      <>
        Els reptes no són de l&apos;estil: &quot;si resols aquest exercici,
        s&apos;obrirà la porta&quot;.
        <br />
        <br />A Physics Stars,{" "}
        <strong className="text-wood-dark font-bold">
          l&apos;ús de la física no s&apos;imposa de forma artificial
        </strong>
        : els estudiants s&apos;enfronten a problemes versemblants dins
        d&apos;una trama atractiva on{" "}
        <strong className="text-wood-dark font-bold">
          la física és la solució real.
        </strong>
      </>
    ),
  },
  {
    icon: <MdPsychologyAlt className="w-7 h-7" />,
    title: "La física és pensament crític",
    desc: (
      <>
        La física no ha de consistir en memoritzar i aplicar fòrmules.
        <br />
        <br />A Physics Stars{" "}
        <strong className="text-wood-dark font-bold">
          els alumnes construeixen el seu propi enunciat
        </strong>{" "}
        interactuant amb un entorn immersiu.
      </>
    ),
  },
  {
    icon: <MdEmojiEvents className="w-7 h-7" />,
    title: "Motivador per l'alumnat",
    desc: (
      <>
        <strong className="text-wood-dark font-bold">
          Physics Stars aconsegueix allò en què moltes propostes fallen:
        </strong>{" "}
        mantenir la motivació i estimular el pensament crític sense frustrar els
        qui van més endarrerits ni avorrir als avançats.
        <br />
        <br />
        <strong className="text-wood-dark font-bold">Com?</strong> Oferint
        reptes on l’ajuda és accessible, però l&apos;autonomia té recompensa.
        Fomentant l&apos;esforç personal sense penalitzar ningú.
      </>
    ),
  },
  {
    icon: <GiTeacher className="w-7 h-7" />,
    title: "Tenim en compte als professors",
    desc: (
      <>
        No pretenem reinventar l’ensenyament: Physics Stars actua com un
        complement als deures, fàcil d’integrar a les dinàmiques escolars i
        pensat com una eina pràctica pels docents.
      </>
    ),
    list: [
      "Mateix contingut que al currículum escolar.",
      "Interfície senzilla i fàcil d'utilitzar.",
      "Generació automàtica d'informes de progrés.",
    ],
  },
];

const roadmapData = [
  {
    phase: "Fase 1: Pilot a paper a escoles",
    status: "Completat",
    progress: 100,
    items: [
      "Prova pilot en format paper testada en múltipples aules de 4t d’ESO.",
      "Validació de la metodologia i la narrativa.",
      "Recollida de feedback de l’aula i iteracions.",
    ],
  },
  {
    phase: "Fase 2: MVP digital (Unity Web) — Cinemàtica",
    status: "En curs",
    progress: 25,
    items: [
      "Implementació del primer món: Cinemàtica (MRU/MRUA).",
      "Mecàniques base: narrativa, experiència de l’usuari i sistema de pistes i recompenses.",
      "Recollida de feedback i test de viabilitat amb usuaris reals.",
      "Obtenció de resultats més realistes (ús, dificultat, aprenentatge).",
    ],
  },
  {
    phase: "Fase 3: Primera versió completa",
    status: "Properament",
    progress: 0,
    items: [
      "Cerca d’inversors i socis per codesenvolupar.",
      "Desenvolupament d’una primera versió completa del producte.",
      "Tests amb escoles i iteració intensiva.",
      "Presentació de Physics Stars a potencials clients i centres educatius.",
    ],
  },
  {
    phase: "Fase 4: Implementació, creixement i expansió",
    status: "Properament",
    progress: 0,
    items: [
      "Integració a les primeres escoles i inici de facturació.",
      "Feedback loop: millora constant basada en dades extretes de l’aplicació i valoracions del professorat.",
      "Escalat progressiu i expansió a més centres i territoris.",
    ],
  },
];

const teamData = [
  {
    name: "David Diestre",
    role: "Cofundador & Visionari",
    img: "/david.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/david",
      email: "mailto:david@physicsstars.com",
      instagram: "https://instagram.com/david",
    },
  },
  {
    name: "Juan Roset",
    role: "Cofundador & Estratègia",
    img: "/juan.png",
    socials: {
      linkedin: "https://linkedin.com/in/juan",
      email: "mailto:juan@physicsstars.com",
      instagram: null,
    },
  },
  {
    name: "Marcel Povill",
    role: "Dev Principal & Arquitecte",
    img: "/marcel_pov.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/marcel",
      email: "mailto:marcel@physicsstars.com",
      instagram: "https://instagram.com/marcel",
    },
  },
  {
    name: "Aissam Khadraoui",
    role: "Mestre de l'Art (UX/UI)",
    img: "/aissam.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/aissam",
      email: "mailto:aissam@physicsstars.com",
      instagram: "https://instagram.com/aissam",
    },
  },
];

export default function PhysicsStarsLanding() {
  const handleDispatch = async (
    _currentState: unknown,
    formData: FormData,
  ): Promise<Result<null>> => {
    return await sendContactForm(formData);
  };

  const [state, dispatch, pending] = useActionState(handleDispatch, undefined);
  const [activeSection, setActiveSection] = useState("hero"); // Estat inicial per evitar flash

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // Detecta quan la secció creua el centre de la pantalla
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="bg-midnight text-parchment font-body selection:bg-primary selection:text-wood-dark h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        
        {/* --- NAVBAR --- */}
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

            <div className="hidden md:flex items-center gap-8 bg-black/40 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10">
              {["guild-hall", "notice-board", "roadmap", "team"].map((id) => (
                <a
                  key={id}
                  className={`transition-all duration-300 text-sm font-medium ${
                    activeSection === id
                      ? "text-primary drop-shadow-glow scale-110 font-bold"
                      : "text-parchment/80 hover:text-primary hover:drop-shadow-sm"
                  }`}
                  href={`#${id}`}
                >
                  {id === "guild-hall" ? "Missió" :
                   id === "notice-board" ? "Diferenciació" :
                   id === "roadmap" ? "Roadmap" : "Equip"}
                </a>
              ))}
            </div>

            <Link href={"/login"} className="hidden md:flex cursor-pointer group relative items-center gap-3 px-6 py-2.5 rounded-sm overflow-hidden transition-all duration-300 bg-black/40 hover:bg-wood-medium border border-white/10 hover:border-primary shadow-sm hover:shadow-glow">
              <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
              <MdVpnKey className="text-wood-light group-hover:text-primary transition-all duration-300 w-3 h-3 rotate-45 group-hover:rotate-0 transform" />
              <span className="font-display font-bold text-xs tracking-[0.15em] uppercase text-parchment group-hover:text-white transition-colors duration-300">
                Accés
              </span>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-primary transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-primary transition-colors"></div>
            </Link>
          </div>
        </nav>

        {/* --- HERO SECTION --- */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 snap-start"
        >
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-60"
              style={{ backgroundImage: "url('/bg.png')" }}
            ></div>
            <div className="absolute inset-0 bg-linear-to-b from-midnight/30 via-midnight/60 to-midnight"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
          </div>

          <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center gap-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lantern-glow rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                Pensa com un{" "}
                <span className="text-gradient-gold drop-shadow-glow">
                  Científic
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-parchment/90 max-w-2xl mx-auto font-medium drop-shadow-md">
                Transforma l&apos;ensenyament en una aventura interactiva per a
                l&apos;aprenentatge de la física.
              </p>
            </motion.div>

            {/* Hanging Sign CTA */}
            <div className="hanging-sign mt-12 relative group cursor-pointer animate-wiggle">

              <Link
                href={"/login"}
                className="relative block bg-wood-medium border-[6px] border-wood-dark rounded-xl px-12 py-7 shadow-deep transform transition-all hover:scale-105 active:scale-95 group"
              >
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_40px,rgba(0,0,0,0.2)_45px)] pointer-events-none"></div>
                <div className="flex flex-col items-center relative z-10">
                  <p className="font-display text-2xl md:text-3xl font-black text-primary tracking-widest uppercase drop-shadow-[0_3px_2px_rgba(0,0,0,1)] group-hover:text-amber-300 transition-colors">
                    Comença l&apos;Aventura
                  </p>
                  <div className="w-full h-px bg-linear-to-r from-transparent via-primary/30 to-transparent my-1"></div>
                  <span className="text-parchment/70 text-sm font-serif italic tracking-wide">
                    Accés Gratuït per a Aprenents
                  </span>
                </div>
                {/* Claus */}
                <div className="rpg-nail top-3 left-3"></div>
                <div className="rpg-nail top-3 right-3"></div>
                <div className="rpg-nail bottom-3 left-3"></div>
                <div className="rpg-nail bottom-3 right-3"></div>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
              <FaCompass className="w-5 h-5 text-primary" />
              <span className="text-sm text-parchment/80">
                Fes scroll per conèixer Physics Stars
              </span>
            </div>
          </div>
        </section>

        {/* --- MISSION SECTION (GUILD HALL) --- */}
        <section
          className="relative h-[900px] flex flex-col justify-start items-center overflow-hidden snap-start pt-18"
          id="guild-hall"
          style={{
            backgroundColor: "var(--color-midnight)",
            backgroundImage: "radial-gradient(circle at center, #1a2333 0%, #0a0e17 70%)",
          }}
        >
          <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
            <div className="text-center mb-4 shrink-0">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative inline-block z-10 mb-6">
                  <div className="rpg-panel-wood px-12 py-5">
                    <div className="wood-grain-overlay"></div>
                    <h2 className="font-display text-3xl md:text-5xl font-black text-parchment tracking-[0.15em] uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,1)] text-center">
                      La nostra <span className="text-primary">Missió</span>
                    </h2>
                    <div className="rpg-nail top-2 left-2"></div>
                    <div className="rpg-nail top-2 right-2"></div>
                    <div className="rpg-nail bottom-2 left-2"></div>
                    <div className="rpg-nail bottom-2 right-2"></div>
                  </div>
                </div>
                <p className="text-parchment/80 max-w-2xl mx-auto font-serif italic text-lg leading-relaxed drop-shadow-md">
                  Acosta&apos;t a la taula, iniciat. Aquí tens els tres pilars del nostre coneixement.
                </p>
              </motion.div>
            </div>

            {/* Scroll Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto w-full perspective-1000 items-start">
              {missionData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="group relative px-4 w-full flex flex-col items-center"
                >
                  {/* Top Spindle */}
                  <div className="relative w-full h-12 z-30 flex items-center justify-center drop-shadow-xl">
                    <div className="absolute inset-x-4 h-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.6)]"></div>
                    <div className="w-full relative flex items-center justify-between px-1">
                      <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-l-md shadow-md border-r-2 border-black/30">
                        <div className="absolute right-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-inner border-l border-white/5"></div>
                      </div>
                      <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-r-md shadow-md border-l-2 border-black/30">
                        <div className="absolute left-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-inner border-r border-white/5"></div>
                      </div>
                    </div>
                  </div>

                  {/* Scroll Body */}
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 420 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 + 0.3 }}
                    className="rpg-paper overflow-hidden w-[85%] border-x border-[#d7ccc8] z-20 -mt-6"
                  >
                    <div className="paper-texture-overlay"></div>
                    <div className="absolute inset-0 shadow-[inset_0_0_80px_30px_rgba(62,39,35,0.6)] pointer-events-none z-10"></div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2 + 0.7, duration: 0.5 }}
                      className="relative px-6 pt-12 pb-4 flex flex-col items-center text-center z-20 h-full justify-start"
                    >
                      <div className="relative mb-5 shrink-0">
                        <div className="absolute inset-0 bg-amber-500/20 blur-xl rounded-full scale-75 group-hover:scale-125 transition-transform duration-700"></div>
                        <div className="size-20 rounded-full flex items-center justify-center border-2 border-dashed border-[#5d4037]/60 bg-[#5d4037]/5 shadow-inner">
                          <div className="size-16 rounded-full border border-[#5d4037]/20 flex items-center justify-center">
                            <item.icon strokeWidth={1.5} className="w-8 h-8 text-wood-dark drop-shadow-sm group-hover:scale-110 transition-transform" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-display text-2xl text-wood-dark font-bold mb-3 tracking-wide drop-shadow-sm uppercase border-b-2 border-wood-dark/30 pb-3 w-full shrink-0">
                        {item.title}
                      </h3>
                      <p className="text-wood-dark font-serif text-lg leading-relaxed italic font-medium px-2 opacity-90">
                        &quot;{item.desc}&quot;
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Bottom Spindle */}
                  <div className="relative w-full h-12 z-30 flex items-center justify-center -mt-4 drop-shadow-xl">
                    <div className="absolute inset-x-4 h-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-full shadow-[0_2px_5px_rgba(0,0,0,0.6)]"></div>
                    <div className="w-full relative flex items-center justify-between px-1">
                      <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-l-md shadow-md border-r-2 border-black/30">
                        <div className="absolute right-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-inner border-l border-white/5"></div>
                      </div>
                      <div className="relative h-10 w-5 bg-linear-to-b from-[#2d1b18] via-[#5d4037] to-[#2d1b18] rounded-r-md shadow-md border-l-2 border-black/30">
                        <div className="absolute left-0 inset-y-0 w-1.5 bg-[#1a100e] shadow-inner border-r border-white/5"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DIFFERENTIATION (NOTICE BOARD) --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center pt-14 pb-32 bg-midnight border-y border-white/5 snap-start"
          id="notice-board"
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="relative mt-12">
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-20">
                <div className="relative bg-[#2e1c16] px-10 py-4 rounded-lg border-4 border-[#1a0f0d] shadow-[0_10px_20px_rgba(0,0,0,0.6)] flex flex-col items-center min-w-[300px]">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent)] pointer-events-none"></div>
                  <h2 className="font-display text-parchment font-black text-xl md:text-2xl uppercase tracking-[0.2em] text-shadow-sm text-center">
                    En què ens <span className="text-primary">Diferenciem</span>?
                  </h2>
                  <div className="flex flex-col text-sm text-parchment/60 mt-2 leading-tight">
                    <p>Per què les metodologies tradicionals fallen...</p>
                    <p className="text-center">i què fem nosaltres diferent?</p>
                  </div>
                  <div className="rpg-nail top-2 left-2"></div>
                  <div className="rpg-nail top-2 right-2"></div>
                  <div className="rpg-nail bottom-2 left-2"></div>
                  <div className="rpg-nail bottom-2 right-2"></div>
                </div>
              </div>

              {/* The Cork Board */}
              <div className="relative bg-[#af8e68] rounded-xl shadow-2xl overflow-hidden border-16 md:border-24 border-wood-dark">
                <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('/cork.png')", backgroundSize: "200px" }}></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(62,39,35,0.4)_100%)] pointer-events-none"></div>
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(26,16,14,0.7)] pointer-events-none z-0"></div>

                <div className="relative z-10 flex flex-wrap justify-center items-stretch gap-8 pt-24 pb-16 px-6 md:px-12 min-h-[500px]">
                  {featuresData.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? 1.5 : -2 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 80 }}
                      className="relative w-full md:w-[45%] lg:w-[22%] group"
                    >
                      <div className="h-full w-full bg-[#fdfbf7] text-wood-dark p-4 rounded-sm shadow-[2px_5px_15px_rgba(0,0,0,0.3)] border border-[#d7ccc8] relative flex flex-col transform transition-transform duration-300 hover:scale-105 hover:z-30 hover:shadow-[10px_20px_30px_rgba(0,0,0,0.4)]">
                        {/* Pin */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 drop-shadow-sm">
                          <div className="size-4 bg-[#b71c1c] rounded-full shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)] border border-[#7f0000] relative">
                            <div className="absolute top-1 left-1 size-1.5 bg-white rounded-full opacity-40"></div>
                          </div>
                          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-black/20"></div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 size-24 bg-[#a1887f] opacity-10 blur-xl rounded-full pointer-events-none"></div>

                        <div className="mb-2 flex justify-center relative z-10">
                          <div className="p-3 rounded-full border-2 border-[#5d4037]/20 bg-[#efebe9]">
                            <span className="material-symbols-outlined text-4xl text-wood-light drop-shadow-sm">
                              {feature.icon}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-display font-bold text-xl mb-3 text-wood-dark text-center leading-tight uppercase tracking-wide border-b-2 border-wood-dark/10 pb-2">
                          {feature.title}
                        </h3>

                        <div className="grow flex flex-col gap-4 relative z-10">
                          <div className="font-serif italic text-sm text-[#5d4037] text-center leading-relaxed">
                            {feature.desc}
                          </div>
                          {feature.list && (
                            <ul className="space-y-2 mt-2 bg-[#efebe9]/60 p-3 rounded-md border border-[#d7ccc8] text-left">
                              {feature.list.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs font-bold text-wood-medium">
                                  <FaFeather className="mt-1 shrink-0" />
                                  <span className="leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ROADMAP --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center py-24 bg-[#0F1218] overflow-hidden snap-start"
          id="roadmap"
        >
          <div className="absolute inset-0 bg-cover bg-bottom bg-repeat-y opacity-30" style={{ backgroundImage: "url('/forest2.png')", filter: "blur(2px)" }}></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="font-display text-4xl text-center text-parchment font-bold mb-16 drop-shadow-md">
              La Jornada per Endavant
            </h2>

            <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 flex justify-between items-center">
                <div className="w-2 h-full bg-[#5d5d5d] border-x border-[#1a1a1a] z-10"></div>
                <div className="w-2 h-full bg-[#5d5d5d] border-x border-[#1a1a1a] z-10"></div>
                <div className="absolute inset-0 h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,#784f48_8px,#784f48_12px)] w-14 -left-1 z-0"></div>
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
                    className={`flex flex-col md:flex-row items-center justify-between mb-24 relative ${!isCompleted && !isInProgress ? "opacity-50" : ""}`}
                  >
                    <div className={`md:w-[45%] mb-4 md:mb-0 ${isLeft ? "md:text-left pr-8 order-2 md:order-1" : "pl-8 order-3 md:order-3"}`}>
                      <div className={`inline-block bg-[#1a1a1a] p-6 rounded-lg border text-left ${isInProgress ? "border-primary shadow-[0_0_15px_rgba(255,170,0,0.1)]" : "border-white/10"}`}>
                        <h3 className={`${isInProgress ? "text-primary" : "text-parchment"} font-display font-bold text-xl mb-3 ${isLeft ? "md:text-left" : ""}`}>
                          {item.phase}
                        </h3>
                        <ul className={`space-y-2 ${isLeft ? "md:text-left" : ""}`}>
                          {item.items.map((subItem, idx) => (
                            <li key={idx} className="flex items-start text-gray-400 text-sm leading-snug">
                              <span className="mr-2 text-primary/50 shrink-0">•</span>
                              <span>{subItem}</span>
                            </li>
                          ))}
                        </ul>
                        <div className={`mt-4 ${isLeft ? "md:text-right" : ""}`}>
                          {isCompleted && (
                            <span className="inline-block text-xs text-green-500 font-bold border border-green-900 bg-green-900/20 px-2 py-1 rounded">
                              COMPLETAT
                            </span>
                          )}
                          {isInProgress && (
                            <div className="flex flex-col gap-1 items-end">
                              <span className="inline-block text-xs text-amber-500 font-bold">
                                EN CURS ({item.progress}%)
                              </span>
                              <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden mt-1">
                                <div className="h-full bg-primary" style={{ width: `${item.progress}%` }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-20 order-1">
                      {isInProgress ? (
                        <div className="relative">
                          <div className="absolute top-1/2 left-1/2 w-[200px] h-[100px] -translate-y-1/2 bg-linear-to-r from-primary/40 to-transparent blur-xl rounded-full pointer-events-none"></div>
                          <div className="size-16 bg-black rounded-full border-4 border-primary flex items-center justify-center shadow-glow-strong">
                            <IoMdTrain className="w-8 h-8 text-primary animate-pulse" />
                          </div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold text-xs whitespace-nowrap animate-bounce">
                            SOM AQUÍ
                          </div>
                        </div>
                      ) : (
                        <div className={`size-6 rounded-full border-4 border-black ${isCompleted ? "bg-primary shadow-glow" : "bg-wood-dark"}`}></div>
                      )}
                    </div>
                    <div className={`md:w-[45%] ${isLeft ? "order-3 md:order-3" : "order-2 md:order-1"}`}></div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section
          className="min-h-screen flex flex-col justify-center pt-18 pb-32 relative snap-start overflow-hidden"
          id="team"
          style={{ backgroundColor: "#1c1917", backgroundImage: "url('https://www.transparenttextures.com/patterns/dark-matter.png')" }}
        >
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 blur-[150px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center mb-20">
              <h2 className="font-display text-4xl md:text-5xl text-center text-[#eaddcf] font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] tracking-wide uppercase border-b-2 border-[#5d4037] pb-2 px-10">
                Coneix els Mestres del Gremi
              </h2>
              <p className="mt-4 text-[#a1887f] font-serif italic text-lg max-w-2xl text-center">
                Estudiants d’Enginyeria Matemàtica i Física i d’Enginyeria Informàtica de la URV, units per un mateix objectiu.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-12 max-w-7xl mx-auto px-4">
              {teamData.map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6, ease: "easeOut" }}
                  className="relative group flex flex-col items-center"
                >
                  {/* Hanging Mechanism */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center z-0">
                    <div className="size-5 rounded-full bg-linear-to-br from-[#727271] to-[#d2d2d2] shadow-[0_5px_10px_rgba(0,0,0,1)] border border-[#d5d5d3] z-10 relative">
                      <div className="absolute top-1 left-1 size-1.5 bg-white rounded-full opacity-70"></div>
                    </div>
                    <div className="relative w-32 h-16 -mt-1.5">
                      <div className="absolute top-2 left-1/2 w-0.5 h-[65px] bg-[#d7ccc8] origin-top -rotate-24 -translate-x-1/2 shadow-lg opacity-90"></div>
                      <div className="absolute top-2 left-1/2 w-0.5 h-[65px] bg-[#d7ccc8] origin-top rotate-24 -translate-x-1/2 shadow-lg opacity-90"></div>
                    </div>
                  </div>

                  {/* Frame */}
                  <div className="relative z-10 w-full aspect-3/4 bg-[#0a0505] rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)] group-hover:scale-[1.02] group-hover:rotate-1 transition-all duration-500 ease-in-out origin-top cursor-default">
                    <div className="absolute inset-0 border-16 border-wood-dark rounded-sm shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                      <div className="absolute inset-0 border-16 border-transparent opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.5)_12px)] pointer-events-none"></div>
                    </div>
                    <div className="absolute inset-4 border-4 border-[#b8860b] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"></div>
                    <div className="absolute inset-5 overflow-hidden bg-[#1c1917]">
                      {!member.img || member.img.includes("emoji") ? (
                        <div className="w-full h-full flex items-center justify-center bg-[#2d1b18] text-[#5d4037]">
                          <span className="material-symbols-outlined text-8xl opacity-20">person</span>
                        </div>
                      ) : (
                        <Image src={member.img} alt={member.name} fill className="object-cover filter sepia-[0.3] contrast-125 group-hover:sepia-0 transition-all duration-700" />
                      )}
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/canvas-orange.png')]"></div>
                      <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] pointer-events-none"></div>
                    </div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 translate-y-1/2 z-20 w-[85%]">
                      <div className="relative bg-linear-to-b from-[#eecfa1] via-[#c0965c] to-[#8b6914] p-0.5 rounded shadow-lg border border-wood-dark">
                        <div className="absolute top-1 left-1 size-1 bg-wood-dark rounded-full opacity-60"></div>
                        <div className="absolute top-1 right-1 size-1 bg-wood-dark rounded-full opacity-60"></div>
                        <div className="absolute bottom-1 left-1 size-1 bg-wood-dark rounded-full opacity-60"></div>
                        <div className="absolute bottom-1 right-1 size-1 bg-wood-dark rounded-full opacity-60"></div>
                        <div className="bg-[#1a0f0d] py-2 px-1 text-center border border-[#8b6914]/50">
                          <h3 className="font-display text-[#eaddcf] font-bold text-lg uppercase tracking-wider leading-none">{member.name}</h3>
                          <p className="font-serif text-[#b8860b] text-xs italic mt-1">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Socials */}
                  <div className="flex gap-3 mt-6 justify-center transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/icon relative size-10 rounded-full bg-linear-to-br from-wood-metext-wood-medium to-[#2d1b18] border border-wood-light shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform"
                      >
                        <FaLinkedin className="text-[#eaddcf] w-5 h-5 group-hover/icon:text-primary transition-colors" />
                        <span className="absolute -bottom-8 text-[10px] text-parchment opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-0.5 rounded">
                          LinkedIn
                        </span>
                      </a>
                    )}
                    {member.socials.email && (
                      <a
                        href={member.socials.email}
                        className="group/icon relative size-10 rounded-full bg-linear-to-br from-wood-metext-wood-medium to-[#2d1b18] border border-wood-light shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform"
                      >
                        <SiGmail className="text-[#eaddcf] w-5 h-5 group-hover/icon:text-primary transition-colors" />
                        <span className="absolute -bottom-8 text-[10px] text-parchment opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-0.5 rounded">
                          Correu Electrònic
                        </span>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/icon relative size-10 rounded-full bg-linear-to-br from-wood-metext-wood-medium to-[#2d1b18] border border-wood-light shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform"
                      >
                        <FaInstagram className="text-[#eaddcf] w-5 h-5 group-hover/icon:text-primary transition-colors" />
                        <span className="absolute -bottom-8 text-[10px] text-parchment opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap bg-black/80 px-2 py-0.5 rounded">
                          Instagram
                        </span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <section
          className="relative min-h-screen flex flex-col justify-center items-center pt-18 pb-32 bg-midnight overflow-hidden snap-start"
          id="contact"
        >
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-5xl px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="rpg-paper p-8 md:p-12 rounded-sm shadow-[0_0_60px_rgba(0,0,0,0.8)] relative border-4 border-double border-wood-light"
            >
              <div className="absolute top-4 right-4 opacity-60 rotate-12 pointer-events-none hidden md:block">
                <div className="size-24 border-4 border-red-900/40 rounded-full flex items-center justify-center">
                  <MdVerified className="w-12 h-12 text-red-900/60" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
                {/* Info Column */}
                <div className="md:col-span-5 flex flex-col justify-start space-y-8 md:border-r-2 md:border-wood-light/30 md:pr-10">
                  <div>
                    <div className="inline-flex items-center gap-2 mb-2 text-wood">
                      <span className="h-px w-8 bg-wood"></span>
                      <span className="text-xs font-bold uppercase tracking-widest">Informació</span>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl text-wood-dark font-black drop-shadow-sm mb-4">Contacte</h2>
                    <p className="text-wood font-serif italic">Pots trobar-nos a la nostra base d&apos;operacions o enviar-nos un missatge.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <MdCastle className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-dark text-lg">Base d&apos;Operacions</h4>
                        <p className="text-wood font-serif text-sm leading-snug">Campus Sescelades,<br />Tarragona, Catalunya</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <MdMarkEmailUnread className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-dark text-lg">Correu Electrònic</h4>
                        <a href="mailto:info@physicsstars.com" className="text-wood font-serif text-sm hover:text-primary transition-colors block mt-1">info@physicsstars.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="size-12 rounded-lg bg-wood-dark text-parchment flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                        <FaLinkedin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-wood-dark text-lg">Xarxa Professional</h4>
                        <a href="https://www.linkedin.com/company/physics-stars/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-wood font-bold text-xs uppercase tracking-wider mt-1 hover:text-[#0077b5] transition-colors border-b border-wood/30 hover:border-[#0077b5]">
                          Connecta a LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Column */}
                <div className="md:col-span-7">
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 mb-2 text-wood">
                      <span className="h-px w-8 bg-wood"></span>
                      <span className="text-xs font-bold uppercase tracking-widest">Missatgeria</span>
                    </div>
                    <h3 className="font-display text-3xl text-wood-dark font-black">Envia un Missatge</h3>
                    <p className="text-wood mt-2 font-serif italic text-sm">Tens una proposta o dubte? Els nostres escribes et respondran ràpidament.</p>
                  </div>

                  <form action={dispatch} className="space-y-5">
                    {state && !state.success && (
                      <div className="p-3 bg-red-100 border-l-4 border-red-800 text-red-900 text-xs font-serif font-bold shadow-sm">⚠️ {state.error}</div>
                    )}
                    {state && state.success && (
                      <div className="p-3 bg-green-100 border-l-4 border-green-800 text-green-900 text-xs font-serif font-bold shadow-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">check_circle</span> Corb enviat correctament!
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">El teu nom complet</label>
                      <input name="name" className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md" placeholder="Com et vols donar a conèixer?" type="text" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">La teva adreça electrònica</label>
                      <input name="email" className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md" placeholder="on.t@escrivim.com" type="email" />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-wood-dark font-display font-bold text-sm">Missatge</label>
                      <textarea name="message" className="w-full bg-black/5 border-2 border-wood-light/30 px-4 py-2 text-wood-dark font-serif text-base placeholder-wood-light/60 focus:outline-none focus:border-wood-dark focus:bg-white/40 transition-all rounded-md resize-none" placeholder="Explica'ns què tens al cap..." rows={3}></textarea>
                    </div>

                    <div className="pt-6 pb-2">
                      <div className="relative group isolate">
                        <button type="submit" disabled={pending} className="rpg-btn-primary w-full">
                          <div className="rpg-btn-content">
                            <span className="rpg-btn-text text-sm md:text-base">{pending ? "Enviant..." : "Signar i Enviar"}</span>
                            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                          </div>
                        </button>
                        {/* Wax Seal SVG */}
                        <div className="absolute -right-6 -bottom-4 z-30 size-24 pointer-events-none transition-all duration-500 ease-in-out filter drop-shadow-lg">
                          <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <filter id="wax-filter" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                                <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffaaaa" result="specularOut">
                                  <fePointLight x="-500" y="-1000" z="800" />
                                </feSpecularLighting>
                                <feComposite in="specularOut" in2="SourceAlpha" operator="in" result="specularComposite" />
                                <feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="specularComposite" /></feMerge>
                              </filter>
                              <filter id="inner-shadow">
                                <feOffset dx="1" dy="2" />
                                <feGaussianBlur stdDeviation="2" result="offset-blur" />
                                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                                <feFlood floodColor="black" floodOpacity="0.6" result="color" />
                                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
                              </filter>
                            </defs>
                            <path fill="#8a1c1c" stroke="#5c1212" strokeWidth="1" filter="url(#wax-filter)" d="M50 5 C 60 2, 70 8, 78 15 C 88 22, 95 35, 93 48 C 91 60, 85 70, 75 80 C 65 90, 50 95, 35 90 C 22 85, 10 75, 7 60 C 4 45, 10 30, 20 20 C 30 10, 40 8, 50 5 Z" />
                            <circle cx="50" cy="50" r="28" fill="#7f1d1d" filter="url(#inner-shadow)" stroke="#5c1212" strokeWidth="0.5" opacity="0.8" />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <IoIosMail className="w-9 h-9 text-red-300 opacity-90 drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="bg-black py-8 border-t border-white/10 text-center text-gray-500 text-sm snap-start">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Physics Stars. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="hover:text-primary" href="#">Termes del Servei</a>
              <a className="hover:text-primary" href="#">Política de Privacitat</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}