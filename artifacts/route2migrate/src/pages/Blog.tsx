import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Clock, Calendar, Tag, BookOpen, Sparkles, Search, SlidersHorizontal, ChevronDown, X } from "lucide-react";
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

const ALL_CATEGORIES = ["All", "Express Entry", "Provincial Nominee", "Family Sponsorship", "Study Permits", "Language Tests", "Immigration Tips", "Work Permits", "Visitor Visas"];

const posts = [
  {
    slug: "express-entry-2026-guide",
    category: "Express Entry",
    categoryColor: "bg-primary/10 text-primary",
    title: "Express Entry 2026: What You Need to Know Before You Apply",
    excerpt: "Canada's Express Entry system continues to evolve. From Comprehensive Ranking System (CRS) cutoffs to new category-based selection rounds, here's a complete guide to maximizing your Express Entry profile in 2025.",
    readTime: "7 min read",
    date: "June 15, 2025",
    featured: true,
  },
  {
    slug: "pnp-best-streams-2025",
    category: "Provincial Nominee",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Top PNP Streams for Skilled Workers: Province-by-Province Breakdown",
    excerpt: "With over 80 provincial streams available across Canada, finding the right PNP pathway can feel overwhelming. We break down the most accessible streams by occupation, education, and work experience.",
    readTime: "9 min read",
    date: "June 8, 2025",
    featured: false,
  },
  {
    slug: "spouse-sponsorship-guide",
    category: "Family Sponsorship",
    categoryColor: "bg-rose-100 text-rose-700",
    title: "How to Sponsor Your Spouse to Canada: A Step-by-Step Guide",
    excerpt: "Spousal sponsorship is one of the most emotionally significant applications you'll ever file. Understanding the inland vs. outland process, proof of relationship requirements, and common pitfalls can make the difference between approval and delay.",
    readTime: "8 min read",
    date: "May 28, 2025",
    featured: false,
  },
  {
    slug: "canada-study-permit-guide",
    category: "Study Permits",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Canada Study Permit 2025: Complete Guide for International Students",
    excerpt: "Canada remains one of the world's top destinations for international students. This comprehensive guide covers Student Direct Stream eligibility, DLI selection, proof of funds, and your post-graduation immigration strategy.",
    readTime: "10 min read",
    date: "May 19, 2025",
    featured: false,
  },
  {
    slug: "celpip-vs-ielts",
    category: "Language Tests",
    categoryColor: "bg-indigo-100 text-indigo-700",
    title: "CELPIP vs IELTS: Which English Test Is Right for Your Canadian Immigration Journey?",
    excerpt: "Both CELPIP and IELTS are accepted for Express Entry, but they differ significantly in format, scoring, and difficulty by module. Learn which test plays to your strengths and how to maximize your language score for CRS points.",
    readTime: "6 min read",
    date: "May 10, 2025",
    featured: false,
  },
  {
    slug: "common-immigration-mistakes",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "10 Common Immigration Mistakes — and How to Avoid Them",
    excerpt: "From misrepresentation issues to missing documentation and expired permits — the same errors appear again and again in rejected applications. An experienced RCIC shares the mistakes she sees most often and how to avoid them.",
    readTime: "7 min read",
    date: "April 30, 2025",
    featured: false,
  },
  {
    slug: "work-permit-pathways",
    category: "Work Permits",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "Open Work Permits vs Employer-Specific Permits: What's the Difference?",
    excerpt: "Understanding which work permit category applies to you is essential before you apply. We explain LMIA-based, LMIA-exempt, and open work permits — including the Bridging Open Work Permit (BOWP) for those on the path to PR.",
    readTime: "6 min read",
    date: "April 18, 2025",
    featured: false,
  },
  {
    slug: "super-visa-parents-guide",
    category: "Visitor Visas",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Super Visa for Parents & Grandparents: 10-Year Multi-Entry Explained",
    excerpt: "The Super Visa allows parents and grandparents of Canadian citizens and permanent residents to stay for up to 5 years per visit. We walk through the income requirements, insurance, and application process in detail.",
    readTime: "5 min read",
    date: "April 5, 2025",
    featured: false,
  },
  {
    slug: "pgwp-guide-2025",
    category: "Work Permits",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "Post-Graduation Work Permit (PGWP): Your Bridge to Canadian PR",
    excerpt: "The PGWP is one of Canada's most valuable immigration tools — giving international graduates up to 3 years of open work authorization and a direct path to permanent residence through the Canadian Experience Class.",
    readTime: "8 min read",
    date: "March 20, 2025",
    featured: false,
  },
  {
    slug: "canada-bangladesh-immigration",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "Canada Immigration for Bangladeshi Nationals: Your Complete Pathway Guide",
    excerpt: "Bangladesh is one of the top source countries for Canadian immigration. Whether you're a skilled professional, student, or family member, here's a detailed guide to the pathways available to Bangladeshi nationals.",
    readTime: "9 min read",
    date: "March 5, 2025",
    featured: false,
  },
  {
    slug: "f1-rejection-to-canada-study",
    category: "Study Permits",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "USA F-1 Visa Rejected? Here's Your Path to a Canadian Study Permit",
    excerpt: "A US F-1 visa refusal doesn't mean the end of your international education dreams. Many students who were refused US student visas have gone on to successfully study in Canada — here's how to approach your application strategically.",
    readTime: "7 min read",
    date: "February 14, 2025",
    featured: false,
  },
  {
    slug: "wes-eca-guide",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "WES vs MCC ECA: Which Educational Credential Assessment Do You Need?",
    excerpt: "An Educational Credential Assessment (ECA) is required for Express Entry if your education was obtained outside Canada. Learn the difference between WES and MCC, and how to get it done efficiently.",
    readTime: "6 min read",
    date: "January 22, 2025",
    featured: false,
  },
  {
    slug: "business-immigration-startup-visa",
    category: "Express Entry",
    categoryColor: "bg-primary/10 text-primary",
    title: "Start-Up Visa Program: Canada's PR Pathway for Entrepreneurs",
    excerpt: "Canada's Start-Up Visa (SUV) program offers permanent residence to innovative entrepreneurs who can secure the backing of a designated Canadian organization. Here's how the program works and whether you might qualify.",
    readTime: "8 min read",
    date: "January 8, 2025",
    featured: false,
  },
];

const featured = posts.find((p) => p.featured)!;
const regular = posts.filter((p) => !p.featured);

export default function BlogPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredRegular = regular.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[44vh] flex items-end pb-16 overflow-hidden bg-[#08080f]" aria-label="Blog hero">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-secondary/8 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 text-xs font-semibold text-primary/90 uppercase tracking-[0.18em] border border-primary/25 px-4 py-2 rounded-full bg-primary/8 mb-6 block w-fit">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Immigration Insights
            </motion.span>
            <motion.h1 variants={fadeUp} className="font-serif font-bold text-5xl sm:text-6xl text-white mb-4">
              The Route 2 Migrate{" "}
              <span className="text-gradient">Blog</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl font-normal">
              Expert guidance, policy updates, and real immigration insights
            </motion.p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
      </section>

      {/* Featured post */}
      <section className="py-16 bg-background" aria-labelledby="featured-post-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp}>
              <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Featured Article</span>
            </motion.div>
            <motion.article
              variants={fadeUp}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-border shadow-xl"
              aria-labelledby="featured-post-heading"
            >
              <div className="bg-gradient-to-br from-primary via-secondary to-accent p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} aria-hidden="true" />
                <div className="relative">
                  <BookOpen className="h-10 w-10 text-white/30 mb-6" aria-hidden="true" />
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white mb-4">
                    {featured.category}
                  </span>
                  <h2 id="featured-post-heading" className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug">
                    {featured.title}
                  </h2>
                </div>
                <div className="relative flex items-center gap-4 mt-6">
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                    {featured.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60 text-xs">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {featured.readTime}
                  </div>
                </div>
              </div>
              <div className="bg-white p-10 flex flex-col justify-between">
                <div>
                  <p className="text-muted-foreground leading-relaxed text-base mb-8">{featured.excerpt}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={`/blog/${featured.slug}`}>
                    <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-7 h-11 font-semibold focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                      Read Full Article <ArrowRight aria-hidden="true" />
                    </Button>
                  </Link>
                  <a
                    href="https://riffathmohaimen.setmore.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Book a free consultation with RCIC Riffat H. Mohaimen"
                  >
                    <Button variant="outline" className="rounded-full px-6 h-11 font-semibold border-gray-300 text-foreground hover:bg-gray-50 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
                      Book Consultation
                    </Button>
                  </a>
                </div>
              </div>
            </motion.article>
          </Reveal>
        </div>
      </section>

      {/* Search + filter */}
      <section className="pb-6 bg-gray-50 pt-10" aria-label="Search and filter articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles by title or topic..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary/50 transition-all"
                aria-label="Search articles"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/25 rounded-full"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                  activeCategory !== "All"
                    ? "bg-primary text-white border-primary shadow-md focus:ring-4 focus:ring-primary/30"
                    : "bg-white border-gray-200 text-foreground hover:border-gray-300 focus:ring-4 focus:ring-gray-200"
                }`}
                aria-haspopup="listbox"
                aria-expanded={filterOpen}
                aria-label="Filter by category"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{activeCategory === "All" ? "All Categories" : activeCategory}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${filterOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              {filterOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setFilterOpen(false)} aria-hidden="true" />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-20 py-2 overflow-hidden" role="listbox" aria-label="Article categories">
                    {ALL_CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        role="option"
                        aria-selected={activeCategory === cat}
                        onClick={() => { setActiveCategory(cat); setFilterOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          activeCategory === cat
                            ? "bg-primary/8 text-primary font-semibold"
                            : "text-foreground hover:bg-gray-50"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {(search || activeCategory !== "All") && (
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <span className="text-xs text-muted-foreground">Showing:</span>
              {search && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-foreground px-3 py-1 rounded-full">
                  "{search}"
                  <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground focus:outline-none" aria-label="Remove search filter">
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              )}
              {activeCategory !== "All" && (
                <span className="inline-flex items-center gap-1.5 text-xs bg-primary/8 border border-primary/20 text-primary px-3 py-1 rounded-full">
                  {activeCategory}
                  <button onClick={() => setActiveCategory("All")} className="text-primary/60 hover:text-primary focus:outline-none" aria-label="Remove category filter">
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* All posts grid */}
      <section className="pb-24 bg-gray-50" aria-labelledby="all-posts-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <motion.div variants={fadeUp} className="pt-10 mb-10">
              <h2 id="all-posts-heading" className="text-3xl font-serif font-bold text-foreground">
                {activeCategory === "All" ? "All Articles" : activeCategory}
                <span className="text-sm font-normal text-muted-foreground ml-3">({filteredRegular.length} articles)</span>
              </h2>
            </motion.div>

            {filteredRegular.length === 0 ? (
              <motion.div variants={fadeUp} className="text-center py-16">
                <p className="text-muted-foreground">No articles in this category yet. Check back soon!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRegular.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={fadeUp}
                    className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col group"
                    aria-labelledby={`post-${post.slug}`}
                  >
                    <div className="p-7 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                          <Tag className="h-3 w-3" aria-hidden="true" />
                          {post.category}
                        </span>
                      </div>
                      <h3 id={`post-${post.slug}`} className="font-serif font-bold text-lg text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" aria-hidden="true" /> {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" /> {post.readTime}
                          </span>
                        </div>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <button className="mt-4 w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors py-2.5 rounded-xl border border-primary/20 hover:border-primary/40 hover:bg-primary/5 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" aria-label={`Read full article: ${post.title}`}>
                          Read Full Article <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </button>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* CTA Section - Dark Red Premium Gradient Background & Wider Layout */}
      <section className="pb-20 pt-4 bg-gray-50" aria-labelledby="blog-cta-heading">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="bg-gradient-to-br from-[#3b0a0a] via-[#7f1d1d] to-[#3b0a0a] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 0, transparent 50%)", backgroundSize: "12px 12px" }} aria-hidden="true" />
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Free Assessment</p>
                <h2 id="blog-cta-heading" className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 leading-tight">
                  Have questions about your immigration options?
                </h2>
                <div className="space-y-4 mb-8 text-left sm:text-justify">
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    Every immigration journey is unique, and the right path depends on your personal profile and circumstances. If you're looking for guidance tailored to your goals and profile, book a consultation with our licensed RCIC, Riffat H. Mohaimen, to receive trusted, legal, and expert advice before making your next move.
                  </p>
                  <p className="text-white/60 text-sm leading-relaxed">
                    <strong className="text-white">Remember:</strong> Choosing the wrong immigration strategy can cost you valuable time, unnecessary expenses, missed opportunities, or even lead to a refusal and ban. Start with the right advice and move forward with confidence.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="https://riffathmohaimen.setmore.com/" target="_blank" rel="noopener noreferrer" aria-label="Book a consultation">
                    <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full sm:w-auto">
                      Book Consultation <ArrowRight className="ml-2 h-5 w-5 inline" aria-hidden="true" />
                    </Button>
                  </a>
                  <a href="/services" aria-label="View all services" style={{ textDecoration: "none" }}>
                    <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12 bg-white/5 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full sm:w-auto">
                      View All Services
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}