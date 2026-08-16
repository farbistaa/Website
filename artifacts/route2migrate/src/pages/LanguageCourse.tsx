// src/pages/LanguageCourse.tsx
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

// 3D Carousel Component for Language Courses
function LanguageCarousel3D({ courses }: { courses: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = courses.length;
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
      aria-label="Language Course Packages carousel"
    >
      <div className="relative flex items-center justify-center w-full" style={{ perspective: 1200 }}>
        <div 
          className="relative" 
          style={{ width: cardW, height: cardH }} 
          onPointerDown={onDown} 
          onPointerUp={onUp} 
          onPointerCancel={() => { dragRef.current.active = false; setIsPaused(false); }}
        >
          {courses.map((pkg, index) => {
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
        aria-label="Previous course"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={handleNext} 
        className="absolute right-2 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
        aria-label="Next course"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

export default function LanguageCourseBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const courses = [
    {
      title: "IELTS General Training",
      duration: "Global Standard",
      desc: "The world's most popular English test for immigration, accepted globally and by IRCC.",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-800",
      points: [
        "Face-to-face speaking interview format",
        "Accepted for Student Direct Stream (SDS)",
        "Ideal for Express Entry & PNP applications",
        "Covers Listening, Reading, Writing, Speaking",
        "Target CLB 9+ for maximum CRS points",
        "Comprehensive practice materials included"
      ]
    },
    {
      title: "CELPIP General",
      duration: "Canadian Context",
      desc: "The Canadian English Language Proficiency Index Program, fully computer-delivered.",
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      points: [
        "100% computer-delivered test format",
        "North American accents and context",
        "Speaking component recorded via microphone",
        "Faster results compared to IELTS",
        "Directly maps to Canadian Language Benchmarks",
        "Ideal for those comfortable with typing"
      ]
    },
    {
      title: "Strategic Mock Tests & Review",
      duration: "CRS Optimization",
      desc: "Targeted prep focusing on the specific CLB thresholds needed to maximize your CRS score.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-800",
      points: [
        "Identify weaknesses across all 4 modules",
        "Targeted strategy to break CLB 9 barrier",
        "Time management techniques for exam day",
        "Detailed feedback from certified trainers",
        "Immigration-aligned scoring goals",
        "Boost confidence before the actual test"
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Language Tests
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              IELTS & CELPIP Test Prep: Maximize Your CRS Score for Canada
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 22, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 8 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Your English language test score is the single most impactful factor in your Canadian immigration journey. Whether you are applying for a <Link href="/blog/canada-study-permit-guide" className="text-primary font-semibold">Study Permit</Link> or <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link>, achieving a high Canadian Language Benchmark (CLB) can drastically alter your fate. For Express Entry, jumping from CLB 7 to CLB 9 can add over 100 CRS points to your profile.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Maximum CRS Impact:</strong> Language proficiency yields the highest points in the Express Entry grid.</li>
                  <li><strong>IELTS vs. CELPIP:</strong> Both are accepted by IRCC, but they differ in format, scoring, and difficulty depending on your strengths.</li>
                  <li><strong>CLB 9 is the Magic Number:</strong> Reaching CLB 9 unlocks maximum core human capital points.</li>
                  <li><strong>Strategic Prep:</strong> Immigration-focused prep aligns your study strategy with the specific points you need.</li>
                  <li><strong>SDS Requirement:</strong> A minimum IELTS score of 6.0 is mandatory for the fast-track Student Direct Stream (SDS).</li>
                </ul>
              </div>

              <h2>Why Language Scores Matter for Canadian Immigration</h2>
              <p>Immigration, Refugees and Citizenship Canada (IRCC) uses the Canadian Language Benchmark (CLB) to standardize language test scores. Under the Comprehensive Ranking System (CRS), language points are divided into first and second official languages. A strong score can earn you up to 136 core points (or 260 if applying with a spouse) plus additional adaptability points. Without a competitive score, even highly educated professionals with years of experience may struggle to receive an Invitation to Apply (ITA).</p>

              <h2>IELTS vs. CELPIP: Which Should You Choose?</h2>
              <p>For Canadian immigration, you must choose between two IRCC-approved English tests: IELTS General Training and CELPIP General. Neither is "easier" than the other, but they suit different skill sets.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>IELTS General Training:</strong> A globally recognized test. It features a face-to-face speaking interview with a human examiner. If you prefer conversational speaking and handwritten exams (if paper-based), IELTS is the traditional choice. It is also the only test currently accepted for the Student Direct Stream (SDS).</li>
                <li><strong>CELPIP General:</strong> A 100% computer-delivered test designed specifically for Canadian immigration. It uses North American accents and contexts. The speaking component requires you to record your answers into a microphone. If you type fast and are comfortable with a completely digital environment, CELPIP might be your best bet.</li>
              </ul>

              <h2>Our Language Test Prep Courses</h2>
              <p>We don't just teach English; we teach test strategy. Our prep courses are specifically designed for aspiring students and professionals migrating to Canada. Swipe or use the arrows below to explore our specialized training packages:</p>
              
              {/* 3D Stacked Carousel Integration */}
              <div className="not-prose my-12 w-full max-w-2xl mx-auto">
                <LanguageCarousel3D courses={courses} />
              </div>

              <h2>Why Take a Prep Course With an Immigration Consultancy?</h2>
              <p>Most language centers focus purely on teaching English. As a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078), we approach language testing from an immigration perspective. Here is why that matters:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>CRS-Aligned Strategy:</strong> We analyze your current Express Entry profile to determine exactly what CLB you need to get an ITA. If you only need CLB 8, we won't force you to over-study for CLB 10.</li>
                <li><strong>Targeted Weaknesses:</strong> We identify the specific modules (Listening, Reading, Writing, Speaking) that will yield the most CRS point gains if improved.</li>
                <li><strong>Avoiding Costly Retakes:</strong> Language tests are expensive. Our strategic mock tests ensure you only take the real exam when you are truly ready, saving you time and money.</li>
                <li><strong>End-to-End Integration:</strong> We seamlessly integrate your language prep with your ECA applications, Express Entry profile creation, and PR submission.</li>
              </ul>
              <h2>Language Test FAQ (Search & AI Queries Answered)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Which is easier, IELTS or CELPIP?</h3>
                  <p>It depends on your strengths. If you prefer face-to-face interactions and are used to British/Australian contexts, IELTS might feel easier. If you are fast at typing, comfortable with computers, and familiar with North American accents, CELPIP is often considered easier.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What IELTS score is required for Canada PR?</h3>
                  <p>There is no single passing score. To enter the Express Entry pool, you need a minimum of CLB 7 (IELTS 6.0 in each band). However, to receive an ITA, you generally need CLB 9 (IELTS Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0) to maximize your points, though program-specific draws sometimes accept lower scores.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I apply for Express Entry without IELTS?</h3>
                  <p>No, you cannot apply for Express Entry without proof of language proficiency. However, you can take the CELPIP General test instead of IELTS, or prove French proficiency via TEF/TCF exams.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long are IELTS and CELPIP scores valid for IRCC?</h3>
                  <p>Both IELTS and CELPIP test results are valid for exactly two years from the date of the test. If your scores expire before you receive an ITA, you will need to retake the test and update your Express Entry profile.</p>
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
                  Maximize your CRS score with strategic test prep.
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Don't let a low language score hold back your Canadian dream. If you want a customized prep plan aligned with your immigration goals, book a consultation with our RCIC, Riffat H. Mohaimen (R710078), today.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Retaking tests blindly wastes time and money. Learn the exact strategy needed to boost your CLB.
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