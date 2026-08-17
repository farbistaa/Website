import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";
import {
  Award, CheckCircle, Shield, Users, Globe, Heart, ArrowRight,
  Star, Quote, Mail, GraduationCap, Briefcase, Building2, Scale, BadgeCheck,
  Phone, Linkedin, Eye, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import riffatPhoto from "@assets/RCIC_Riffat_H_Mohaimen_1785319025735.jpeg";
import zubairPhoto from "@assets/Syed_Mohd._Zubair_Huda_Adel_1782727934629.jfif";
import tamimPhoto from "@assets/Tamim_Ahmed_Chowdury_1782727934628.png";
import farabiPhoto from "@assets/Foyaj Ahmmad Farabi.png";

// Fix TS error: cast ease array as const so it satisfies Easing type
const easeOut = { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const };
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={stagger} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// Type-effect component for "What We Stand For"
function TypeEffect({ text, className = "" }: { text: string; className?: string }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
    }
  }, [inView, started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[3px] h-[0.9em] bg-primary ml-1 align-middle"
        aria-hidden="true"
      />
    </span>
  );
}

const values = [
  { icon: Shield, title: "Integrity", desc: "Honest assessments, always — even when the answer isn't what a client hopes to hear. Honesty is our foundation." },
  { icon: Award, title: "Excellence", desc: "Every application is reviewed multiple times. We hold ourselves to the highest standard of accuracy and professionalism." },
  { icon: Heart, title: "Compassion", desc: "Behind every file is a family with real dreams. We carry that responsibility with genuine care and dedication." },
  { icon: Users, title: "Community", desc: "We believe in a stronger, more diverse Canada. Every client we guide contributes to the fabric of this great nation." },
  { icon: Globe, title: "Accessibility", desc: "Quality immigration advice should be accessible to everyone, regardless of background, country, or financial status." },
  { icon: Scale, title: "Accountability", desc: "We own our results. Clients always know exactly where their application stands and what we're doing about it." },
];

const milestones = [
  { year: "2010–2015", event: "Served as Non-Immigrant Visa Fraud Analyst at the US Embassy, Dhaka — developing expert-level knowledge in visa adjudication, fraud detection, and consular decision-making." },
  { year: "2015–2017", event: "Earned a Master of Science in Finance (Finance & Accounting) from Durham University Business School, United Kingdom — one of the world's leading business schools." },
  { year: "2018–2020", event: "Returned to the US Embassy, Dhaka as Immigration Visa Assistant, then transitioned to Canada — joining EY Law and PwC Law as a US Immigration Law professional." },
  { year: "2021–2022", event: "Worked at Green and Spiegel LLP (Canada's top-ranked immigration law firm) and PwC Law. Completed a Graduate Diploma in Canadian Immigration Law at Anderson College." },
  { year: "Feb 2022", event: "Earned RCIC license (R710078) from the College of Immigration and Citizenship Consultants (CICC). Continued at Vialto Partners (formerly PwC Law) — handling complex US & Canadian immigration files." },
  { year: "Sep 2024", event: "Founded RMohaimen Immigration Services (Route 2 Migrate) — bringing 10+ years of combined US & Canadian immigration expertise directly to individuals and families worldwide." },
];

const expertise = [
  { icon: GraduationCap, label: "Education", items: ["Master's Degree — Durham University, United Kingdom", "Graduate Diploma in Canadian Immigration Law (Canada)", "Specialized training in US consular visa adjudication"] },
  { icon: Briefcase, label: "Experience", items: ["6 Years — US Consulate, Dhaka (Immigration & Non-Immigration)", "3+ Years — Multinational Immigration Law Firms, Canada", "10+ Combined Years — US & Canadian Immigration Practice"] },
  { icon: BadgeCheck, label: "Credentials", items: ["RCIC License R710078 — CICC Member (in good standing)", "CAPIC Member — Canadian Association of Professional Immigration Consultants", "Authorized Representative Before IRCC, Canada"] },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="pt-36 pb-20 bg-white" aria-label="About page header">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6 text-center">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
              Canada's Immigration<br />
              {/* Separate smooth animation on 'Expert on Your Side.' */}
              <motion.span
                className="text-gradient inline-block"
                initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Expert on Your Side.
              </motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal mb-8">
              Route 2 Migrate is led by RCIC Riffat H. Mohaimen — a regulated consultant who has worked on both sides of the immigration process, bringing 10+ years of combined US and Canadian immigration expertise to every client.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-10 justify-center">
              {["RCIC License R710078", "CICC Member", "CAPIC Member"].map((badge) => (
                <span key={badge} className="text-xs font-semibold text-primary border border-primary/25 px-4 py-2 rounded-full bg-primary/5">{badge}</span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center">
              <a href="https://riffathmohaimen.setmore.com/" target="_blank" rel="noopener noreferrer" aria-label="Book a free consultation via Calendly">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-11 font-semibold glow-primary-sm transition-all duration-300">
                  Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </a>
              <Link href="/contact" aria-label="Contact Route 2 Migrate">
                <Button variant="outline" className="rounded-full px-8 h-11 font-semibold border-gray-300 text-foreground hover:bg-gray-50">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-12 bg-white border-b border-border" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { val: 500, suf: "+", label: "Clients Helped" },
              { val: 95, suf: "%", label: "Approval Rate" },
              { val: 10, suf: "+", label: "Years Experience" },
              { val: 2, suf: "", label: "Office Locations (CA & BD)" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-serif font-bold text-primary"><AnimatedCounter target={s.val} suffix={s.suf} /></div>
                <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION - Reverted to original layout, added counter animation */}
      <section className="py-28 bg-[#08080f] relative overflow-hidden" aria-labelledby="mission-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">Our Mission</span>
                <h2 id="mission-heading" className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
                  Making Canada Accessible to Everyone
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed mb-10">
                  <p>Canada's immigration system is among the most complex legal frameworks in the world. Navigating it without professional guidance risks delays, refusals, and missed opportunities that can set a person back by years.</p>
                  <p>Our mission is to eliminate that risk. By combining licensed RCIC expertise with a deeply personal approach — shaped by real adjudication experience on both sides of the immigration process — we give clients the best possible chance of success.</p>
                </div>

                <div className="relative border border-white/8 rounded-2xl p-6">
                  <Quote className="h-8 w-8 text-primary/40 mb-3" aria-hidden="true" />
                  <blockquote className="text-white/70 leading-relaxed italic">
                    "Immigration isn't just a process — it's the most important journey of a person's life. I've seen applications from both the adjudicator's desk and the consultant's chair. That perspective is what I bring to every client."
                  </blockquote>
                  <p className="text-primary text-sm mt-3 font-medium">—  RCIC Riffat H. Mohaimen</p>
                </div>
              </motion.div>

              <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
                {[
                  { val: 500, suf: "+", l: "Successful Applications" },
                  { val: 95, suf: "%", l: "Approval Rate" },
                  { custom: "CA & BD", l: "Office Locations" },
                  { custom: "RCIC", l: "Licensed Since Feb 2022" },
                  { val: 10, suf: "+", l: "Years of Combined Experience" },
                  { custom: "R710078", l: "RCIC License No." },
                ].map((s) => (
                  <motion.div key={s.l} variants={fadeUp} className="glass-dark rounded-2xl p-5 border border-white/[0.06] hover:border-primary/25 transition-colors">
                    <div className="text-2xl font-serif font-bold text-primary mb-1">
                      {s.custom ? s.custom : <AnimatedCounter target={s.val || 0} suffix={s.suf || ""} />}
                    </div>
                    <div className="text-white/40 text-xs leading-snug">{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* VISION - Reverted to original layout */}
      <section className="py-28 bg-[#0d0d18] relative overflow-hidden" aria-labelledby="vision-heading">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-secondary/6 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeUp}>
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">Our Vision</span>
                <h2 id="vision-heading" className="text-4xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                  A Canada Accessible<br />
                  <span className="text-gradient">to Everyone.</span>
                </h2>
                <p className="text-white/50 leading-relaxed mb-5">To be recognized as Canada's most trusted immigration consultancy — where every qualified immigrant, regardless of background or origin, has access to expert, honest guidance and a genuine path forward.</p>
                <p className="text-white/35 leading-relaxed">We envision a Route 2 Migrate that is the first call families make when they think of Canada — known not just for approvals, but for the trust, care, and integrity woven into every interaction.</p>
              </motion.div>
              <motion.div variants={stagger} className="space-y-4">
                {[
                  { icon: Star, title: "Client-First, Always", desc: "Every decision we make is filtered through one question: what is best for the client?" },
                  { icon: Shield, title: "Regulatory Excellence", desc: "Full compliance with CICC standards — always. Our clients' files are always audit-ready and fully compliant." },
                  { icon: Globe, title: "Global Reach, Personal Touch", desc: "Two offices, two continents — serving clients with the warmth and dedication of a boutique firm." },
                ].map((v) => {
                  const Icon = v.icon;
                  return (
                    <motion.div key={v.title} variants={fadeUp} className="glass-dark rounded-2xl p-6 border border-white/[0.06] hover:border-primary/20 transition-colors">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-white mb-1.5">{v.title}</h3>
                          <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* VALUES — "What We Stand For" with type effect */}
      <section className="py-28 bg-background" aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Our Values
              </span>
              <h2 id="values-heading" className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-5 min-h-[1.2em] flex items-center justify-center">
                <TypeEffect text="What We Stand For" />
              </h2>
              <p className="text-muted-foreground leading-relaxed">The principles that shape every client interaction, every application decision, and every outcome.</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} variants={fadeUp} className="bg-white border border-border rounded-2xl p-8 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                    <div className="w-12 h-12 rounded-xl bg-primary/8 flex items-center justify-center mb-5">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-foreground text-xl mb-3">{v.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* PRINCIPAL CONSULTANT */}
      <section className="py-28 bg-white" aria-labelledby="profile-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
              <motion.div variants={fadeUp} className="lg:col-span-2 relative">
                <div className="sticky top-32">
                  <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                    <img src={riffatPhoto} alt="Riffat H. Mohaimen, Owner and CEO, RCIC" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="mt-5 p-5 bg-[#08080f] rounded-2xl">
                    <div className="text-white font-serif font-bold text-xl mb-0.5">Riffat H. Mohaimen</div>
                    <div className="text-primary text-sm font-medium mb-3"> Founder& CEO · Route 2 Migrate · RCIC License R710078</div>
                    <div className="flex flex-wrap gap-2">
                      {["CICC Member", "CAPIC Member", "IRCC Authorised Representative"].map((b) => (
                        <span key={b} className="text-xs text-white/50 border border-white/10 px-3 py-1 rounded-full">{b}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">Principal Consultant</span>
                <h2 id="profile-heading" className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-6">
                  The Person Behind Every Application
                </h2>

                <div className="space-y-5 text-muted-foreground leading-relaxed mb-10">
                  <p>
                    Riffat H. Mohaimen is the founder of RMohaimen Immigration Services (Route 2 Migrate) and a Regulated Canadian Immigration Consultant in good standing under CICC license number R710078. She earned a Master's degree from Durham University, UK, before moving to Canada to complete a Graduate Diploma in Canadian Immigration Law — earning her RCIC designation in February 2022.
                  </p>
                  <p>
                    Before dedicating herself fully to Canadian immigration consultancy, Riffat worked at the US Consulate in Dhaka for nearly 6 years, adjudicating both immigration and non-immigration US visa applications. This experience gave her a rare and invaluable perspective on how visa officers think, what makes applications succeed, and the nuances of immigration adjudication that most practitioners never encounter.
                  </p>
                  <p>
                    She then worked as an immigration associate at big-brand multinational immigration law firms in Canada for more than 3 years, collaborating with some of the finest immigration lawyers in the industry. During this period, she developed deep expertise across the full spectrum of Canadian immigration programs and built an extensive network of immigration professionals.
                  </p>
                  <p>
                    Altogether, Riffat brings over 10 years of combined US and Canadian immigration experience — a breadth that is rare among consultants and directly benefits every client who works with Route 2 Migrate.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 mb-10">
                  {expertise.map((ex) => {
                    const Icon = ex.icon;
                    return (
                      <div key={ex.label} className="p-6 bg-background border border-border rounded-2xl" aria-label={`${ex.label} credentials`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                            <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                          </div>
                          <h4 className="font-serif font-bold text-foreground">{ex.label}</h4>
                        </div>
                        <ul className="space-y-2">
                          {ex.items.map((item) => (
                            <li key={item} className="flex items-start gap-2.5">
                              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                              <span className="text-sm text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <a
                  href="https://riffathmohaimen.setmore.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Book a consultation via Calendly"
                >
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 glow-primary-sm transition-all duration-300">
                    Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                </a>

                {/* RIFFAT'S STORY — Timeline */}
                <div className="mt-14 pt-10 border-t border-border" aria-labelledby="riffat-story-heading">
                  <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3 block">Riffat's Story</span>
                  <h3 id="riffat-story-heading" className="text-2xl font-serif font-bold text-foreground mb-8">A Decade in the Making</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
                    <div className="space-y-7">
                      {milestones.map((m) => (
                        <div key={m.year} className="relative flex gap-6">
                          <div className="shrink-0 w-8 flex flex-col items-center" aria-hidden="true">
                            <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/40 mt-1 relative z-10" />
                          </div>
                          <div className="pb-2">
                            <div className="inline-block text-xs font-bold text-white bg-primary px-3 py-1 rounded-full mb-2">{m.year}</div>
                            <p className="text-muted-foreground text-sm leading-relaxed">{m.event}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 bg-background" aria-labelledby="team-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-4 block">The Team</span>
              <h2 id="team-heading" className="text-4xl sm:text-5xl font-serif font-bold text-foreground mb-4">Meet the People Behind Your Journey</h2>
              <p className="text-muted-foreground leading-relaxed">A dedicated team of immigration professionals committed to providing exceptional client service at every step.</p>
            </motion.div>

            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Syed Mohd. Zubair Huda Adel", role: "Operations Manager", phone: "+8801896060700", email: "zubair@rmigrate.ca", linkedin: "https://www.linkedin.com/in/zubairhuda/", photo: zubairPhoto },
                { name: "Tamim Ahmed Chowdhury", role: "Executive — Accounts & Client Service", phone: "+8801896060701", email: "tamim@rmigrate.ca", linkedin: "https://www.linkedin.com/company/route2migrateca", photo: tamimPhoto },
                { name: "Foyaj Ahmmad Farabi", role: "Client Service Executive", phone: "+8801896060702", email: "farabi@rmigrate.ca", linkedin: "https://www.linkedin.com/in/farbista/", photo: farabiPhoto },
              ].map((member) => (
                <motion.div key={member.name} variants={fadeUp} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-primary/15 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group hover:-translate-y-1">
                  {/* Photo with hover overlay */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={member.photo}
                      alt={`${member.name} — ${member.role}`}
                      className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden="true" />
                    {/* Hover contact icons on photo — LinkedIn uses primary (red) like the others */}
                    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <a href={`tel:${member.phone}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all" aria-label={`Call ${member.name}`}>
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all" aria-label={`Email ${member.name}`}>
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all" aria-label={`${member.name} on LinkedIn`}>
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6">
                    <h3 className="font-serif font-bold text-foreground text-lg mb-0.5 leading-snug">{member.name}</h3>
                    <p className="text-primary text-sm font-semibold mb-4">{member.role}</p>

                    {/* Always-visible contact row — LinkedIn hover uses primary (red) */}
                    <div className="flex flex-col gap-2">
                      <a href={`tel:${member.phone}`} className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link" aria-label={`Call ${member.name}`}>
                        <span className="w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center shrink-0 group-hover/link:bg-primary group-hover/link:text-white transition-all">
                          <Phone className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {member.phone}
                      </a>
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link" aria-label={`Email ${member.name}`}>
                        <span className="w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center shrink-0 group-hover/link:bg-primary group-hover/link:text-white transition-all">
                          <Mail className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {member.email}
                      </a>
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary transition-colors group/link" aria-label={`${member.name} on LinkedIn`}>
                        <span className="w-6 h-6 rounded-full bg-primary/8 flex items-center justify-center shrink-0 group-hover/link:bg-primary group-hover/link:text-white transition-all">
                          <Linkedin className="h-3 w-3" aria-hidden="true" />
                        </span>
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </Section>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background" aria-label="About page call to action">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Section>
            <motion.div variants={fadeUp}>
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Ready to Work with a Real Expert?</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-10 max-w-xl mx-auto">Schedule your free consultation with RCIC Riffat H. Mohaimen. 10+ years of experience. Two office locations. A truly personal approach.</p>
              <a
                href="https://riffathmohaimen.setmore.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free consultation via Calendly"
              >
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-base font-semibold glow-primary-sm hover:scale-105 transition-all duration-300">
                  Book Consultation <ArrowRight aria-hidden="true" />
                </Button>
              </a>
            </motion.div>
          </Section>
        </div>
      </section>

      <Footer />
    </div>
  );
}