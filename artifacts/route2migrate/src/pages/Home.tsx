import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useInView, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight, Shield, Award, Clock, Users, Star, CheckCircle,
  Globe, Heart, Briefcase, GraduationCap, Home as HomeIcon,
  Building2, FileText, BadgeCheck, MapPin, Quote, ChevronRight, ChevronLeft,
  Sparkles, TrendingUp, Scale, Phone, Languages, BookOpen, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { FreeAssessmentForm } from "@/components/FreeAssessmentForm";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import riffatPhoto from "@/attached_assets/riffat.jpg";
import capicLogo from "@assets/Capic_logo_1782725044398.jpg";
import applyboardLogo from "@assets/applyboard-logo-png_seeklogo-525628_1782725044397.png";
import celpipLogo from "@assets/Celpip_Logo_1782725044400.png";
import caelLogo from "@assets/CAEL_logo_1782725044399.png";
import wesLogo from "@assets/Wes_Logo_1782725044400.png";
import joorneyLogo from "@assets/joorney_logo_1782725044398.svg";

// ── Fixed: properly typed easing tuple and Variants ──
const EASING: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASING } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const carouselServices = [
  {
    icon: Globe, title: "Express Entry", short: "Federal skilled worker system",
    badge: "Most Popular", color: "bg-primary", bg: "bg-gradient-to-br from-primary to-secondary",
    desc: "Canada's flagship points-based immigration system for skilled workers. We optimize your CRS score, manage ITA cycles, and handle the entire application with precision.",
    points: ["CRS score optimization & gap analysis", "Federal Skilled Worker & Canadian Experience Class", "ITA management & application submission", "Job offer & provincial nomination boosts", "Document preparation & IRCC compliance"],
  },
  {
    icon: MapPin, title: "Provincial Nominee Program", short: "80+ streams across Canada",
    badge: "High Success Rate", color: "bg-emerald-600", bg: "bg-gradient-to-br from-emerald-600 to-teal-700",
    desc: "Over 80 provincial streams across every province and territory. We identify the stream best suited to your profile and manage the dual-process PR pathway.",
    points: ["Ontario, BC, Alberta, Saskatchewan & more", "Express Entry-linked PNP streams (+600 CRS)", "Employer-driven & occupation-targeted streams", "International student & graduate streams", "Full provincial application management"],
  },
  {
    icon: GraduationCap, title: "Study Permits", short: "From DLI selection to PGWP",
    badge: "Students", color: "bg-blue-600", bg: "bg-gradient-to-br from-blue-600 to-indigo-700",
    desc: "Comprehensive study permit services from acceptance letter to PGWP — including Student Direct Stream processing and a clear strategy for your post-graduation PR pathway.",
    points: ["Study permit application & biometrics", "Student Direct Stream (SDS) — faster processing", "PGWP planning & future PR strategy", "Study permit extensions & renewals", "Spousal open work permits for students"],
  },
  {
    icon: Briefcase, title: "Work Permits", short: "Employer-specific & open permits",
    badge: "Workers", color: "bg-violet-600", bg: "bg-gradient-to-br from-violet-600 to-purple-800",
    desc: "LMIA-based, LMIA-exempt, and open work permit applications handled expertly — from international agreements to intra-company transfers and bridging permits.",
    points: ["Employer-specific & open work permits", "LMIA support & employer guidance", "Bridging Open Work Permits (BOWP)", "Intra-company transfers (ICT)", "International agreements (CUSMA/USMCA, GATS)"],
  },
  {
    icon: Heart, title: "Family Sponsorship", short: "Reuniting families in Canada",
    badge: "Reunification", color: "bg-rose-600", bg: "bg-gradient-to-br from-rose-600 to-pink-800",
    desc: "Reuniting families is at the heart of Canadian immigration values — and our practice. Spousal, child, parent, and grandparent sponsorships handled with care and expertise.",
    points: ["Spousal & common-law partner sponsorship", "Inland and outland sponsorship", "Dependent children & adoption", "Parent & Grandparent Program (PGP)", "Super Visa for parents & grandparents"],
  },
  {
    icon: HomeIcon, title: "Visitor & Super Visas", short: "TRV, multi-entry & Super Visa",
    badge: "Temporary", color: "bg-orange-500", bg: "bg-gradient-to-br from-orange-500 to-amber-700",
    desc: "Whether for tourism, family visits, or business — we prepare compelling temporary resident visa applications with strong documentation and approval track records.",
    points: ["Temporary Resident Visa (TRV)", "Multiple-entry visitor visas", "Super Visa (10-year multi-entry)", "Electronic Travel Authorization (eTA)", "Visitor extensions & restoration of status"],
  },
  {
    icon: Building2, title: "Business Immigration", short: "Entrepreneurs & investors",
    badge: "Entrepreneurs", color: "bg-amber-600", bg: "bg-gradient-to-br from-amber-600 to-yellow-800",
    desc: "Canada actively welcomes entrepreneurs. The Start-up Visa Program and Self-Employed pathway are our specialty for business-minded immigrants seeking Canadian residency.",
    points: ["Start-up Visa Program", "Self-Employed Persons Program", "C-11 Significant Benefit work permits", "Intra-Company Transfers for executives", "Business visitor visa documentation"],
  },
  {
    icon: FileText, title: "WES / MCC ECA", short: "Credential assessment support",
    badge: "ECA Services", color: "bg-teal-600", bg: "bg-gradient-to-br from-teal-600 to-cyan-800",
    desc: "Educational Credential Assessments are required for Express Entry and many PNP streams. We guide you through WES and MCC ECA applications from start to finish.",
    points: ["WES ECA application preparation", "MCC ECA for internationally trained medical graduates", "Document compilation & verification", "Degree equivalency guidance", "Integration with Express Entry profile"],
  },
  {
    icon: Languages, title: "CELPIP & CAEL Prep", short: "Maximize your language scores",
    badge: "Test Prep", color: "bg-indigo-600", bg: "bg-gradient-to-br from-indigo-600 to-blue-900",
    desc: "Higher language scores directly boost your CRS ranking. Our structured prep courses for CELPIP and CAEL cover all modules with expert feedback and practice tests.",
    points: ["CELPIP General Test — all four modules", "CAEL CE — academic English preparation", "Practice tests with expert feedback", "Score improvement strategies", "Test registration & scheduling guidance"],
  },
];

const stats = [
  { value: 500, suffix: "+", label: "Clients Helped" },
  { value: 95, suffix: "%", label: "Success Rate" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 2, suffix: "+", label: "Office Locations (CA & BD)" },
];

const whyUs = [
  { icon: Shield, title: "RCIC Licensed & CICC Regulated", desc: "Riffat holds RCIC license R710078, regulated by the CICC. You're legally protected — unauthorized consultants offer no recourse." },
  { icon: Globe, title: "Dual US + Canadian Expertise", desc: "6 years at the US Consulate in Dhaka gives Riffat rare insight into how visa officers think — perspective that directly benefits your file." },
  { icon: Users, title: "Personalized Strategy", desc: "Every client receives a custom immigration plan. No templates, no one-size-fits-all. Your background and goals shape every decision." },
  { icon: TrendingUp, title: "95%+ Success Rate", desc: "Across Express Entry, PNP, family sponsorship, and more. Over 500 successful applications. Our track record speaks for itself." },
  { icon: Clock, title: "Responsive & Dedicated", desc: "You'll never wonder about your case status. We're reachable, proactive, and provide regular updates throughout your process." },
  { icon: Award, title: "CAPIC Member", desc: "As a CAPIC member, Riffat stays at the forefront of immigration policy changes, IRCC processing updates, and new program opportunities." },
];

const processSteps = [
  { n: "01", title: "Consultation", desc: "We assess your profile, eligibility, and identify the immigration pathway that maximises your probability of approval." },
  { n: "02", title: "Strategy & Document Prep", desc: "We design your custom strategy and build a complete, audit-proof document package tailored to your program requirements." },
  { n: "03", title: "Application Filing", desc: "Our RCIC prepares and submits your application to IRCC with meticulous attention to every requirement and deadline." },
  { n: "04", title: "Approval & Arrival", desc: "Upon approval, we guide your next steps — landing preparations, settlement resources, and continued support." },
];

const testimonials = [
  {
    name: "Ms Haque",
    from: "Google Review",
    text: "Working with R M Immigration Services was such a great experience. It's a place where you can comfortably share your needs and get professional, reliable support. What truly sets them apart is their expertise — they know exactly what to do and how to handle each case with care and precision. Their excellent communication and easy accessibility make the whole process feel effortless and stress-free.",
    program: "Immigration Services",
  },
  {
    name: "Abdullah Asif",
    from: "Google Review · 2 months ago",
    text: "Ms Riffat and the Route2Migrate team are exceptional at what they do. They handled my SOWP application after it had initially been rejected on technical grounds when I was applying by myself. At every stage, the team maintained a high level of professionalism and provided round-the-clock support. They made a stressful process into a stress-free one. I highly recommend Route2Migrate to anyone that requires help with Canadian immigration.",
    program: "Spousal Open Work Permit",
  },
  {
    name: "Md Sayem Rais",
    from: "Google Review · 10 months ago",
    text: "Ms. Riffat is an amazing and very helpful person. She knows how to handle issues and is very experienced in her field. She is very kind and the way she takes care of and serves her clients is beyond imagination. A person can easily communicate with her. Thank you Riffat madam for your constant help in supporting me to get my PR card!",
    program: "Permanent Residency",
  },
  {
    name: "Maryam Noor Yunus",
    from: "Google Review · Last year",
    text: "Ms. Riffat has been such a wonderful person to talk to. I have consulted many lawyers — she is the only one who listened to my requirements patiently. She gave me relevant information truthfully and was willing to lend a helping hand. Very few people in her position have the time or patience to listen to our woes and want to help. She is a rare gem. Talk to her once and you will agree with what I have said.",
    program: "Immigration Consultation",
  },
  {
    name: "Afreen Alamgir",
    from: "Setmore Review · Verified Client",
    text: "Our experience was excellent. I applied for an open work spouse visa after a previous rejection and Ms Riffat's team handled everything with incredible professionalism. They knew exactly what documents were needed and ensured the file was complete and compelling. The application was approved and we are beyond grateful. Highly recommend Route 2 Migrate to anyone navigating immigration challenges.",
    program: "Spousal Open Work Permit",
  },
  {
    name: "Anika Rahman",
    from: "Setmore Review · Verified Client",
    text: "Miss Riffat has been very helpful and insightful regarding the entire immigration process. She provided genuine advice and realistic expectations — something I rarely found with other consultants. She did not over-promise and walked me through every step clearly and patiently. If you are serious about Canadian immigration, book a consultation with her. You will not be disappointed.",
    program: "Immigration Consultation",
  },
  {
    name: "Hassan Ul Abedin",
    from: "Setmore Review · Verified Client",
    text: "Highly satisfied with the consultation experience. She was specific, answered all my queries with patience, and gave logical explanations for each step of the process. It was a very productive session and I left with a clear plan of action. I would strongly recommend booking a consultation before making any major immigration decisions.",
    program: "Consultation",
  },
  {
    name: "Titlee Tabassum",
    from: "Facebook Review · Recommended",
    text: "Working with Riffat Mohaimen has been a blessing for our family. She handled both my father's Super Visa and our PR applications with seamless professionalism and heart. Riffat is brilliant, highly responsive, and truly goes above and beyond to turn a stressful process into a clear, successful path forward. We are so grateful for her guidance and couldn't have asked for a better RCIC. She is truly the best in the field!",
    program: "Super Visa + PR",
  },
  {
    name: "Taslim M Reza",
    from: "Facebook Review · Recommended",
    text: "A reliable place to discuss immigration and international education prospects. They are also very well-versed and expert in helping people who are planning to visit abroad for business and study purposes.",
    program: "Immigration Consulting",
  },
  {
    name: "Shezan Ahmed",
    from: "Facebook Review · Recommended",
    text: "I absolutely recommend Route 2 Migrate by RCIC Riffat Mohaimen for those who want to go to Canada. When my F-1 visa for the USA got rejected, I felt really stressed out and thought my dream of studying abroad was over. Then, my uncle recommended them, and I immediately reached out to start working on my Canada Student visa with my spouse. Rifat Mohaimen mam kept reassuring me, saying not to worry, that I had a great profile and my visa would be approved. After almost 3 months, my visa was approved, and throughout those months, I received tremendous support from their end. Whenever I had a question, I asked, and I got the answers almost immediately. What I appreciate the most is that they absolutely discouraged any unethical ways of doing things. After a few years, I am planning to contact them again for my PR application.",
    program: "Canada Study Permit",
  },
];

const faqs = [
  { q: "What is an RCIC and why does it matter?", a: "A Regulated Canadian Immigration Consultant (RCIC) is licensed by the CICC to represent clients before IRCC. Riffat holds RCIC license R710078. Working with a licensed RCIC means you're legally protected — unlicensed representatives offer no recourse if something goes wrong." },
  { q: "How long does the immigration process take?", a: "Processing varies by program: Express Entry typically 6–12 months; PNPs 12–24 months; spousal sponsorship 12–24 months. We provide realistic timelines during your consultation based on current IRCC processing data." },
  { q: "Can I apply from outside Canada?", a: "Yes. Most Canadian programs are fully accessible from abroad. Many of our clients have never been to Canada before their PR approval. We serve clients from over 50 countries worldwide." },
  { q: "What is an ECA and do I need one?", a: "An Educational Credential Assessment (ECA) verifies that your foreign degree is equivalent to a Canadian credential. It's required for Express Entry if your education was obtained outside Canada. We assist with both WES and MCC ECA applications." },
  { q: "Do you offer CELPIP or CAEL preparation?", a: "Yes — we offer comprehensive prep courses for both CELPIP and CAEL. A stronger language score directly boosts your CRS ranking in Express Entry, making all the difference between receiving an Invitation to Apply or not." },
  { q: "What are your fees?", a: "We operate on transparent, flat-fee pricing with no hidden charges. Government filing fees are paid directly to IRCC. During your consultation, we provide a full fee breakdown before any commitment." },
  { q: "What if my application is refused?", a: "A refusal is not the end. We review refusal reasons in detail, identify the strongest path forward — reapplication, administrative review, or an alternative program — and guide your recovery with a clear strategy." },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const [reviewIdx, setReviewIdx] = useState(0);
  const [reviewDir, setReviewDir] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);
  const reviewTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToReview = useCallback((idx: number, dir: number) => {
    setReviewDir(dir);
    setReviewIdx(idx);
  }, []);

  const nextReview = useCallback(() => {
    goToReview((reviewIdx + 1) % testimonials.length, 1);
  }, [reviewIdx, goToReview]);

  const prevReview = useCallback(() => {
    goToReview((reviewIdx - 1 + testimonials.length) % testimonials.length, -1);
  }, [reviewIdx, goToReview]);

  const resetTimer = useCallback(() => {
    if (reviewTimerRef.current) clearInterval(reviewTimerRef.current);
    reviewTimerRef.current = setInterval(() => {
      setReviewDir(1);
      setReviewIdx((i) => (i + 1) % testimonials.length);
    }, 6000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (reviewTimerRef.current) clearInterval(reviewTimerRef.current); };
  }, [resetTimer]);

  // ── Typing effect ──
  const TYPING_PHRASES = ["Express Entry","PNP Applications", "PR Applications", "C10/C11 Work Permits","Business Migration", "Study Permits", "Family Sponsorship", "Visitor Visas","Super Visas", "Spousal Open Work Permits", ];
  const [typedText, setTypedText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_PHRASES[phraseIdx];
    const isPausing = !isDeleting && typedText === current;
    const timeout = setTimeout(() => {
      if (isPausing) { setIsDeleting(true); return; }
      if (!isDeleting) {
        setTypedText(current.slice(0, typedText.length + 1));
      } else {
        if (typedText.length === 0) {
          setIsDeleting(false);
          setPhraseIdx((i) => (i + 1) % TYPING_PHRASES.length);
        } else {
          setTypedText(current.slice(0, typedText.length - 1));
        }
      }
    }, isPausing ? 2200 : isDeleting ? 50 : 100);
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText, isDeleting, phraseIdx]);

  return (
   <div className="min-h-screen bg-background overflow-x-clip">
      <Navbar />

      {/* ── HERO ── */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero section">
        {/* Background mesh */}
        <div className="absolute inset-0" aria-hidden="true" style={{
          background: "linear-gradient(135deg, #0a0510 0%, #0f0818 40%, #150a1e 70%, #0d0612 100%)"
        }} />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />

        {/* Gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <motion.div
            animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -20, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(193,59,27,0.18) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(153,53,0,0.12) 0%, transparent 70%)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(218,165,32,0.06) 0%, transparent 70%)" }}
          />
        </div>

        {/* Centered content */}
        <motion.div style={{ y: heroY }} className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 sm:pb-20 text-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-white uppercase tracking-[0.15em] sm:tracking-[0.18em] border border-primary/25 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/8 text-center">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                IRCC Licensed · CICC Registered · CAPIC Member
              </span>
            </motion.div>

            {/* H1 with typing effect */}
            <motion.h1
              variants={fadeUp}
              className="w-full flex flex-col items-center justify-center text-center font-serif font-bold leading-[1.1] mb-6"
            >
              <span
                className="text-white text-[clamp(1.8rem,5vw,4.25rem)]"
              >
                Expert Canadian Immigration for
              </span>

              <span
                className="min-h-[1.25em] text-[clamp(1.8rem,5vw,4.25rem)]"
              >
                <span className="text-gradient">{typedText}</span>
                <span className="text-primary/50 animate-pulse" aria-hidden="true">|</span>
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={fadeUp} className="text-base text-white/55 leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
              Expert Canadian immigration consulting led by RCIC <strong className="text-white/80 font-medium">Riffat H. Mohaimen</strong> (License R710078) — 10+ years of US and Canadian immigration experience at your service.
            </motion.p>

            {/* Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-12 sm:mb-16 justify-center">
              <a
                href="https://riffathmohaimen.setmore.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a consultation via Setmore"
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-13 text-sm font-semibold glow-primary hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                  Book Consultation <ArrowRight aria-hidden="true" />
                </Button>
              </a>
              <Link href="/services" aria-label="Explore all immigration services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/8 rounded-full px-8 h-13 text-sm bg-white/5 backdrop-blur-sm w-full sm:w-auto">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" aria-hidden="true" />
      </section>

      {/* ── CREDENTIAL STRIP ── */}
      <section 
        className="relative bg-white border-y border-gray-100/80 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.06),0_2px_4px_-2px_rgba(0,0,0,0.04)] py-6 z-10" 
        aria-label="Credentials"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FIX: Made responsive grid layout for mobile and flex for desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center sm:justify-center gap-x-4 gap-y-6 sm:gap-6 md:gap-10">
            {[
              { label: "RCIC", sub: "License R710078" },
              { label: "CICC", sub: "Member in Good Standing" },
              { label: "CAPIC", sub: "Member" },
              { label: "10+ Years", sub: "US & Canadian Immigration" },
              { label: "500+", sub: "Successful Applications" },
            ].map((c) => (
              <div key={c.label} className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2.5 text-center sm:text-left">
                <div className="w-9 h-9 rounded-xl bg-primary/8 border border-primary/15 flex items-center justify-center shrink-0 shadow-sm">
                  <BadgeCheck className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{c.label}</div>
                  <div className="text-xs text-muted-foreground font-normal">{c.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES CAROUSEL ── */}
      <section id="services" className="py-20 sm:py-24 bg-gray-50" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Our Services</span>
              <h2 id="services-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Every Pathway to Canada
              </h2>
              <p className="text-muted-foreground leading-relaxed font-normal">
                Comprehensive immigration solutions — from federal programs to language test preparation — all under one roof.
              </p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <ServiceCarousel services={carouselServices} />
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT RIFFAT ── */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="about-preview-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <motion.div variants={fadeUp} className="relative">
                <div className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                  <img src={riffatPhoto} alt="RCIC Riffat H. Mohaimen, Founder and CEO of Route 2 Migrate" className="w-full h-full object-cover object-top" />
                </div>
                {/* FIX: Adjusted floating badges to stay inside image bounds on mobile to prevent overflow */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 sm:-top-4 sm:-right-4 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-gray-100"
                >
                  <div className="text-2xl sm:text-3xl font-serif font-bold text-primary">R710078</div>
                  <div className="text-gray-400 text-xs font-normal mt-0.5">RCIC License No.</div>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                  className="absolute bottom-4 left-4 sm:-bottom-4 sm:-left-4 bg-primary rounded-2xl p-4 sm:p-5 shadow-xl"
                >
                  <div className="flex gap-0.5 mb-1" aria-label="5 stars">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-white text-white" aria-hidden="true" />)}
                  </div>
                  <div className="text-white text-sm font-semibold">500+ Clients</div>
                  <div className="text-white/70 text-xs font-normal">Successfully guided</div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeUp}>
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Meet Your RCIC</span>
                <h2 id="about-preview-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-2">
                  Riffat H. Mohaimen
                </h2>
                <p className="text-primary font-medium mb-5 text-sm">Owner & CEO · RCIC R710078 · CICC & CAPIC Member</p>

                <div className="space-y-3 text-muted-foreground leading-relaxed mb-7 text-sm font-normal">
                  <p>Riffat H. Mohaimen is a Regulated Canadian Immigration Consultant in good standing, licensed by the CICC under license number R710078. She holds a Master's degree from Durham University (UK) and a Graduate Diploma in Canadian Immigration Law.</p>
                  <p>With nearly 6 years at the US Consulate in Dhaka adjudicating immigration visa, and 3+ years at multinational Canadian immigration law firms, she brings 10+ years of combined US and Canadian immigration expertise that few consultants can match.</p>
                </div>

                <div className="space-y-2 mb-8">
                  {[
                    "RCIC Licensed — CICC Member, License R710078",
                    "CAPIC Member — Canadian Association of Professional Immigration Consultants",
                    "Master's Degree, Durham University, United Kingdom",
                    "6 Years — US Consulate, Dhaka (Immigration & Non-Immigration)",
                    "3+ Years — Multinational Immigration Law Firms, Canada",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-sm text-muted-foreground font-normal">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/about" aria-label="View full profile of Riffat H. Mohaimen">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 glow-primary-sm transition-all duration-300">
                    View Full Profile <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STATS ── */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(12 75% 38%) 0%, hsl(17 100% 22%) 100%)" }}
        aria-label="Key statistics"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-2">
                  <AnimatedCounter target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section id="why-us" className="py-20 sm:py-24 bg-gray-50" aria-labelledby="why-us-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Why Choose Us</span>
              <h2 id="why-us-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                The Advantage of Expert Representation
              </h2>
              <p className="text-muted-foreground leading-relaxed font-normal">Immigration is a high-stakes decision. Working with a licensed RCIC who has seen both sides of the process is a different level of advantage.</p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {whyUs.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title} variants={fadeUp} className="bg-white rounded-2xl p-5 sm:p-7 border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-normal">{item.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="process-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">How It Works</span>
              <h2 id="process-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                From First Call to Canadian Soil
              </h2>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {processSteps.map((step, i) => (
                <motion.div key={step.n} variants={fadeUp} className="relative">
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-7 h-full hover:border-primary/20 hover:shadow-lg transition-all duration-300 group">
                    <div className="text-4xl sm:text-5xl font-serif font-bold text-primary/15 group-hover:text-primary/25 transition-colors mb-5 leading-none">{step.n}</div>
                    <h3 className="font-serif font-bold text-foreground mb-2 text-lg">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed font-normal">{step.desc}</p>
                  </div>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 items-center justify-center z-10 bg-white rounded-full border border-gray-100 shadow-sm" aria-hidden="true">
                      <ChevronRight className="h-4 w-4 text-gray-300" />
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-20 sm:py-24 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Success Stories</span>
              <h2 id="testimonials-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                Lives Changed, Families United
              </h2>
            </motion.div>

            {/* Carousel */}
            <div className="relative max-w-3xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <AnimatePresence mode="wait" custom={reviewDir}>
                  <motion.div
                    key={reviewIdx}
                    custom={reviewDir}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit: (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.4, ease: EASING }}
                    className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-lg"
                    aria-label={`Testimonial from ${testimonials[reviewIdx].name}`}
                  >
                    <div className="flex gap-0.5 mb-5" aria-label="5 stars">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" aria-hidden="true" />)}
                    </div>
                    <Quote className="h-8 w-8 text-primary/20 mb-4" aria-hidden="true" />
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base font-normal mb-8">
                      "{testimonials[reviewIdx].text}"
                    </p>
                    <div className="flex items-center justify-between pt-5 border-t border-gray-100 gap-4">
                      <div>
                        <div className="font-semibold text-foreground">{testimonials[reviewIdx].name}</div>
                        <div className="text-gray-400 text-xs sm:text-sm mt-0.5 font-normal">{testimonials[reviewIdx].from}</div>
                      </div>
                      <span className="text-xs border border-primary/20 text-primary px-3 py-1.5 rounded-full font-medium text-center">{testimonials[reviewIdx].program}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => { prevReview(); resetTimer(); }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shrink-0"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="flex gap-1.5 sm:gap-2 justify-center" role="tablist" aria-label="Review navigation">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      role="tab"
                      aria-selected={i === reviewIdx}
                      onClick={() => { goToReview(i, i > reviewIdx ? 1 : -1); resetTimer(); }}
                      className={`transition-all duration-300 rounded-full ${i === reviewIdx ? "w-6 h-2 bg-primary" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => { nextReview(); resetTimer(); }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shrink-0"
                  aria-label="Next review"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="py-16 sm:py-20 bg-white border-y border-gray-100" aria-label="Our partners and affiliations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Trusted Network</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-foreground mb-3">Our Partners & Affiliations</h2>
              <p className="text-muted-foreground font-normal max-w-xl mx-auto text-sm sm:text-base">We work within a trusted network of regulated bodies, educational platforms, and credential authorities to provide end-to-end immigration support.</p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "CAPIC", full: "Canadian Association of Professional Immigration Consultants", logo: capicLogo, href: "https://www.capic.ca", bg: "bg-white" },
                { name: "ApplyBoard", full: "International Student Recruitment Platform", logo: applyboardLogo, href: "https://www.applyboard.com", bg: "bg-white" },
                { name: "Joorney", full: "Business Immigration Strategy & Documents", logo: joorneyLogo, href: "https://joorney.com", bg: "bg-white" },
                { name: "CELPIP", full: "Canadian English Language Proficiency Index Program", logo: celpipLogo, href: "https://www.celpip.ca", bg: "bg-white" },
                { name: "CAEL", full: "Canadian Academic English Language Assessment", logo: caelLogo, href: "https://www.cael.ca", bg: "bg-white" },
                { name: "WES", full: "World Education Services — Credential Assessment", logo: wesLogo, href: "https://www.wes.org", bg: "bg-white" },
              ].map((p) => (
                <motion.a
                  key={p.name}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={fadeUp}
                  className="flex flex-col items-center justify-center gap-3 p-4 sm:p-6 rounded-2xl border-2 border-gray-100 bg-white hover:border-primary/20 hover:shadow-md transition-all duration-200 hover:-translate-y-1 group cursor-pointer"
                  title={p.full}
                  aria-label={`Visit ${p.name} — ${p.full}`}
                >
                  <img src={p.logo} alt={p.name} className="h-8 sm:h-10 w-auto object-contain max-w-full" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground text-center leading-tight group-hover:text-primary transition-colors">{p.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-24 bg-white" aria-label="Call to action">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="relative rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden p-8 sm:p-12 md:p-20 text-center" style={{ background: "linear-gradient(135deg, #0a0510 0%, #150a1e 100%)" }}>
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/10 rounded-full blur-[60px]" />
              </div>
              <div className="relative">
                <span className="text-xs font-semibold text-primary/80 uppercase tracking-[0.2em] mb-4 block">Ready to Begin?</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
                  Your Canadian Dream
                  <span className="block text-gradient">Deserves an Expert.</span>
                </h2>
                <p className="text-white/50 max-w-xl mx-auto leading-relaxed mb-10 font-normal text-sm sm:text-base">
                  Book your complimentary consultation today. Honest, expert guidance from a licensed RCIC with 10+ years of real-world immigration experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://riffathmohaimen.setmore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a consultation via Setmore"
                    className="w-full sm:w-auto"
                  >
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 sm:px-10 h-14 text-sm font-semibold glow-primary hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                      Book Consultation <ArrowRight aria-hidden="true" />
                    </Button>
                  </a>
                  <a href="tel:+14373328242" aria-label="Call our Canadian office" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/8 rounded-full px-6 sm:px-10 h-14 text-sm bg-white/5 w-full sm:w-auto">
                      <Phone aria-hidden="true" /> +1 437 332 8242
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 sm:py-24 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">FAQ</span>
              <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Common Questions</h2>
              <p className="text-muted-foreground font-normal text-sm sm:text-base">Everything you need to know before getting started.</p>
            </motion.div>
            <motion.div variants={fadeUp}>
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="bg-white border border-gray-100 rounded-2xl px-4 sm:px-6 data-[state=open]:border-primary/25 transition-colors shadow-sm">
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary hover:no-underline py-5 text-sm sm:text-base">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-sm font-normal">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="assessment" className="py-20 sm:py-24 bg-white" aria-labelledby="assessment-form-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* FIX: Replaced motion.div with plain div to prevent compositor layer jitter */}
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Get Started</span>
            <h2 id="assessment-form-heading" className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-3">Request Your Free Assessment</h2>
            <p className="text-muted-foreground font-normal text-sm sm:text-base">Our RCIC reviews every inquiry and responds within 24 hours.</p>
          </div>
          
          {/* FIX: REMOVED overflow-hidden from this div */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-8 md:p-12">
            <FreeAssessmentForm />
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="py-16 sm:py-20 bg-[#08080f] relative overflow-hidden" aria-labelledby="newsletter-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-primary/8 rounded-full blur-[90px] -translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-[300px] h-[200px] bg-secondary/6 rounded-full blur-[70px] -translate-y-1/2" />
        </div>
        <Reveal className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-semibold text-primary/90 uppercase tracking-[0.18em] border border-primary/25 px-4 py-2 rounded-full bg-primary/8 mb-6">
            <Mail className="h-3 w-3" aria-hidden="true" />
            Stay Informed
          </motion.div>
          <motion.h2 id="newsletter-heading" variants={fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4 leading-tight">
            Immigration Updates,<br />
            <span className="text-gradient">Straight to Your Inbox</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-sm sm:text-base mb-8 font-normal leading-relaxed">
            Get the latest Express Entry draws, IRCC policy changes, and expert immigration tips from RCIC Riffat H. Mohaimen — no spam, unsubscribe anytime.
          </motion.p>
          <motion.div variants={fadeUp}>
            {newsletterDone ? (
              <div className="flex items-center justify-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4">
                <CheckCircle className="h-5 w-5 text-green-400 shrink-0" aria-hidden="true" />
                <p className="text-green-300 font-medium text-sm sm:text-base">You're subscribed! Welcome to the Route 2 Migrate community.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail) setNewsletterDone(true);
                }}
                className="flex flex-col sm:flex-row gap-3"
                aria-label="Newsletter subscription form"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 rounded-full px-5 h-13 bg-white/8 border border-white/15 text-white placeholder:text-white/35 text-sm focus:outline-none focus:border-primary/60 focus:bg-white/12 transition-all duration-200"
                  aria-label="Email address for newsletter"
                />
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-13 font-semibold shrink-0 hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </form>
            )}
            <p className="text-white/25 text-xs mt-4">By subscribing, you agree to receive email updates from Route 2 Migrate. We respect your privacy.</p>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}