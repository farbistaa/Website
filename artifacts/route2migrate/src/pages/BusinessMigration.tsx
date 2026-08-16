// src/pages/BusinessMigration.tsx
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

// 3D Carousel Component for Business Pathways
function BusinessCarousel3D({ pathways }: { pathways: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = pathways.length;
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
      aria-label="Business Immigration Pathways carousel"
    >
      <div className="relative flex items-center justify-center w-full" style={{ perspective: 1200 }}>
        <div 
          className="relative" 
          style={{ width: cardW, height: cardH }} 
          onPointerDown={onDown} 
          onPointerUp={onUp} 
          onPointerCancel={() => { dragRef.current.active = false; setIsPaused(false); }}
        >
          {pathways.map((pkg, index) => {
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
        aria-label="Previous pathway"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button 
        onClick={handleNext} 
        className="absolute right-2 sm:right-4 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600/90 hover:bg-red-700 border border-red-500/30 flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" 
        aria-label="Next pathway"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}

export default function BusinessMigrationBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const pathways = [
    {
      title: "PNP Entrepreneur Streams",
      duration: "Provincial Pathway",
      desc: "Most provinces run entrepreneur streams requiring a temporary work permit, business establishment, and transition to PR after 12-24 months.",
      bg: "bg-gradient-to-br from-emerald-600 to-teal-800",
      points: [
        "BC: $600k net worth, $200k investment",
        "Ontario: Targets outside GTA or tech sector",
        "Alberta/Manitoba/Sask: Rural & farm pathways",
        "Nova Scotia & NB: $150k minimum investment",
        "Requires active daily business management",
        "Must create jobs for Canadian citizens/PRs"
      ]
    },
    {
      title: "Quebec Business Immigration",
      duration: "Independent System",
      desc: "Quebec manages its own independent immigration selection system with dedicated streams for business applicants.",
      bg: "bg-gradient-to-br from-blue-600 to-indigo-800",
      points: [
        "Quebec Investor Program (QIIP): Passive investment",
        "Requires strong French language proficiency",
        "Quebec Entrepreneur Program: Create/acquire business",
        "Strict net worth verification process",
        "Requires intention to settle in Quebec",
        "Separate selection certificate (CSQ) process"
      ]
    },
    {
      title: "C11 Entrepreneur Work Permit",
      duration: "LMIA-Exempt Strategy",
      desc: "Secure an LMIA-exempt work permit by proving your business ownership (50%+) will generate significant economic benefit to Canada.",
      bg: "bg-gradient-to-br from-amber-600 to-orange-800",
      points: [
        "Owner-Operator loophole replacement",
        "Requires at least 50% ownership stake",
        "Must prove significant economic benefit",
        "LMIA-exempt under International Mobility Program",
        "Gain Canadian work experience for Express Entry",
        "Pathway to transition to permanent residence"
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Business Immigration
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Canada Business Immigration: Entrepreneurs & Investors Guide
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 25, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 10 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Canada offers several business immigration pathways for entrepreneurs, investors, and self-employed individuals to establish a business and obtain permanent residency. However, due to recent regulatory updates by Immigration, Refugees and Citizenship Canada (IRCC), several popular paths have shifted. It is more critical than ever to align your business strategy with current Canadian immigration law.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Program Shifts:</strong> The federal Start-Up Visa was paused for new applications on June 30, 2026, and the federal Self-Employed Persons Program remains paused.</li>
                  <li><strong>Provincial Pathways:</strong> PNP Entrepreneur streams are the most active route, requiring a temporary work permit and 12-24 months of business operation before PR.</li>
                  <li><strong>C11 Work Permit:</strong> The LMIA-exempt C11 Significant Benefit permit is the primary legal pathway for foreign business owners to transition to Canada.</li>
                  <li><strong>Core Requirements:</strong> All streams require verified business experience, legally acquired net worth, a comprehensive business plan, and job creation for Canadians.</li>
                  <li><strong>Legal Strategy:</strong> Business immigration requires meticulous documentation and legal compliance, making RCIC representation essential.</li>
                </ul>
              </div>

              <h2>Recent Regulatory Updates: Paused Programs</h2>
              <p>Entrepreneurs must be aware of recent policy changes. Crucially, the federal Start-Up Visa Program was paused for new applications on June 30, 2026, due to application backlogs. Additionally, the federal Self-Employed Persons Program remains paused. While existing applicants in these pools are still being processed, new applicants must look toward provincial and LMIA-exempt pathways.</p>

              <h2>Active Business Immigration Pathways</h2>
              <p>The primary active pathways available for business immigration are detailed below. Swipe or use the arrows to explore the three main routes available to entrepreneurs and investors:</p>
              
              {/* 3D Stacked Carousel Integration */}
              <div className="not-prose my-12 w-full max-w-2xl mx-auto">
                <BusinessCarousel3D pathways={pathways} />
              </div>

              <h2>Detailed Breakdown of Provincial Nominee Programs (PNP)</h2>
              <p>Most Canadian provinces and territories run their own entrepreneur pathways. These streams generally require you to initially enter Canada on a temporary work permit, establish your business, and transition to permanent residency after successfully running the business for 12 to 24 months. Requirements vary significantly by region:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>British Columbia (BC PNP Entrepreneur):</strong> Requires a minimum personal net worth of $600,000 CAD, a minimum investment of $200,000 CAD, and the creation of at least one job for a Canadian citizen or permanent resident.</li>
                <li><strong>Ontario (OINP Entrepreneur):</strong> Targets high-net-worth individuals willing to launch or buy businesses outside the Greater Toronto Area (GTA) or within the digital/tech sector.</li>
                <li><strong>Alberta, Manitoba, and Saskatchewan:</strong> Offer unique pathways including rural entrepreneur streams and farm investor pathways, which feature lower investment thresholds (often starting around $100,000 CAD) to incentivize regional growth.</li>
                <li><strong>Nova Scotia & New Brunswick:</strong> Require a minimum investment of $150,000 CAD and a commitment to actively manage the business locally.</li>
              </ul>

              <h2>Core Requirements Across Most Streams</h2>
              <p>To successfully apply for any active Canadian business immigration program, you must generally satisfy the following baselines:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Business Experience:</strong> At least 3 years of active business ownership or senior management experience.</li>
                <li><strong>Net Worth Verification:</strong> Legally acquired personal and business assets that must be verified by a designated third-party accounting firm.</li>
                <li><strong>Business Plan:</strong> A comprehensive, viable plan detailing operations, market research, and local economic benefit.</li>
                <li><strong>Language Skills:</strong> Language proficiency in English or French (minimum CLB level 4 or 5 depending on the program).</li>
                <li><strong>Job Creation:</strong> A commitment to hire at least one or two full-time Canadian citizens or permanent residents.</li>
              </ul>

              <h2>Our Consultancy Services for Business Immigration</h2>
              <p>Business immigration is one of the most complex areas of Canadian law. We are not a typical recruitment agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Strategic Pathway Selection:</strong> We evaluate your net worth, business model, and regional preferences to determine whether a PNP stream, Quebec program, or the C11 permit is your highest-probability route to Canada.</li>
                <li><strong>Business Plan Vetting:</strong> We connect your business model with immigration requirements, ensuring your business plan demonstrates the "significant economic benefit" required by IRCC or provincial officers.</li>
                <li><strong>Net Worth Verification Guidance:</strong> We guide you through the strict process of third-party asset verification, ensuring your funds are traced legally to avoid misrepresentation refusals.</li>
                <li><strong>Work Permit & PR Filing:</strong> We handle the legal submission of your initial LMIA-exempt work permit (C11) or PNP application, and seamlessly transition your status to permanent residence once your business milestones are met.</li>
                <li><strong>Corporate Compliance:</strong> We advise on Canadian corporate structuring to ensure it aligns with both IRCC regulations and provincial business laws.</li>
              </ul>

              <h2>Why Choose Route 2 Migrate?</h2>
              <p>Applying for business immigration involves moving large sums of capital and making life-altering decisions. Working with an RCIC provides legal protection, accountability, and peace of mind. Riffat H. Mohaimen (R710078) is regulated by the College of Immigration and Citizenship Consultants (CICC). We provide honest, objective assessments—if a specific business stream is closed or paused, we will tell you and pivot to a viable strategy. We continuously track the latest IRCC policy changes, ensuring your investment is protected. Avoid making the <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by having your business profile assessed professionally.</p>

              <h2>Business Immigration FAQ (Search & AI Queries Answered)</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is the Canada Start-Up Visa (SUV) program still open?</h3>
                  <p>As of June 30, 2026, IRCC paused the intake of new applications for the federal Start-Up Visa Program due to processing backlogs. Existing applicants are still being processed, but new entrepreneurs must look to PNP Entrepreneur streams or the C11 Work Permit.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the minimum investment to migrate to Canada as an entrepreneur?</h3>
                  <p>The minimum investment depends on the province. Rural or farm streams in provinces like Saskatchewan or Manitoba can start around $100,000 CAD. Popular provinces like British Columbia require a minimum investment of $200,000 CAD, while Ontario and the Maritines generally require $150,000 to $200,000 CAD.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I buy a business in Canada and get PR?</h3>
                  <p>Yes, but you cannot simply buy a business and wait. You must actively manage it. The most common route is the C11 Significant Benefit Work Permit, which requires you to hold at least 50% ownership, prove economic benefit to Canada, and gain Canadian work experience to later transition to PR via <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link> or a PNP.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do I need to speak French or English to get a business visa?</h3>
                  <p>Yes. Most active business immigration streams require a minimum language proficiency of CLB 4 or CLB 5 in English or French. Quebec programs specifically require strong French language skills.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long does it take to get PR through a PNP Entrepreneur stream?</h3>
                  <p>It is a multi-stage process. First, you apply for a temporary work permit (1-3 months). You must then establish and operate the business in Canada for 12 to 24 months. After meeting the performance agreement, you apply for provincial nomination and PR, which takes an additional 12-18 months.</p>
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
                  Ready to expand your business to Canada?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Business immigration requires meticulous legal strategy and documentation. If you want an RCIC to assess your business model and map out your highest-probability immigration pathway, book a consultation with Riffat H. Mohaimen (R710078) today.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Investing without a legal immigration strategy can result in denied work permits and lost capital. Start with the right advice.
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