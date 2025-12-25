"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  Rocket,
  Atom,
  Search,
  Trophy,
  Mail,
  MapPin,
  Brain,
  Gamepad2,
  ChevronRight,
  AlertOctagon,
  BadgeCheck,
} from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import PublicHeader from "./components/PublicHeader";
import { sendContactForm } from "./actions/contact";
import { Result } from "./types";
import Image from "next/image";

// --- Variants d'Animació Tipades ---

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.35 },
  },
};

const floatAnimation: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const PhysicsStarsLanding = () => {
  const [dark, setDark] = useState<boolean>(false);

  // Solució error hidratació: Eliminem el targetRef per utilitzar el viewport per defecte
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const root = document.documentElement;
    const initialTheme = root.getAttribute("data-theme") as "light" | "dark";
    setDark(initialTheme === "dark");
  }, []);

  const handleDispatch = async (
    _currentState: unknown,
    formData: FormData
  ): Promise<Result<null>> => {
    return await sendContactForm(formData);
  };

  const [state, dispatch, pending] = useActionState(handleDispatch, undefined);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white overflow-hidden relative">
      {/* === Fons Atmosfèric Dinàmic === */}
      <div className="fixed inset-0 z-0 pointer-events-none starfield ">
        <div className="absolute -top-1/10 -left-1/10 w-[40vw] h-[40vw] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] -right-1/20 w-[30vw] h-[30vw] bg-cyan-600/10 rounded-full blur-[100px]" />
        {/* Correcció: w-[2px] -> w-0.5 */}
        <div className="absolute top-[40%] left-[20%] w-0.5 h-0.5 bg-white opacity-40 animate-pulse" />
        <div className="absolute top-[20%] right-[30%] w-1 h-1 bg-cyan-400 opacity-60 animate-pulse delay-700" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        <PublicHeader setDark={setDark} />

        {/* === Hero Section === */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 z-0 opacity-20">
            <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          </motion.div>

          <div className="relative z-20 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              {/* <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6"
              >
                <Sparkles size={14} />
                <span>Nova Beta disponible per a escoles</span>
              </motion.div> */}

              <motion.h1
                variants={fadeInUp}
                className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white"
              >
                Pensa com un <br />
                {/* Correcció: bg-gradient-to-r -> bg-linear-to-r */}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500">
                  Científic.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-slate-400 mb-8 max-w-xl leading-relaxed"
              >
                Transforma l&apos;ensenyament en una aventura interactiva per a
                l&apos;aprenentatge de la física.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl font-bold text-white shadow-lg shadow-cyan-900/20 hover:shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Veure Demo{" "}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                {/* <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all">
                  Veure Demo
                </button> */}
              </motion.div>
            </motion.div>

            {/* Element visual interactiu */}
            <motion.div
              variants={floatAnimation}
              animate="animate"
              className="hidden lg:flex justify-center relative"
            >
              <div className="relative w-[500px] h-[500px]">
                <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-10 border border-purple-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64 bg-linear-to-br from-indigo-900 to-slate-900 rounded-3xl rotate-3 shadow-2xl flex items-center justify-center border border-white/10 backdrop-blur-xl">
                    {dark ? (
                      <Image
                        src="/logo_white.svg"
                        alt="Physics Stars"
                        width={180}
                        height={180}
                        className="drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                      />
                    ) : (
                      <Image
                        src="/logo_white.svg"
                        alt="Physics Stars"
                        width={180}
                        height={180}
                      />
                    )}
                  </div>
                </div>

                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-10 right-10 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl"
                >
                  <Atom className="text-cyan-400 w-8 h-8" />
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute bottom-20 left-0 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl"
                >
                  <Brain className="text-purple-400 w-8 h-8" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === Mission/About === */}
        <section id="about" className="py-24 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  La nostra <span className="text-cyan-400">Missió</span>{" "}
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                  Transformem la teoria abstracta en reptes tangibles.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Search,
                    title: "Investigació Activa",
                    desc: "No memoritzis fórmules. Utilitza-les per descobrir pistes i avançar en la trama.",
                    color: "text-blue-400",
                    bg: "bg-blue-400/10",
                  },
                  {
                    icon: Gamepad2,
                    title: "Gamificació Real",
                    desc: "Sistema de progressió, rangs científics i recompenses que tenen sentit.",
                    color: "text-purple-400",
                    bg: "bg-purple-400/10",
                  },
                  {
                    icon: Trophy,
                    title: "Resultats Tangibles",
                    desc: "Millora la intuïció física i les notes mitjançant la pràctica contextualitzada.",
                    color: "text-amber-400",
                    bg: "bg-amber-400/10",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="group relative p-8 rounded-2xl bg-slate-800/40 border border-slate-700 hover:border-cyan-500/50 backdrop-blur-sm transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl ${item.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* === Features === */}
        <section id="features" className="py-28 px-6 bg-slate-900/50">
          <div className="max-w-6xl mx-auto space-y-60">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp} className="order-2 md:order-1">
                <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                  <Image
                    src="/ghost-train.png" // Canvia això pel nom del teu fitxer real
                    alt="Simulació de física en joc"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-indigo-200/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-indigo-200/30 rounded-bl-xl"></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">
                  Més enllà del software educatiu
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  A Physics Stars, l&apos;ús de la física no s&apos;imposa de
                  forma artificial. Els estudiants s&apos;enfronten a problemes
                  versemblants dins d&apos;una trama atractiva on{" "}
                  <strong className="text-cyan-400">
                    la física és la solució real.
                  </strong>
                </p>
                <ul className="space-y-3">
                  {[
                    "Context immersiu",
                    "Narrativa guiada",
                    "Llibertat d'exploració",
                  ].map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl font-bold mb-4">
                  La física és pensament crític
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  La Física no ha de consistir en memoritzar i aplicar fòrmules,
                  a Physics Stars{" "}
                  <strong className="text-cyan-400">
                    els alumnes construeixen el seu propi enunciat
                  </strong>{" "}
                  interactuant amb un entorn immersiu.
                </p>
              </motion.div>
              <motion.div variants={fadeInUp} className="order-2 md:order-1">
                <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                  <Image
                    src="/immersive3.png" // Canvia això pel nom del teu fitxer real
                    alt="Simulació de física en joc"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-indigo-200/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-indigo-200/30 rounded-bl-xl"></div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp} className="order-2 md:order-1">
                <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                  <Image
                    src="/rewards2.png" // Canvia això pel nom del teu fitxer real
                    alt="Simulació de física en joc"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-indigo-200/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-indigo-200/30 rounded-bl-xl"></div>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="order-1 md:order-2">
                <h3 className="text-3xl font-bold mb-4">
                  Motivant per l&apos;alumnat
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  Physics Stars aconsegueix allò en què moltes solucions basades
                  en la gamificació fallen: mantenir la motivació i estimular el
                  pensament crític d’estudiants de tots els nivells, sense
                  frustrar els que van més endarrerits ni resultar poc
                  estimulant per als més avançats. <br />
                  Com? <br />
                  Guanya insígnies, desbloqueja recompenses i segueix el teu
                  progrés en un camí d&apos;aprenentatge gamificat. Cada èxit et
                  motiva a continuar explorant.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h3 className="text-3xl font-bold mb-4">
                  Pensat pel Professorat
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  No pretenem reinventar l’ensenyament. Physics Stars actua com
                  un complement als deures, fàcil d’integrar i pensat per
                  enriquir l’aprenentatge.
                </p>
                <ul className="space-y-3">
                  {[
                    "Coherent amb el currículum educatiu",
                    "Interfície intuïtiva",
                    "Seguiment i informes automàtics",
                  ].map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-300"
                    >
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div variants={fadeInUp} className="order-2 md:order-1">
                <div className="w-full aspect-video rounded-2xl bg-linear-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center relative overflow-hidden group">
                  <Image
                    src="/professors2.png" // Canvia això pel nom del teu fitxer real
                    alt="Simulació de física en joc"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 w-24 h-24 border-t-2 border-r-2 border-indigo-200/30 rounded-tr-xl"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border-b-2 border-l-2 border-indigo-200/30 rounded-bl-xl"></div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* === Roadmap === */}
        <section className="py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.h2
                variants={fadeInUp}
                className="text-4xl font-bold text-center mb-16"
              >
                Roadmap de{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-400">
                  Desenvolupament
                </span>
              </motion.h2>

              <div className="space-y-6">
                {[
                  {
                    phase: "Fase 1: Fonaments",
                    status: "Completat",
                    progress: 100,
                    color: "bg-green-500",
                  },
                  {
                    phase: "Fase 2: Llançament Beta",
                    status: "En curs",
                    progress: 65,
                    color: "bg-cyan-500",
                  },
                  {
                    phase: "Fase 3: Escala",
                    status: "Properament",
                    progress: 20,
                    color: "bg-indigo-500",
                  },
                  {
                    phase: "Fase 4: Global",
                    status: "Planificat",
                    progress: 0,
                    color: "bg-slate-600",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeInUp}
                    className="relative pl-8 md:pl-0"
                  >
                    <div className="group bg-slate-900/80 border border-slate-700 p-6 rounded-xl hover:border-cyan-500/30 transition-colors">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {item.phase}
                          </h3>
                          <span
                            className={`text-xs uppercase tracking-wider font-semibold ${
                              item.progress === 100
                                ? "text-green-400"
                                : "text-cyan-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-2xl font-mono font-bold text-slate-500 group-hover:text-white transition-colors">
                          {item.progress}%
                        </div>
                      </div>

                      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          transition={{ duration: 1.5, ease: "circOut" }}
                          className={`h-full ${item.color} shadow-[0_0_10px_currentColor]`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* === Team === */}
        <section id="team" className="py-24 px-6 bg-slate-900/30">
          <div className="max-w-6xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Coneix el nostre <span className="text-cyan-400">Equip</span>
            </motion.h2>
            <p className="text-slate-400 mb-16 leading-relaxed">
              Educadors, desenvolupadors i dissenyadors apassionats units per un
              mateix objectiu
            </p>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  name: "David Diestre",
                  role: "Comandant de Relacions",
                  img: "👨‍💼",
                },
                { name: "Juan Roset", role: "Oficial Legal", img: "⚖️" },
                { name: "Marcel Povill", role: "Enginyer en Cap", img: "👨‍💻" },
                {
                  name: "Aissam Khadraoui",
                  role: "Arquitecte Visual",
                  img: "🎨",
                },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-24 h-24 mb-4 relative">
                    <div className="absolute inset-0 bg-linear-to-tr from-cyan-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative w-full h-full bg-slate-800 rounded-full flex items-center justify-center text-4xl border-2 border-slate-600 z-10">
                      {member.img}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {member.name}
                  </h3>
                  <p className="text-cyan-400 text-sm font-bold">
                    {member.role}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* === Contact === */}
        <section id="contact" className="py-24 px-6 relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="bg-slate-800/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-purple-500 to-cyan-500" />
              <div className="w-full">
                <h2 className="text-3xl font-bold mb-6">
                  Et pica la Curiositat?
                </h2>
                <p className="text-slate-400 mb-8">
                  Tens una proposta o idea?
                  <br />
                  Ets membre d&apos;una entitat educativa i t&apos;agradaria
                  saber-ne més?
                  <br />
                  Estàs interessat/ada a col·laborar amb nosaltres?
                  <span className="block mt-4 font-semibold">
                    Si la resposta a alguna d&apos;aquestes preguntes és sí,
                    contacta&apos;ns!
                  </span>
                </p>
              </div>
              <h2 className="text-3xl font-bold mb-6">Contacte</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">
                          Email
                        </p>
                        <p className="text-white">info@physicsstars.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold">
                          Ubicació
                        </p>
                        <p className="text-white">Catalunya, Espanya</p>
                      </div>
                    </div>
                  </div>
                </div>

                <form action={dispatch} className="space-y-4">
                  {state && state.success && (
                    <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-green-800 text-green-200 rounded text-sm">
                      <BadgeCheck size={16} /> Missatge rebut correctament.
                    </div>
                  )}
                  {state && !state.success && (
                    <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-800 text-red-200 rounded text-sm">
                      <AlertOctagon size={16} /> Error en la tramesa:{" "}
                      {state.error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs  text-cyan-400 uppercase">
                      Nom identificatiu
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nom del comandant"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-cyan-400 uppercase">
                      Correu electrònic de contacte
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="correu@exemple.com"
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-all text-white placeholder:text-slate-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-cyan-400 uppercase">
                      Missatge
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Escriu el missatge..."
                      className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-all resize-none text-white placeholder:text-slate-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-linear-to-r from-cyan-600 to-blue-600 rounded-lg font-bold text-white shadow-lg hover:shadow-cyan-500/25 transition-all transform active:scale-[0.98]"
                  >
                    {pending ? "Enviant..." : "Enviar Missatge"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* === Footer === */}
        <footer className="border-t border-slate-800 bg-slate-900 py-12 text-center text-slate-500 text-sm">
          <p className="mb-4 flex items-center justify-center gap-2">
            <Rocket size={16} className="text-slate-600" />
            <span>Physics Stars © {new Date().getFullYear()}</span>
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacitat
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Termes
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Legal
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PhysicsStarsLanding;
