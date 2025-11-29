"use client";

import { motion } from 'framer-motion';
import {
  Rocket,
  Target,
  Zap,
  Users,
  Trophy,
  Mail,
  Phone,
  MapPin,
  Star,
  Brain,
  Gamepad2,
  Orbit,
} from 'lucide-react';
import { useActionState, useState } from 'react';
import PublicHeader from './components/PublicHeader';
import { sendContactForm } from './actions/contact';
import { Result } from './types';

import Image from 'next/image';


const PhysicsStarsLanding = () => {

  const [dark, setDark] = useState<boolean>(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDispatch = async (_currentState: unknown, formData: FormData): Promise<Result<null>> => {
    return await sendContactForm(formData);
  }

  const [state, dispatch, pending] = useActionState(handleDispatch, undefined);

  return (
    <div className="min-h-screen bg-main text-primary font-sans relative">
      <div className="starfield sun-rays sun-glow-landing flex flex-col h-full w-full items-center">
        {/* === Capçalera === */}

        <PublicHeader setDark={setDark} />
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className="inline-block mb-6"
              >
                {
                  dark ? (
                    <Image src="/logo_black.svg" alt="Logo" width={160} height={160} />
                  ) : (
                    <Image src="/logo_white.svg" alt="Logo" width={160} height={160} />
                  )
                }
                
              </div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                <span className="gradient-text ">Pensa com un científic</span>
              </h1>
              <p className="text-xl text-secondary mb-8 max-w-2xl mx-auto">
                Transforma l&apos;ensenyament en una aventura interactiva per a l&apos;aprenentatge de la
                física.
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  className="btn-primary text-lg px-8 py-3"
                >
                  Accedeix
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
                <span className="gradient-text">La nostra missió</span>
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Brain,
                    title: 'Aprenentatge interactiu',
                    desc: 'Aprendre conceptes resolent problemes pràctics i immersius',
                    color: "from-yellow-400 to-orange-500",
                  },
                  {
                    icon: Gamepad2,
                    title: 'Gamificació',
                    desc: "Fes que l'aprenentatge sigui divertit amb reptes i recompenses",
                    color: "from-purple-400 to-pink-500",
                  },
                  {
                    icon: Target,
                    title: 'Results reals',
                    desc: 'Millora la comprensió i el rendiment en física',
                    color: "from-green-400 to-cyan-500",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    className="card card-hover cursor-pointer p-8 text-center group "
                  >
                    <div className={`bg-linear-to-r ${item.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                    <p className="text-secondary">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-bw">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-6">
                En què ens <span className="gradient-text">Diferenciem</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-center text-secondary mb-16 text-lg"
              >
                Metodologia única d&apos;aprenentatge.
              </motion.p>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "Física = pensament crític",
                    desc: "La Física no ha de consistir en memoritzar i aplicar fòrmules, a Physics Stars els alumnes construeixen el seu propi enunciat interactuant amb un entorn immersiu.",
                    color: "from-yellow-400 to-orange-500",
                  },
                  {
                    icon: Brain,
                    title: "Aprenentatge adaptatiu amb IA",
                    desc: "El nostre sistema intel·ligent analitza el teu rendiment i estil d'aprenentatge per oferir-te reptes personalitzats que et mantenen en la zona òptima de desenvolupament.",
                    color: "from-purple-400 to-pink-500",
                  },
                  {
                    icon: Trophy,
                    title: "Sistema d'assoliments progressiu",
                    desc: "Guanya insígnies, desbloqueja nivells i segueix el teu progrés en un camí d'aprenentatge gamificat. Cada èxit et motiva a continuar explorant.",
                    color: "from-green-400 to-cyan-500",
                  },
                  {
                    icon: Users,
                    title: "Tenim en compte els professors",
                    desc: ["Integració fàcil de Physics Stars a l'aula.", "UI senzilla i fàcil d'utilitzar.", "Generació automàtica d'informes de progrés dels estudiants."],
                    color: "from-blue-400 to-indigo-500",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="card p-8 cursor-pointer group"
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">
                      {feature.title}
                    </h3>
                    <div className="text-secondary leading-relaxed flex flex-col">
                      {
                        feature.desc && Array.isArray(feature.desc) ? (
                          feature.desc.map((f,i) => 
                            <p key={i+ "item" + f}> - {f}</p>
                          )
                        ) : (
                          <p>{feature.desc}</p>
                        )
                      }
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Development Process */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-16">
                Roadmap de <span className="gradient-text">Desenvolupament</span>
              </motion.h2>

              <div className="space-y-8">
                {[
                  {
                    phase: 'Fase 1: Fonaments',
                    status: 'Completat',
                    progress: 100,
                    items: [
                      'Motor físic principal',
                      'Disseny UI/UX bàsic',
                      'Mecàniques de joc inicials',
                    ],
                  },
                  {
                    phase: 'Fase 2: Llançament beta',
                    status: 'En curs',
                    progress: 65,
                    items: [
                      'Més de 10 mòduls interactius',
                      "Sistema d'assoliments",
                      'Prova beta amb 500 estudiants',
                    ],
                  },
                  {
                    phase: 'Fase 3: Escala',
                    status: 'Properament',
                    progress: 20,
                    items: [
                      'Adaptivitat impulsada per IA',
                      "Llançament d'app mòbil",
                      'Col·laboració amb escoles',
                    ],
                  },
                  {
                    phase: 'Fase 4: Global',
                    status: 'Planificat',
                    progress: 0,
                    items: ['Suport multilingüe', 'Integració VR', 'Currículum internacional'],
                  },
                ].map((phase, i) => (
                  <motion.div key={i} variants={itemVariants} className="card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-primary">{phase.phase}</h3>
                        <p className="text-theme font-semibold">{phase.status}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-bold gradient-text">{phase.progress}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-[rgb(var(--color-surface))] rounded-full h-3 mb-4">
                      <motion.div
                        className="themed-gradient h-3 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${phase.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, j) => (
                        <li key={j} className="flex items-center gap-2 text-secondary">
                          <div className="w-1.5 h-1.5 bg-theme rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-24 px-6 bg-bw">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-6">
                Coneix el nostre <span className="gradient-text">Equip</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-center text-secondary mb-16 text-lg"
              >
                Educadors, desenvolupadors i dissenyadors apassionats units per un mateix objectiu
              </motion.p>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { name: 'David Diestre', role: 'Responsable de relacions', img: '👨‍💼' },
                  { name: 'Juan Roset', role: 'Responsable legal', img: '🐴​' },
                  { name: 'Marcel Povill', role: 'Desenvolupador principal', img: '👨‍💻' },
                  { name: 'Aissam Khadraoui', role: 'Dissenyador UX/UI', img: '🧑🏾‍🎨​' },
                ].map((member, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    className="card card-hover p-6 text-center"
                  >
                    <div className="text-6xl mb-4">{member.img}</div>
                    <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
                    <p className="text-theme text-sm">{member.role}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              <motion.h2 variants={itemVariants} className="text-5xl font-bold text-center mb-6">
                Uneix-te a la <span className="gradient-text">Revolució</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-center text-secondary mb-16 text-lg"
              >
                Interessat en col·laborar? Contacta&apos;ns!
              </motion.p>

              <motion.div variants={itemVariants} className="card p-8">
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="themed-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Correu electrònic</p>
                        <p className="font-semibold text-primary">UwU@physicsstars.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="themed-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Telèfon</p>
                        <p className="font-semibold text-primary">+34 666 69 69 69</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="themed-gradient w-12 h-12 rounded-lg flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-muted">Ubicació</p>
                        <p className="font-semibold text-primary">Machu Pichu, Perú</p>
                      </div>
                    </div>
                  </div>

                  <form action={dispatch} className="space-y-4">
                    {
                      state && !state.success && (
                        <div className="p-4 bg-red-500/20 text-red-700 rounded-md text-xs">
                          {state.error}
                        </div>
                      )
                    }
                    {
                      state && state.success && (
                        <div className="p-4 bg-green-500/20 text-green-700 rounded-md text-sm">
                          Missatge enviat correctament! Et respondrem aviat.
                        </div>
                      )
                    }
                    <input type="text" name="name" placeholder="El teu nom" className="input w-full" />
                    <input
                      type="email"
                      name="email"
                      placeholder="El teu correu electrònic"
                      className="input w-full"
                    />
                    <textarea
                      name="message"
                      placeholder="El teu missatge"
                      rows={4}
                      className="input w-full resize-none"
                    />
                    <button type="submit" className="btn-primary w-full py-3">
                      {
                        pending ? 'Enviant...' : 'Envia el teu missatge'
                      }
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="card py-12 px-6 w-full rounded-none">
          <div className="w-full text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 text-theme" fill="currentColor" />
              <span className="text-2xl font-bold gradient-text">Physics Stars</span>
            </div>
            <p className="text-[rgb(var(--color-text-muted))] mb-6">
              Fem que l&apos;ensenyament de la física sigui apassionant
            </p>
            <div className="flex justify-center gap-6 mb-6">
              <a href="#" className="text-theme hover:underline">
                Política de privacitat
              </a>
              <a href="#" className="text-theme hover:underline">
                Termes del servei
              </a>
              <a href="#" className="text-theme hover:underline">
                Avís legal
              </a>
            </div>
            <p className="text-[rgb(var(--color-text-muted))] text-sm">
              © {new Date().getFullYear()} Physics Stars. Tots els drets reservats.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PhysicsStarsLanding;
