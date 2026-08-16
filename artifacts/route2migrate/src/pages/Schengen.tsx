// src/pages/Schengen.tsx
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

export default function SchengenBlogPostPage() {
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
              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 bg-opacity-90`}>
                <Tag className="h-3 w-3" aria-hidden="true" />
                Schengen Visa
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-snug">
              Schengen Visa Application Services: Your 2025 Guide to Exploring Europe
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-5 text-sm text-white/50">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" aria-hidden="true" />
                <a href="https://www.linkedin.com/in/farbista/" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">
                  Foyaj Ahmmad Farabi
                </a>
              </span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" /> June 25, 2025</span>
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
              <p className="lead text-lg text-foreground font-medium mb-8">The Schengen Area represents 29 European countries that have abolished all internal borders, allowing free and unrestricted movement. Whether you are planning a tourist vacation, a business trip, or visiting family, securing a Schengen visa requires meticulous preparation. Our Schengen Visa Application Services are designed to eliminate the guesswork and maximize your chances of approval.</p>
              
              <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
                <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li><strong>29 Countries, One Visa:</strong> A Schengen visa allows you to travel across 25 EU states and 4 non-EU states.</li>
                  <li><strong>VFS Global in Dhaka:</strong> Appointments are mandatory and can be booked via online platforms or physically at the VFS Global centers.</li>
                  <li><strong>Financial Proof:</strong> You must demonstrate sufficient funds (typically €40-€50 per day) and stable income.</li>
                  <li><strong>Mandatory Documents:</strong> Flight itineraries, hotel bookings, and travel insurance covering at least €30,000 are non-negotiable.</li>
                  <li><strong>Processing Time:</strong> The average processing time is 15 days, but it can extend up to 45 days during peak seasons.</li>
                </ul>
              </div>

              <h2>How Can I Apply for a Schengen Visa from Bangladesh?</h2>
              <p>Applying for a Schengen visa involves determining your primary destination. If you are visiting only one country, you apply at that country's embassy. If visiting multiple, you apply at the embassy of the country where you will spend the longest duration, or the first country you enter if the duration is equal.</p>
              <p>Most Schengen countries outsource their visa collection to VFS Global. For example, if you are traveling to Germany, the <strong>German Embassy</strong> processes the visa, but you will submit your documents and biometrics at the VFS Global center. Understanding the specific embassy's nuanced requirements is where our Schengen Visa Application Services provide immense value, preventing costly mistakes similar to the <Link href="/blog/common-immigration-mistakes" className="text-primary font-semibold">common immigration mistakes</Link> applicants make.</p>

              <h2>How to Book an Appointment for a Schengen Visa Application in Dhaka?</h2>
              <p>Securing an appointment is often the most frustrating step for applicants. You must book an appointment online before visiting the Visa Application Center.</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Online Platforms:</strong> Are there any online platforms for booking Schengen visa appointments? Yes, the primary platform is the official VFS Global website. You must create an account, select your destination country, and choose an available date and time.</li>
                <li><strong>Physical Booking:</strong> In some cases, VFS Global allows premium lounge services or provides limited walk-in slots for an additional fee, but online booking remains the standard.</li>
              </ul>
              <p>Due to high demand, slots fill up within minutes. We assist our clients by monitoring appointment availability and ensuring all forms are perfectly filled out before the booking phase.</p>

              <h2>Complete Required Documents Checklist</h2>
              <p>Having the correct documentation is critical. A short-stay (Type C) visa application requires a comprehensive set of documents. Please review this generic checklist carefully:</p>
              <ol className="list-decimal pl-6 mb-6 space-y-4">
                <li><strong>Application Form:</strong> Filled in and signed by the applicant.</li>
                <li><strong>A Valid Passport:</strong> The passport should have a validity of at least three months beyond the intended stay. The passport must have at least two blank pages to affix the visa.</li>
                <li><strong>One Recent Passport Photo (3.50cm x 4.50cm):</strong> The photo should be recent (less than 6 months old), in colour, on a white background.</li>
                <li><strong>Overseas Travel Medical Insurance:</strong> Valid for all Schengen Countries. The insurance must have a minimum coverage of €30,000 or equivalent. The policy must specify the period of validity and must cover the entire duration of stay, including dates of arrival and departure.</li>
                <li><strong>Travel Information:</strong> Travel details including proof of return travel, flight reservations specifying flight numbers, dates, and personal details. If an applicant is travelling to several Schengen states, proof of travel within the Schengen area is required, such as flight reservations, train tickets, or car rentals.</li>
                <li><strong>Accommodation Information:</strong> Proof of accommodation, such as a confirmed hotel reservation. If the applicant is travelling to several Schengen Member States, proof of accommodation in each is required.</li>
                <li>
                  <strong>Proof of Sponsorship (if applicable):</strong> A declaration of proof is required if expenses shall be covered by a host/sponsor based in the Schengen area (including if hotel accommodation is covered by the host), or if private accommodation shall be provided.
                  <br /><br />
                  If the sponsor is providing private accommodation, the declaration of proof should be accompanied by proof of residence (such as a rental/lease agreement, and electricity/water bills), and/or proof of income (such as salary slips, bank statements). The document should be fully filled-in, witnessed, and notarized. A copy of the sponsor’s ID/passport should accompany the declaration of proof.
                </li>
                <li>
                  <strong>Proof of Employment & Sufficient Means of Subsistence:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li><strong>For employees:</strong> (i) employment certificate, (ii) payslips covering the last three months, (iii) bank statement showing movements for the last 6 months.</li>
                    <li><strong>For self-employed:</strong> (i) company registration and copy of relevant official notification in the Government Gazette, and/or license to operate, and/or latest tax receipt, and/or certificate issued by professional association, (ii) bank statement showing movements in the last 6 months.</li>
                    <li><strong>Pensioners/Retired:</strong> (i) pension statements for the last three months and/or proof of income, (ii) bank statement showing movements in the last 6 months.</li>
                    <li>A declaration of financial responsibility should be provided by sponsors on behalf of applicants who are not financially independent (such as students, minors, elderly parents, unemployed), signed by the sponsor. Proof of sufficient means of subsistence should be provided accordingly, as per above.</li>
                  </ul>
                </li>
                <li><strong>Previous Visas:</strong> Photocopy of the relevant pages of previous Schengen visas (if any), including entry and exit stamps.</li>
                <li><strong>Applications on behalf of non-residents should include:</strong> A valid residency permit issued by the competent local authorities must be provided.</li>
                <li>
                  <strong>Applications on behalf of minors should include:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>A copy of the passport of the parents or legal guardian.</li>
                    <li>If a minor intends to travel alone or only with one parent, or absent the legal guardian, a consent form signed by the parents or legal guardian is required.</li>
                    <li>Exceptions are made if the single parent with whom the minor is to travel holds the parental authority alone (such as in cases where the other parent has deceased or been deprived of custody).</li>
                  </ul>
                </li>
                <li>
                  <strong>Applications on behalf of students should include:</strong>
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    <li>A copy of their student card and/or a copy of school/college/university registration.</li>
                    <li>A transcript of results.</li>
                  </ul>
                </li>
              </ol>

              <div className="my-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <h3 className="text-lg font-bold mt-0 mb-3 text-foreground">Important Disclaimer & Processing Notes</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  <strong>Please Note:</strong> These requirements are subject to change based on the regions' immigration policies and laws. Additional documents may be required based on the specific country's requirements, immigration rules, law, or policy changes.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  This checklist serves as a generic guide for visa applicants regarding the supporting documents they should provide. It is the responsibility of the applicant to ensure that they have provided appropriate documentation. Supplementary documents may be requested by the Consulate during the visa application process. An interview may also be requested. Providing all the requested documentation does not automatically result in the approval of a visa application.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  The standard processing time for a visa application is 15 days. In certain cases where further information is required, the process may take longer than the standard time. It is incumbent upon the visa applicant and/or sponsor of the applicant to ensure that the application is filed appropriately in advance of the required travel to the Schengen area – and at least 15 days prior to the date of travel. Applications with dates of travel less than 15 days later will not be accepted. It is not possible for the Consulate to expedite or ‘fast-track’ applications.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Should an applicant wish to withdraw their passport during the visa application process, they may contact VFS via the appropriate helpline in order to request a passport withdrawal form. The visa application will not be accepted without a passport.
                </p>
              </div>

              <h2>What Are the Financial Proof Requirements for a Schengen Visa Application?</h2>
              <p>Financial stability is one of the most scrutinized aspects of your application. You must prove you have the means to support yourself during your stay. The general requirement is equivalent to €40 to €50 per day of your stay, though this varies slightly by embassy. As mentioned in the checklist above, this requires 6 months of bank statements, tax returns, and clear proof of income.</p>

              <h2>Where Can I Find Reliable Flight Itinerary Services for a Schengen Visa?</h2>
              <p>A common mistake applicants make is buying a fully refundable, expensive flight ticket before the visa is even approved. Embassies explicitly state they do not require purchased tickets—only an itinerary. You can find reliable flight itinerary services through specialized travel agencies that hold a reservation for you for a small fee. Our Schengen Visa Application Services include arranging verifiable flight itineraries and hotel bookings specifically tailored for embassy submissions, saving you hundreds of dollars.</p>

              <h2>Compare Travel Insurance Options for a Europe Trip from Bangladesh</h2>
              <p>Travel insurance is legally mandatory for the Schengen Area. As outlined in the required documents, your insurance must provide a minimum coverage of €30,000, cover medical emergencies, hospitalization, and repatriation, and be valid for the entire duration of your stay across all 29 Schengen countries. Several local and international insurance companies offer Schengen-compliant travel insurance. We help our clients compare and select the most cost-effective and embassy-approved policies.</p>

              <h2>What is the Average Processing Time for a Schengen Visa Application?</h2>
              <p>The standard processing time for a Schengen visa is <strong>15 calendar days</strong> from the date your application reaches the embassy. However, during peak travel seasons (summer and winter holidays), or if the embassy requests additional documents, this can extend to 30 or even 45 days. We highly recommend applying at least 4 to 6 weeks before your intended travel date.</p>

              <h2>Exploring All 29 Schengen Countries</h2>
              <p>Once your visa is approved, a world of history, culture, and breathtaking landscapes awaits you. The Schengen Area currently consists of 29 member countries:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Austria, Belgium, Bulgaria, Croatia, Czech Republic, Denmark, Estonia, Finland, France, Germany</li>
                <li>Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands</li>
                <li>Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden, Switzerland</li>
              </ul>
              <p>With a multiple-entry Schengen visa, you can seamlessly travel from the romantic streets of Paris to the historic ruins of Rome, and the northern lights of Iceland, all under a single legal document.</p>

              <h2>Apply for Your Schengen Visa Through Route 2 Migrate</h2>
              <p>Navigating the Schengen visa process can be complex, especially with varying embassy requirements and strict documentation rules. We are not a traditional travel agency; we are a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078). We apply the same legal rigor to temporary resident (tourist) visas as we do to permanent residence applications. When you choose Route 2 Migrate for your Schengen Tourist Visa, your application is backed by legal expertise and strict compliance with European immigration laws. Here is the comprehensive support you will receive:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Strategic Profile Assessment:</strong> We evaluate your travel history, financial standing, and ties to your home country to ensure your profile meets the specific criteria of your destination country's embassy, minimizing the risk of refusal.</li>
                <li><strong>Document Verification & Legal Review:</strong> Our legal team meticulously verifies all your documents—bank statements, employment letters, and sponsorships—to ensure they meet the exact formatting and content requirements of the consulate, preventing refusals due to technicalities.</li>
                <li><strong>Customized Itinerary & Accommodation Planning:</strong> We assist in creating a verifiable, logical travel itinerary and securing embassy-compliant hotel reservations without requiring you to make upfront non-refundable payments.</li>
                <li><strong>Flight Itinerary & Travel Insurance Support:</strong> We provide reliable flight itinerary services tailored specifically for visa applications and help you secure Schengen-compliant travel insurance (minimum €30,000 coverage) at the best rates.</li>
                <li><strong>Appointment Booking Assistance:</strong> We monitor and guide you through the VFS Global appointment booking process, ensuring your application forms are perfectly completed before your physical appointment.</li>
                <li><strong>Form Filling & Application Submission:</strong> We handle the precise completion of your visa application form and prepare a comprehensive petition letter (cover letter) that logically and legally presents your case to the visa officer.</li>
              </ul>

              <h2>Schengen Visa FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Do I need to submit my actual passport during the application?</h3>
                  <p>Yes. Your physical passport must be submitted along with your application at the VFS Global center, as the embassy needs it to affix the visa sticker if approved. It will be returned to you via courier once a decision is made.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I work on a Schengen short-stay visa?</h3>
                  <p>No. A short-stay (Type C) Schengen visa is strictly for tourism, business meetings, family visits, or transit. It does not grant you the right to work or live permanently in Europe.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">What happens if my Schengen visa is refused?</h3>
                  <p>If your visa is refused, you will receive a standard refusal letter stating the reason. You have the right to appeal the decision. It is often better to re-apply with stronger documentation addressing the reason for refusal, rather than appealing, if the initial application was fundamentally weak.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Is an interview required for a Schengen visa?</h3>
                  <p>While not always mandatory, the embassy reserves the right to call you in for a personal interview to clarify details about your trip, financial status, or ties to your home country.</p>
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
                  Have questions about your immigration options?
                </h3>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Every immigration journey is unique, and the right path depends on your personal profile and circumstances. If you're looking for guidance tailored to your goals and profile, book a consultation with our licensed RCIC, Riffat H. Mohaimen, to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Choosing the wrong immigration strategy can cost you valuable time, unnecessary expenses, missed opportunities, or even lead to a refusal and ban. Start with the right advice and move forward with confidence.
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