// src/pages/SuperVisa.tsx
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

export default function SuperVisaBlogPostPage() {
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Visitor Visas
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Super Visa for Parents & Grandparents: 10-Year Multi-Entry Explained
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 2, 2025</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" /> 7 min read</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">The Super Visa is a special, multi-entry visitor visa that allows the parents and grandparents of Canadian citizens or permanent residents to stay in Canada for up to 5 years per visit. The visa itself is valid for up to 10 years, offering a much faster and more predictable route for family reunification than the lottery-based permanent residency sponsorship programs.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Extended Stay:</strong> Stay in Canada for up to 5 years per entry without needing to renew your status.</li>
                  <li><strong>10-Year Validity:</strong> The visa itself is valid for up to 10 years, allowing multiple entries.</li>
                  <li><strong>Host Requirements:</strong> Your child or grandchild in Canada must meet a minimum necessary income threshold.</li>
                  <li><strong>Mandatory Insurance:</strong> Applicants must secure private health insurance from a Canadian or approved provider for at least 1 year.</li>
                  <li><strong>Sponsorship Alternative:</strong> You can apply for a Super Visa while waiting for a PR sponsorship decision.</li>
                </ul>
              </div>

              <h2>Who Can Apply for a Super Visa?</h2>
              <p>To apply for a Super Visa for parents and grandparents, you and your host (child or grandchild) must both meet specific requirements set by Immigration, Refugees and Citizenship Canada (IRCC).</p>
              <p>If you don’t meet the requirements, or if you want to stay for 6 months or less, you may be eligible to apply for a standard visitor visa. If you’ve already submitted a sponsorship application, you can:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Apply for a Super Visa while you wait for a decision on your PR application, or</li>
                <li>Withdraw your sponsorship application at any time and apply for a Super Visa instead.</li>
              </ul>
              <p>For more details on the PR route, you can read our <Link href="/blog/spouse-sponsorship-guide" className="text-primary font-semibold">Spousal Sponsorship Guide</Link>.</p>

              <h2>Host Requirements</h2>
              <p>To be eligible to host their parents or grandparents, the host (child or grandchild) must:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Be proven to be the biological or adopted child or grandchild of the applicant.</li>
                <li>Be a Canadian citizen, a permanent resident of Canada, or a registered Indian under the Indian Act.</li>
                <li>Be at least 18 years old and currently live in Canada.</li>
                <li>Meet or exceed the minimum necessary income (Low Income Cut-Off + 30%) and provide proof of income.</li>
                <li>Write and sign a letter of invitation for the applicant to come to Canada.</li>
              </ul>

              <h2>Applicant Requirements</h2>
              <p>To be eligible for the Super Visa, you (the applicant) must:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Be outside Canada when you submit your application.</li>
                <li>Have your visa printed by a visa office outside Canada (you must wait for the visa office instructions).</li>
                <li>Be allowed to enter Canada (pass standard admissibility checks).</li>
                <li>Show proof that you have private health insurance valid for a minimum of 1 year from the date of entry. This must be:
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>From a Canadian insurance company, or</li>
                    <li>From a company outside Canada that has been approved by the Minister of Immigration.</li>
                  </ul>
                </li>
                <li>Take an immigration medical exam conducted by an IRCC-approved panel physician.</li>
                <li>Meet certain other conditions as requested by the visa officer.</li>
              </ul>

              <h2>General Requirements for Visiting Canada</h2>
              <p>There are general conditions you must meet to come to Canada as a visitor. Before making a decision on your application, IRCC will consider:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Whether you’re a genuine visitor to Canada who will leave by choice at the end of your visit.</li>
                <li>Your ties to your home country (e.g., family, property, employment).</li>
                <li>The purpose of your visit.</li>
                <li>Your family and finances.</li>
              </ul>

              <h2>Visa-Exempt Applicants</h2>
              <p>Even if you don’t need a visitor visa to enter Canada (e.g., you hold a passport from a visa-exempt country), you can still get a Super Visa to stay in Canada for up to 5 years. If IRCC approves your application, they will issue you a letter to give to a border services officer when you arrive in Canada.</p>
              <p>If you travel by air, you may also need to apply for an electronic travel authorization (eTA) separately to allow you to travel to and enter Canada. The eTA will be electronically linked to your passport, so you need to travel with the passport you used to apply for your eTA and any supporting documents for your Super Visa application.</p>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <h3 className="text-lg font-bold mt-0 mb-3 text-foreground">Important Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed m-0">
                  <strong>Please Note:</strong> These requirements are subject to change. Updated information will be found on the official <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">canada.ca website</a>. Always consult with a licensed professional to verify the latest IRCC policy changes before applying.
                </p>
              </div>

              <h2>Apply for Your Super Visa Through Route 2 Migrate</h2>
              <p>Reuniting with your parents or grandparents in Canada requires careful documentation, especially regarding financial proofs and medical insurance. We are not a traditional travel agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your family's application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Eligibility Assessment:</strong> We evaluate your family's financial situation to ensure the host meets the minimum necessary income (LICO + 30%) requirement before you apply.</li>
                <li><strong>Document Verification:</strong> Our legal team meticulously verifies the letter of invitation, proof of relationship, and the host's financial documents to prevent refusals.</li>
                <li><strong>Medical Insurance Guidance:</strong> We guide you in selecting and securing IRCC-compliant private health insurance (minimum $100,000 coverage) from approved Canadian or international providers.</li>
                <li><strong>Application Filing & Legal Representation:</strong> As your legal representative, our RCIC prepares and submits your Super Visa application to IRCC, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA) and preparing you for any embassy requests.</li>
              </ul>

              <h2>Super Visa FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long can parents stay on a Super Visa?</h3>
                  <p>As of recent IRCC updates, parents and grandparents can stay in Canada for up to 5 years per visit on a Super Visa. The visa itself is valid for up to 10 years.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can my parents work on a Super Visa?</h3>
                  <p>No. The Super Visa is strictly a visitor visa. It does not allow the holder to work or study in Canada without a separate work or study permit. It is for family visits only.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I apply for a Super Visa while waiting for my Parents' PR sponsorship?</h3>
                  <p>Yes. If you have already submitted a Permanent Residency sponsorship application for your parents, they can still apply for a Super Visa to visit Canada while they wait for the PR decision.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What is the minimum income required for a Super Visa host?</h3>
                  <p>The host must meet Canada's Low Income Cut-Off (LICO) plus 30% for their family size. Proof of income via Notice of Assessment (NOA) or T4/T1 slips for the most recent tax year is required.</p>
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
                  Have questions about the Super Visa application process?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Reuniting your family requires precise legal documentation. If you're looking for guidance tailored to your specific situation, book a consultation with our licensed RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Applying with incomplete financial proofs or non-compliant insurance can lead to a refusal. Avoid making the <Link href="/blog/common-immigration-mistakes" className="text-white font-semibold underline">common immigration mistakes</Link> by seeking professional help. Start with the right advice and move forward with confidence.
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