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
  Play,
  FilePen,
  Code2,
} from "lucide-react";

// Merk-iconen als eigen SVG (lucide heeft deze niet meer)
function LinkedInIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1t2.48 2.5zM.24 8h4.52v14H.24V8zM8.24 8h4.33v1.9h.06c.6-1.1 2.07-2.26 4.26-2.26 4.56 0 5.4 3 5.4 6.9V22h-4.52v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.49V22H8.24V8z" />
    </svg>
  );
}
function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

// InDesign-badge met "Id"
function InDesignIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="1.5" y="1.5" width="21" height="21" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <text x="12" y="16.6" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" fontFamily="system-ui, sans-serif">
        Id
      </text>
    </svg>
  );
}

// AI-chip met "AI"
function AiChipIcon({ size = 22, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9 4V1.4M15 4V1.4M9 22.6V20M15 22.6V20M4 9H1.4M4 15H1.4M22.6 9H20M22.6 15H20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <text x="12" y="15.2" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" fontFamily="system-ui, sans-serif">
        AI
      </text>
    </svg>
  );
}

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
  zoom?: number;
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
    zoom: 1.6,
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
    zoom: 1.35,
    body: "Tabellen uit Word overzetten naar InDesign was tijdrovend handwerk. Zeker bij lange documenten met meerdere tabellen, zoals reglementen. Ik ontwikkelde een tool die Word-tabellen automatisch omzet naar kant-en-klare InDesign-scripts. Hij herkent daarbij het documenttype en de opmaakstijl. Getest en toegepast op grote, complexe reglementendocumenten met meerdere tabellen per bestand.",
  },
  {
    id: "financieel",
    icon: Wallet,
    title: "Financieel dashboard",
    tags: ["Dataverwerking", "Categorisatie", "Dashboard"],
    note: "Cijfers geblurd voor privacy",
    zoom: 1.22,
    media: [{ type: "image", src: "/projecten/financieel-v2.jpg" }],
    body: "Een bankapp geeft mij niet genoeg inzicht in mijn uitgaven en spaargedrag. Dus bouwde ik mijn eigen dashboard, dat een jaar aan transactiedata verwerkt. Het categoriseert uitgaven automatisch en maakt spaarpotjes bewerkbaar. Resultaat: beter overzicht en betere financiële beslissingen.",
  },
  {
    id: "maaltijden",
    icon: UtensilsCrossed,
    title: "Maaltijden selectietool",
    tags: ["Python", "Browserautomatisering", "Voorkeurscoring"],
    media: [{ type: "image", src: "/projecten/maaltijden.jpg" }],
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

const skills = [
  {
    icon: InDesignIcon,
    title: "Adobe InDesign",
    body: "Dagelijks gebruikt sinds 2012, inclusief scriptgestuurde opmaak voor complexe documenten.",
  },
  {
    icon: FilePen,
    title: "Illustrator & Photoshop",
    body: "Vast onderdeel van het productieproces, van beeldbewerking tot narrowcasting-grafieken.",
  },
  {
    icon: AiChipIcon,
    title: "AI & Automatisering",
    body: "Zelf geleerd, toegepast in vier zelfgebouwde tools die dagelijks werk automatiseren.",
  },
  {
    icon: Code2,
    title: "Bouwen met AI-ondersteuning",
    body: "JavaScript en Python, ontwikkeld met Claude en Claude Code als vaste werkwijze.",
  },
];

const navLinks = [
  { label: "Over mij", href: "#over-mij" },
  { label: "Vaardigheden", href: "#vaardigheden" },
  { label: "Projecten", href: "#projecten" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: LinkedInIcon, href: "https://www.linkedin.com/in/marjolijn-de-vries-68938950/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/marjolijn91/", label: "Instagram" },
  { icon: FacebookIcon, href: "https://www.facebook.com/marjolijn.devries.5", label: "Facebook" },
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
      t = setTimeout(() => setDeleting(true), 2100);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % TYPE_WORDS.length);
    } else {
      t = setTimeout(
        () => setText(current.slice(0, deleting ? text.length - 1 : text.length + 1)),
        deleting ? 45 : 95
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
  const stroke = {
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    fill: "none",
  };
  return (
    <svg className={className} viewBox={viewBox} fill="none" aria-hidden>
      <motion.path
        d={d}
        {...stroke}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay, ease: "easeInOut" }}
      />
      <motion.path
        d={head}
        {...stroke}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 1.2, ease: "easeOut" }}
      />
    </svg>
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
            <AiChipIcon size={64} className="absolute z-0 text-white/[0.09] -top-8 -right-1 sm:-right-8" />
            <BgIcon icon={Coffee} size={72} className="bottom-6 -left-12 sm:-left-24" />
            <BgIcon icon={Paintbrush} size={66} className="-bottom-2 -right-4 sm:-right-14" />

            {/* Pijltje van de pc naar het hoofd (tekent zichzelf) */}
            <DrawnArrow
              className="absolute -top-5 -left-12 sm:-left-24 w-44 sm:w-64 h-24 text-[#A78BFA]/70 z-20 pointer-events-none"
              viewBox="0 0 200 100"
              d="M8 24 C 74 4, 138 10, 172 60"
              head="M154 54 L176 64 L162 38"
              delay={0.3}
            />

            {/* Krullend pijltje van het AI-icoon naar het hoofd, op afstand */}
            <DrawnArrow
              className="absolute top-8 -right-1 sm:-right-2 w-24 h-32 text-[#A78BFA]/60 z-20 pointer-events-none"
              viewBox="0 0 95 122"
              d="M80 18 C 84 48, 58 44, 44 62 C 30 78, 36 98, 18 108"
              head="M32 105 L18 108 L24 94"
              delay={0.6}
            />

            {/* Foto, zonder kader, randen vervagen zacht in de achtergrond (radiaal) */}
            <Image
              src="/marjolijn-cutout.png"
              alt="Marjolijn de Vries"
              width={720}
              height={900}
              priority
              unoptimized
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
    <section id="over-mij" className="py-24 px-6 border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
        {/* Zijkant-foto links (kijkt naar de tekst) */}
        <Reveal className="order-1">
          <div className="relative mx-auto md:mx-0 w-64 sm:w-80 md:w-full max-w-md aspect-[4/5]">
            <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[78%] h-[62%] rounded-full bg-[#7C3AED]/16 blur-[70px] pointer-events-none" />
            <Image
              src="/marjolijn-zijkant.png"
              alt="Marjolijn de Vries, zijaanzicht"
              width={720}
              height={900}
              unoptimized
              priority
              className="absolute inset-0 w-full h-full object-contain object-bottom"
              style={{
                WebkitMaskImage:
                  "radial-gradient(66% 74% at 52% 42%, #000 48%, rgba(0,0,0,0.2) 80%, transparent 100%)",
                maskImage:
                  "radial-gradient(66% 74% at 52% 42%, #000 48%, rgba(0,0,0,0.2) 80%, transparent 100%)",
              }}
            />
          </div>
        </Reveal>

        {/* Tekst rechts */}
        <div className="order-2">
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
        <div className="max-w-xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">Vaardigheden</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight mb-12">
              Waar ik dagelijks mee werk, met bewijs in plaats van een cijfer.
            </h2>
          </Reveal>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.09}>
                <div className="group h-full bg-[#121826] border border-white/10 rounded-2xl p-7 transition-all duration-300 hover:border-[#7C3AED] hover:bg-[#171F2F] hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/12 flex items-center justify-center mb-5">
                    <Icon size={26} strokeWidth={1.6} className="text-[#A78BFA]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2.5">{s.title}</h3>
                  <p className="text-sm text-[#9AA4B2] leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Projecten ───────────────────────────────────────────────────────────────

function ProjectMedia({ project }: { project: (typeof projects)[number] }) {
  const [active, setActive] = useState(0);
  const item = project.media[active];
  const zoomStyle = project.zoom
    ? { transform: `scale(${project.zoom})`, transformOrigin: "top center" as const }
    : undefined;
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
              style={zoomStyle}
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          ) : (
            <Image
              key={item.src}
              src={item.src}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={zoomStyle}
              className="object-cover object-top"
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
          <div className="flex items-center gap-3 mt-7">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 rounded-full border border-white/12 flex items-center justify-center text-[#C7CEDB] hover:text-white hover:border-[#7C3AED] hover:bg-[#7C3AED]/15 transition-colors"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
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
