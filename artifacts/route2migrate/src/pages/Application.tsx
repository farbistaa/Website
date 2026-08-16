// src/pages/Application.tsx
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

export default function ApplicationReviewBlogPostPage() {
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Consulting Services
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Visa Application Review Services: Ensure Your Approval with RCIC Expertise
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 12, 2025</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">Filing your own visa application can save you upfront costs, but a single oversight can lead to a devastating refusal, impacting your future travel and immigration goals. Our Visa Application Review Service bridges the gap between a DIY application and full legal representation—giving you the confidence that your paperwork is flawless before it reaches the immigration officer.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Error Prevention:</strong> A single missing document or inconsistent date can trigger a refusal. We catch these errors before submission.</li>
                  <li><strong>Legal Compliance:</strong> Your application is reviewed against the strict standards of the Immigration and Refugee Protection Act (IRPA).</li>
                  <li><strong>Strategic SOP Review:</strong> We help refine your Statement of Purpose to logically address any potential red flags in your profile.</li>
                  <li><strong>Cost-Effective Peace of Mind:</strong> Get RCIC-level expertise on your self-prepared application without paying for full representation.</li>
                </ul>
              </div>

              <h2>What is the Visa Application Review Service?</h2>
              <p>Our Visa Application Review Service is designed for applicants who wish to prepare and submit their own immigration applications (such as visitor visas, study permits, or work permits) but want a licensed professional to audit their work before final submission. We meticulously examine your forms, supporting documents, and letters to ensure they meet the specific criteria of Immigration, Refugees and Citizenship Canada (IRCC). This service ensures your application presents a strong, legally sound case to the visa officer.</p>

              <h2>What We Provide in This Service</h2>
              <p>When you book an Application Review with Route 2 Migrate, you receive a comprehensive, multi-point audit of your entire application package. Here is exactly what is included:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Document Checklist Verification:</strong> We cross-reference your documents against the specific IRCC checklist for your visa type, ensuring nothing is missing or outdated.</li>
                <li><strong>Form Validation:</strong> We review your application forms to ensure all questions are answered accurately, consistently, and completely, avoiding technical refusals.</li>
                <li><strong>Financial Proof Assessment:</strong> We analyze your bank statements, tax returns, and proof of funds to ensure they meet IRCC's strict financial thresholds and don't raise unexplained red flags.</li>
                <li><strong>Statement of Purpose (SOP) & Letter of Explanation (LOE) Critique:</strong> We critically review your narrative to ensure it effectively establishes your genuine intent, ties to your home country, and addresses any past refusals or study gaps.</li>
                <li><strong>Legal Risk Assessment:</strong> We identify potential inadmissibility issues (criminal, medical, or misrepresentation) and advise on how to legally mitigate them.</li>
                <li><strong>Detailed Feedback Report:</strong> You receive a comprehensive written report detailing exactly what needs to be fixed, added, or removed before you submit your application online.</li>
              </ul>

              <h2>Why Book This Service With Our RCIC?</h2>
              <p>Many unregulated "consultants" or travel agencies offer document-checking services, but they lack the legal authority and in-depth knowledge of Canadian immigration law. We are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). Here is why you should trust us with your application review:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Unmatched Legal Expertise:</strong> An RCIC is legally trained and authorized by the Canadian government to interpret immigration law. We don't just check if a document exists; we evaluate whether it holds legal weight with a visa officer.</li>
                <li><strong>Up-to-Date Knowledge:</strong> IRCC policies change constantly. As a regulated firm, we are bound by strict Continuing Professional Development (CPD) requirements, ensuring our advice reflects the most current rules and operating manuals.</li>
                <li><strong>Objective, Honest Assessments:</strong> We will give you a frank evaluation of your chances. If your application is fundamentally weak, we will tell you before you waste your government filing fees, saving you time and money.</li>
                <li><strong>Avoiding Misrepresentation:</strong> Unintentional misrepresentation is a leading cause of 5-year bans from Canada. Our RCIC identifies ambiguous information that an officer might misinterpret, protecting your future immigration prospects.</li>
              </ul>
              <h2>Visa Application Review FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Does this service guarantee my visa will be approved?</h3>
                  <p>No service can guarantee a visa approval, as the final decision rests solely with the IRCC officer. However, our review guarantees that your application is complete, legally sound, and presents your profile in the strongest possible light, drastically reducing the chances of an unfair refusal. Avoid making <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by getting a professional review.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Will my RCIC submit the application for me?</h3>
                  <p>Under the Application Review Service, you are responsible for uploading and submitting the application yourself. If you prefer us to handle the entire submission and act as your legal representative, we can upgrade your service to full representation. </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can you review applications for any visa type?</h3>
                  <p>Yes, we review applications for Visitor Visas (TRV), Study Permits, Work Permits, and Spousal Open Work Permits (SOWP). Whether you are applying for the first time or re-applying after a refusal, our review service is tailored to your needs.</p>
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
                  Ready to submit your application with confidence?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Don't let a minor oversight ruin your immigration journey. If you have prepared your application and want a licensed professional to review it, book a consultation with our RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice before you hit submit.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> A refusal on your record makes future applications significantly harder. Start with the right advice and move forward with confidence.
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