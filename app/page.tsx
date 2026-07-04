"use client";

import { useState, type ReactNode } from "react";
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
  Palette,
} from "lucide-react";

// ─── Data ──────────────────────────────────────────────────────────────────

const heroChips = [
  "Adobe InDesign",
  "Illustrator",
  "Photoshop",
  "AI-agenten",
  "Python",
  "Automatisering",
];

const projects = [
  {
    id: "urenregistratie",
    icon: Clock,
    title: "Urenregistratietool",
    tags: ["Offline dashboard", "Presets", "Teamoverzicht"],
    image: "/projecten/urenregistratie.jpg",
    video: "/projecten/urenregistratie.mp4",
    body: "Handmatige tijdregistratie in het team was foutgevoelig en kostte tijd, en de leidinggevende had geen overzicht zonder alles handmatig samen te voegen en te rekenen. Ik bouwde een dashboard dat offline werkt, zonder installatie, met presets voor vaste terugkerende taken — teamleden vullen met één druk op de knop hun uren in. De leidinggevende heeft nu één centraal dashboard met totaaloverzichten en grafieken. Het hele team gebruikt de tool inmiddels dagelijks.",
  },
  {
    id: "word-indesign",
    icon: FileText,
    title: "Word → InDesign tabelconverter",
    tags: ["Automatisering", "InDesign-scripting", "Documentherkenning"],
    image: "/projecten/word-indesign.jpg",
    body: "Tabellen uit Word overzetten naar InDesign-opmaak was tijdrovend handwerk, zeker bij lange documenten zoals reglementen met meerdere tabellen. Ik ontwikkelde een tool die Word-tabellen automatisch omzet naar kant-en-klare InDesign-scripts, inclusief herkenning van documenttype en opmaakstijl. Getest en toegepast op grote, complexe reglementendocumenten met meerdere tabellen per bestand.",
  },
  {
    id: "financieel",
    icon: Wallet,
    title: "Financieel dashboard",
    tags: ["Dataverwerking", "Categorisatie", "Dashboard"],
    image: "/projecten/financieel.jpg",
    note: "Cijfers geblurd voor privacy",
    body: "Ik wilde beter inzicht in mijn eigen uitgaven en spaargedrag dan wat een bankapp standaard biedt. Ik bouwde een dashboard dat een jaar aan transactiedata verwerkt, uitgaven automatisch categoriseert en spaarpotjes bewerkbaar maakt. Het resultaat is beter overzicht en betere financiële beslissingen.",
  },
  {
    id: "maaltijden",
    icon: UtensilsCrossed,
    title: "Maaltijden selectietool",
    tags: ["Python", "Browserautomatisering", "AI-scoring"],
    image: "/projecten/maaltijden.jpg",
    video: "/projecten/maaltijden.mp4",
    body: "Elke week opnieuw maaltijden uitzoeken bij een online maaltijdservice kostte tijd en leverde niet altijd de beste match op. Ik bouwde een Python-tool die het hele proces automatiseert: via browserautomatisering leest een script alle beschikbare maaltijden uit, een eigen scoringslogica beoordeelt ze op persoonlijke voorkeuren, en de gekozen maaltijden worden automatisch klaargezet. Een zelfgebouwd dashboard maakt het geheel overzichtelijk bedienbaar.",
  },
];

const cv = [
  {
    icon: Briefcase,
    role: "Grafisch Vormgever",
    org: "a.s.r. verzekeringen",
    period: "Juli 2021 – heden",
    body: "Opmaak van complexe documenten binnen de a.s.r.-huisstijl: polisvoorwaarden, brochures, rapportages, PowerPoint-presentaties en invulbare pdf-formulieren. Daarnaast het initiatief genomen om terugkerende productieprocessen te automatiseren met zelfgebouwde tools, waardoor het team sneller en consistenter werkt.",
  },
  {
    icon: Briefcase,
    role: "DTP & Grafische vormgeving",
    org: "o.a. FHC, Groupcard, Gemeente Leiden, Sanoma, HEMA",
    period: "2012 – 2021",
    body: "Ruim negen jaar ervaring opgebouwd in DTP en grafische vormgeving, aangevuld met een periode als zelfstandig vormgever. Van tijdschriftopmaak tot huisstijlontwikkeling tot beleidsdocumenten — een brede basis in zowel print als digitaal.",
  },
  {
    icon: GraduationCap,
    role: "Allround DTP niveau 3",
    org: "Mediacollege Amsterdam",
    period: "2012",
    body: "Vakopleiding in grafische vormgeving en digitale opmaak.",
  },
];

const navLinks = [
  { label: "Over mij", href: "#over-mij" },
  { label: "Projecten", href: "#projecten" },
  { label: "CV", href: "#cv" },
  { label: "Contact", href: "#contact" },
];

// ─── Reveal helper ───────────────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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

function BgIcon({
  icon: Icon,
  className,
}: {
  icon: typeof Monitor;
  className: string;
}) {
  return (
    <div className={`absolute z-0 ${className}`}>
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-sm flex items-center justify-center">
        <Icon size={34} strokeWidth={1.25} className="text-white/30" />
      </div>
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
            <a
              key={label}
              href={href}
              className="text-sm text-[#9AA4B2] hover:text-[#A78BFA] transition-colors font-medium"
            >
              {label}
            </a>
          ))}
        </nav>
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 bg-[#F1F3F8] transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 px-6 py-4 flex flex-col gap-4 bg-[#080B12]">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#F1F3F8] hover:text-[#A78BFA]"
            >
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
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Paarse glow-vlakken */}
      <div className="absolute -top-40 -right-32 w-[560px] h-[560px] rounded-full bg-[#7C3AED]/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -left-32 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-6">
            Grafisch Vormgever · AI &amp; Automatisering
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.03] tracking-tight mb-6">
            Marjolijn
            <br />
            de Vries
          </h1>
          <p className="text-base sm:text-lg text-[#9AA4B2] leading-relaxed max-w-xl mb-8">
            Ik ontwerp duidelijke en consistente visuele communicatie, van brochures
            en documenten tot digitale uitingen. Daarnaast combineer ik ontwerp met
            AI en automatisering om werkprocessen slimmer te maken.
          </p>
          <div className="flex flex-wrap gap-2 mb-10">
            {heroChips.map((chip) => (
              <span
                key={chip}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C7CEDB] font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="#projecten"
              className="inline-flex items-center gap-2 bg-[#7C3AED] text-white px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#6D28D9] transition-colors"
            >
              Bekijk projecten
              <ArrowUpRight size={16} />
            </a>
            <a
              href="#contact"
              className="inline-block border border-white/20 text-[#F1F3F8] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors"
            >
              Neem contact op
            </a>
          </div>
        </div>

        {/* Uitgesneden foto, in de achtergrond verwerkt */}
        <div className="relative flex justify-center md:justify-end">
          <div className="relative w-[330px] sm:w-[420px] lg:w-[460px] aspect-[4/5]">
            {/* Zachte, vervloeiende paarse gloed (radiaal, geen harde randen) */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[135%] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(124,58,237,0.40) 0%, rgba(124,58,237,0.14) 34%, rgba(124,58,237,0.04) 55%, transparent 72%)",
              }}
            />
            {/* Donkere basis eronder zodat de foto 'staat' en niet zweeft */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 100%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, transparent 70%)",
              }}
            />

            {/* Grotere, stilstaande achtergrond-icoontjes */}
            <BgIcon icon={Monitor} className="top-2 -left-4 sm:-left-10" />
            <BgIcon icon={Palette} className="top-28 -right-4 sm:-right-10" />
            <BgIcon icon={Coffee} className="bottom-40 -left-3 sm:-left-9" />
            <BgIcon icon={Paintbrush} className="bottom-14 -right-2 sm:-right-6" />

            {/* Foto — groter, geen kader, onderkant vervaagt in de achtergrond */}
            <Image
              src="/marjolijn-cutout.png"
              alt="Marjolijn de Vries"
              width={720}
              height={900}
              priority
              className="absolute inset-0 w-full h-full object-contain object-bottom z-10"
              style={{
                WebkitMaskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)",
                maskImage: "linear-gradient(to bottom, #000 78%, transparent 99%)",
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">
            Over mij
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
            Vormgeven én zelf bouwen.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="space-y-5 text-[#C7CEDB] text-base sm:text-lg leading-relaxed">
            <p>
              Ik ben Marjolijn de Vries, grafisch vormgever bij a.s.r. verzekeringen.
              Sinds 2012 werk ik in DTP en grafische vormgeving, de laatste jaren
              binnen Corporate Communicatie. Daar maak ik complexe documenten op binnen
              de huisstijl: polisvoorwaarden, brochures, rapportages en formulieren.
            </p>
            <p>
              Naast dat vormgevingswerk ben ik zelf gaan bouwen. Repeterende taken in
              mijn team kostten onnodig veel tijd, dus ontwikkelde ik browser-based tools
              die dat werk automatiseren — van een urenregistratiesysteem dat het hele
              team dagelijks gebruikt tot een script dat Word-tabellen automatisch omzet
              naar InDesign-opmaak. Geen kant-en-klare software, maar zelf gebouwd en
              getest op echte documenten uit mijn werk.
            </p>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Projecten ───────────────────────────────────────────────────────────────

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reversed = index % 2 === 1;
  const Icon = project.icon;
  return (
    <Reveal>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center">
        {/* Beeld */}
        <div className={reversed ? "md:order-2" : ""}>
          <div className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#121826] transition-transform duration-300 hover:-translate-y-1">
            <div className="aspect-[16/10] relative overflow-hidden">
              {"video" in project && project.video ? (
                <video
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
            {project.note && (
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white/80 font-medium">
                <ShieldCheck size={13} /> {project.note}
              </span>
            )}
          </div>
        </div>

        {/* Tekst */}
        <div className={reversed ? "md:order-1" : ""}>
          <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/15 border border-[#7C3AED]/30 flex items-center justify-center mb-5">
            <Icon size={24} className="text-[#A78BFA]" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight mb-4">{project.title}</h3>
          <p className="text-[#9AA4B2] leading-relaxed mb-6">{project.body}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#C7CEDB] font-medium"
              >
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">
            Projecten
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Zelfgebouwde tools.
          </h2>
          <p className="text-[#9AA4B2] max-w-2xl mb-16">
            Elk project ontstond uit een echt probleem in mijn werk of dagelijks leven.
            Wat het oplost, en wat het oplevert.
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">
            CV
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-16">
            Werkervaring &amp; opleiding.
          </h2>
        </Reveal>

        <div className="relative">
          {/* Verticale lijn */}
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
          <p className="text-xs uppercase tracking-[0.2em] text-[#A78BFA] font-semibold mb-4">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">
            Samenwerken of sparren?
          </h2>
          <p className="text-[#9AA4B2] leading-relaxed max-w-sm mb-8">
            Heb je een project waar ik bij kan helpen, of ben je benieuwd naar mijn werk?
            Stuur gerust een bericht.
          </p>
          <a
            href="mailto:marjolijndevries03@gmail.com"
            className="inline-flex items-center gap-2 text-[#C7CEDB] hover:text-[#A78BFA] transition-colors font-medium"
          >
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
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">
                  Naam
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Jouw naam"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="jouw@email.nl"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#9AA4B2] font-semibold mb-2">
                  Bericht
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Vertel iets over je project of vraag..."
                  className={`${inputClass} resize-none`}
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#7C3AED] text-white px-7 py-4 rounded-xl text-sm font-semibold hover:bg-[#6D28D9] transition-colors disabled:opacity-60"
              >
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
      <p>© {new Date().getFullYear()} Marjolijn de Vries — Grafisch Vormgever &amp; AI-automatisering</p>
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
        <Projects />
        <CV />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
