// src/pages/StudyPermit.tsx
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowLeft, Calendar, Clock, User,
  BookOpen, Tag, ArrowRight
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

export default function StudyPermitBlogPostPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);

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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Study Permits
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Study in Canada from Bangladesh: The Ultimate 2025 Guide
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> June 28, 2025</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Canada remains one of the world's top destinations for international students, offering world-class education, a safe multicultural environment, and a clear pathway to permanent residence. If you are looking to study in Canada from Bangladesh, understanding the updated 2025 requirements, costs, and study permit processing times is crucial for a successful application.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Provincial Attestation Letter (PAL):</strong> As of 2024/2025, most study permit applications now require a PAL from the destination province.</li>
                  <li><strong>Proof of Funds:</strong> You must show financial capacity covering first-year tuition plus $20,635 CAD for living expenses.</li>
                  <li><strong>Work While Studying:</strong> Students can work off-campus up to 24 hours per week during academic sessions.</li>
                  <li><strong>Post-Graduation Work Permit (PGWP):</strong> A direct bridge to gaining Canadian work experience and PR.</li>
                  <li><strong>Spouse Visas:</strong> Only spouses of Master’s, PhD, and certain professional program students are eligible for an open work permit.</li>
                </ul>
              </div>

              <h2>Why Study in Canada as an International Student?</h2>
              <p>Why choose to study in Canada? Canada offers an exceptional learning experience through its globally recognized degrees, affordable tuition compared to the US and UK, and welcoming immigration policies. Studying in Canada provides access to a high standard of living, healthcare benefits in certain provinces, and the opportunity to work while studying, making it a highly sought-after destination for Bangladeshi students.</p>

              <h2>What Are the Requirements to Study in Canada from Bangladesh?</h2>
              <p>To apply for a Canadian study permit from Bangladesh, you must meet specific requirements set by Immigration, Refugees and Citizenship Canada (IRCC). Here is what is required to study in Canada:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-2">
                <li><strong>Letter of Acceptance (LOA):</strong> An acceptance letter from a Designated Learning Institution (DLI).</li>
                <li><strong>Provincial Attestation Letter (PAL):</strong> A letter from the provincial government confirming your spot within their allocation quota (required for most undergraduate and college programs).</li>
                <li><strong>Proof of Financial Support:</strong> You must prove you can afford your tuition, living expenses ($20,635 CAD), and return transportation.</li>
                <li><strong>Language Proficiency:</strong> Valid IELTS, TOEFL, or PTE test results meeting your DLI's minimum requirements.</li>
                <li><strong>Statement of Purpose (SOP):</strong> A compelling letter explaining your academic goals and intent to return home after studies.</li>
                <li><strong>Medical and Police Clearances:</strong> Upfront medical exams and police clearance certificates may be required.</li>
              </ol>

              <h2>How Much Does it Cost to Study in Canada?</h2>
              <p>The cost to study in Canada for international students varies by institution and program. On average, undergraduate tuition ranges from CAD 15,000 to CAD 35,000 per year, while Master's degrees can cost between CAD 17,000 and CAD 50,000 annually. When calculating your study in Canada budget, factor in living expenses (approx. $20,635 CAD/year), health insurance, and miscellaneous student fees. </p>

              <h2>Can I Study in Canada Without IELTS?</h2>
              <p>Yes, you can study in Canada without IELTS. Many DLIs accept alternative English proficiency tests such as the TOEFL, PTE Academic, Duolingo English Test, or the CAEL. Additionally, if your previous education was conducted entirely in English, some institutions may grant an exemption based on a Medium of Instruction (MOI) certificate. However, for the Student Direct Stream (SDS)—which offers faster processing—an IELTS score of 6.0 or higher is strictly mandatory. You can also read our guide on <Link href="/blog/celpip-vs-ielts" className="text-primary font-semibold">CELPIP vs IELTS</Link> to understand language testing better.</p>

              <h2>Study Gap in Canada: Is There an Age Limit?</h2>
              <p>There is no official age limit to study in Canada, but students must be of legal age (usually 18+). A common concern for Bangladeshi applicants is the "study gap." Immigration officers want to see a logical progression in your academic and professional history. A study gap of up to 5 years is acceptable for undergraduate programs, and up to 8-10 years for Master's degrees, provided you can justify the gap with work experience, further studies, or skill development courses.</p>

              <h2>Can I Work and Study in Canada? Can I Bring My Family?</h2>
              <p>One of the biggest benefits of studying in Canada is the ability to work. As an international student, you can work up to 24 hours per week off-campus during regular academic sessions and full-time during scheduled breaks.</p>
              <p>Regarding bringing family, recent updates to immigration rules state that only international students pursuing Master’s degrees, PhDs, or select professional programs (like Medicine or Law) are eligible to bring their spouse on an Open Work Permit. Minor children can accompany you and attend Canadian public schools for free.</p>

              <h2>Work Permit After Study in Canada (PGWP)</h2>
              <p>Upon graduation, you can apply for the Post-Graduation Work Permit (PGWP), which allows you to work in Canada for up to 3 years. This open work permit is a vital stepping stone, allowing you to gain the Canadian work experience needed to apply for permanent residence through programs like the Canadian Experience Class (CEC) under <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link>. Learn more about this bridge in our <Link href="/blog/pgwp-guide-2025" className="text-primary font-semibold">PGWP Guide</Link>.</p>

              <h2>What is the Study Permit Processing Time in Canada?</h2>
              <p>The study permit processing time for applicants from Bangladesh generally ranges from 8 to 12 weeks for the standard stream. If you apply through the Student Direct Stream (SDS) by providing upfront medicals, proof of funds via a Guaranteed Investment Certificate (GIC), and a valid IELTS score, processing can be as fast as 20 calendar days. Always apply at least 3-4 months before your program starts to avoid delays. Check out our guide on <Link href="/blog/canada-bangladesh-immigration" className="text-primary font-semibold">Canada Immigration for Bangladeshi Nationals</Link> for more regional insights.</p>

              <h2>Which Course is Best to Study in Canada?</h2>
              <p>Choosing what to study in Canada to get a good job or PR is critical. Some of the best courses to study in Canada for 2025 include:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Computer Science & IT:</strong> High demand for software developers, data analysts, and cybersecurity experts.</li>
                <li><strong>Engineering:</strong> Mechanical, Civil, and Electrical engineering remain evergreen fields.</li>
                <li><strong>Healthcare & Nursing:</strong> Study nursing in Canada offers excellent job security and PR pathways.</li>
                <li><strong>Business & Data Analytics:</strong> MBAs and specialized business diplomas are highly valued.</li>
                <li><strong>Skilled Trades:</strong> Carpentry, plumbing, and welding have dedicated provincial pathways.</li>
              </ul>

              <h2>How to Study in Canada After 12th (HSC)?</h2>
              <p>Bangladeshi students looking to study in Canada after 12th (HSC) can apply for undergraduate diplomas or bachelor's degrees. You will need your HSC transcripts, an IELTS score (usually 6.0 overall), and proof of funds. Ensure the college or university is a DLI and offers PGWP-eligible programs. Applying for the January or May intake can sometimes be less competitive than the primary September intake.</p>

              <h2>Study in Canada vs USA vs UK vs Australia</h2>
              <p>When comparing study destinations, Canada frequently comes out on top due to its favorable post-study work rules and clear PR pathways. While the USA has prestigious universities, obtaining an H1-B work visa is highly uncertain. The UK recently restricted dependents and altered its graduate route. Canada offers a balanced approach with high-quality education, the ability to work during and after studies, and a welcoming immigration system.</p>

              <h2>Apply for Your Study Permit Through Route 2 Migrate</h2>
              <p>Navigating the Canadian study permit process can be complex, especially with new regulations like the Provincial Attestation Letter (PAL) and strict financial proofs. We are not a traditional student agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Strategic Profile Assessment:</strong> We evaluate your academic background, career goals, and budget to recommend Designated Learning Institutions (DLIs) and programs that strictly align with PGWP and PR pathways. We ensure you never enroll in a non-compliant program.</li>
                <li><strong>Admission Guidance:</strong> Our team assists with your university and college applications, ensuring your chosen program supports your long-term immigration goals, and helps secure application fee waivers where applicable.</li>
                <li><strong>SOP & Document Review:</strong> Our legal team helps craft a compelling Statement of Purpose (SOP) that satisfies IRCC's strict requirements, and meticulously verifies all your financial and academic documents to prevent refusals.</li>
                <li><strong>PAL & GIC Assistance:</strong> We guide you step-by-step through securing the Provincial Attestation Letter from your chosen province and setting up your Guaranteed Investment Certificate (GIC) for Student Direct Stream (SDS) applications.</li>
                <li><strong>Visa Filing & Legal Representation:</strong> As your legal representative, our RCIC prepares and submits your complete study permit application to IRCC, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA), and prepares you for mock interviews if requested by the embassy.</li>
                <li><strong>Post-Visa & PR Planning:</strong> Our job doesn't end at visa approval. We provide pre-departure briefings and outline your future pathway from study permit to post-graduation work permit and ultimately permanent residence, setting you up for long-term success in Canada.</li>
              </ul>

              <h2>Canada Study Permit FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I study in Canada on a visitor visa?</h3>
                  <p>While you can take short-term courses (less than 6 months) on a visitor visa, you cannot enroll in a full-degree program. To study formally, you must apply for a study permit before traveling or apply from within Canada if eligible.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I study in Canada with a 5.5 IELTS band?</h3>
                  <p>Yes, some DLIs accept an overall IELTS score of 5.5 for conditional admission or pathway programs. However, 6.0 is generally the minimum for direct entry into undergraduate programs and is mandatory for the SDS fast-track stream.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How much bank balance is required for a Canada study permit?</h3>
                  <p>You must show proof of funds for your first-year tuition plus $20,635 CAD for living expenses, and the cost of return transportation. If applying via SDS, this $20,635 must be placed in a verified Guaranteed Investment Certificate (GIC).</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What happens if my study permit is refused?</h3>
                  <p>If refused, you will receive a refusal letter outlining the reasons (often lack of funds, weak SOP, or insufficient ties to your home country). You can re-apply with stronger documentation addressing the officer's concerns. Avoid making the <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by having your profile assessed professionally by our RCIC.</p>
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
                  Have questions about your study permit options?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Every student's profile is unique, and the right path depends on your academic background, financial capacity, and career goals. If you're looking for guidance tailored to your specific situation, book a consultation with our licensed RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Applying with incomplete documents or choosing a non-PGWP institution can cost you valuable time and money. Start with the right advice and move forward with confidence.
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