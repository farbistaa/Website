// src/pages/PNP.tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, User,
  BookOpen, Tag, ArrowRight, Check,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const ease = { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: ease },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// Hook for responsive card sizing
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

// 3D Carousel Component for PNP Streams
function PNPCarousel3D({ programs }: { programs: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = programs.length;
  const dragRef = useRef({ startX: 0, active: false });

  const isMobile = useMediaQuery("(max-width: 639px)");
  
  const cardW = isMobile ? 300 : 380;
  const cardH = isMobile ? 550 : 620; 
  
  const maxOffset = 2;
  const maxRenderOffset = maxOffset + 1;

  const goTo = useCallback((dir: number) => setCurrentIndex(p => (p + dir + length) % length), [length]);
  const handleNext = useCallback(() => goTo(1), [goTo]);
  const handlePrev = useCallback(() => goTo(-1), [goTo]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(handleNext, 7000);
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
      className="relative w-full flex items-center justify-center overflow-hidden focus:outline-none rounded-2xl select-none py-12"
      style={{ minHeight: cardH + 100 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); } if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); } }}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Provincial Nominee Programs carousel"
    >
      <div className="relative flex items-center justify-center w-full" style={{ perspective: 1200 }}>
        <div 
          className="relative" 
          style={{ width: cardW, height: cardH }} 
          onPointerDown={onDown} 
          onPointerUp={onUp} 
          onPointerCancel={() => { dragRef.current.active = false; setIsPaused(false); }}
        >
          {programs.map((pkg, index) => {
            const offset = getOffset(index);
            const pos = getPos(offset);
            if (!pos) return null;
            const active = offset === 0;
            return (
              <div
                key={pkg.title}
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
              >
                <div className={`relative w-full h-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 ${active ? "group" : ""}`}>
                  <div className={`absolute inset-0 ${pkg.bg}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {active && <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none transition-all duration-500 group-hover:ring-white/40" />}
                  
                  <div className="absolute top-0 left-0 right-0 p-5 flex justify-center items-center">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-center">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 drop-shadow-lg">{pkg.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2 drop-shadow-md mb-4 sm:mb-5">{pkg.desc}</p>
                    
                    {active && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ul className="space-y-2 mb-6 max-w-[300px] mx-auto text-left">
                          {pkg.points.map((pt: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                              <Check className="h-4 w-4 text-white mt-0.5 shrink-0" aria-hidden="true" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button 
        onClick={handlePrev} 
        className="absolute left-2 sm:left-4 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
        aria-label="Previous program"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={handleNext} 
        className="absolute right-2 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
        aria-label="Next program"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

export default function PNPBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const programs = [
    {
      title: "Ontario Immigrant Nominee Program (OINP)",
      duration: "Ontario",
      desc: "Canada's most populous province, offering streams for tech workers, healthcare professionals, and international students.",
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      points: [
        "Human Capital Priorities stream (Tech & Healthcare draws)",
        "Employer Job Offer stream (Foreign Workers & Students)",
        "Masters Graduate & PhD Graduate streams",
        "No job offer required for human capital streams",
        "Targets specific NOC codes in high demand",
        "Express Entry aligned for faster processing"
      ]
    },
    {
      title: "British Columbia Provincial Nominee Program (BC PNP)",
      duration: "British Columbia",
      desc: "A highly popular program for tech professionals, healthcare workers, and entrepreneurs looking to settle in BC.",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-800",
      points: [
        "BC PNP Tech Pilot (fast-tracked for 27 tech occupations)",
        "Skills Immigration (Entry-Level and Semi-Skilled)",
        "International Post-Graduate category",
        "Healthcare Professional stream",
        "Uses a unique Skills Immigration Registration System (SIRS)",
        "Regular draws conducted for specific occupations"
      ]
    },
    {
      title: "Alberta Advantage Immigration Program (AAIP)",
      duration: "Alberta",
      desc: "Ideal for candidates with lower CRS scores, leveraging Alberta's strong economy and job market.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-800",
      points: [
        "Alberta Express Entry Stream (lower CRS cut-off)",
        "Accelerated Tech Pathway",
        "Rural Renewal Stream for smaller communities",
        "Graduate Entrepreneur Stream",
        "No specific job offer required for Express Entry stream",
        "Focus on candidates with ties to Alberta"
      ]
    },
    {
      title: "Saskatchewan Immigrant Nominee Program (SINP)",
      duration: "Saskatchewan",
      desc: "Known for its accessible Occupation In-Demand stream, which does not require a job offer for eligible occupations.",
      bg: "bg-gradient-to-br from-rose-600 to-pink-800",
      points: [
        "International Skilled Worker - Occupations In-Demand",
        "Saskatchewan Express Entry stream",
        "No job offer required for In-Demand streams",
        "Wide range of eligible TEER 0, 1, 2, and 3 occupations",
        "Points-based assessment (SINP points grid)",
        "Popular for healthcare, agriculture, and trades"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#08080f] pt-32 pb-16 relative overflow-hidden" aria-label="Article header">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-secondary/6 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
            <motion.div variants={fadeUp}>
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-full">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Provincial Nominee
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Provincial Nominee Program (PNP): Canada PR by Province
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 20, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 11 min read</span>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      </section>

      {/* Article content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16" aria-labelledby="article-title">
        <Reveal>
          {/* Main content */}
          <motion.div 
            variants={fadeUp} 
            className="prose prose-lg max-w-none text-justify prose-headings:font-serif prose-headings:text-foreground prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-[1.8] prose-p:mb-6 prose-li:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:font-semibold hover:prose-a:underline"
          >
            <div className="prose prose-lg max-w-none text-justify">
              <p className="lead text-lg text-foreground font-medium mb-8">The Provincial Nominee Program (PNP) allows Canadian provinces and territories to nominate individuals who wish to immigrate to Canada and settle in a particular province. It is one of the fastest and most popular pathways to Canadian Permanent Residence (PR), especially for candidates who may not have a high enough CRS score to receive an Invitation to Apply (ITA) through federal <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link> draws.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Provincial Targeting:</strong> Each province designs its own PNP streams to address specific local labour market shortages (e.g., Tech in BC, Healthcare in Ontario).</li>
                  <li><strong>Enhanced vs. Base Streams:</strong> Enhanced streams align with Express Entry and award 600 CRS points; Base streams are independent and have their own processing times.</li>
                  <li><strong>Lower CRS Scores:</strong> PNPs are the best alternative for skilled workers whose CRS scores fall below the federal Express Entry cut-off.</li>
                  <li><strong>Intent to Reside:</strong> Applicants must demonstrate a genuine intention to live and work in the nominating province.</li>
                  <li><strong>Strategic Choice:</strong> The right stream depends on your occupation, education, and ties to the province—not just the lowest score requirement.</li>
                </ul>
              </div>

              <h2>How the Provincial Nominee Program Works</h2>
              <p>Most PNP streams fall into two main categories: Base streams and Enhanced streams. Understanding the difference is critical to choosing the right strategy.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Base Streams:</strong> Applications are submitted directly to the province. If nominated, you apply to the federal government (IRCC) for permanent residence. These have their own processing times and are not linked to the Express Entry pool.</li>
                <li><strong>Enhanced Streams:</strong> These are aligned with the federal Express Entry system. To apply, you must have an active Express Entry profile. If a province nominates you through an enhanced stream, you receive 600 additional CRS points, which virtually guarantees you will receive an ITA in the next federal Express Entry draw.</li>
              </ul>

              <h2>Top PNP Streams for Skilled Workers</h2>
              <p>With over 80 streams across 11 provinces and territories, choosing the right one can feel overwhelming. Swipe or use the arrows below to explore some of the most accessible and popular PNP streams for skilled workers:</p>
              
              {/* 3D Stacked Carousel Integration */}
              <div className="not-prose my-12 w-full max-w-2xl mx-auto">
                <PNPCarousel3D programs={programs} />
              </div>

              <h2>Step-by-Step PNP Application Process</h2>
              <p>While the exact process varies slightly depending on whether you are applying for a Base or Enhanced stream, the general steps are as follows:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Determine Eligibility:</strong> Check if your occupation, education, and experience match the criteria of a specific province.</li>
                <li><strong>Express Entry Profile (if applicable):</strong> For Enhanced streams, you must first create an Express Entry profile.</li>
                <li><strong>Apply to the Province:</strong> Submit an Expression of Interest (EOI) or direct application to the provincial government.</li>
                <li><strong>Provincial Nomination:</strong> If successful, the province issues a nomination certificate (and 600 CRS points if Enhanced).</li>
                <li><strong>Apply for PR:</strong> Apply to IRCC for your permanent residence within the specified timeframe (usually 6 months).</li>
                <li><strong>Medical & Security Checks:</strong> Undergo standard IRCC medical exams and police clearances to finalize your PR.</li>
              </ol>

              <h2>Our Consultancy Services for PNP</h2>
              <p>Applying for a PNP requires precise documentation and a deep understanding of provincial labour market needs. We are not a typical agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Strategic Profile Assessment:</strong> We evaluate your occupation against all 80+ provincial streams to identify the highest-probability pathway for your specific profile.</li>
                <li><strong>EOI & Application Filing:</strong> We handle the precise completion of your provincial Expression of Interest or direct application, maximizing your points on provincial grids.</li>
                <li><strong>Document Verification:</strong> Our legal team meticulously verifies your employment reference letters, educational credentials (ECA), and language tests to ensure they satisfy provincial standards.</li>
                <li><strong>Post-Nomination Representation:</strong> If nominated, we manage your final PR application to IRCC, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA).</li>
                <li><strong>Settlement & Intent Guidance:</strong> We guide you on how to legally demonstrate your intent to reside in the nominating province, avoiding misrepresentation issues.</li>
              </ul>

              <h2>Why Choose Route 2 Migrate?</h2>
              <p>In an industry filled with unregulated "consultants," working with an RCIC provides legal protection and accountability. Riffat H. Mohaimen (R710078) is regulated by the College of Immigration and Citizenship Consultants (CICC). We provide honest, objective assessments—we won't push you into a program just to make a sale. We continuously track the latest provincial draws and policy changes, ensuring your strategy is based on current law, not outdated forum advice. Avoid making the <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by having your profile assessed professionally.</p>

              <h2>Provincial Nominee Program (PNP) FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Does a provincial nomination guarantee Canadian PR?</h3>
                  <p>A provincial nomination significantly increases your chances (adding 600 CRS points for Enhanced streams), but it does not guarantee PR. You must still meet federal admissibility requirements (medical, criminal, security) to be granted permanent residence by IRCC.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I move to a different province after getting a PNP?</h3>
                  <p>When applying for a PNP, you sign a declaration of intent to reside in that province. Moving immediately after receiving PR can raise serious concerns about misrepresentation and affect future citizenship applications. It is highly recommended to fulfill your intent to reside.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the difference between Express Entry and PNP?</h3>
                  <p>Express Entry is the federal system, while PNP is provincial. You can have an Express Entry profile and also apply to a province. If a province nominates you via an Enhanced PNP stream, you get 600 extra points in your Express Entry profile, guaranteeing an ITA. Base PNP streams do not use Express Entry at all.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Which PNP is easiest to get without a job offer?</h3>
                  <p>Saskatchewan (SINP) and Alberta (AAIP) are often considered the most accessible for candidates without a job offer, as they have streams targeting occupations in high demand that do not strictly require arranged employment. Ontario (OINP) also conducts frequent draws for specific tech and healthcare occupations without requiring a job offer.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long does the PNP process take?</h3>
                  <p>Processing times vary by province and stream. Provincial processing can take anywhere from a few weeks (e.g., BC PNP Tech) to several months. Once nominated, the federal PR processing for Enhanced streams is typically 6 months, while Base streams can take 12-18 months.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </article>

      {/* CTA Section - Dark Red Premium Gradient Background & Wider Layout */}
      <section className="pb-16">
        <Reveal className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp}>
            <div className="bg-gradient-to-br from-[#3b0a0a] via-[#7f1d1d] to-[#3b0a0a] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Free Assessment</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 leading-tight">
                  Which Canadian province is right for you?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Don't waste time applying to streams that don't match your profile. If you want an RCIC to assess your occupation and map out your highest-probability PNP pathway, book a consultation with Riffat H. Mohaimen (R710078) today.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Applying to the wrong province can result in refusal and lost government fees. Start with the right legal advice.
                  </p>
                </div>
                <a href="https://riffathmohaimen.setmore.com/" target="_blank" rel="noopener noreferrer" aria-label="Book a consultation" className="inline-block">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                    Book Consultation <ArrowRight className="ml-2 h-5 w-5 inline" aria-hidden="true" />
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}