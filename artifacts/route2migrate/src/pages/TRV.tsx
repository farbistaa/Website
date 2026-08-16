// src/pages/TRV.tsx
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

export default function TRVBlogPostPage() {
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
              Canada Temporary Resident Visa (TRV): Eligibility & Application Guide
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> July 5, 2025</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">A Temporary Resident Visa (TRV), commonly known as a visitor visa, is an official travel document placed in your passport that allows you to enter or re-enter Canada. Whether you are visiting family, exploring the country as a tourist, or attending a business meeting, securing a TRV requires proving your intent to leave Canada at the end of your authorized stay.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>Official Document:</strong> A TRV is a mandatory travel document placed in your passport for entry into Canada.</li>
                  <li><strong>Ties to Home Country:</strong> You must convince an immigration officer that you have significant ties (job, home, family) that will ensure your return home.</li>
                  <li><strong>Financial Solvency:</strong> You must have sufficient funds to cover your stay, including hotels and daily expenses.</li>
                  <li><strong>Admissibility:</strong> Applicants must pass strict criminal, security, and medical checks to be deemed admissible.</li>
                  <li><strong>Health Restrictions:</strong> Specific travel bans exist for foreign nationals from regions with certain disease outbreaks, such as Ebola.</li>
                </ul>
              </div>

              <h2>Who Can Get a Visa?</h2>
              <p>To get a Canadian visitor visa, you must meet some basic requirements set by Immigration, Refugees and Citizenship Canada (IRCC). You must:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Have a valid travel document, like a passport.</li>
                <li>Be in good health.</li>
                <li>Have no criminal or immigration-related convictions.</li>
                <li>Convince an immigration officer that you have ties—such as a job, home, financial assets, or family—that will take you back to your home country.</li>
                <li>Convince an immigration officer that you will leave Canada at the end of your visit.</li>
                <li>Have enough money for your stay. (The amount of money you will need depends on how long you will stay and if you will stay in a hotel, or with friends or relatives).</li>
              </ul>
              <p>You may also need a medical exam and a letter of invitation from someone who lives in Canada depending on your specific situation. If you are planning to visit your children or grandchildren for an extended period, you might want to explore the <Link href="/blog/super-visa-parents-guide" className="text-primary font-semibold">Super Visa for Parents & Grandparents</Link>.</p>

              <h3>Health Restrictions: Ebola-Affected Regions</h3>
              <p>As part of Canada's public health measures, specific travel restrictions are enforced for regions experiencing disease outbreaks:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Foreign nationals living in the Democratic Republic of the Congo, South Sudan, and Uganda cannot travel to Canada as of May 27, 2026.</li>
                <li>As of July 20, 2026, foreign nationals who have visited the Democratic Republic of the Congo within the past 21 days cannot travel to Canada.</li>
              </ul>

              <h2>Some People Are Not Allowed to Enter Canada</h2>
              <p>Some people are inadmissible to Canada, which means they are not allowed to enter the country. You can be inadmissible for several reasons, including being involved in:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Criminal activity</li>
                <li>Human rights violations</li>
                <li>Organized crime</li>
              </ul>
              <p>You can also be inadmissible for security, health, or financial reasons. If you have a past conviction, it is highly recommended to seek legal advice to determine if you are criminally inadmissible before applying. Avoid making the <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> by having your profile assessed professionally.</p>

              <h2>Minor Children Travelling to Canada</h2>
              <p>Make sure you know what to do if your minor children (children under the age of 18) will be travelling with you, with someone else, or alone. Minor children travelling to Canada must meet the same basic requirements as adults, including having a valid visa. If a minor child is travelling alone or with only one parent, they must carry a consent letter from the non-accompanying parent(s) or legal guardian.</p>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <h3 className="text-lg font-bold mt-0 mb-3 text-foreground">Important Disclaimer</h3>
                <p className="text-muted-foreground text-sm leading-relaxed m-0">
                  <strong>Please Note:</strong> These requirements are subject to change. Updated information will be found on the official <a href="https://www.canada.ca/en/immigration-refugees-citizenship.html" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold">canada.ca website</a>. Always consult with a licensed professional to verify the latest IRCC policy changes before applying.
                </p>
              </div>

              <h2>Apply for Your TRV Through Route 2 Migrate</h2>
              <p>Applying for a Temporary Resident Visa requires more than just filling out a form; it requires building a compelling legal case that proves your genuine intent to visit and return home. We are not a traditional travel agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). When you choose Route 2 Migrate, your application is backed by legal expertise and strict compliance with Canadian immigration law. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Eligibility Assessment:</strong> We evaluate your travel history, financial standing, and home-country ties to ensure your profile meets IRCC's criteria for a genuine visitor.</li>
                <li><strong>Admissibility Screening:</strong> If you have past criminal convictions or medical issues, our legal team assesses your admissibility and advises on potential solutions, such as Temporary Resident Permits (TRPs).</li>
                <li><strong>Document Verification:</strong> We meticulously verify your employment letters, bank statements, property documents, and invitation letters to ensure they satisfy the immigration officer's scrutiny.</li>
                <li><strong>Application Filing & Legal Representation:</strong> As your legal representative, our RCIC prepares and submits your TRV application, ensuring full compliance with the Immigration and Refugee Protection Act (IRPA) and drafting a legal submission letter that logically presents your case.</li>
              </ul>

              <h2>Temporary Resident Visa (TRV) FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">How long can I stay in Canada on a TRV?</h3>
                  <p>Most visitors are allowed to stay in Canada for up to 6 months. However, the border services officer at the port of entry may authorize a shorter or longer stay depending on your specific situation.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I work or study on a TRV?</h3>
                  <p>No. A standard visitor visa does not allow you to work in Canada. You can attend short-term courses (less than 6 months) that do not require a study permit, but you cannot enroll in a full-degree program. For studying, read our <Link href="/blog/canada-study-permit-guide" className="text-primary font-semibold">Canada Study Permit Guide</Link>.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I extend my stay as a visitor?</h3>
                  <p>Yes. If you want to stay longer than your authorized period, you must apply for a record of extension (visitor record) before your current status expires. You must continue to prove you have sufficient funds to support your extended stay.</p>
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
                  Have questions about your Canada Visitor Visa?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Visa refusals often happen due to a lack of strong documentation proving ties to the home country. If you're looking for guidance tailored to your specific situation, book a consultation with our licensed RCIC, Riffat H. Mohaimen (R710078), to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Applying with incomplete documents or failing to address previous refusals can lead to a ban. Start with the right advice and move forward with confidence.
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