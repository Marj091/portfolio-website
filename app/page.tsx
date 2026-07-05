"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Mail,
  ArrowUpRight,
  Clock,
  FileText,
  Wallet,
  UtensilsCrossed,
  ShieldCheck,
  Monitor,
  Coffee,
  Paintbrush,
  BrainCircuit,
  Play,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const heroChips = [
  "Adobe InDesign",
  "JavaScript",
  "Python",
  "Browserautomatisering",
  "ExtendScript",
];

type Media = { type: "image" | "video"; src: string; poster?: string };

const projects: {
  id: string;
  icon: typeof Clock;
  title: string;
  tags: string[];
  media: Media[];
  note?: string;
  body: string;
}[] = [
  {
    id: "urenregistratie",
    icon: Clock,
    title: "Urenregistratietool",
    tags: ["Offline dashboard", "Presets", "Teamoverzicht"],
    media: [
      { type: "video", src: "/projecten/urenregistratie.mp4", poster: "/projecten/urenregistratie.jpg" },
      { type: "video", src: "/projecten/urenregistratie-invoer.mp4", poster: "/projecten/urenregistratie-invoer-vid.jpg" },
      { type: "image", src: "/projecten/urenregistratie-invoer.jpg" },
    ],
    body: "Handmatige tijdregistratie in het team was foutgevoelig en kostte tijd. De leidinggevende moest alles zelf samenvoegen en uitrekenen om overzicht te krijgen. Ik bouwde een dashboard dat offline werkt, zonder installatie. Met presets voor vaste, terugkerende taken. Teamleden vullen met één druk op de knop hun uren in. De leidinggevende heeft nu één centraal dashboard met totaaloverzichten en grafieken. Het hele team gebruikt de tool inmiddels dagelijks.",
  },
  {
    id: "word-indesign",
    icon: FileText,
    title: "Word → InDesign tabelconverter",
    tags: ["Automatisering", "InDesign-scripting", "Documentherkenning"],
    media: [
      { type: "image", src: "/projecten/word-indesign.jpg" },
      { type: "image", src: "/projecten/word-indesign-2.jpg" },
    ],
    body: "Tabellen uit Word overzetten naar InDesign was tijdrovend handwerk. Zeker bij lange documenten met meerdere tabellen, zoals reglementen. Ik ontwikkelde een tool die Word-tabellen automatisch omzet naar kant-en-klare InDesign-scripts. Hij herkent daarbij het documenttype en de opmaakstijl. Getest en toegepast op grote, complexe reglementendocumenten met meerdere tabellen per bestand.",
  },
  {
    id: "financieel",
    icon: Wallet,
    title: "Financieel dashboard",
    tags: ["Dataverwerking", "Categorisatie", "Dashboard"],
    note: "Cijfers geblurd voor privacy",
    media: [{ type: "image", src: "/projecten/financieel.jpg" }],
    body: "Een bankapp geeft mij niet genoeg inzicht in mijn uitgaven en spaargedrag. Dus bouwde ik mijn eigen dashboard, dat een jaar aan transactiedata verwerkt. Het categoriseert uitgaven automatisch en maakt spaarpotjes bewerkbaar. Resultaat: beter overzicht en betere financiële beslissingen.",
  },
  {
    id: "maaltijden",
    icon: UtensilsCrossed,
    title: "Maaltijden selectietool",
    tags: ["Python", "Browserautomatisering", "Voorkeurscoring"],
    media: [{ type: "video", src: "/projecten/maaltijden.mp4", poster: "/projecten/maaltijden.jpg" }],
    body: "Elke week opnieuw maaltijden uitzoeken bij een online maaltijdservice kostte tijd. En het leverde niet altijd de beste match op. Ik bouwde een Python-tool die het hele proces automatiseert. Een script leest via browserautomatisering alle beschikbare maaltijden uit. Een eigen scoringslogica beoordeelt ze op mijn voorkeuren. Daarna worden de gekozen maaltijden automatisch klaargezet. Een zelfgebouwd dashboard maakt het geheel overzichtelijk bedienbaar.",
  },
];

const cv = [
  {
    icon: Briefcase,
    role: "Grafisch Vormgever",
    period: "Juli 2021 – heden",
    org: "a.s.r. verzekeringen",
    body: "Opmaak van complexe documenten binnen de a.s.r.-huisstijl: polisvoorwaarden, brochures, rapportages, PowerPoint-presentaties en invulbare pdf-formulieren. Daarnaast nam ik het initiatief om terugkerende productieprocessen te automatiseren met zelfgebouwde tools. Daardoor werkt het team sneller en consistenter.",
  },
  {
    icon: Briefcase,
    role: "DTP & Grafische vormgeving",
    period: "2012 – 2021",
    org: "o.a. FHC, Groupcard, Gemeente Leiden, Sanoma, HEMA",
    body: "Ruim negen jaar ervaring opgebouwd in DTP en grafische vormgeving. Aangevuld met een periode als zelfstandig vormgever. Van tijdschriftopmaak en huisstijlontwikkeling tot beleidsdocumenten: een brede basis in zowel print als digitaal.",
  },
  {
    icon: GraduationCap,
    role: "Allround DTP niveau 3",
    period: "2012",
    org: "Mediacollege Amsterdam",
    body: "Vakopleiding in grafische vormgeving en digitale opmaak.",
  },
];

// Percentages zijn een eerste inschatting — pas ze gerust aan naar jouw gevoel
const skills = [
  { label: "Adobe InDesign", value: 95 },
  { label: "Illustrator & Photoshop", value: 85 },
  { label: "AI & Automatisering", value: 80 },
  { label: "JavaScript & Python", value: 70 },
];

const navLinks = [
  { label: "Over mij", href: "#over-mij" },
  { label: "Vaardigheden", href: "#vaardigheden" },
  { label: "Projecten", href: "#projecten" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const TYPE_WORDS = ["Grafisch Vormgever", "met specialisatie in AI & Automatisering"];

function Typewriter() {
  const [wordIdx, setWordIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPE_WORDS[wordIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      t = setTimeout(() => setDeleting(true), 1900);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPE_WORDS.length);
    } else {
      t = setTimeout(
        () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
        deleting ? 35 : 70
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx]);

  return (
    <span>
      {text}
      <span className="inline-block w-[3px] h-[0.95em] bg-[#A78BFA] ml-1 translate-y-[0.12em] animate-pulse" />
    </span>
  );
}

function BgIcon({ icon: Icon, className, size = 62 }: { icon: typeof Monitor; className: string; size?: number }) {
  return <Icon className={`absolute z-0 text-white/[0.09] ${className}`} size={size} strokeWidth={1} />;
}

// Lijntje/pijltje dat zichzelf "tekent" wanneer het in beeld komt
function DrawnArrow({
  className,
  viewBox,
  d,
  head,
  delay = 0,
}: {
  className: string;
  viewBox: string;
  d: string;
  head: string;
  delay?: number;
}) {
  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden>
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: "easeInOut" }}
      />
      <motion.path
        d={head}
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: delay + 1.0, ease: "easeOut" }}
      />
    </svg>
  );
}

function SkillRing({ label, value, delay = 0 }: { label: string; value: number; delay?: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 sm:w-32 sm:h-32">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
          <motion.circle
            cx="60"
            cy="60"
            r={r}
            stroke="#7C3AED"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * (1 - value / 100) }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold">
            {value}
            <span className="text-sm text-[#9AA4B2]">%</span>
          </span>
        </div>
      </div>
      <p className="mt-4 text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#C7CEDB] text-center">{label}</p>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#080B12]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#hero" className="font-bold tracking-tight text-[#F1F3F8]">
          Marjolijn de Vries<span className="text-[#7C3AED]">.</span>
        </a>
        <nav className="hidden md:flex gap-8">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} className="text-sm text-[#9AA4B2] hover:text-[#A78BFA] transition-colors font-medium">
              {label}
            </a>
          ))}
        </nav>
        <button className="md:hidden flex flex-col gap-1.5 p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4 bg-[#080B12]">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="text-sm font-medium text-[#F1F3F8] hover:text-[#A78BFA]">
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden">
      <div className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full bg-[#7C3AED]/12 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/8 blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight mb-4">
            Marjolijn
            <br />
            de Vries
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-[#A78BFA] mb-7 min-h-[4rem] sm:min-h-[2.6rem]">
            <Typewriter />
          </p>
          <p className="text-base sm:text-lg text-[#9AA4B2] leading-relaxed max-w-xl mb-8">
            Ik ontwerp duidelijke en consistente visuele communicatie, van brochures en
            documenten tot digitale uitingen. Daarnaast combineer ik ontwerp met AI en
            automatisering om terugkerend handwerk te verminderen.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {heroChips.map((chip) => (
              <span key={chip} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C7CEDB] font-medium">
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#projecten" className="inline-flex items-center gap-2 bg-[#7C3AED] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#6D28D9] transition-colors">
              Bekijk projecten
              <ArrowUpRight size={16} />
            </a>
            <a href="#contact" className="inline-block border border-white/20 text-[#F1F3F8] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors">
              Neem contact op
            </a>
          </div>
        </div>

        {/* Uitgesneden foto, verweven met de achtergrond */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-[330px] sm:w-[420px] lg:w-[460px] aspect-[4/5]">
            {/* Zachte, sterk vervaagde paarse gloed (blurblob, geen randen) */}
            <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[74%] h-[58%] rounded-full bg-[#7C3AED]/16 blur-[80px] pointer-events-none" />

            {/* Speels verspreide, kale achtergrond-icoontjes, ver uiteen */}
            <BgIcon icon={Monitor} size={70} className="top-2 -left-16 sm:-left-32" />
            <BgIcon icon={BrainCircuit} size={64} className="-top-6 right-6 sm:right-16" />
            <BgIcon icon={Coffee} size={72} className="bottom-6 -left-12 sm:-left-24" />
            <BgIcon icon={Paintbrush} size={66} className="-bottom-2 -right-4 sm:-right-14" />

            {/* Pijltje van bovenaf naar het hoofd (tekent zichzelf) */}
            <DrawnArrow
              className="absolute -top-6 -left-2 sm:left-2 w-32 h-20 text-[#A78BFA]/70 z-20 pointer-events-none"
              viewBox="0 0 160 90"
              d="M10 14 C 58 2, 108 8, 132 56"
              head="M116 50 L135 60 L122 34"
              delay={0.3}
            />

            {/* Krullend lijntje van onderaf naar Marjolijn (tekent zichzelf) */}
            <DrawnArrow
              className="absolute bottom-20 -left-5 sm:-left-14 w-24 h-24 text-[#A78BFA]/55 z-20 pointer-events-none"
              viewBox="0 0 110 110"
              d="M8 98 C 46 106, 18 58, 52 52 C 74 48, 66 24, 92 22"
              head="M79 18 L95 20 L86 34"
              delay={0.6}
            />

            {/* Foto, zonder kader, randen vervagen zacht in de achtergrond (radiaal) */}
            <Image
              src="/marjolijn-cutout.png"
              alt="Marjolijn de Vries"
              width={720}
              height={900}
              priority
              className="absolute inset-0 w-full h-full object-contain object-bottom z-10"
              style={{
                WebkitMaskImage:
                  "radial-gradient(64% 72% at 50% 40%, #000 46%, rgba(0,0,0,0.22) 78%, transparent 100%)",
                maskImage:
                  "radial-gradient(64% 72% at 50% 40%, #000 46%, rgba(0,0,0,0.22) 78%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Over mij ────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="over-mij" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">Over mij</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">Vormgeven én zelf bouwen.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="space-y-5 text-[#C7CEDB] text-base sm:text-lg leading-relaxed">
              <p>
                Ik ben Marjolijn, grafisch vormgever bij a.s.r. verzekeringen. Sinds 2012 werk ik in
                DTP en grafische vormgeving. Nu doe ik dat binnen het in-house designteam van Corporate
                Communicatie, met zeven vormgevers. Daar maak ik complexe documenten op binnen de
                huisstijl: polisvoorwaarden, brochures, rapportages en formulieren.
              </p>
              <p>
                Naast dat vormgevingswerk ben ik zelf gaan bouwen. Repeterende taken in mijn team
                kostten onnodig veel tijd. Dus loste ik dat zelf op. Ik bouwde browser-based tools die
                dat werk automatiseren. Een urenregistratiesysteem dat het hele team dagelijks gebruikt.
                En een script dat Word-tabellen omzet naar InDesign-opmaak. Geen kant-en-klare software,
                gewoon zelf gebouwd en getest op echte documenten uit mijn werk.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Vaardigheden ────────────────────────────────────────────────────────────

function Skills() {
  return (
    <section id="vaardigheden" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">Vaardigheden</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Waar ik sterk in ben.</h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12 mt-14">
          {skills.map((s, i) => (
            <SkillRing key={s.label} label={s.label} value={s.value} delay={i * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projecten ───────────────────────────────────────────────────────────────

function ProjectMedia({ project }: { project: (typeof projects)[number] }) {
  const [active, setActive] = useState(0);
  const item = project.media[active];
  return (
    <div>
      <div className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121826] transition-transform duration-300 hover:-translate-y-1">
        <div className="aspect-[16/10] relative overflow-hidden">
          {item.type === "video" ? (
            <video
              key={item.src}
              src={item.src}
              poster={item.poster}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
        </div>
        {project.note && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white/80 font-medium">
            <ShieldCheck size={13} /> {project.note}
          </span>
        )}
      </div>

      {project.media.length > 1 && (
        <div className="flex gap-2.5 mt-3">
          {project.media.map((m, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Beeld ${i + 1} van ${project.title}`}
              className={`relative w-[74px] h-[50px] rounded-lg overflow-hidden border transition ${
                i === active ? "border-[#7C3AED] ring-1 ring-[#7C3AED]" : "border-white/10 opacity-55 hover:opacity-90"
              }`}
            >
              <Image src={m.poster ?? m.src} alt="" fill sizes="74px" className="object-cover object-top" />
              {m.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <Play size={13} className="text-white" fill="white" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reversed = index % 2 === 1;
  const Icon = project.icon;
  return (
    <Reveal>
      <div
        className={`grid ${
          reversed ? "md:grid-cols-[1fr_1.25fr]" : "md:grid-cols-[1.25fr_1fr]"
        } gap-8 lg:gap-14 items-center`}
      >
        <div className={reversed ? "md:order-2" : ""}>
          <ProjectMedia project={project} />
        </div>
        <div className={reversed ? "md:order-1" : ""}>
          <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center mb-5">
            <Icon size={24} className="text-[#A78BFA]" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-4">{project.title}</h3>
          <p className="text-[#9AA4B2] leading-relaxed mb-6">{project.body}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C7CEDB] font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projecten" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">Projecten</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Zelfgebouwde tools.</h2>
          <p className="text-[#9AA4B2] max-w-2xl mb-16">
            Elk project lost een probleem op dat ik zelf tegenkwam, op werk of thuis.
          </p>
        </Reveal>
        <div className="space-y-20 lg:space-y-28">
          {projects.map((project, i) => (
            <ProjectRow key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CV ──────────────────────────────────────────────────────────────────────

function CV() {
  return (
    <section id="cv" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">CV</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">Werkervaring &amp; opleiding.</h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />
            <div className="space-y-10">
              {cv.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="relative pl-14">
                      <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-[#121826] border border-[#7C3AED]/40 flex items-center justify-center">
                        <Icon size={18} className="text-[#A78BFA]" />
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <h3 className="text-lg font-bold">{item.role}</h3>
                        <span className="text-sm text-[#A78BFA] font-medium">{item.period}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#C7CEDB] mb-3">{item.org}</p>
                      <p className="text-[#9AA4B2] leading-relaxed">{item.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await fetch("https://formspree.io/f/xaqkdyqe", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(form),
    });
    setSending(false);
    setSent(true);
  }

  const inputClass =
    "w-full bg-[#080B12] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-[#F1F3F8] placeholder-[#5A6578] focus:outline-none focus:border-[#7C3AED] transition-colors";

  return (
    <section id="contact" className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Samenwerken of sparren?</h2>
          <p className="text-[#9AA4B2] leading-relaxed max-w-sm mb-8">
            Heb je een project waar ik bij kan helpen, of ben je benieuwd naar mijn werk? Stuur gerust een bericht.
          </p>
          <a href="mailto:marjolijndevries03@gmail.com" className="inline-flex items-center gap-2 text-[#C7CEDB] hover:text-[#A78BFA] transition-colors font-medium">
            <Mail size={18} />
            marjolijndevries03@gmail.com
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          {sent ? (
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-2xl p-10 text-center">
              <div className="text-4xl mb-4">✓</div>
              <p className="text-xl font-bold mb-2">Bericht ontvangen!</p>
              <p className="text-[#9AA4B2] text-sm">Ik reageer zo snel mogelijk.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">Naam</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jouw naam" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">E-mail</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="jouw@email.nl" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">Bericht</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Vertel iets over je project of vraag..." className={`${inputClass} resize-none`} />
              </div>
              <button type="submit" disabled={sending} className="w-full bg-[#7C3AED] text-white px-7 py-4 rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors disabled:opacity-60">
                {sending ? "Versturen..." : "Verstuur bericht"}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 text-center text-xs text-[#5A6578]">
      <p>© {new Date().getFullYear()} Marjolijn de Vries · Grafisch Vormgever &amp; AI-automatisering</p>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
