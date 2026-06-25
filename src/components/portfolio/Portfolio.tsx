import { motion } from "framer-motion";
import {
  Mail, Phone, MapPin, ArrowRight, Github, Linkedin, ExternalLink,
  Sparkles, Gauge, Wrench, Smartphone, Search, FormInput, ShieldCheck,
  Cloud, Code2, Database, Server, Globe2, GraduationCap, Award,
} from "lucide-react";
import iyadPhoto from "@/assets/iyad.jpeg";
import { GitHubSection } from "./GitHubSection";

const EMAIL = "iyad@eltifi.com";
const PHONE_DISPLAY = "(813) 638-6858";
const PHONE_HREF = "tel:+18136386858";
const GITHUB = "https://github.com/ie04";
const LINKEDIN = "https://www.linkedin.com/in/iyad-eltifi/";

const NAV = [
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#home" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary via-secondary to-accent text-sm font-bold text-primary-foreground">
            IE
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">Iyad Eltifi</span>
        </a>
        <nav className="hidden gap-7 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-muted-foreground transition hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm font-medium text-foreground transition hover:bg-primary/20"
        >
          Hire me <ArrowRight className="size-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-40">
      <div className="pointer-events-none absolute inset-0 grid-bg" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.72 0.17 245 / 0.55), transparent 60%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-emerald-400" /> Available for web revamp projects · Tampa, FL
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="mt-5 text-4xl font-semibold leading-[1.05] md:text-6xl"
          >
            Building <span className="text-gradient">cleaner, faster, more credible</span> websites for modern businesses.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            I'm Iyad — a B.S. Cloud Computing student at WGU with an A.A. in Computer Engineering from HCC,
            and the founder of PageFoundry. I help small businesses replace outdated websites
            with fast, mobile-first sites that actually convert.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:scale-[1.02] glow-primary"
            >
              Start a project <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-3 text-sm font-medium text-foreground transition hover:border-primary/50"
            >
              See my work
            </a>
          </motion.div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
            <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Mail className="size-3.5" /> {EMAIL}
            </a>
            <a href={PHONE_HREF} className="inline-flex items-center gap-1.5 hover:text-foreground">
              <Phone className="size-3.5" /> {PHONE_DISPLAY}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> Tampa, FL
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto aspect-square w-72 md:w-80"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, oklch(0.72 0.17 245 / 0.6), oklch(0.78 0.13 200 / 0.4), oklch(0.65 0.21 295 / 0.6), oklch(0.72 0.17 245 / 0.6))",
              filter: "blur(20px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-2 rounded-full bg-background" />
          <img
            src={iyadPhoto}
            alt="Iyad Eltifi"
            className="absolute inset-3 rounded-full object-cover ring-1 ring-border"
          />
          {[
            { label: "TypeScript", x: "-12%", y: "10%" },
            { label: "AWS", x: "100%", y: "20%" },
            { label: "React", x: "-18%", y: "70%" },
            { label: "SQL", x: "95%", y: "75%" },
          ].map((c, i) => (
            <motion.span
              key={c.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-card/80 px-2.5 py-1 text-[11px] backdrop-blur"
              style={{ left: c.x, top: c.y }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
            >
              {c.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-12 flex flex-col gap-3"
    >
      <span className="text-xs uppercase tracking-[0.2em] text-primary">{kicker}</span>
      <h2 className="text-3xl font-semibold md:text-5xl">{title}</h2>
      {sub && <p className="max-w-2xl text-muted-foreground">{sub}</p>}
    </motion.div>
  );
}

function About() {
  const stats = [
    { v: "9", l: "Industry certifications" },
    { v: "AWS + CompTIA", l: "Cloud & IT stack" },
    { v: "PageFoundry", l: "Web studio I run" },
    { v: "Tampa, FL", l: "Home base" },
  ];
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="01 · About" title="A technical founder who actually ships." />
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="glass rounded-2xl p-7 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              I'm a dedicated IT professional pursuing a B.S. in Cloud Computing at{" "}
              <span className="text-foreground font-medium">Western Governors University</span>,
              with an A.A. in Computer Engineering from{" "}
              <span className="text-foreground font-medium">Hillsborough Community College</span>{" "}
              and an IB Diploma from C. Leon King High School. My background spans technical support,
              database maintenance, and systems auditing, and I'm proficient in Python, Java, and Linux environments.
            </p>
            <p className="mt-4">
              On top of that I run <span className="text-foreground font-medium">PageFoundry</span> —
              a web studio focused on giving small businesses sites that look modern, load fast, and earn trust at first glance.
              I hold the AWS Certified Cloud Practitioner and the CompTIA trifecta (A+, Network+, Security+),
              plus Cloud+, Project+, ITIL, and LPI Linux Essentials.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div key={s.l} className="glass rounded-xl p-5">
                <div className="text-xl font-semibold">{s.v}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Sparkles, title: "Website Revamps", desc: "Turn an outdated site into a modern, credible one in 2–3 weeks." },
  { icon: MapPin, title: "Local Landing Pages", desc: "City- and service-specific pages built to rank and convert." },
  { icon: Smartphone, title: "Mobile Optimization", desc: "Sites that feel native on phones — where 70% of your traffic is." },
  { icon: Wrench, title: "Maintenance & Care", desc: "Ongoing updates, backups, uptime checks, content edits." },
  { icon: Search, title: "SEO & Performance", desc: "Clean markup, Lighthouse scores in the 90s, real keyword strategy." },
  { icon: FormInput, title: "Forms & Lead Capture", desc: "Contact forms, quote requests, and CRM-ready lead pipelines." },
];

function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="02 · PageFoundry"
          title="Web services for businesses that need to look the part."
          sub="Everything below is delivered hands-on by me — no agency middlemen, no template marketplaces."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border bg-card/60 p-6 transition hover:border-primary/50 hover:-translate-y-1"
            >
              <div className="mb-4 inline-grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <s.icon className="size-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  const reasons = [
    { icon: ShieldCheck, t: "No template factories", d: "Every site is custom-built, not stitched from a marketplace theme." },
    { icon: Gauge, t: "Performance-first", d: "Lighthouse 90+ scores, sub-2s loads, mobile-optimized by default." },
    { icon: Cloud, t: "Cloud-native foundations", d: "Hosting, DNS, SSL, and analytics set up the right way — not by a salesperson." },
    { icon: ArrowRight, t: "Direct line", d: "You text me, not a ticket queue. Edits and updates happen the same week." },
  ];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="05 · Why Work With Me" title="Built for businesses that are tired of being burned." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.t} className="glass rounded-2xl p-6">
              <r.icon className="size-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SKILLS = [
  { icon: Code2, label: "TypeScript" }, { icon: Code2, label: "JavaScript" },
  { icon: Code2, label: "Python" }, { icon: Code2, label: "Java" },
  { icon: Database, label: "SQL" }, { icon: Database, label: "PostgreSQL" },
  { icon: Globe2, label: "React" }, { icon: Globe2, label: "TanStack" },
  { icon: Server, label: "Node.js" }, { icon: Server, label: "REST APIs" },
  { icon: Cloud, label: "AWS" }, { icon: Cloud, label: "Cloud Computing" },
  { icon: Server, label: "Linux" }, { icon: Server, label: "Bash" },
  { icon: Wrench, label: "Git" }, { icon: Wrench, label: "Docker" },
  { icon: Globe2, label: "Tailwind CSS" }, { icon: Globe2, label: "HTML/CSS" },
  { icon: Search, label: "SEO" }, { icon: Gauge, label: "Web Performance" },
  { icon: ShieldCheck, label: "IT Support" },
];

function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="06 · Skills"
          title="The toolkit."
          sub="Languages, frameworks, and infrastructure I work in regularly — across web, data, and cloud."
        />
        <div className="flex flex-wrap gap-2.5">
          {SKILLS.map((s, i) => (
            <motion.span
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-sm text-foreground transition hover:border-primary/50 hover:bg-primary/10"
            >
              <s.icon className="size-3.5 text-primary" />
              {s.label}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXPERIENCE = [
  {
    role: "Founder",
    org: "PageFoundry",
    when: "2024 — Present",
    bullets: [
      "Designed, built, and deployed custom websites for small businesses with a focus on mobile-first performance and lead conversion.",
      "Owns the full delivery stack: design, build, hosting, DNS, SSL, analytics, and ongoing maintenance.",
    ],
  },
  {
    role: "IT Specialist",
    org: "K-12 School District",
    when: "2023 — Present",
    bullets: [
      "First-line support for staff and faculty across networking, accounts, hardware, and classroom tech.",
      "Documented recurring issues and built repeatable fix workflows that cut average ticket time.",
    ],
  },
  {
    role: "Cloud Computing & IT — B.S. in progress",
    org: "University of South Florida",
    when: "Tampa, FL",
    bullets: [
      "Coursework: cloud architecture (AWS), Linux systems, networking, databases, programming in Java/Python/JS.",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="07 · Experience" title="A short, honest track record." />
        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent md:left-4" />
          <div className="space-y-6">
            {EXPERIENCE.map((e, i) => (
              <motion.div
                key={e.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative pl-10 md:pl-14"
              >
                <span className="absolute left-1.5 top-3 size-3 rounded-full bg-primary ring-4 ring-primary/20 md:left-2.5" />
                <div className="glass rounded-2xl p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold">
                      {e.role} <span className="text-muted-foreground">· {e.org}</span>
                    </h3>
                    <span className="text-xs text-muted-foreground">{e.when}</span>
                  </div>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {e.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EduCerts() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="08 · Education & Certifications" title="Credentials." />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass rounded-2xl p-6">
            <GraduationCap className="size-5 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">University of South Florida</h3>
            <p className="text-sm text-muted-foreground">
              B.S. Cloud Computing & Information Technology — in progress, Tampa, FL.
            </p>
          </div>
          <div className="glass rounded-2xl p-6">
            <Award className="size-5 text-primary" />
            <h3 className="mt-3 text-lg font-semibold">Industry Certifications</h3>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>· AWS Cloud Practitioner — foundational cloud architecture</li>
              <li>· CompTIA-aligned IT support coursework</li>
              <li>· Ongoing training in web performance & SEO</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRICING = [
  {
    name: "Starter Site",
    price: "$900",
    when: "one-time",
    desc: "For solo operators and brand-new businesses.",
    items: ["Up to 4 pages", "Mobile-first responsive", "Contact form + Google Maps", "Hosting setup & SSL"],
  },
  {
    name: "Business Site",
    price: "$1,800",
    when: "one-time",
    highlight: true,
    desc: "For established businesses replacing an outdated site.",
    items: ["Up to 10 pages", "Custom design + brand polish", "On-page SEO + Lighthouse 90+", "Lead forms + analytics", "30 days of post-launch edits"],
  },
  {
    name: "Ongoing Care",
    price: "$120",
    when: "/mo",
    desc: "Pairs with any build — peace of mind, on tap.",
    items: ["Monthly updates & backups", "Uptime monitoring", "Content edits (2/mo)", "Priority response"],
  },
];

function Pricing() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          kicker="09 · Pricing"
          title="Transparent pricing — no agency markup."
          sub="Pick a build, then add ongoing care if you want me to keep it healthy. Custom scopes welcome."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-6 ${
                p.highlight
                  ? "border-primary/60 bg-gradient-to-b from-primary/10 to-transparent glow-primary"
                  : "border-border bg-card/60"
              }`}
            >
              {p.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-3xl font-semibold">{p.price}</span>
                <span className="text-sm text-muted-foreground">{p.when}</span>
              </div>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary">✓</span>{i}</li>
                ))}
              </ul>
              <a
                href={`mailto:${EMAIL}?subject=PageFoundry%20—%20${encodeURIComponent(p.name)}`}
                className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:scale-[1.02]"
                    : "border border-border text-foreground hover:border-primary/50"
                }`}
              >
                Get started <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(circle at 50% 0%, oklch(0.72 0.17 245 / 0.35), transparent 60%)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl font-semibold md:text-5xl">Let's make your site the one customers trust.</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Email me a link to your current site and I'll send back a free 5-minute audit with what I'd change first.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-[1.02] glow-primary">
                <Mail className="size-4" /> {EMAIL}
              </a>
              <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium hover:border-primary/50">
                <Phone className="size-4" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} Iyad Eltifi · PageFoundry · Tampa, FL</div>
        <div className="flex items-center gap-4">
          <a href={GITHUB} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
            <Github className="size-3.5" /> ie04
          </a>
          <a href={LINKEDIN} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-foreground">
            <Linkedin className="size-3.5" /> LinkedIn <ExternalLink className="size-3" />
          </a>
          <a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a>
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <GitHubSection />
        <WhyMe />
        <Skills />
        <Experience />
        <EduCerts />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
