// src/pages/Consultation.tsx
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

// 3D Carousel Component
function ConsultationCarousel3D({ packages }: { packages: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = packages.length;
  const dragRef = useRef({ startX: 0, active: false });

  const isMobile = useMediaQuery("(max-width: 639px)");
  
  const cardW = isMobile ? 300 : 380;
  const cardH = isMobile ? 490 : 540; 
  
  const maxOffset = 2;
  const maxRenderOffset = maxOffset + 1;

  const goTo = useCallback((dir: number) => setCurrentIndex(p => (p + dir + length) % length), [length]);
  const handleNext = useCallback(() => goTo(1), [goTo]);
  const handlePrev = useCallback(() => goTo(-1), [goTo]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(handleNext, 6000);
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
      aria-label="Consultation Packages carousel"
    >
      <div className="relative flex items-center justify-center w-full" style={{ perspective: 1200 }}>
        <div 
          className="relative" 
          style={{ width: cardW, height: cardH }} 
          onPointerDown={onDown} 
          onPointerUp={onUp} 
          onPointerCancel={() => { dragRef.current.active = false; setIsPaused(false); }}
        >
          {packages.map((pkg, index) => {
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
                  {/* Dynamic Background Color */}
                  <div className={`absolute inset-0 ${pkg.bg}`} />
                  {/* Inner shaded gradient overlay - strictly contained within the card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {active && <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20 pointer-events-none transition-all duration-500 group-hover:ring-white/40" />}
                  
                  <div className="absolute top-0 left-0 right-0 p-5 flex justify-center items-center">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      {pkg.duration}
                    </span>
                  </div>
                  
                  {/* Text Alignment Fixed: Centered headers, centered list block */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-center">
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-3 drop-shadow-lg">{pkg.title}</h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed line-clamp-2 drop-shadow-md mb-4 sm:mb-5">{pkg.desc}</p>
                    
                    {active && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ul className="space-y-2 mb-6 max-w-[280px] mx-auto text-left">
                          {pkg.points.map((pt: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-white/90">
                              <Check className="h-4 w-4 text-white mt-0.5 shrink-0" aria-hidden="true" />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex justify-center">
                          <a 
                            href="https://riffathmohaimen.setmore.com/book" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full text-xs font-semibold hover:bg-white/90 transition-colors"
                          >
                            Book This Package <ArrowRight className="w-3 h-3" aria-hidden="true" />
                          </a>
                        </div>
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
        aria-label="Previous package"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={handleNext} 
        className="absolute right-2 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
        aria-label="Next package"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

export default function ConsultationBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const packages = [
    {
      title: "Initial Immigration Consultation",
      duration: "15 Minute",
      desc: "A brief, focused session designed for quick, specific questions regarding Canadian immigration.",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-800",
      points: [
        "Verify your understanding of IRCC requirements",
        "Confirm basic eligibility for minor programs",
        "Get quick legal opinion on minor queries",
        "Direct access to RCIC expertise",
        "Clarification on processing times",
        "Guidance on immediate next steps"
      ]
    },
    {
      title: "Case Specific Strategy Discussion",
      duration: "30 Minute",
      desc: "An in-depth discussion tailored to a specific visa stream like Study Permit, Work Permit, or PR.",
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      points: [
        "Step-by-step strategy mapping",
        "Document requirements checklist",
        "Strength and weakness evaluation",
        "Clear roadmap for your chosen path",
        "Review of potential profile red flags",
        "Timeline expectation setting"
      ]
    },
    {
      title: "Discussion on Application or Refusal",
      duration: "60 Minute",
      desc: "A comprehensive session for complex cases, previous refusals, or applications in progress.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-800",
      points: [
        "Deep dive into refusal letters",
        "Identify root causes of application issues",
        "Detailed legal remedy strategy",
        "Re-application action plan",
        "Assessment of admissibility concerns",
        "Review of supporting documents"
      ]
    },
    {
      title: "Detailed Immigration Assessment",
      duration: "60 Minute",
      desc: "The ultimate profile evaluation to determine the absolute best permanent residence (PR) pathways.",
      bg: "bg-gradient-to-br from-rose-600 to-pink-800",
      points: [
        "Multi-pathway roadmap for PR",
        "Assess education, experience & language",
        "Determine highest probability streams",
        "Personalized action plan for success",
        "CRS score optimization strategy",
        "Spousal and family inclusion planning"
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Consulting Services
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Immigration Consultation Services: Strategize Your Canadian Journey
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 15, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 6 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Choosing the right immigration pathway is the most critical decision you will make for your future. A misplaced application or a misunderstood legal requirement can cost you thousands of dollars and years of your life. Our Immigration Consultation Services provide you with direct access to legal expertise, ensuring you have a clear, strategic roadmap before you invest your time and money.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Tailored Strategy:</strong> Receive personalized advice based on your unique education, work experience, and family situation.</li>
                  <li><strong>Legal Clarity:</strong> Understand the complexities of the Immigration and Refugee Protection Act (IRPA) in simple terms.</li>
                  <li><strong>Risk Mitigation:</strong> Identify and address potential red flags or inadmissibility issues before applying.</li>
                  <li><strong>Flexible Packages:</strong> Choose from four distinct consultation tiers designed to meet your specific needs, from quick queries to complex refusal analysis.</li>
                </ul>
              </div>

              <h2>Service Overview: What We Provide</h2>
              <p>An immigration consultation with Route 2 Migrate is not a generic sales pitch; it is a focused, legally sound evaluation of your profile. During your session, we listen to your goals, assess your current credentials, and map out the most viable Canadian immigration pathways available to you. Whether you are applying for an <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link> profile, a <Link href="/blog/canada-study-permit-guide" className="text-primary font-semibold">Study Permit</Link>, or dealing with a complex refusal, we provide actionable insights that empower you to make informed decisions. We provide honest assessments—if you are not eligible for a specific program, we will tell you why and suggest alternatives.</p>

              <h2>Why Book a Consultation With Our RCIC?</h2>
              <p>In the age of online forums and unregulated "consultants," getting advice from a Licensed Regulated Canadian Immigration Consultant (RCIC) is more important than ever. We are a professional immigration consultancy firm led by RCIC Riffat H. Mohaimen (R710078). Here is why you should trust us with your Canadian dream:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Legal Authority:</strong> An RCIC is legally authorized by the Canadian government to provide immigration advice and represent clients. We are accountable to the College of Immigration and Citizenship Consultants (CICC).</li>
                <li><strong>Up-to-Date Knowledge:</strong> Immigration laws change frequently. We continuously update our knowledge to reflect the latest IRCC policies, ensuring your strategy is based on current law, not outdated forum posts.</li>
                <li><strong>Objective Assessment:</strong> We provide an unbiased, realistic evaluation of your chances. We won't push you into a program just to make a sale; we guide you toward the pathway with the highest legal probability of success.</li>
                <li><strong>Confidentiality:</strong> Your personal information and immigration history are handled with strict legal confidentiality.</li>
              </ul>

              <h2>Our Consultation Packages</h2>
              <p>We offer four structured consultation packages to perfectly match the depth of support you require. Swipe or use the arrows to explore each tier and see exactly what is included in each session.</p>
              
              {/* 3D Stacked Carousel Integration */}
              <div className="not-prose my-12 w-full max-w-2xl mx-auto">
                <ConsultationCarousel3D packages={packages} />
              </div>

              <h2>Book Your Consultation Instantly</h2>
              <p>Ready to take the first step? Use our secure booking portal below to select your preferred package, choose a date and time, and secure your appointment with our RCIC. You will receive an immediate confirmation and a secure link for your virtual meeting.</p>
              
              {/* Embedded Booking Preview */}
              <div className="not-prose my-8 p-2 sm:p-4 bg-primary/5 border border-primary/20 rounded-2xl shadow-lg">
                <iframe 
                  src="https://riffathmohaimen.setmore.com/book" 
                  className="w-full h-[600px] sm:h-[700px] rounded-xl border-0 bg-white"
                  title="Book Immigration Consultation with RCIC Riffat H. Mohaimen"
                  loading="lazy"
                />
                <p className="text-center text-sm text-muted-foreground mt-4 mb-2">
                  Having trouble viewing the booking calendar? <a href="https://riffathmohaimen.setmore.com/book" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Click here to book directly</a>.
                </p>
              </div>

              <h2>Immigration Consultation FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How is the consultation conducted?</h3>
                  <p>All consultations are conducted virtually via secure video conferencing (Zoom or Google Meet). Once you book your slot, you will receive an email with the meeting link and instructions on how to prepare for your session.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do I need to prepare anything before the consultation?</h3>
                  <p>Yes. To make the most of your time, please have your resume, educational transcripts, language test scores (if any), and a list of your specific questions ready. For refusal discussions, please have your refusal letter on hand.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Will the consultation fee be deducted from my full application fees if I hire Route 2 Migrate?</h3>
                  <p>While the consultation fee covers the legal time and expertise provided during the session, we often credit a portion of the consultation fee toward your full representation package if you choose to proceed with our firm for your visa application within a specified timeframe.</p>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Still have questions?</p>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 leading-tight">
                  Secure your future with expert legal guidance.
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Don't leave your immigration journey to chance. Whether you are just starting out or dealing with a complex refusal, our RCIC, Riffat H. Mohaimen (R710078), is here to provide the trusted, legal, and expert advice you need to succeed.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Choosing the wrong immigration strategy can cost you valuable time and money. Start with the right advice and move forward with confidence.
                  </p>
                </div>
                <a href="https://riffathmohaimen.setmore.com/book" target="_blank" rel="noopener noreferrer" aria-label="Book a consultation" className="inline-block">
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