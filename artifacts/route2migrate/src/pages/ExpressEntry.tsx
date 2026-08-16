// src/pages/ExpressEntry.tsx
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

// 3D Carousel Component for Express Entry Programs
function ProgramsCarousel3D({ programs }: { programs: any[] }) {
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
      aria-label="Express Entry Programs carousel"
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

export default function ExpressEntryBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const programs = [
    {
      title: "Federal Skilled Worker (FSWP)",
      duration: "For Professionals",
      desc: "Designed for individuals with skilled foreign work experience who wish to immigrate permanently to Canada.",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-800",
      points: [
        "Assessed on 6 selection factors (Age, Education, etc.)",
        "Popular among professionals applying from outside Canada",
        "Requires minimum CRS points for pool entry",
        "Ideal for Software Engineers, Doctors, Accountants",
        "No Canadian work experience required",
        "Must meet minimum language proficiency benchmarks"
      ]
    },
    {
      title: "Canadian Experience Class (CEC)",
      duration: "For In-Canada Workers",
      desc: "Intended for skilled workers who have already gained qualifying Canadian work experience.",
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      points: [
        "Requires 1 year of skilled Canadian work experience",
        "Recognizes ability to integrate into Canada's workforce",
        "Popular pathway for PGWP holders",
        "Ideal for international graduates employed in Canada",
        "Exempts applicants from proof of funds in some cases",
        "Must meet minimum language proficiency benchmarks"
      ]
    },
    {
      title: "Federal Skilled Trades (FSTP)",
      duration: "For Tradespeople",
      desc: "Specifically designed for experienced tradespeople to address strong demand in Canada's labor market.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-800",
      points: [
        "Requires qualifying work experience in a skilled trade",
        "Ideal for Electricians, Welders, Plumbers, Chefs",
        "Must satisfy employment or certification requirements",
        "Lower language proficiency thresholds than FSWP",
        "Job offer or certificate of qualification often required",
        "Direct pathway to PR for trades professionals"
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/10 text-primary bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Express Entry
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Express Entry Canada: The Complete Guide to Canada's PR System
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 18, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 12 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Canada continues to be one of the world's most sought-after destinations for skilled professionals, graduates, entrepreneurs, and families seeking better career opportunities, a higher quality of life, and long-term stability. Among the many immigration pathways available, Express Entry remains one of the fastest and most efficient routes to obtaining Canadian Permanent Residence (PR).</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Merit-Based System:</strong> Express Entry ranks candidates using the Comprehensive Ranking System (CRS), rewarding factors like age, education, and language proficiency.</li>
                  <li><strong>Three Core Programs:</strong> It manages FSWP, CEC, and FSTP applications under one umbrella.</li>
                  <li><strong>Category-Based Selection:</strong> IRCC now targets specific occupations (Healthcare, STEM, Trades) allowing lower CRS scores to receive ITAs.</li>
                  <li><strong>Fast Processing:</strong> Complete applications are often processed within 6 months.</li>
                  <li><strong>Professional Guidance:</strong> A Licensed RCIC can optimize your profile to maximize your CRS score and avoid refusal.</li>
                </ul>
              </div>

              <p>Every year, thousands of skilled workers from around the world—including Bangladesh—successfully immigrate to Canada through Express Entry. While the process is designed to be transparent and merit-based, many applicants find it challenging to understand eligibility requirements, CRS scores, category-based selection, documentation requirements, and the numerous policy updates introduced by Immigration, Refugees and Citizenship Canada (IRCC).</p>
              <p>This comprehensive guide explains every major aspect of Canada's Express Entry system in clear and practical language. Whether you are just beginning your research or preparing to submit your application, this guide will help you understand how the system works and what you can do to maximize your chances of receiving an Invitation to Apply (ITA) for permanent residence.</p>

              <h2>What is Express Entry?</h2>
              <p>Express Entry is Canada's online application management system used by IRCC to manage permanent residence applications for skilled workers. Instead of processing applications on a first-come, first-served basis, Express Entry ranks eligible candidates using a points-based system known as the Comprehensive Ranking System (CRS). Applicants with the highest scores—or those who qualify under category-based selection—may receive an Invitation to Apply (ITA) for Canadian Permanent Residence.</p>
              <p>Express Entry is not a separate immigration program. Rather, it is a centralized system that manages applications under several federal economic immigration programs.</p>

              <h2>Why Canada Uses Express Entry</h2>
              <p>Canada faces ongoing labour shortages across multiple industries, including healthcare, engineering, construction, information technology, transportation, skilled trades, finance, education, hospitality, and agriculture. To address these workforce needs while supporting long-term economic growth, the Canadian government introduced Express Entry as a modern, efficient, and merit-based immigration system.</p>
              <p>Unlike traditional immigration systems that often relied on lengthy queues, Express Entry enables Canada to identify and invite candidates who best meet current labour market priorities. Through category-based selection, IRCC can also target individuals with skills or language abilities that are in high demand.</p>

              <h2>Benefits of Applying Through Express Entry</h2>
              <p>Express Entry offers several advantages compared with many other immigration pathways:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Faster processing times for many complete applications.</li>
                <li>Opportunity to obtain Canadian Permanent Residence without a job offer in many cases.</li>
                <li>Transparent points-based ranking system.</li>
                <li>Ability to improve your CRS score while remaining in the candidate pool.</li>
                <li>Opportunity to receive a provincial nomination for additional 600 CRS points.</li>
                <li>Freedom to live and work anywhere in Canada (subject to provincial nomination obligations where applicable).</li>
                <li>Access to Canada's publicly funded healthcare and education systems after becoming a permanent resident.</li>
                <li>Pathway to Canadian citizenship after meeting residency requirements.</li>
              </ul>

              <h2>Immigration Programs Managed Under Express Entry</h2>
              <p>Many people assume Express Entry is a single immigration program. In reality, it manages applications for three major federal economic immigration programs. Understanding these programs is essential because eligibility requirements differ for each. Swipe or use the arrows to explore them:</p>
              
              {/* 3D Stacked Carousel Integration */}
              <div className="not-prose my-12 w-full max-w-2xl mx-auto">
                <ProgramsCarousel3D programs={programs} />
              </div>

              <h2>Category-Based Selection</h2>
              <p>One of the most significant developments in Canada's immigration system is category-based selection. Instead of inviting candidates solely based on CRS score, IRCC now conducts draws targeting applicants with skills that align with Canada's economic priorities.</p>
              <p>Current priority categories have included areas such as:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Healthcare occupations</li>
                <li>STEM (Science, Technology, Engineering, Math) occupations</li>
                <li>Skilled trades</li>
                <li>Transport occupations</li>
                <li>Agriculture and agri-food occupations</li>
                <li>French-language proficiency</li>
              </ul>
              <p>This has created additional opportunities for skilled professionals whose occupations are experiencing labour shortages across Canada, allowing candidates with relatively lower CRS scores to receive invitations if they meet the requirements of a targeted category.</p>

              <h2>How Express Entry Works: Step-by-Step</h2>
              <p>Many applicants believe they simply submit an application and wait for approval. In reality, Express Entry is a multi-stage competitive selection process.</p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Determine Eligibility:</strong> Check if you qualify under FSWP, CEC, or FSTP based on work experience, education, language, and age.</li>
                <li><strong>Complete a Language Test:</strong> Take an approved English (IELTS/CELPIP) or French test, as language proficiency heavily influences CRS scores.</li>
                <li><strong>Obtain an ECA:</strong> Get an Educational Credential Assessment to confirm foreign education equals Canadian standards.</li>
                <li><strong>Create an Express Entry Profile:</strong> Submit your details online to receive a CRS score.</li>
                <li><strong>Enter the Express Entry Pool:</strong> Wait for ITA draws while improving your profile if needed (e.g., via provincial nomination).</li>
                <li><strong>Receive an ITA:</strong> If your score meets the cut-off, you receive an Invitation to Apply for PR.</li>
                <li><strong>Submit the PR Application:</strong> Upload all supporting documents (police checks, medicals, proof of funds) within 60 days.</li>
                <li><strong>Final Decision:</strong> IRCC reviews everything. If approved, you get Confirmation of Permanent Residence (COPR).</li>
              </ol>

              <h2>Is Express Entry the Right Pathway for You?</h2>
              <p>Express Entry is an excellent immigration pathway for many skilled workers, but it is not the right option for everyone. Factors such as age, education, occupation, language proficiency, work experience, and long-term immigration goals all influence whether Express Entry is the most suitable choice. For some applicants, improving their CRS score before entering the pool may significantly increase their chances of success. Others may benefit from exploring additional pathways such as <Link href="/blog/pnp-best-streams-2025" className="text-primary font-semibold">Provincial Nominee Programs (PNP)</Link> that align with their occupation.</p>

              <h2>Our Consultancy Services for Express Entry</h2>
              <p>Navigating the Express Entry pool requires strategic planning. We are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise. Here is how we help:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Eligibility Assessment & Strategy:</strong> We evaluate your profile across all three programs to find the highest probability pathway.</li>
                <li><strong>CRS Score Optimization:</strong> We identify gaps in your profile and advise on the best ways to gain additional points (e.g., language retakes, educational upgrades, provincial nominations).</li>
                <li><strong>Document Verification:</strong> We rigorously check your ECA, language tests, work reference letters, and proof of funds to ensure they meet IRCC standards.</li>
                <li><strong>Profile Creation:</strong> We accurately build your Express Entry profile to prevent technical errors that could delay entry into the pool.</li>
                <li><strong>Post-ITA Legal Representation:</strong> If you receive an ITA, we manage your entire PR application submission, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA).</li>
                <li><strong>Provincial Nomination Assistance:</strong> We monitor PNP draws and guide you on applying for provincial nominations that add 600 CRS points.</li>
              </ul>

              <h2>Why Choose Route 2 Migrate?</h2>
              <p>In an industry filled with unregulated "agents," working with an RCIC provides legal protection and accountability. Riffat H. Mohaimen (R710078) is regulated by the College of Immigration and Citizenship Consultants (CICC). We provide honest, objective assessments—we won't push you into a program if your profile is weak. We continuously track the latest IRCC policy updates and category-based selection draws, ensuring your strategy is based on current law, not outdated forum advice.</p>

              <h2>Express Entry FAQ (Search & AI Queries Answered)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the minimum CRS score for Express Entry in 2025?</h3>
                  <p>There is no fixed minimum score. General program draws typically require CRS scores in the 500+ range, but category-based selection draws (like Healthcare or STEM) often have lower cut-offs. Program-specific draws (like CEC only) also vary.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long does Express Entry take from start to finish?</h3>
                  <p>Once you receive an ITA and submit your final PR application, IRCC aims to process it within 6 months. However, gathering documents (ECA, language tests, PCCs) before creating your profile can take 2-3 months.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I apply for Express Entry without a job offer?</h3>
                  <p>Yes. A job offer is not required. Most successful applicants receive ITAs based on core human capital factors (age, education, language, experience) without an arranged employment offer.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How can I increase my CRS score?</h3>
                  <p>Common strategies include improving your IELTS/CELPIP scores, gaining additional skilled work experience, applying for a Provincial Nominee Program (PNP) for 600 extra points, or including a spouse/partner's credentials if they are highly skilled.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the difference between Express Entry and a PNP?</h3>
                  <p>Express Entry is the federal system. PNP is provincial. You can have an Express Entry profile and also apply to a province. If a province nominates you via an "Enhanced" PNP stream, you get 600 extra points in your Express Entry profile, guaranteeing an ITA. Read more in our <Link href="/blog/pnp-best-streams-2025" className="text-primary font-semibold">PNP Guide</Link>.</p>
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
                  Ready to maximize your CRS score?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Don't leave your Canadian PR to chance. If you want an RCIC to assess your profile and map out your highest-probability Express Entry pathway, book a consultation with Riffat H. Mohaimen (R710078) today.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Misrepresentation or missing ITA deadlines can result in a 5-year ban. Start with the right legal advice.
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