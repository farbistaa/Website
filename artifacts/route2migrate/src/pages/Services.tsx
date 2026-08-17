//artifacts/route2migrate/src/pages/Services.tsx
'use client';

import { useState, useRef, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Variants, Transition } from "framer-motion";
import { useLocation } from "wouter";
import {
  Globe, MapPin, GraduationCap, Briefcase, Heart, Home as HomeIcon,
  Building2, FileText, ArrowRight, CheckCircle, Shield, BadgeCheck,
  Languages, Plane, ChevronRight, ChevronLeft, CreditCard,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Schengen Image Imports
import AustriaImg from "@/attached_assets/Schengen/Austria.jpg";
import BelgiumImg from "@/attached_assets/Schengen/Belgium.jpg";
import BulgariaImg from "@/attached_assets/Schengen/Bulgaria.jpg";
import CroatiaImg from "@/attached_assets/Schengen/Croatia.jpg";
import CzechRepublicImg from "@/attached_assets/Schengen/Czech Republic.jpg";
import DenmarkImg from "@/attached_assets/Schengen/Denmark.jpg";
import EstoniaImg from "@/attached_assets/Schengen/Estonia.jpg";
import FinlandImg from "@/attached_assets/Schengen/Finland.jpg";
import FranceImg from "@/attached_assets/Schengen/France.jpg";
import GermanyImg from "@/attached_assets/Schengen/Germany.jpg";
import GreeceImg from "@/attached_assets/Schengen/Greece.jpg";
import HungaryImg from "@/attached_assets/Schengen/Hungary.jpg";
import IcelandImg from "@/attached_assets/Schengen/Iceland.jpg";
import ItalyImg from "@/attached_assets/Schengen/Italy.jpg";
import LatviaImg from "@/attached_assets/Schengen/Latvia.jpg";
import LiechtensteinImg from "@/attached_assets/Schengen/Liechtenstein.jpg";
import LithuaniaImg from "@/attached_assets/Schengen/Lithuania.jpg";
import LuxembourgImg from "@/attached_assets/Schengen/Luxembourg.jpg";
import MaltaImg from "@/attached_assets/Schengen/Malta.jpg";
import NetherlandsImg from "@/attached_assets/Schengen/Netherlands.jpg";
import NorwayImg from "@/attached_assets/Schengen/Norway.jpg";
import PolandImg from "@/attached_assets/Schengen/Poland.jpg";
import PortugalImg from "@/attached_assets/Schengen/Portugal.jpg";
import RomaniaImg from "@/attached_assets/Schengen/Romania.jpg";
import SlovakiaImg from "@/attached_assets/Schengen/Slovakia.jpg";
import SloveniaImg from "@/attached_assets/Schengen/Slovenia.jpg";
import SpainImg from "@/attached_assets/Schengen/Spain.jpg";
import SwedenImg from "@/attached_assets/Schengen/Sweden.jpg";
import SwitzerlandImg from "@/attached_assets/Schengen/Switzerland.jpg";

// Canada Services Image Imports
import BusinessMigrationImg from "@/attached_assets/Services/Business Migration.png";
import CELPIPImg from "@/attached_assets/Services/CELPIP.png";
import ECAImg from "@/attached_assets/Services/ECA.png";
import ExpressEntryImg from "@/attached_assets/Services/Express Entry.jpg";
import FamilySponsorshipImg from "@/attached_assets/Services/Family Sponsorship.jpg";
import PNPImg from "@/attached_assets/Services/PNP.jpg";
import StudyPermitImg from "@/attached_assets/Services/Study Permit.png";
import SuperVisaImg from "@/attached_assets/Services/Super Visa.png";
import VisitVisaImg from "@/attached_assets/Services/Visit Visa.jpg";
import WorkPermitImg from "@/attached_assets/Services/Work Permit.png";

// NEW: Added the 3 new service images
import ApplicationReviewImg from "@/attached_assets/Services/application review.jpg";
import ConsultationImg from "@/attached_assets/Services/Consultation.png";
import SOWPImg from "@/attached_assets/Services/SOWP.png";

// Flag Icon Imports
import CanadaFlag from "@/attached_assets/Icon/canada.png";
import EUFlag from "@/attached_assets/Icon/european-union.png";
import UKFlag from "@/attached_assets/Icon/uk.png";
import USFlag from "@/attached_assets/Icon/united-states.png";

// ── Types & Interfaces ──
type Region = "canada" | "usa" | "uk" | "schengen";

interface BaseCardProps {
  icon: LucideIcon;
  title: string;
  short: string;
  desc: string;
  points: string[];
  slug?: string;
}

interface CanadaService extends BaseCardProps {
  badge: string;
  color: string;
  bg: string;
  image: string;
  slug: string;
}

interface IntlService extends BaseCardProps {
  badgeBg: string;
  countryFlag: string;
  countryFlagAlt: string;
  countryBorderColor: string;
  slug?: string;
}

interface SchengenService extends BaseCardProps {
  badge: string;
  color: string;
  bg: string;
  image: string;
  slug?: string;
}

interface CarouselService {
  title: string;
  short: string;
  badge: string;
  color: string;
  bg: string;
  desc: string;
  image: string;
  points: string[];
  slug?: string;
}

interface RegionInfo {
  id: Region;
  label: string;
  flag: string;
  flagAlt: string;
  tagline: string;
  borderColor: string;
}

interface Highlight {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface SecondarySectionProps {
  badgeText: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleId?: string;
}

// ── Constants & Variants ──
const easeTransition: Transition = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: easeTransition }
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
};

// WCAG-compliant flag border colors (3:1+ contrast against white)
const flagBorderColors = {
  canada: "#C41E13",
  usa: "#3C3B6E",
  uk: "#012169",
  eu: "#003399",
};

const regions: RegionInfo[] = [
  { id: "canada", label: "Canada Immigration", flag: CanadaFlag, flagAlt: "Canada", tagline: "Federal, provincial & specialized programs", borderColor: flagBorderColors.canada },
  { id: "usa", label: "USA Immigration", flag: USFlag, flagAlt: "United States", tagline: "Visit, business & student visas", borderColor: flagBorderColors.usa },
  { id: "uk", label: "UK Immigration", flag: UKFlag, flagAlt: "United Kingdom", tagline: "Standard Visitor & tourism visas", borderColor: flagBorderColors.uk },
  { id: "schengen", label: "Schengen Visa", flag: EUFlag, flagAlt: "European Union", tagline: "Tourist Visa only — 29 countries", borderColor: flagBorderColors.eu },
];

// Canada Services — Alphabetical Order
const canadaServices: CanadaService[] = [
  {
    icon: Building2,
    title: "Business Immigration",
    short: "Entrepreneurs & investors",
    badge: "Entrepreneurs",
    color: "bg-amber-600",
    bg: "bg-gradient-to-br from-amber-600 to-yellow-800",
    desc: "Canada actively welcomes entrepreneurs. The Start-up Visa Program and Self-Employed pathway are our specialty for business-minded immigrants targeting Canadian residency.",
    points: ["Start-up Visa Program", "Self-Employed Persons Program", "C-11 Significant Benefit work permits", "Intra-Company Transfers for executives", "Business visitor visas & letters of support"],
    image: BusinessMigrationImg,
    slug: "business-immigration"
  },
  {
    icon: Languages,
    title: "Language Test Prep Courses",
    short: "Maximize your language scores",
    badge: "Test Prep",
    color: "bg-indigo-600",
    bg: "bg-gradient-to-br from-indigo-600 to-blue-900",
    desc: "Higher language scores directly boost your CRS ranking. Our structured prep courses for CELPIP and CAEL cover all modules with expert feedback and full practice tests.",
    points: ["CELPIP General Test — all four modules", "CAEL CE — academic English preparation", "Practice tests with targeted expert feedback", "Score improvement strategies & exam techniques", "Test registration & scheduling guidance"],
    image: CELPIPImg,
    slug: "language-course"
  },
  {
    icon: FileText,
    title: "WES / MCC ECA",
    short: "Credential assessment support",
    badge: "ECA Services",
    color: "bg-teal-600",
    bg: "bg-gradient-to-br from-teal-600 to-cyan-800",
    desc: "Educational Credential Assessments are required for Express Entry and many PNP programs. We guide you through WES and MCC ECA applications from start to completion.",
    points: ["WES ECA application preparation", "MCC ECA for internationally trained medical graduates", "Document compilation & verification guidance", "Degree equivalency & Express Entry integration", "MCC application strategy for healthcare professionals"],
    image: ECAImg,
    slug: "eca"
  },
  {
    icon: Globe,
    title: "Express Entry",
    short: "Federal skilled worker system",
    badge: "Most Popular",
    color: "bg-primary",
    bg: "bg-gradient-to-br from-primary to-secondary",
    desc: "Canada's flagship points-based immigration system for skilled workers. We optimize your CRS score, manage ITA cycles, and handle the complete application with precision.",
    points: ["CRS score optimization & gap analysis", "Federal Skilled Worker, Canadian Experience Class & FSTP", "ITA management & application submission", "Job offer & provincial nomination boosts", "End-to-end document preparation & IRCC compliance"],
    image: ExpressEntryImg,
    slug: "express-entry"
  },
  {
    icon: Heart,
    title: "Family Sponsorship",
    short: "Reuniting families in Canada",
    badge: "Reunification",
    color: "bg-rose-600",
    bg: "bg-gradient-to-br from-rose-600 to-pink-800",
    desc: "Reuniting families is at the heart of Canadian immigration values and our practice. Spousal, child, parent, and grandparent sponsorships handled with care and expertise.",
    points: ["Spousal & common-law partner sponsorship", "Inland and outland sponsorship pathways", "Dependent children & adoption applications", "Parent & Grandparent Program (PGP)", "Super Visa for parents & grandparents"],
    image: FamilySponsorshipImg,
    slug: "family-sponsorship"
  },
  {
    icon: MapPin,
    title: "Provincial Nominee Program",
    short: "80+ streams across Canada",
    badge: "High Success Rate",
    color: "bg-emerald-600",
    bg: "bg-gradient-to-br from-emerald-600 to-teal-700",
    desc: "Over 80 provincial streams across every province and territory. We identify the stream best suited to your profile and manage the full dual-process PR pathway.",
    points: ["Ontario, BC, Alberta, Saskatchewan, Manitoba & more", "Express Entry-linked streams (additional +600 CRS)", "Employer-driven & occupation-targeted streams", "International student graduate streams", "Full provincial application management"],
    image: PNPImg,
    slug: "pnp"
  },
  {
    icon: GraduationCap,
    title: "Study Permits",
    short: "From DLI selection to PGWP",
    badge: "Students",
    color: "bg-blue-600",
    bg: "bg-gradient-to-br from-blue-600 to-indigo-700",
    desc: "Complete study permit services from acceptance letter to PGWP, including Student Direct Stream processing and a clear strategy for your post-graduation PR pathway.",
    points: ["Study permit application & biometrics", "Student Direct Stream (SDS) — faster processing", "Post-Graduation Work Permit (PGWP) planning", "Study permit extensions & renewals", "Spousal open work permits during studies"],
    image: StudyPermitImg,
    slug: "study-permits"
  },
  {
    icon: CreditCard,
    title: "Super Visa",
    short: "10-year multi-entry for parents",
    badge: "Parents & Grandparents",
    color: "bg-pink-600",
    bg: "bg-gradient-to-br from-pink-600 to-rose-800",
    desc: "The Super Visa allows parents and grandparents of Canadian citizens or permanent residents to visit for up to 5 years per stay, with a visa validity of 10 years. We handle the complete application process.",
    points: ["Super Visa application preparation", "Medical insurance requirement guidance", "Financial documentation & letter of invitation", "Parent and grandparent eligibility assessment", "Multiple-entry benefits and extension options"],
    image: SuperVisaImg,
    slug: "super-visa"
  },
  {
    icon: HomeIcon,
    title: "Visitor Visas",
    short: "TRV, multi-entry & eTA",
    badge: "Temporary",
    color: "bg-orange-500",
    bg: "bg-gradient-to-br from-orange-500 to-amber-700",
    desc: "Whether for tourism, family visits, or business — we prepare compelling TRV applications with strong documentation and consistent approval histories.",
    points: ["Temporary Resident Visa (TRV)", "Multiple-entry visitor visas", "Electronic Travel Authorization (eTA)", "Visitor extensions & restoration of status", "Business visitor visas"],
    image: VisitVisaImg,
    slug: "visitor-visa"
  },
  {
    icon: Briefcase,
    title: "Work Permits",
    short: "Employer-specific & open permits",
    badge: "Workers",
    color: "bg-violet-600",
    bg: "bg-gradient-to-br from-violet-600 to-purple-800",
    desc: "LMIA-based, LMIA-exempt, and open work permit applications handled expertly — from international agreements to intra-company transfers and bridging permits.",
    points: ["Employer-specific & open work permits", "LMIA support & employer compliance guidance", "Bridging Open Work Permits (BOWP)", "Intra-Company Transfer (ICT) permits", "International agreements: CUSMA, GATS, bilateral"],
    image: WorkPermitImg,
    slug: "work-permits"
  },
  // NEW CARDS ADDED HERE
  {
    icon: FileText,
    title: "Application Review",
    short: "Pre-submission audits",
    badge: "Audit",
    color: "bg-purple-600",
    bg: "bg-gradient-to-br from-purple-600 to-indigo-800",
    desc: "Have an application ready but want an expert's eyes? Our RCIC will review your forms, documents, and letters to ensure maximum approval chances before submission.",
    points: ["Comprehensive document checklist audit", "Forms & letter accuracy review", "Red flag & risk identification", "CRS / profile optimization tips", "Detailed feedback & action plan"],
    image: ApplicationReviewImg,
    slug: "application-review"
  },
  {
    icon: BadgeCheck,
    title: "Immigration Consultation",
    short: "Strategic advice & profiling",
    badge: "Consultation",
    color: "bg-slate-600",
    bg: "bg-gradient-to-br from-slate-600 to-gray-800",
    desc: "Not sure where to start? Book a comprehensive consultation to assess your profile, identify the best immigration pathways, and get a personalized roadmap.",
    points: ["Comprehensive profile assessment", "Personalized immigration roadmap", "CRS score calculation & strategy", "Provincial eligibility review", "Q&A with an RCIC expert"],
    image: ConsultationImg,
    slug: "immigration-consultation"
  },
  {
    icon: Briefcase,
    title: "Spousal Open Work Permit",
    short: "SOWP for partners",
    badge: "Couples",
    color: "bg-cyan-600",
    bg: "bg-gradient-to-br from-cyan-600 to-blue-800",
    desc: "Spousal Open Work Permits allow the partners of international students or skilled workers to work anywhere in Canada. We handle the complete application process.",
    points: ["SOWP for student & worker spouses", "Proof of relationship guidance", "Financial & support documentation", "Online application submission", "Status tracking & renewal advice"],
    image: SOWPImg,
    slug: "SOWP"
  }
];

const usaServices: IntlService[] = [
  {
    icon: Plane,
    title: "USA Visit Visa",
    short: "B-1/B-2 Tourist & Business Visa",
    badgeBg: "bg-blue-700",
    countryFlag: USFlag,
    countryFlagAlt: "United States",
    countryBorderColor: flagBorderColors.usa,
    desc: "With 6 years of direct US Consulate experience in Dhaka, Riffat understands exactly what officers look for. We handle B-1/B-2 visitor visa preparation and interview coaching with precision.",
    points: ["B-1 Business / B-2 Tourist Visa", "DS-160 application preparation", "Interview coaching & preparation", "Strong ties documentation", "Supporting letter & financial evidence"],
    slug: "f1-rejection-to-canada-study"
  },
  {
    icon: GraduationCap,
    title: "USA Student Visa",
    short: "F-1 Student Visa",
    badgeBg: "bg-indigo-700",
    countryFlag: USFlag,
    countryFlagAlt: "United States",
    countryBorderColor: flagBorderColors.usa,
    desc: "Dreaming of studying in the United States? We guide you through the F-1 student visa process — from I-20 guidance to visa interview preparation — backed by insider knowledge from Riffat's US Consulate years.",
    points: ["F-1 Student Visa application", "SEVIS fee & DS-160 guidance", "University & program selection advice", "Financial documentation preparation", "Visa interview coaching & mock sessions"],
    slug: "f1-rejection-to-canada-study"
  },
];

const ukServices: IntlService[] = [
  {
    icon: Briefcase,
    title: "UK Visit Visa",
    short: "Standard Visitor Visa",
    badgeBg: "bg-blue-800",
    countryFlag: UKFlag,
    countryFlagAlt: "United Kingdom",
    countryBorderColor: flagBorderColors.uk,
    desc: "Planning to visit family, attend business meetings, or tourism in the United Kingdom? We prepare compelling UK Standard Visitor Visa applications with the right documentation strategy to maximize approval chances.",
    points: ["UK Standard Visitor Visa application", "Business visitor documentation", "Family visit & tourism applications", "Evidence of ties to home country", "Proof of funds & itinerary planning"],
    slug: "canada-bangladesh-immigration"
  },
];

const schengenPoints = (country: string): string[] => [
  `Schengen Tourist Visa for ${country}`,
  "Up to 90 days within any 180-day period",
  "Multiple-entry visa option available",
  "Hotel & flight booking assistance",
  "Complete document preparation & submission",
];

const schengenCountry = (
  name: string,
  desc: string,
  image: string,
): SchengenService => ({
  icon: MapPin,
  title: name,
  short: "Schengen Tourist Visa",
  badge: name,
  color: "bg-emerald-600",
  bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
  desc,
  image,
  points: schengenPoints(name),
  slug: "schengen-visa"
});

const schengenServices: SchengenService[] = [
  schengenCountry("Austria", "Explore imperial Vienna, musical Salzburg, and the Austrian Alps. We prepare your complete Schengen Tourist Visa application for Austria.", AustriaImg),
  schengenCountry("Belgium", "Discover Brussels, medieval Bruges, and the heart of EU Europe. We handle your Schengen Tourist Visa application for Belgium end-to-end.", BelgiumImg),
  schengenCountry("Bulgaria", "Visit Sofia, Plovdiv, and the Black Sea coast. We handle your Schengen Tourist Visa application for Bulgaria.", BulgariaImg),
  schengenCountry("Croatia", "Experience Dubrovnik, Split, and the stunning Adriatic coast with a Schengen Tourist Visa for Croatia.", CroatiaImg),
  schengenCountry("Czech Republic", "Wander through Prague's Old Town and Český Krumlov. We prepare your Schengen Tourist Visa for the Czech Republic.", CzechRepublicImg),
  schengenCountry("Denmark", "Discover Copenhagen, Viking history, and Danish design. We handle your Schengen Tourist Visa for Denmark.", DenmarkImg),
  schengenCountry("Estonia", "Explore Tallinn's medieval old town and Baltic coastline. We prepare your Schengen Tourist Visa for Estonia.", EstoniaImg),
  schengenCountry("Finland", "Experience Helsinki, Northern Lights, and Finnish lakeland. We handle your Schengen Tourist Visa for Finland.", FinlandImg),
  schengenCountry("France", "From Paris to the Riviera, vineyards to Mont Saint-Michel. We prepare your Schengen Tourist Visa for France.", FranceImg),
  schengenCountry("Germany", "Explore Berlin, Bavaria, the Romantic Road, and Black Forest. We handle your Schengen Tourist Visa for Germany.", GermanyImg),
  schengenCountry("Greece", "Discover Athens, Santorini, Mykonos, and ancient ruins. We prepare your Schengen Tourist Visa for Greece.", GreeceImg),
  schengenCountry("Hungary", "Visit Budapest's thermal baths, Lake Balaton, and historic towns. We handle your Schengen Tourist Visa for Hungary.", HungaryImg),
  schengenCountry("Iceland", "Experience Reykjavik, geysers, glaciers, and Northern Lights. We prepare your Schengen Tourist Visa for Iceland.", IcelandImg),
  schengenCountry("Italy", "From Rome to Florence, Venice to the Amalfi Coast. We handle your Schengen Tourist Visa for Italy.", ItalyImg),
  schengenCountry("Latvia", "Explore Riga's Art Nouveau architecture and the Baltic coastline. We prepare your Schengen Tourist Visa for Latvia.", LatviaImg),
  schengenCountry("Liechtenstein", "Discover the Alpine principality between Switzerland and Austria. We handle your Schengen Tourist Visa for Liechtenstein.", LiechtensteinImg),
  schengenCountry("Lithuania", "Visit Vilnius, Kaunas, and the Curonian Spit. We prepare your Schengen Tourist Visa for Lithuania.", LithuaniaImg),
  schengenCountry("Luxembourg", "Explore the Grand Duchy's castles, valleys, and EU institutions. We handle your Schengen Tourist Visa for Luxembourg.", LuxembourgImg),
  schengenCountry("Malta", "Discover Valletta, Gozo, ancient temples, and Mediterranean beaches. We prepare your Schengen Tourist Visa for Malta.", MaltaImg),
  schengenCountry("Netherlands", "Explore Amsterdam's canals, tulip fields, and windmills. We handle your Schengen Tourist Visa for the Netherlands.", NetherlandsImg),
  schengenCountry("Norway", "Experience fjords, Northern Lights, and Bergen's colorful waterfront. We prepare your Schengen Tourist Visa for Norway.", NorwayImg),
  schengenCountry("Poland", "Visit Warsaw, Kraków, Auschwitz, and the Tatra Mountains. We handle your Schengen Tourist Visa for Poland.", PolandImg),
  schengenCountry("Portugal", "Discover Lisbon, Porto, the Algarve, and Madeira. We prepare your Schengen Tourist Visa for Portugal.", PortugalImg),
  schengenCountry("Romania", "Explore Bucharest, Transylvania, and Carpathian castles. We handle your Schengen Tourist Visa for Romania.", RomaniaImg),
  schengenCountry("Slovakia", "Visit Bratislava, the High Tatras, and medieval castles. We prepare your Schengen Tourist Visa for Slovakia.", SlovakiaImg),
  schengenCountry("Slovenia", "Discover Ljubljana, Lake Bled, and the Julian Alps. We handle your Schengen Tourist Visa for Slovenia.", SloveniaImg),
  schengenCountry("Spain", "From Barcelona to Madrid, Andalusia to the Basque Country. We prepare your Schengen Tourist Visa for Spain.", SpainImg),
  schengenCountry("Sweden", "Explore Stockholm's archipelago, Lapland, and Swedish design. We handle your Schengen Tourist Visa for Sweden.", SwedenImg),
  schengenCountry("Switzerland", "Experience the Alps, Lake Geneva, Zurich, and scenic rail journeys. We prepare your Schengen Tourist Visa for Switzerland.", SwitzerlandImg),
];

const highlights: Highlight[] = [
  { icon: Shield, title: "RCIC Licensed — Not Just an Agent", desc: "Riffat holds RCIC license R710078, regulated by the CICC. Legal protection and accountability every step of the way." },
  { icon: Globe, title: "Dual US + Canadian Expertise", desc: "6 years at the US Consulate in Dhaka. 3+ years at Canadian immigration law firms. Perspective that few consultants possess." },
  { icon: BadgeCheck, title: "End-to-End Service", desc: "From language test prep and ECA to final application filing — we handle everything under one roof so nothing falls through the cracks." },
];

// Compact list of all international services for "All Of Our Services" section
const schengenCompactService: IntlService = {
  icon: Plane,
  title: "Schengen Visa",
  short: "Tourist Visa for 29 countries",
  badgeBg: "bg-emerald-600",
  countryFlag: EUFlag,
  countryFlagAlt: "European Union",
  countryBorderColor: flagBorderColors.eu,
  desc: "We process Schengen Tourist Visa applications for all 29 member countries. Browse each destination and let us prepare your complete application.",
  points: schengenPoints("Schengen Area"),
  slug: "schengen-tourist-visa-application-service"
};

const allIntlServices: IntlService[] = [...usaServices, ...ukServices, schengenCompactService];

// ── Utility & Hooks ──
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") return window.matchMedia(query).matches;
    return false;
  });
  useEffect(() => {
    const media = window.matchMedia(query);
    const updateMatch = () => setMatches(media.matches);
    updateMatch();
    media.addEventListener("change", updateMatch);
    return () => media.removeEventListener("change", updateMatch);
  }, [query]);
  return matches;
}

// ── FlagIcon3D: Subtle 3D border, white bg, white fill ──
function FlagIcon3D({
  src,
  alt,
  borderColor,
  size = "md",
}: {
  src: string;
  alt: string;
  borderColor: string;
  size?: "sm" | "md" | "lg";
}) {
  const cfg = {
    sm: { wrap: "w-8 h-8", img: "h-5 w-5", r: 8, bw: 1 },
    md: { wrap: "w-11 h-11", img: "h-7 w-7", r: 12, bw: 1.5 },
    lg: { wrap: "w-14 h-14", img: "h-9 w-9", r: 14, bw: 1.5 },
  }[size];

  return (
    <div
      className={`${cfg.wrap} flex items-center justify-center shrink-0 overflow-hidden bg-white`}
      style={{
        borderRadius: cfg.r,
        borderWidth: cfg.bw,
        borderStyle: "solid",
        borderColor,
        boxShadow: `0 1px 3px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(0,0,0,0.04)`,
      }}
      aria-hidden="true"
    >
      <img src={src} alt={alt} className={`${cfg.img} object-cover`} />
    </div>
  );
}

// ── Reusable UI Components ──
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

function SecondaryServicesSection({ badgeText, title, subtitle, children, className = "", titleId }: SecondarySectionProps) {
  return (
    <section className={`py-12 sm:py-16 ${className}`} aria-label={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">{badgeText}</span>
            <h2 id={titleId} className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground font-normal line-clamp-2 text-sm sm:text-base">{subtitle}</p>}
          </motion.div>
          {children}
        </Reveal>
      </div>
    </section>
  );
}

function InternationalServiceCard({ svc }: { svc: IntlService }) {
  const [_, navigate] = useLocation();
  return (
    <motion.article
      variants={fadeUp}
      className="bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      <div className="flex items-center gap-3 sm:gap-4 mb-5">
        <FlagIcon3D src={svc.countryFlag} alt={svc.countryFlagAlt} borderColor={svc.countryBorderColor} />
        <div>
          <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full text-white ${svc.badgeBg} mb-1`}>
            <img src={svc.countryFlag} alt="" className="h-3.5 w-3.5 object-contain rounded-sm" aria-hidden="true" />
            {svc.short}
          </div>
          <h3 className="font-serif font-bold text-foreground text-base sm:text-lg leading-tight">{svc.title}</h3>
        </div>
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed mb-5 font-normal flex-1 line-clamp-2">{svc.desc}</p>
      <ul className="space-y-2 mb-6" role="list">
        {svc.points.map((pt) => (
          <li key={pt} className="flex items-start gap-2 text-sm text-foreground/75">
            <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex flex-col sm:flex-row items-stretch gap-3">
        <button 
          onClick={() => svc.slug && navigate(`/${svc.slug}`)}
          className="sm:flex-1 bg-transparent hover:bg-gray-100 text-foreground border border-gray-200 hover:border-gray-300 rounded-xl py-3 px-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          View details
        </button>
        <a 
          href="https://riffathmohaimen.setmore.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={`Book a consultation for ${svc.title}`} 
          className="sm:flex-1 bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/20 hover:border-primary rounded-xl py-3 px-4 text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          Book Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </motion.article>
  );
}

function CompactServiceCard({ svc }: { svc: CanadaService | IntlService }) {
  const [_, navigate] = useLocation();
  const Icon = svc.icon;
  const isCanadaService = 'color' in svc;
  const colorClass = isCanadaService ? (svc as CanadaService).color : (svc as IntlService).badgeBg;
  
  return (
    <motion.div variants={fadeUp}>
      <div 
        onClick={() => svc.slug && navigate(`/${svc.slug}`)}
        className="group bg-white hover:bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 rounded-2xl p-4 sm:p-5 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col"
      >
        <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center mb-3 shadow-sm`}>
          <Icon className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <h3 className="font-serif font-bold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">{svc.title}</h3>
        <p className="text-muted-foreground text-xs leading-relaxed font-normal line-clamp-2">{svc.short}</p>
        <div className="mt-auto pt-3 flex items-center gap-1 text-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity font-medium">
          Book Consultation <ArrowRight className="h-3 w-3" aria-hidden="true" />
        </div>
      </div>
    </motion.div>
  );
}

// ── High-Performance Premium 3D Carousel ──
function PremiumCarousel3D({ services, initialIndex = 0 }: { services: CarouselService[]; initialIndex?: number }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const length = services.length;
  const dragRef = useRef({ startX: 0, active: false });
  const [_, navigate] = useLocation();

  const isMobile = useMediaQuery("(max-width: 639px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");
  
  const cardW = isMobile ? 300 : 340;
  const cardH = isMobile ? 450 : 540;
  
  const maxOffset = isMobile ? 1 : 2;
  const maxRenderOffset = maxOffset + 1;

  const goTo = useCallback((dir: number) => setCurrentIndex(p => (p + dir + length) % length), [length]);
  const handleNext = useCallback(() => goTo(1), [goTo]);
  const handlePrev = useCallback(() => goTo(-1), [goTo]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(handleNext, 5000);
    return () => clearInterval(t);
  }, [isPaused, handleNext]);

  const getOffset = (idx: number) => {
    let o = idx - currentIndex;
    if (o > length / 2) o -= length;
    if (o < -length / 2) o += length;
    return o;
  };

  const getPos = (offset: number) => {
    const abs = Math.abs(offset);
    if (abs > maxRenderOffset) return null;
    
    const x = offset * cardW * 0.65;
    const scale = 1 - abs * 0.1;
    let opacity = 0;
    if (abs === 0) opacity = 1;
    else if (abs === 1) opacity = isMobile ? 0.3 : 0.5;
    else if (abs === 2) opacity = isMobile ? 0 : 0.2;
    
    const z = 30 - abs * 10;
    const rotateY = offset * -15;
    
    return { x, s: scale, o: opacity, z, r: rotateY };
  };

  const onDown = (e: React.PointerEvent) => { 
    dragRef.current = { startX: e.clientX, active: true }; 
    setIsPaused(true); 
  };
  const onUp = (e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    const d = e.clientX - dragRef.current.startX;
    dragRef.current.active = false;
    setIsPaused(false);
    if (Math.abs(d) > 50) (d > 0 ? handlePrev : handleNext)();
  };

  return (
    <div
      className="relative w-full flex items-center justify-center overflow-hidden focus:outline-none rounded-2xl select-none py-8"
      style={{ minHeight: cardH + 60 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); } if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); } }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Services carousel"
    >
      <div className="relative flex items-center justify-center w-full" style={{ perspective: 1200 }}>
        <div 
          className="relative" 
          style={{ width: cardW, height: cardH }} 
          onPointerDown={onDown} 
          onPointerUp={onUp} 
          onPointerCancel={() => { dragRef.current.active = false; setIsPaused(false); }}
        >
          {services.map((service, index) => {
            const offset = getOffset(index);
            const pos = getPos(offset);
            if (!pos) return null;
            const active = offset === 0;
            return (
              <div
                key={service.title}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: cardW, 
                  height: cardH, 
                  marginTop: -cardH / 2, 
                  marginLeft: -cardW / 2, 
                  zIndex: pos.z,
                  transform: `translateX(${pos.x}px) scale(${pos.s}) rotateY(${pos.r}deg)`,
                  opacity: pos.o,
                  transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  cursor: active ? "pointer" : "default",
                  pointerEvents: active ? "auto" : "none",
                  touchAction: "pan-y",
                }}
                onClick={() => active && service.slug && navigate(`/${service.slug}`)}
              >
                <div className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black ${active ? "group" : ""}`}>
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.image})` }} />
                  {!active && <div className="absolute inset-0 bg-black/30" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                  {active && <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none transition-all duration-500 group-hover:ring-white/40" />}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-2 drop-shadow-lg">{service.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2 drop-shadow-md mb-4 sm:mb-5">{service.desc}</p>
                    {active && (
                      <motion.div 
                        className="flex items-center justify-center gap-2 sm:gap-3 w-full flex-nowrap"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => service.slug && navigate(`/${service.slug}`)}
                          className="inline-flex items-center gap-2 bg-transparent text-white border border-white/50 hover:bg-white/10 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          View details
                        </button>
                        <motion.a
                          href="https://riffathmohaimen.setmore.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-white text-black px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold hover:bg-white/90 transition-colors whitespace-nowrap"
                        >
                          Book Consultation <ArrowRight className="w-3 h-3" />
                        </motion.a>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button onClick={handlePrev} className="absolute left-2 sm:left-4 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Previous item">
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button onClick={handleNext} className="absolute right-2 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label="Next item">
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

const SchengenSectionBlock = () => (
  <section className="py-12 sm:py-16 bg-white border-t border-gray-100" aria-labelledby="schengen-persistent-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <img src={EUFlag} alt="European Union" className="h-4 w-4 object-contain" aria-hidden="true" />
            Schengen Tourist Visa
          </div>
          <h2 id="schengen-persistent-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
            Schengen Tourist Visa Application
          </h2>
          <p className="text-muted-foreground font-normal leading-relaxed line-clamp-2 text-sm sm:text-base">
            We process Schengen Tourist Visa applications for all 29 member countries. Browse each destination — swipe or use arrows to explore.
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <PremiumCarousel3D services={schengenServices} />
        </motion.div>
      </Reveal>
    </div>
  </section>
);

const CanadaProgramsSectionBlock = () => (
  <section className="py-12 sm:py-16 bg-white border-t border-gray-100" aria-labelledby="canada-programs-heading">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Reveal>
        <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
            <img src={CanadaFlag} alt="Canada" className="h-4 w-4 object-contain" aria-hidden="true" />
            Canadian Immigration Programs
          </div>
          <h2 id="canada-programs-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
            Federal, Provincial & Specialized Services
          </h2>
          <p className="text-muted-foreground font-normal leading-relaxed line-clamp-2 text-sm sm:text-base">
            Browse each service — swipe or use arrows to explore. We assess your full profile and recommend the highest-probability pathway.
          </p>
        </motion.div>
        <motion.div variants={fadeUp}>
          <PremiumCarousel3D services={canadaServices} initialIndex={6} />
        </motion.div>
      </Reveal>
    </div>
  </section>
);

const UsaUkServicesSectionBlock = () => (
  <SecondaryServicesSection badgeText="Also Available" title="Our USA & UK Visa Services" subtitle="Backed by Riffat's 6+ years at the US Consulate and specialist UK visitor visa expertise." className="bg-gray-50 border-t border-gray-100">
    <div className="mb-10">
      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
        <img src={USFlag} alt="United States" className="h-4 w-4 object-contain" aria-hidden="true" />
        USA Visa Services
      </div>
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {usaServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
      </motion.div>
    </div>
    <div className="mt-10">
      <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
        <img src={UKFlag} alt="United Kingdom" className="h-4 w-4 object-contain" aria-hidden="true" />
        UK Visa Services
      </div>
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
        {ukServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
      </motion.div>
    </div>
  </SecondaryServicesSection>
);

const typingText = "All Of Our Services";

function useTypewriterEffect(text: string, speed: number = 100, startDelay: number = 300) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed);
      
      return () => clearInterval(interval);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
    };
  }, [inView, text, speed, startDelay]);

  return { displayText, isTyping, ref };
}

export default function ServicesPage() {
  const [activeRegion, setActiveRegion] = useState<Region>("canada");
  const { displayText, isTyping, ref: typingRef } = useTypewriterEffect(typingText);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 sm:pt-36 pb-10 sm:pb-16 bg-white" aria-label="Service category selector">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 sm:mb-5 block">Our Services</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-foreground mb-3 sm:mb-4 leading-tight">
              What service are you<br />
              <span className="text-gradient">looking for?</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-xl mx-auto font-normal leading-relaxed line-clamp-2">
              Select your destination — we'll show you the most relevant services first, led by RCIC Riffat H. Mohaimen.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row lg:flex-row items-stretch justify-center gap-3 sm:gap-4" role="tablist" aria-label="Select service region">
              {regions.map((r) => (
                <motion.button
                  key={r.id}
                  role="tab"
                  aria-selected={activeRegion === r.id}
                  onClick={() => setActiveRegion(r.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-3 sm:gap-4 px-4 sm:px-5 lg:px-6 py-3 sm:py-4 rounded-2xl border-2 transition-all duration-300 w-full sm:w-auto lg:flex-1 lg:max-w-[260px] text-left ${
                    activeRegion === r.id
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white"
                  }`}
                >
                  <FlagIcon3D src={r.flag} alt={r.flagAlt} borderColor={r.borderColor} />
                  <div className="text-left min-w-0">
                    <div className={`font-semibold text-sm whitespace-nowrap ${activeRegion === r.id ? "text-primary" : "text-foreground"}`}>{r.label}</div>
                    <div className="text-xs text-muted-foreground font-normal line-clamp-2">{r.tagline}</div>
                  </div>
                  {activeRegion === r.id && (
                    <motion.div layoutId="tab-indicator" className="absolute right-4 w-2 h-2 rounded-full bg-primary" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeRegion === "canada" && (
          <motion.div key="canada" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <section className="py-12 sm:py-16 bg-black" aria-labelledby="canada-heading">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                  <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                      <img src={CanadaFlag} alt="Canada" className="h-4 w-4 object-contain" aria-hidden="true" />
                      Canadian Immigration Programs
                    </div>
                    <h2 id="canada-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-3">
                      Federal, Provincial & Specialized Services
                    </h2>
                    <p className="text-gray-400 font-normal leading-relaxed line-clamp-2 text-sm sm:text-base">
                      Browse each service — swipe or use arrows to explore. We assess your full profile and recommend the highest-probability pathway.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <PremiumCarousel3D services={canadaServices} initialIndex={6} />
                  </motion.div>
                </Reveal>
              </div>
            </section>

            <UsaUkServicesSectionBlock />

            <SchengenSectionBlock />
          </motion.div>
        )}

        {activeRegion === "usa" && (
          <motion.div key="usa" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <SecondaryServicesSection badgeText="USA Visa Services" title="Our USA Visit & Student Visas" subtitle="Backed by Riffat's 6 years at the US Consulate in Dhaka — insider expertise on what officers look for." className="bg-gray-50" titleId="usa-heading">
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {usaServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
              </motion.div>
            </SecondaryServicesSection>

            <CanadaProgramsSectionBlock />

            <SecondaryServicesSection badgeText="Also Available" title="Our UK Visa Services" subtitle="We also assist with UK Standard Visitor Visa applications for tourism, family visits, and business travel." className="bg-gray-50 border-t border-gray-100">
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
                {ukServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
              </motion.div>
            </SecondaryServicesSection>

            <SchengenSectionBlock />
          </motion.div>
        )}

        {activeRegion === "uk" && (
          <motion.div key="uk" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <SecondaryServicesSection badgeText="UK Visa Services" title="Our UK Visit Visa Services" subtitle="Comprehensive UK Standard Visitor Visa preparation — for tourism, family visits, and business travel." className="bg-gray-50" titleId="uk-heading">
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
                {ukServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
              </motion.div>
            </SecondaryServicesSection>

            <CanadaProgramsSectionBlock />

            <SecondaryServicesSection badgeText="Also Available" title="Our USA Visa Services" subtitle="We handle B-1/B-2 visitor and F-1 student visa applications — backed by Riffat's 6 years at the US Consulate in Dhaka." className="bg-gray-50 border-t border-gray-100">
              <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {usaServices.map((svc) => <InternationalServiceCard key={svc.title} svc={svc} />)}
              </motion.div>
            </SecondaryServicesSection>

            <SchengenSectionBlock />
          </motion.div>
        )}

        {activeRegion === "schengen" && (
          <motion.div key="schengen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
            <section className="py-12 sm:py-16 bg-white border-t border-gray-100" aria-labelledby="schengen-heading">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Reveal>
                  <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-2 rounded-full mb-4">
                      <img src={EUFlag} alt="European Union" className="h-4 w-4 object-contain" aria-hidden="true" />
                      Schengen Tourist Visa
                    </div>
                    <h2 id="schengen-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-3">
                      Schengen Tourist Visa — 29 Countries
                    </h2>
                    <p className="text-muted-foreground font-normal leading-relaxed line-clamp-2 text-sm sm:text-base">
                      We process Schengen Tourist Visa applications for all 29 member countries. Browse each destination — swipe or use arrows to explore.
                    </p>
                  </motion.div>
                  <motion.div variants={fadeUp}>
                    <PremiumCarousel3D services={schengenServices} />
                  </motion.div>
                </Reveal>
              </div>
            </section>

            <CanadaProgramsSectionBlock />

            <UsaUkServicesSectionBlock />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-12 sm:py-16 bg-white border-t border-gray-100" aria-labelledby="all-services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center mb-8 sm:mb-10">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">At a Glance</span>
              <h2 id="all-services-heading" className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 min-h-[1.2em] flex justify-center items-center">
                <span ref={typingRef} aria-label={typingText}>
                  {displayText}
                  {isTyping && <span className="ml-1 w-[2px] h-[1em] bg-primary inline-block animate-pulse" />}
                </span>
              </h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {canadaServices.map((svc) => <CompactServiceCard key={svc.title} svc={svc} />)}
              {allIntlServices.map((svc) => <CompactServiceCard key={svc.title} svc={svc} />)}
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white border-t border-gray-100" aria-labelledby="service-highlights-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Our Difference</span>
              <h2 id="service-highlights-heading" className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">Why Choose Route 2 Migrate</h2>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <motion.div key={h.title} variants={fadeUp} className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 hover:border-primary/15 hover:shadow-lg hover:bg-white transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 sm:mb-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-2 text-base sm:text-lg">{h.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-normal line-clamp-2">{h.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gray-50" aria-label="Services page call to action">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 text-center" style={{ background: "linear-gradient(135deg, #0a0510 0%, #150a1e 100%)" }}>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/15 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative">
                <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-4 sm:mb-5" aria-hidden="true" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white mb-4 sm:mb-5">
                  Not Sure Which Program Fits?
                </h2>
                <p className="text-white/55 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto font-normal line-clamp-2">
                  Book a free consultation and RCIC Riffat H. Mohaimen will assess your full profile and recommend the highest-probability pathway — no obligation.
                </p>
                <a href="https://riffathmohaimen.setmore.com/" target="_blank" rel="noopener noreferrer" aria-label="Book a free consultation">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 sm:px-10 h-12 sm:h-14 text-sm font-semibold glow-primary hover:scale-105 transition-all duration-300">
                    Book Consultation <ArrowRight aria-hidden="true" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}