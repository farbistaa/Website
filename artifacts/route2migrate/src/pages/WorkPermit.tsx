// src/pages/WorkPermit.tsx
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

export default function WorkPermitBlogPostPage() {
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
              Canada Work Permit: Closed vs Open Permits & Application Guide
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 8, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 9 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">A Canadian work permit is an official document issued by Immigration, Refugees and Citizenship Canada (IRCC) that authorizes a foreign national to legally work in Canada for a specific period. It is important to know that a work permit is not a travel visa. It does not give you permission to enter Canada on its own. You still need a visitor visa or an Electronic Travel Authorization (eTA) to physically enter the country.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Not a Travel Visa:</strong> A work permit authorizes work but requires a separate eTA or visitor visa for entry into Canada.</li>
                  <li><strong>Two Main Categories:</strong> Canada offers Employer-Specific (Closed) and Open Work Permits.</li>
                  <li><strong>LMIA Requirement:</strong> Closed work permits usually require a Labour Market Impact Assessment (LMIA), while open permits do not.</li>
                  <li><strong>Location Matters:</strong> Eligibility criteria differ significantly depending on whether you apply from inside or outside Canada.</li>
                  <li><strong>Family Inclusion:</strong> Your spouse or common-law partner may be eligible for their own open work permit.</li>
                </ul>
              </div>

              <h2>Types of Canadian Work Permits</h2>
              <p>Canada offers two primary categories of work permits. You cannot choose which type you need; your eligibility dictates the category you must apply for.</p>

              <h3>1. Employer-Specific Work Permit (Closed Work Permit)</h3>
              <p>This permit restricts your employment to one specific employer.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Restrictions:</strong> You can only work for the employer listed on your permit, in the designated location, and for the specified duration.</li>
                <li><strong>Requirements:</strong> It usually requires a formal job offer from a Canadian employer.</li>
                <li><strong>The LMIA Process:</strong> In most cases, the employer must first obtain a Labour Market Impact Assessment (LMIA) from the government. This proves that no Canadian citizen or permanent resident was available to fill the job.</li>
              </ul>

              <h3>2. Open Work Permit</h3>
              <p>This permit grants you the freedom to work for almost any employer in Canada.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Flexibility:</strong> You can change employers and industries without needing prior government approval.</li>
                <li><strong>No LMIA Required:</strong> Employers do not need to perform a labor market test to hire you.</li>
                <li><strong>Who Qualifies:</strong> Only specific groups are eligible, including international graduates via the <Link href="/blog/pgwp-guide-2025" className="text-primary font-semibold">Post-Graduation Work Permit (PGWP)</Link> program, spouses of certain skilled workers (like those applying for a <Link href="/blog/sowp-guide" className="text-primary font-semibold">Spousal Open Work Permit</Link>), and youth participating in programs like International Experience Canada (IEC).</li>
              </ul>

              <h2>Applying from Inside Canada</h2>
              <p>You may be eligible to apply for a work permit from inside Canada if you meet certain requirements. Most people cannot apply from inside Canada; you can only apply if one of these specific situations applies to you:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>You have a valid work or study permit.</li>
                <li>Your spouse, common-law partner, or parents have a valid work or study permit.</li>
                <li>You’re eligible for a post-graduation work permit and your study permit is still valid.</li>
                <li>You or your family members are in Canada and waiting on a decision on an application for permanent residence (e.g., spouse or common-law partner in Canada class).</li>
                <li>You’ve been recognized as a Convention refugee or protected person by the Immigration and Refugee Board of Canada.</li>
                <li>You’ve been legally working in Canada without a work permit, but you now need a work permit for a different job (does not include business visitors).</li>
                <li>You made a claim for refugee protection.</li>
                <li>You have a temporary resident permit that is valid for 6 months or more.</li>
                <li>You’re a trader, investor, intra-company transferee or professional under the Canada–United States–Mexico Agreement (CUSMA).</li>
                <li>You’re a Quebec skilled worker who applied for the Programme de sélection des travailleurs qualifiés.</li>
              </ul>

              <h2>Applying from Outside Canada</h2>
              <p>If you are not inside Canada, you may be eligible to apply for a work permit from outside the country if you meet the general requirements and any additional requirements for the specific type of work permit you’re applying for.</p>
              <p>To apply from outside Canada, you must:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Show that you have enough money to take care of yourself and your family members during your stay in Canada and to return home. (The amount depends on your family size, the community you plan to settle in, and the work permit program).</li>
                <li>Include all the required documents in your application.</li>
                <li>Give any other documents requested to prove you can enter the country.</li>
                <li>Show that you will leave Canada before your work permit expires.</li>
              </ul>

              <h2>Including Family on Your Application</h2>
              <p>Your spouse, common-law partner, and dependent children may be able to visit, study, or work in Canada with you. Depending on your work permit type and skill level (TEER 0, 1, 2, or 3), your family members might be eligible to apply for their own visitor visas, study permits, or open work permits (OWP). Accompanying family members must meet their own admissibility requirements. Avoid making <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by ensuring your family's applications are filed correctly alongside yours.</p>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <h3 className="text-lg font-bold mt-0 mb-3 text-foreground">Important Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed m-0">
                  <strong>Please Note:</strong> These requirements are subject to change. Updated information will be found on the official <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">canada.ca website</a>. Always consult with a licensed professional to verify the latest IRCC policy changes before applying.
                </p>
              </div>

              <h2>Apply for Your Work Permit Through Route 2 Migrate</h2>
              <p>Securing a Canadian work permit—especially an employer-specific one requiring an LMIA—is a complex legal process. We are not a traditional recruitment agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Eligibility Assessment:</strong> We evaluate your job offer, qualifications, and immigration status to determine the correct work permit stream for your situation, whether inside or outside Canada.</li>
                <li><strong>LMIA Guidance:</strong> While employers are responsible for the LMIA, we guide both you and your employer through the compliance process to ensure the job offer meets IRCC standards.</li>
                <li><strong>Document Verification:</strong> Our legal team meticulously verifies your employment contracts, educational credentials, and proof of funds to prevent refusals.</li>
                <li><strong>Application Filing & Legal Representation:</strong> As your legal representative, our RCIC prepares and submits your work permit application to IRCC, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA) and drafting legal submission letters to support your case.</li>
                <li><strong>Family Spousal Open Work Permits:</strong> We simultaneously process Spousal Open Work Permits (SOWP) for your accompanying partner, ensuring your family can legally work and settle in Canada together.</li>
              </ul>

              <h2>Canada Work Permit FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I change employers on a closed work permit?</h3>
                  <p>No. If you have an employer-specific (closed) work permit, you can only work for the employer named on your permit. To change employers, you must apply for a new work permit before starting the new job.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do I need a job offer to get a work permit?</h3>
                  <p>It depends on the permit type. Employer-specific work permits require a job offer and usually an LMIA. Open work permits (like the PGWP or SOWP) do not require a job offer.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can my spouse work in Canada if I have a work permit?</h3>
                  <p>Yes, in many cases. If you hold a work permit in a TEER 0, 1, 2, or 3 occupation, your spouse may be eligible for an open work permit. Read our detailed guide on the <Link href="/blog/sowp-guide" className="text-primary font-semibold">Spousal Open Work Permit</Link>.</p>
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
                  Have questions about your Canada Work Permit options?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Navigating LMIA applications or changing from a closed to an open permit requires precise legal strategy. If you're looking for guidance tailored to your specific job offer and profile, book a consultation with our licensed RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Working illegally or failing to comply with permit conditions can result in removal from Canada and a ban. Start with the right advice and move forward with confidence.
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