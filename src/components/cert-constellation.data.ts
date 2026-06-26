import awsCcp from "@/assets/certs/aws-ccp.png";
import awsSaa from "@/assets/certs/aws-saa.png";
import comptiaA from "@/assets/certs/comptia-a.png";
import comptiaNet from "@/assets/certs/comptia-net.png";
import comptiaSec from "@/assets/certs/comptia-sec.png";
import comptiaCld from "@/assets/certs/comptia-cld.png";
import comptiaPrj from "@/assets/certs/comptia-prj.png";
import comptiaCios from "@/assets/certs/comptia-cios.png";
import comptiaCsis from "@/assets/certs/comptia-csis.png";
import itilImg from "@/assets/certs/itil.png";
import lpiImg from "@/assets/certs/lpi.png";
import rxTech from "@/assets/certs/rx-tech.png";

export type CertFamily = "aws" | "comptia" | "itil" | "lpi" | "other";

export type Cert = {
  id: string;
  name: string;
  short: string;
  issuer: string;
  family: CertFamily;
  description: string;
  awarded: string;
  icon?: string;
  verifyUrl?: string;
};

function imgSrc(mod: string | { src: string }): string {
  return typeof mod === "string" ? mod : mod.src;
}

export const CERT_ICONS: Record<string, string> = {
  "aws-ccp": imgSrc(awsCcp),
  "aws-saa": imgSrc(awsSaa),
  "comptia-a": imgSrc(comptiaA),
  "comptia-net": imgSrc(comptiaNet),
  "comptia-sec": imgSrc(comptiaSec),
  "comptia-cld": imgSrc(comptiaCld),
  "comptia-prj": imgSrc(comptiaPrj),
  "comptia-cios": imgSrc(comptiaCios),
  "comptia-csis": imgSrc(comptiaCsis),
  itil: imgSrc(itilImg),
  lpi: imgSrc(lpiImg),
  "rx-tech": imgSrc(rxTech),
};

export const FAMILY_META: Record<
  CertFamily,
  { label: string; colorVar: string; anchor: { x: number; y: number } }
> = {
  aws:     { label: "AWS",     colorVar: "var(--cert-aws)",     anchor: { x: 180, y: 180 } },
  comptia: { label: "CompTIA", colorVar: "var(--cert-comptia)", anchor: { x: 480, y: 300 } },
  itil:    { label: "ITIL",    colorVar: "var(--cert-itil)",    anchor: { x: 680, y: 140 } },
  lpi:     { label: "LPI",     colorVar: "var(--cert-lpi)",     anchor: { x: 680, y: 470 } },
  other:   { label: "Other",   colorVar: "var(--cert-other)",   anchor: { x: 150, y: 470 } },
};

export const CERTS: Cert[] = [
  {
    id: "aws-ccp",
    name: "AWS Certified Cloud Practitioner",
    short: "CCP",
    issuer: "Amazon Web Services",
    family: "aws",
    description: "Foundational AWS cloud fluency across core services, billing, security, and architectural basics.",
    awarded: "July 18, 2025",
    verifyUrl: "https://www.credly.com/badges/3edbcaa0-ad6e-4176-96ca-c323dc02681e/public_url",
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect — Associate",
    short: "SAA",
    issuer: "Amazon Web Services",
    family: "aws",
    description: "Validates the ability to design resilient, secure, performant, and cost-aware AWS architectures.",
    awarded: "May 27, 2026",
    verifyUrl: "https://www.credly.com/badges/784bd8a6-505b-489f-b366-dfca6968de58/public_url",
  },
  {
    id: "comptia-a",
    name: "CompTIA A+",
    short: "A+",
    issuer: "CompTIA",
    family: "comptia",
    description: "Core IT support skills spanning hardware, operating systems, troubleshooting, networking, and security.",
    awarded: "September 22, 2025",
    verifyUrl: "https://www.credly.com/badges/d82a3221-76f6-42e4-baa5-03bdfe17e66d/public_url",
  },
  {
    id: "comptia-net",
    name: "CompTIA Network+",
    short: "Net+",
    issuer: "CompTIA",
    family: "comptia",
    description: "Networking fundamentals for configuration, operations, troubleshooting, infrastructure, and security.",
    awarded: "November 25, 2025",
    verifyUrl: "https://www.credly.com/badges/5f85b375-023c-46ce-903a-265bb6b7994d/public_url",
  },
  {
    id: "comptia-sec",
    name: "CompTIA Security+",
    short: "Sec+",
    issuer: "CompTIA",
    family: "comptia",
    description: "Baseline cybersecurity knowledge across threats, architecture, operations, governance, and risk.",
    awarded: "December 2, 2025",
    verifyUrl: "https://www.credly.com/badges/b741d219-0c71-4f91-8bd9-6a4c7f0d3c1b/public_url",
  },
  {
    id: "comptia-cld",
    name: "CompTIA Cloud+",
    short: "Cloud+",
    issuer: "CompTIA",
    family: "comptia",
    description: "Cloud infrastructure skills covering deployment, operations, security, maintenance, and troubleshooting.",
    awarded: "April 11, 2026",
    verifyUrl: "https://www.credly.com/badges/bc7598a2-9e74-4481-81bb-6b43d15bffb3/public_url",
  },
  {
    id: "comptia-prj",
    name: "CompTIA Project+",
    short: "Prj+",
    issuer: "CompTIA",
    family: "comptia",
    description: "Project coordination fundamentals including scope, schedules, communication, risk, and documentation.",
    awarded: "May 6, 2026",
    verifyUrl: "https://www.credly.com/badges/c9e6eaa5-e0e1-4dae-bf02-a155a6088590/public_url",
  },
  {
    id: "comptia-cios",
    name: "CompTIA CIOS — IT Operations Specialist",
    short: "CIOS",
    issuer: "CompTIA",
    family: "comptia",
    description: "Stackable CompTIA credential recognizing combined A+ and Network+ operations capability.",
    awarded: "November 25, 2025",
    verifyUrl: "https://www.credly.com/badges/2cbfba22-addd-4261-813c-4889156e26cc/public_url",
  },
  {
    id: "comptia-csis",
    name: "CompTIA CSIS — Secure Infrastructure Specialist",
    short: "CSIS",
    issuer: "CompTIA",
    family: "comptia",
    description: "Stackable CompTIA credential recognizing A+, Network+, and Security+ infrastructure skills.",
    awarded: "December 2, 2025",
    verifyUrl: "https://www.credly.com/badges/3bf96118-5dd9-474f-8075-2c1ec80c45fc/public_url",
  },
  {
    id: "itil",
    name: "ITIL Foundation",
    short: "ITIL Foundation",
    issuer: "PeopleCert / Axelos",
    family: "itil",
    description: "Service management foundations for delivering, supporting, and improving IT-enabled services.",
    awarded: "Awarded date available on verification page",
    verifyUrl: "https://www.credly.com/org/peoplecert/badge/itil-4-foundation",
  },
  {
    id: "lpi",
    name: "LPI Linux Essentials",
    short: "LPI Linux Essentials",
    issuer: "Linux Professional Institute",
    family: "lpi",
    description: "Linux command line, open source concepts, system basics, security, permissions, and scripting fundamentals.",
    awarded: "Awarded date available on verification page",
    verifyUrl: "https://www.credly.com/org/linux-professional-institute/badge/linux-essentials-certificate",
  },
  {
    id: "rx-tech",
    name: "Florida State Pharmacy Technician",
    short: "Pharm Tech License",
    issuer: "Florida Board of Pharmacy",
    family: "other",
    description: "Florida pharmacy technician registration for supporting licensed pharmacy operations.",
    awarded: "Awarded date available on verification page",
    verifyUrl: "https://mqa-internet.doh.state.fl.us/MQASearchServices/HealthCareProviders",
  },
];

// Cross-family suggestive edges
export const CROSS_EDGES: Array<[string, string]> = [
  ["comptia-sec", "itil"],
  ["comptia-net", "lpi"],
  ["aws-saa", "comptia-cld"],
];

// Deterministic seeded RNG (mulberry32) so SSR/CSR layouts match
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Positioned = Cert & { x: number; y: number; driftSeed: number };

export function layoutCerts(): Positioned[] {
  const byFamily: Record<CertFamily, Cert[]> = {
    aws: [], comptia: [], itil: [], lpi: [], other: [],
  };
  for (const c of CERTS) byFamily[c.family].push(c);

  const out: Positioned[] = [];
  const rand = mulberry32(1337);

  (Object.keys(byFamily) as CertFamily[]).forEach((fam) => {
    const members = byFamily[fam];
    const anchor = FAMILY_META[fam].anchor;
    const n = members.length;
    if (n === 1) {
      out.push({ ...members[0], x: anchor.x, y: anchor.y, driftSeed: rand() * 1000 });
      return;
    }
    const radius = 70 + n * 8;
    const startAngle = rand() * Math.PI * 2;
    members.forEach((m, i) => {
      const angle = startAngle + (i / n) * Math.PI * 2;
      const jitter = 0.88 + rand() * 0.24;
      out.push({
        ...m,
        x: anchor.x + Math.cos(angle) * radius * jitter,
        y: anchor.y + Math.sin(angle) * radius * jitter,
        driftSeed: rand() * 1000,
      });
    });
  });

  return out;
}

// Background stars (deterministic)
export function backgroundStars(count = 60) {
  const rand = mulberry32(42);
  return Array.from({ length: count }, () => ({
    x: rand() * 800,
    y: rand() * 600,
    r: 0.4 + rand() * 1.2,
    o: 0.15 + rand() * 0.45,
    t: rand() * 4,
  }));
}
