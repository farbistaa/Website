import { useState, useEffect, useRef, type FC } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Phone, Mail, MapPin, Clock, MessageSquare, Shield,
  ArrowRight, CheckCircle, Calendar, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FreeAssessmentForm } from "@/components/FreeAssessmentForm";

// ── Fixed: properly typed easing tuple and Variants to fix TS errors ──
const EASING: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const ease = { duration: 0.7, ease: EASING };
const fadeUp: Variants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: ease } };
const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } };

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// ── Typewriter Component ──
const Typewriter: FC<{ text: string; speed?: number; startDelay?: number; className?: string; start?: boolean }> = ({
  text, speed = 100, startDelay = 300, className = "", start = true
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!start) return;
    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeNextChar = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.substring(0, currentIndex));
        currentIndex++;
        timeout = setTimeout(typeNextChar, speed);
      } else {
        setIsDone(true);
      }
    };

    timeout = setTimeout(typeNextChar, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay, start]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: isDone ? [1, 0, 1] : 1 }}
        transition={{ duration: 0.8, repeat: isDone ? Infinity : 0 }}
        style={{ display: "inline-block", width: "2px", marginLeft: "4px", background: "currentColor", height: "0.85em", verticalAlign: "middle" }}
        aria-hidden="true"
      />
    </span>
  );
};

// ── High Quality SVG Flags (Fixes Windows 'CA' and 'bd' emoji issue) ──
const CanadaFlag: FC = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" className="rounded-sm overflow-hidden border border-gray-200 shadow-sm shrink-0" aria-label="Canada Flag">
    <rect width="28" height="18" fill="#fff" />
    <rect width="7" height="18" fill="#D52B1E" />
    <rect x="21" width="7" height="18" fill="#D52B1E" />
    <path d="M14 3.5l1.2 3l3-1.5l-1.2 3.5l3.5 1l-3 2.5l1.5 2l-3.5-1l0.5 3.5l-2-2l-2 2l0.5-3.5l-3.5 1l1.5-2l-3-2.5l3.5-1l-1.2-3.5l3 1.5z" fill="#D52B1E" />
  </svg>
);

const BangladeshFlag: FC = () => (
  <svg width="28" height="18" viewBox="0 0 28 18" className="rounded-sm overflow-hidden border border-gray-200 shadow-sm shrink-0" aria-label="Bangladesh Flag">
    <rect width="28" height="18" fill="#006a4e" />
    <circle cx="11.5" cy="9" r="5" fill="#f42a41" />
  </svg>
);

interface Office {
  country: string;
  Flag: FC;
  address: string;
  phones: string[];
  email: string;
  mapQuery: string;
}

const offices: Office[] = [
  {
    country: "Canada",
    Flag: CanadaFlag,
    address: "123 Parkway Forest Dr, Apt.\nSuite\\Unit # 805, North York, ON M2J 0G1, Canada",
    phones: ["+1 (437) 332-8242"],
    email: "contact@rmigrate.ca",
    mapQuery: "123+Parkway+Forest+Drive+North+York+Ontario+M2J+0G1",
  },
  {
    country: "Bangladesh",
    Flag: BangladeshFlag,
    address: "93 Shah Makhdum Avenue (Flat A2)\nSector 12, Uttara, Dhaka 1230",
    phones: ["+880 1896 060701", "+880 1896 060702"],
    email: "contact@rmigrate.ca",
    mapQuery: "93+Shah+Makhdum+Avenue+Uttara+Dhaka",
  },
];

const officeHours = [
  { day: "Sunday – Thursday", hours: "10:00 AM – 6:00 PM BST" },
  { day: "Saturday", hours: "By appointment only" },
];

const quickFaqs = [
  { q: "Is the initial consultation really free?", a: "Yes — completely free, no commitment, no hidden charges. We use the consultation to understand your situation and provide honest guidance on your options." },
  { q: "How quickly will I receive a response?", a: "All form submissions and email inquiries are reviewed within 24 business hours. For urgent matters, please call our Canadian office directly." },
  { q: "Can I consult via video call?", a: "Absolutely. We serve clients worldwide via Zoom, Google Meet, and phone. In-person meetings are also available at our North York and Dhaka offices." },
  { q: "Do you work with clients from outside Canada?", a: "Yes. Many of our clients have never visited Canada before their PR approval. We handle remote consultations and applications for clients worldwide." },
];

const trustPoints = [
  "RCIC Licensed — License R710078",
  "CICC Member in Good Standing",
  "CAPIC Member",
  "All consultations are confidential",
];

export default function ContactPage() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO — white, centered, like Services/About */}
      <section className="pt-36 pb-20 bg-white" aria-label="Contact page header">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-primary/8 text-primary text-xs font-semibold px-5 py-2 rounded-full mb-6 uppercase tracking-[0.2em]">
                Get In Touch
              </span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Begin Your Canadian
              <span className="block text-gradient">
                <Typewriter text="Journey Today." speed={100} startDelay={800} />
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal mb-10">
              Two offices. Three phone lines. One dedicated RCIC. We respond to every inquiry within 24 hours.
            </motion.p>

            {/* Quick contact pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              <a
                href="tel:+14373328242"
                className="inline-flex items-center gap-2.5 bg-white border border-gray-200 text-foreground text-sm font-semibold px-5 py-3 rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label="Call Canada office: +1 (437) 332-8242"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                +1 (437) 332-8242
              </a>
              <a
                href="mailto:contact@rmigrate.ca"
                className="inline-flex items-center gap-2.5 bg-white border border-gray-200 text-foreground text-sm font-semibold px-5 py-3 rounded-full hover:border-primary/30 hover:text-primary hover:bg-primary/3 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label="Email us at contact@rmigrate.ca"
              >
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                contact@rmigrate.ca
              </a>
              <a
                href="https://riffathmohaimen.setmore.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-primary text-white text-sm font-semibold px-5 py-3 rounded-full hover:bg-primary/90 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
                aria-label="Book a consultation via Calendly"
              >
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAIN SECTION: Offices + Info + Form */}
      <section className="py-24 bg-gray-50" aria-labelledby="contact-main-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            {/* Section Header */}
            <motion.div ref={titleRef} variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Our Offices</span>
              <h2 id="contact-main-heading" className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
                <Typewriter text="How to Reach Us" speed={100} startDelay={500} start={titleInView} className="text-gradient" />
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">Every inquiry is reviewed personally and responded to within one business day.</p>
            </motion.div>

            {/* Offices - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
              {offices.map((office) => (
                <motion.div
                  key={office.country}
                  variants={fadeUp}
                  className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-red-400/40 hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.3)]"
                  aria-label={`${office.country} office contact information`}
                >
                  <div className="px-6 pt-5 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <office.Flag />
                      <h3 className="font-serif font-bold text-foreground text-lg">{office.country} Office</h3>
                    </div>
                  </div>
                  <div className="p-6 space-y-4 flex-grow">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <div>
                        <address className="text-foreground text-sm not-italic leading-relaxed whitespace-pre-line font-medium">{office.address}</address>
                        <a
                          href={`https://maps.google.com/?q=${office.mapQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-xs font-semibold mt-1.5 inline-flex items-center gap-1 hover:underline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1"
                          aria-label={`View ${office.country} office on Google Maps`}
                        >
                          View on Maps <ArrowRight className="h-3 w-3" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                      <div className="space-y-1">
                        {office.phones.map((p) => (
                          <a
                            key={p}
                            href={`tel:${p.replace(/\s/g, "")}`}
                            className="text-foreground hover:text-primary text-sm font-medium transition-colors block focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1 rounded"
                            aria-label={`Call ${office.country} office: ${p}`}
                          >
                            {p}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-foreground hover:text-primary text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-1 rounded"
                        aria-label={`Send email to ${office.email}`}
                      >
                        {office.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Cards - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
              {/* Office hours */}
              <motion.div 
                variants={fadeUp} 
                className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6 h-full transition-all duration-300 hover:border-red-400/40 hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.3)]" 
                aria-label="Office hours"
              >
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-serif font-bold text-foreground">Office Hours</h3>
                </div>
                <dl className="space-y-3">
                  {officeHours.map((o) => (
                    <div key={o.day} className="flex items-center justify-between text-sm gap-4">
                      <dt className="text-foreground font-medium shrink-0">{o.day}</dt>
                      <dd className="text-muted-foreground text-right">{o.hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
                  Evening and weekend appointments available upon request.
                </p>
              </motion.div>

              {/* Trust points */}
              <motion.div 
                variants={fadeUp} 
                className="bg-primary/5 border border-primary/15 shadow-sm rounded-2xl p-5 h-full transition-all duration-300 hover:border-red-400/40 hover:shadow-[0_0_25px_-5px_rgba(239,68,68,0.3)]" 
                role="region" 
                aria-label="Trust and credentials"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <h4 className="font-semibold text-foreground text-sm">Your Information Is Protected</h4>
                </div>
                <ul className="space-y-2 mb-3" aria-label="Trust credentials">
                  {trustPoints.map((pt) => (
                    <li key={pt} className="flex items-center gap-2 text-xs text-foreground">
                      <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  All information shared is held in strict confidence under the CICC Code of Professional Ethics.
                </p>
              </motion.div>
            </div>

            {/* Form - Centered Below */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 sm:p-10 transition-all duration-300 hover:border-red-400/50 hover:shadow-[0_0_35px_-5px_rgba(239,68,68,0.4)]">
                <div className="mb-8 text-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary uppercase tracking-[0.18em] mb-3">
                    <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                    Free Assessment
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-2">
                    Request Your Free Immigration Assessment
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto">
                    RCIC Riffat H. Mohaimen reviews every inquiry personally and responds within 24 hours — completely free, no commitment required.
                  </p>
                </div>

                <FreeAssessmentForm />
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#08080f] relative overflow-hidden" aria-labelledby="contact-faq-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/6 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center mb-12">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Common Questions</span>
              <h2 id="contact-faq-heading" className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">Quick Answers</h2>
              <p className="text-white/45 text-sm">For first-time inquiries and frequently asked questions.</p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quickFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass-dark rounded-2xl p-6 border border-white/[0.07] hover:border-primary/20 transition-colors"
                  aria-label={`FAQ: ${faq.q}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-2 leading-snug">{faq.q}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center mt-12">
              <p className="text-white/40 text-sm mb-5">Still have questions? We're happy to help.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 font-semibold transition-all duration-300">
                  <a
                    href="https://riffathmohaimen.setmore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a consultation via Calendly"
                  >
                    Book Consultation <ArrowRight aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/8 rounded-full px-8 h-11 bg-white/5">
                  <a
                    href="mailto:contact@rmigrate.ca?subject=Inquiry%20from%20Website&body=Hello%2C%0A%0A"
                    aria-label="Email us at contact@rmigrate.ca"
                  >
                    Email Us Directly
                  </a>
                </Button>
              </div>
            </motion.div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}