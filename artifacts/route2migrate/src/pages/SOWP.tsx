// src/pages/SOWP.tsx
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

export default function SOWPBlogPostPage() {
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Work Permits
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Canada Spousal Open Work Permit (SOWP): 2025 Eligibility & Application Guide
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> June 30, 2025</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">The Canada Spousal Open Work Permit (SOWP) allows the legally married spouse or common-law partner of an eligible foreign worker, international student, or permanent residency applicant to work for almost any employer in Canada. Navigating the recent 2025 updates to IRCC eligibility rules can be complex, but understanding the specific streams is vital for a successful application.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Streamlined Eligibility:</strong> SOWP eligibility is strictly tied to your partner's immigration status (Student, Worker, or PR Applicant).</li>
                  <li><strong>Student Spouses:</strong> Only spouses of students in eligible Master's, PhD, or specific professional degree programs qualify. Regular college diplomas no longer qualify.</li>
                  <li><strong>Worker Spouses:</strong> The principal worker must have at least 16 months of validity remaining on their work permit and fall under specific TEER categories.</li>
                  <li><strong>Open Flexibility:</strong> An approved SOWP allows you to work full-time for almost any Canadian employer.</li>
                </ul>
              </div>

              <h2>SOWP Eligibility Requirements</h2>
              <p>To qualify for a Canada Spousal Open Work Permit, you must meet the criteria enforced by Immigration, Refugees and Citizenship Canada (IRCC). Eligibility is split into distinct streams based on the principal partner's current immigration status.</p>

              <h3>1. Spouses of International Students</h3>
              <p>Your partner must be enrolled full-time at a Designated Learning Institution (DLI). They cannot be in their final semester, and must be in one of these specific programs:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Graduate Studies:</strong> A master's degree program lasting at least 16 months, or a doctoral (PhD) program.</li>
                <li><strong>Professional Programs:</strong> Professional undergraduate degrees including Law (LLB/JD), Medicine (MD), Pharmacy, Nursing, Dentistry, Education, or Engineering.</li>
              </ul>
              <div className="my-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg not-prose">
                <p className="text-foreground text-sm font-medium m-0">Note: Spouses of students in regular college diplomas or standard undergraduate programs are generally not eligible for an SOWP under the updated rules.</p>
              </div>

              <h3>2. Spouses of Temporary Foreign Workers</h3>
              <p>Your partner must hold a valid Canadian work permit (or authorization) that has at least 16 months of validity remaining at the time of your application. Their specific job level dictates further eligibility:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>High-Skilled (TEER 0 or 1):</strong> Eligible across all occupations in these categories.</li>
                <li><strong>Mid-Skilled (TEER 2 or 3):</strong> Only eligible if their specific job is on the IRCC list of approved TEER 2 and 3 occupations.</li>
                <li><strong>Low-Skilled (TEER 4 or 5):</strong> Only eligible if they received their work permit through an eligible Permanent Residency (PR) pathway but have not yet completed their PR application.</li>
              </ul>

              <h3>3. Spouses of Permanent Residency Applicants</h3>
              <p>You are eligible for an SOWP if you are currently inside Canada and fall into either of these categories:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>In-Canada Sponsorship:</strong> Your Canadian spouse or PR partner is sponsoring you, you live together, and you have received an official Acknowledgement of Receipt (AOR) letter confirming your PR application is being processed.</li>
                <li><strong>Bridging Open Work Permit (BOWP):</strong> Your spouse applied for PR via <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link> and is currently awaiting a final decision on their status.</li>
              </ul>

              <h3>General Applicant Requirements</h3>
              <p>Beyond your partner’s status, you must meet the basic personal criteria:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Be at least 18 years of age.</li>
                <li>Prove your relationship is genuine using documents like marriage certificates or shared financial records.</li>
                <li>Meet standard Canadian security, criminal, and medical admissibility checkpoints.</li>
              </ul>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <h3 className="text-lg font-bold mt-0 mb-3 text-foreground">Important Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed m-0">
                  <strong>Please Note:</strong> These requirements are subject to change. Updated information will be found on the official <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">canada.ca website</a>. Always consult with a licensed professional to verify the latest IRCC policy changes before applying.
                </p>
              </div>

              <h2>Apply for Your SOWP Through Route 2 Migrate</h2>
              <p>Applying for a Spousal Open Work Permit requires precise legal documentation to prove your relationship and your partner's eligibility. We are not a traditional agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Eligibility Assessment:</strong> We assess your partner's study program or job code against the latest IRCC regulations to guarantee your eligibility before you spend a dollar on fees.</li>
                <li><strong>Document Verification:</strong> Our legal team meticulously verifies your marriage certificate, proof of genuine relationship, and your partner's immigration documents to prevent refusals.</li>
                <li><strong>Application Filing:</strong> We accurately complete and submit your SOWP application, whether you are applying from outside Canada, at the port of entry, or from within Canada.</li>
                <li><strong>Legal Representation:</strong> As your legal representative, our RCIC ensures your application complies with the Immigration and Refugee Protection Act (IRPA), handling any IRCC requests for additional information seamlessly.</li>
              </ul>

              <h2>Spousal Open Work Permit FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I work for any employer on an SOWP?</h3>
                  <p>Yes. The SOWP is an open work permit, meaning you can work for almost any employer in Canada. However, you cannot work for employers listed as ineligible on the IRCC website or in certain industries like adult entertainment.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long is the SOWP valid?</h3>
                  <p>Your SOWP will typically be valid for the same duration as your partner's study permit or work permit. If your spouse is applying via Express Entry PR, the BOWP is usually valid for 2 years or until a decision is made on their PR application.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Does an SOWP guarantee Permanent Residency?</h3>
                  <p>No. An SOWP is a temporary resident visa. While the Canadian work experience you gain can help you qualify for PR through programs like the Canadian Experience Class, you must apply for PR separately. You can learn more in our <Link href="/blog/spouse-sponsorship-guide" className="text-primary font-semibold">Spousal Sponsorship Guide</Link>.</p>
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
                  Have questions about your Spousal Open Work Permit eligibility?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Immigration rules change constantly. If you're looking for guidance tailored to your specific situation, book a consultation with our licensed RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Applying with incomplete documents or misunderstanding TEER requirements can lead to a refusal. Start with the right advice and move forward with confidence.
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