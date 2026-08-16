// src/data/blogPosts.tsx
import React from "react";
import { Link } from "wouter";

export type BlogPost = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  content: React.ReactNode;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "express-entry-2026-guide",
    category: "Express Entry",
    categoryColor: "bg-primary/10 text-primary",
    title: "Express Entry 2026: What You Need to Know Before You Apply",
    excerpt: "Canada's Express Entry system continues to evolve. From Comprehensive Ranking System (CRS) cutoffs to new category-based selection rounds, here's a complete guide to maximizing your Express Entry profile in 2025.",
    readTime: "7 min read",
    date: "June 15, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Express Entry remains Canada's most sought-after immigration pathway for skilled workers. In 2025, significant changes to the Comprehensive Ranking System (CRS) and category-based selection draws have reshaped how candidates are invited to apply for permanent residence (PR).</p>
        
        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Category-based selection:</strong> IRCC now targets specific occupations (Healthcare, STEM, Trades), offering lower CRS thresholds.</li>
            <li><strong>Language proficiency is king:</strong> Achieving CLB 9+ can add over 50 CRS points.</li>
            <li><strong>Provincial Nomination:</strong> Securing a PNP adds 600 points, guaranteeing an ITA.</li>
            <li><strong>Accuracy is critical:</strong> Misrepresentation can lead to a 5-year ban.</li>
          </ul>
        </div>

        <h2>What is the Comprehensive Ranking System (CRS)?</h2>
        <p>The CRS is a points-based system used to evaluate and rank candidates in the Express Entry pool. It scores candidates on core human capital factors: <strong>age, education, language proficiency, and work experience</strong>. Additional points are awarded for a valid job offer, provincial nomination, or Canadian education. Your CRS score determines your rank, and IRCC regularly invites the highest-ranking candidates to apply for PR.</p>

        <h2>Category-Based Selection Draws in 2025</h2>
        <p>Introduced in 2023 and expanded in 2025, category-based selection allows IRCC to target specific professions to address labor market shortages. Instead of only conducting general draws for the highest CRS scores, IRCC now conducts targeted draws for:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Healthcare occupations</li>
          <li>STEM (Science, Technology, Engineering, Math) professions</li>
          <li>Trades (carpenters, plumbers, electricians)</li>
          <li>Transport occupations</li>
          <li>Agriculture and agri-food occupations</li>
          <li>Candidates with strong French language proficiency</li>
        </ul>
        <p>This means if your occupation falls under one of these categories, you could receive an Invitation to Apply (ITA) with a significantly lower CRS score than the general draw cutoff.</p>

        <h2>How to Maximize Your CRS Score</h2>
        <p>Improving your CRS score is the key to securing an ITA. Here are the most effective strategies:</p>
        <ol className="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Language Scores:</strong> This is the highest-impact factor. Achieving CLB 9 in all four abilities in English or French can add over 50 points. Consider taking <Link href="/blog/celpip-vs-ielts" className="text-primary font-semibold">CELPIP or IELTS preparation</Link> to maximize your score.</li>
          <li><strong>Provincial Nomination (PNP):</strong> Receiving a nomination from a province adds 600 points to your CRS, virtually guaranteeing an ITA.</li>
          <li><strong>Canadian Work Experience:</strong> If you are already in Canada on a work permit (like the <Link href="/blog/pgwp-guide-2025" className="text-primary font-semibold">PGWP</Link>), gaining skilled work experience boosts your score significantly.</li>
          <li><strong>Education:</strong> Earning a Canadian degree or completing an <Link href="/blog/wes-eca-guide" className="text-primary font-semibold">Educational Credential Assessment (ECA)</Link> for your foreign degree is mandatory.</li>
        </ol>

        <h2>Express Entry FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What is the minimum CRS score for Express Entry in 2025?</h3>
            <p>There is no fixed minimum. The cutoff score varies with each draw. General program draws typically require scores in the 500+ range, while category-based selection draws often have lower cutoffs for targeted occupations.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How long does Express Entry take?</h3>
            <p>Once you receive an ITA, IRCC aims to process complete applications within 6 months. However, gathering documents (like police certificates and ECAs) before creating your profile can take several months.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Do I need a job offer for Express Entry?</h3>
            <p>No. A job offer is not required, but having an LMIA-supported job offer adds 50 or 200 points to your CRS score, greatly improving your chances.</p>
          </div>
        </div>

        <h2>Is Express Entry Right for You?</h2>
        <p>While Express Entry is the flagship program, it's not the only route. Depending on your profile, <Link href="/blog/pnp-best-streams-2025" className="text-primary font-semibold">Provincial Nominee Programs (PNP)</Link> or family sponsorship might offer a faster path to permanent residence. A professional assessment can clarify your best options.</p>
      </div>
    ),
  },
  {
    slug: "pnp-best-streams-2025",
    category: "Provincial Nominee",
    categoryColor: "bg-emerald-100 text-emerald-700",
    title: "Top PNP Streams for Skilled Workers: Province-by-Province Breakdown",
    excerpt: "With over 80 provincial streams available across Canada, finding the right PNP pathway can feel overwhelming. We break down the most accessible streams by occupation, education, and work experience.",
    readTime: "9 min read",
    date: "June 8, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Canada's Provincial Nominee Programs (PNPs) give provinces the authority to nominate candidates who meet their specific economic needs. With more than 80 streams across 11 programs, PNPs can be your best route to Canadian permanent residence — particularly if your CRS score is not high enough for a general <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link> draw.</p>
        
        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Enhanced vs. Base Streams:</strong> Enhanced streams align with Express Entry and offer 600 CRS points; base streams are independent.</li>
            <li><strong>Provincial targeting:</strong> Each province targets specific occupations, like tech in BC or healthcare in Ontario.</li>
            <li><strong>Strategic choice:</strong> The right province depends on your occupation, education, and intent to reside.</li>
          </ul>
        </div>

        <h2>How PNPs Work: Base vs. Enhanced Streams</h2>
        <p>Most PNP streams fall into two categories:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Base Streams:</strong> Applications submitted directly to the province. These are not linked to Express Entry and have their own processing times.</li>
          <li><strong>Enhanced Streams:</strong> Aligned with Express Entry. A provincial nomination through an enhanced stream adds 600 CRS points to your federal profile, virtually guaranteeing an ITA in the next draw.</li>
        </ul>

        <h2>Top Provincial Streams for Skilled Workers</h2>
        
        <h3>Ontario Immigrant Nominee Program (OINP)</h3>
        <p>Ontario is Canada's most populous province and offers streams for Express Entry candidates, international students, and in-demand occupations. The Ontario Human Capital Priorities stream and Skilled Trades stream are particularly popular.</p>

        <h3>British Columbia PNP (BC PNP)</h3>
        <p>BC runs regular draws through its Skills Immigration Registration System (SIRS). The Skilled Worker and International Graduate streams are highly accessible. BC also has specific pathways for healthcare professionals and technology workers via the Tech Pilot.</p>

        <h3>Alberta Advantage Immigration Program (AAIP)</h3>
        <p>Alberta's strong oil, gas, and agricultural sectors create ongoing demand. The Alberta Opportunity Stream welcomes foreign workers already employed in the province. Alberta also offers a Rural Renewal stream for candidates settling in smaller communities.</p>

        <h3>Saskatchewan Immigrant Nominee Program (SINP)</h3>
        <p>Saskatchewan consistently has some of the most accessible PNP draws. The International Skilled Worker – Employment Offer and Occupations In-Demand streams regularly invite candidates at lower scores.</p>

        <h2>PNP FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Does a PNP guarantee permanent residence?</h3>
            <p>A provincial nomination significantly increases your chances (adding 600 CRS points for enhanced streams), but you must still meet federal admissibility requirements (medical, criminal) to be granted PR by IRCC.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I move to a different province after getting a PNP?</h3>
            <p>When applying for a PNP, you sign an intent to reside in that province. Moving immediately after receiving PR can raise concerns about misrepresentation and affect future citizenship applications.</p>
          </div>
        </div>

        <h2>Choosing the Right Province for You</h2>
        <p>The right province is not necessarily the one with the lowest score requirements — it's the one where you can realistically settle, work, and build your life. A comprehensive profile assessment can match you with the best stream.</p>
      </div>
    ),
  },
  {
    slug: "spouse-sponsorship-guide",
    category: "Family Sponsorship",
    categoryColor: "bg-rose-100 text-rose-700",
    title: "How to Sponsor Your Spouse to Canada: A Step-by-Step Guide",
    excerpt: "Spousal sponsorship is one of the most emotionally significant applications you'll ever file. Understanding the inland vs. outland process, proof of relationship requirements, and common pitfalls can make the difference between approval and delay.",
    readTime: "8 min read",
    date: "May 28, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Canada places family unity at the heart of its immigration system. Spousal and common-law partner sponsorship is the most common form of family-class immigration, but it requires careful preparation to avoid delays and refusals.</p>
        
        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Eligibility:</strong> Sponsors must be PRs or Citizens, 18+, and financially responsible.</li>
            <li><strong>Inland vs. Outland:</strong> Inland allows the applicant to work in Canada during processing; Outland can be processed from abroad.</li>
            <li><strong>Genuine Relationship:</strong> Providing extensive proof of relationship is the most critical component.</li>
          </ul>
        </div>

        <h2>Who Can Sponsor a Spouse?</h2>
        <p>To sponsor your spouse, common-law partner, or conjugal partner, you must:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Be a Canadian citizen or permanent resident.</li>
          <li>Be at least 18 years old.</li>
          <li>Be able to provide for the basic needs of the sponsored person (income requirements are generally waived for spouses/children).</li>
          <li>Not be subject to sponsorship bars (e.g., receiving social assistance, or having a previous sponsorship in default).</li>
        </ul>

        <h2>Inland vs. Outland Sponsorship</h2>
        <h3>Inland Sponsorship</h3>
        <p>Applies when your partner is already in Canada with legal status. The main advantage is eligibility for an Open Work Permit, allowing them to work in Canada while the PR application is processed.</p>
        <h3>Outland Sponsorship</h3>
        <p>For partners living outside Canada. It is processed at the visa office responsible for their country of residence. This is often faster depending on backlogs, and applicants can still travel in and out of Canada.</p>

        <h2>Proof of Genuine Relationship</h2>
        <p>IRCC's primary concern is confirming the relationship is genuine and not entered into primarily for immigration purposes. You must provide comprehensive evidence:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Photos together over time.</li>
          <li>Communication records (messages, calls, emails).</li>
          <li>Financial interdependence (joint accounts, shared expenses).</li>
          <li>Evidence of cohabitation (leases, utility bills).</li>
          <li>Letters from friends and family.</li>
        </ul>

        <h2>Spousal Sponsorship FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How long does spousal sponsorship take in Canada?</h3>
            <p>The average processing time for spousal sponsorship is approximately 12 months, though this varies depending on the visa office and the completeness of the application.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I work while my spousal sponsorship is processing?</h3>
            <p>If you apply via the Inland stream, you are eligible to apply for a Spousal Open Work Permit, which allows you to work in Canada while waiting for PR approval.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "canada-study-permit-guide",
    category: "Study Permits",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "Canada Study Permit 2025: Complete Guide for International Students",
    excerpt: "Canada remains one of the world's top destinations for international students. This comprehensive guide covers Student Direct Stream eligibility, DLI selection, proof of funds, and your post-graduation immigration strategy.",
    readTime: "10 min read",
    date: "May 19, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Canada is consistently ranked among the top three destinations for international students. Offering world-class education and a clear pathway to permanent residence, securing a study permit in 2025 requires strategic preparation.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>DLI Requirement:</strong> You must be accepted by a Designated Learning Institution.</li>
            <li><strong>Proof of Funds:</strong> You must show financial capacity to cover tuition and living expenses (approx. $20,635/year).</li>
            <li><strong>Post-Graduation Pathway:</strong> The PGWP provides a direct bridge to Canadian PR.</li>
          </ul>
        </div>

        <h2>Choosing a Designated Learning Institution (DLI)</h2>
        <p>You can only study in Canada at a DLI — a school approved by the provincial government to host international students. Choosing a DLI that offers programs eligible for the <Link href="/blog/pgwp-guide-2025" className="text-primary font-semibold">Post-Graduation Work Permit (PGWP)</Link> is critical if you plan to immigrate after graduation.</p>

        <h2>Student Direct Stream (SDS)</h2>
        <p>Citizens of certain countries (e.g., India, China, Philippines, Pakistan) can apply via the SDS for faster processing (typically 20 days). Requirements include:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Provincial Attestation Letter (PAL)</li>
          <li>Proof of funds ($20,635 CAD) in a Canadian bank account</li>
          <li>Language test result (IELTS 6.0 or CELPIP equivalent)</li>
        </ul>

        <h2>Study Permit FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How much bank balance is required for a Canada study permit?</h3>
            <p>As of 2024/2025, applicants must show proof of funds covering first-year tuition plus $20,635 CAD for living expenses, and return transportation.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I work while studying in Canada?</h3>
            <p>Yes. Study permit holders can work off-campus up to 24 hours per week during academic sessions and full-time during scheduled breaks.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "celpip-vs-ielts",
    category: "Language Tests",
    categoryColor: "bg-indigo-100 text-indigo-700",
    title: "CELPIP vs IELTS: Which English Test Is Right for Your Canadian Immigration Journey?",
    excerpt: "Both CELPIP and IELTS are accepted for Express Entry, but they differ significantly in format, scoring, and difficulty by module. Learn which test plays to your strengths and how to maximize your language score for CRS points.",
    readTime: "6 min read",
    date: "May 10, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Your English language test result is one of the most impactful factors in your Canadian immigration application. For <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link>, achieving a CLB 9 can add up to 136 core CRS points.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>CELPIP:</strong> Fully computer-based, Canadian context, no human examiner.</li>
            <li><strong>IELTS:</strong> Global standard, face-to-face speaking interview.</li>
            <li><strong>Target:</strong> Aim for CLB 9+ to maximize CRS points.</li>
          </ul>
        </div>

        <h2>CELPIP: The Canadian Test</h2>
        <p>The Canadian English Language Proficiency Index Program (CELPIP) is developed by UBC. It is entirely computer-delivered, including the speaking component which is recorded via microphone. It is generally considered to have a North American accent and context.</p>

        <h2>IELTS: The Global Standard</h2>
        <p>IELTS is accepted worldwide. While the Listening and Reading sections are similar for Academic and General Training, the General Training version is required for immigration. The speaking section involves a face-to-face interview.</p>

        <h2>Scoring Comparison: CLB to CELPIP and IELTS</h2>
        <p>To achieve CLB 9 (maximum CRS core points), you need:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>CELPIP:</strong> 9 in each component.</li>
          <li><strong>IELTS General:</strong> Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0.</li>
        </ul>

        <h2>Language Testing FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Which is easier, CELPIP or IELTS?</h3>
            <p>It depends on your strengths. If you prefer computers and a North American context, CELPIP is often easier. If you excel in face-to-face conversations, IELTS might be better.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "common-immigration-mistakes",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "10 Common Immigration Mistakes — and How to Avoid Them",
    excerpt: "From misrepresentation issues to missing documentation and expired permits — the same errors appear again and again in rejected applications. An experienced RCIC shares the mistakes she sees most often and how to avoid them.",
    readTime: "7 min read",
    date: "April 30, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">After years of assessing immigration profiles, certain mistakes appear with remarkable consistency. Avoiding these errors can mean the difference between approval and a devastating refusal.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Misrepresentation:</strong> Always disclose previous refusals and accurate work history.</li>
            <li><strong>NOC Codes:</strong> Ensure your duties match the NOC code, not just the title.</li>
            <li><strong>Deadlines:</strong> Missing ITA deadlines or document expirations can void applications.</li>
          </ul>
        </div>

        <h2>1. Misrepresentation — Even Accidental</h2>
        <p>Providing false or misleading information to IRCC results in a two-year ban. This includes rounding up language scores or omitting a previous refused visa application. Always disclose everything accurately.</p>

        <h2>2. Using the Wrong NOC Code</h2>
        <p>Your NOC code must match the main duties of your job, not just the job title. Using the wrong NOC can invalidate your application.</p>

        <h2>3. Missing the Language Score Threshold</h2>
        <p>A single low score in one component can dramatically reduce your CRS ranking. Retaking the test is almost always worthwhile if you are close to the next CLB level.</p>

        <h2>4. Incomplete or Inconsistent Documentation</h2>
        <p>Applications with missing documents or inconsistencies (dates that don't match) raise flags and slow processing.</p>

        <h2>5. Not Updating Your Express Entry Profile</h2>
        <p>If your situation changes — new job, new language score — update your profile immediately.</p>

        <h2>Immigration Mistakes FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What happens if I make a mistake on my IRCC application?</h3>
            <p>Minor mistakes might cause delays or requests for clarification. Major mistakes, especially hiding information, can lead to refusals and a 5-year ban for misrepresentation.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "work-permit-pathways",
    category: "Work Permits",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "Open Work Permits vs Employer-Specific Permits: What's the Difference?",
    excerpt: "Understanding which work permit category applies to you is essential before you apply. We explain LMIA-based, LMIA-exempt, and open work permits — including the Bridging Open Work Permit (BOWP) for those on the path to PR.",
    readTime: "6 min read",
    date: "April 18, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Canada's work permit system divides into two broad categories: permits that tie you to a specific employer, and open work permits that allow you to work for almost any employer.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Closed Permits:</strong> Require an LMIA and tie you to one employer.</li>
            <li><strong>Open Permits:</strong> Allow work for any employer (exceptions apply).</li>
            <li><strong>BOWP:</strong> Bridges the gap for PR applicants awaiting a decision.</li>
          </ul>
        </div>

        <h2>Employer-Specific (Closed) Work Permits</h2>
        <p>A closed work permit authorizes you to work only for the specific employer named on the permit. Most require a Labour Market Impact Assessment (LMIA) confirming no Canadian was available for the job.</p>

        <h2>Open Work Permits</h2>
        <p>Open work permits allow you to work for any employer in Canada. They are typically available to spouses of skilled workers, <Link href="/blog/pgwp-guide-2025" className="text-primary font-semibold">PGWP</Link> holders, and refugees.</p>

        <h2>The Bridging Open Work Permit (BOWP)</h2>
        <p>If you have applied for permanent residence and your current work permit is expiring, you may qualify for a BOWP. This allows you to continue working while your PR application is processed.</p>

        <h2>Work Permits FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Do I need an LMIA for an open work permit?</h3>
            <p>No. Open work permits are LMIA-exempt by nature, as they are usually tied to specific public policies or international agreements (like spousal sponsorships).</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "super-visa-parents-guide",
    category: "Visitor Visas",
    categoryColor: "bg-orange-100 text-orange-700",
    title: "Super Visa for Parents & Grandparents: 10-Year Multi-Entry Explained",
    excerpt: "The Super Visa allows parents and grandparents of Canadian citizens and permanent residents to stay for up to 5 years per visit. We walk through the income requirements, insurance, and application process in detail.",
    readTime: "5 min read",
    date: "April 5, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">The Canadian Super Visa allows parents and grandparents of Canadian citizens and PRs to stay in Canada for up to 5 years per visit, with 10-year multi-entry validity.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Duration:</strong> Up to 5 years per entry.</li>
            <li><strong>Insurance:</strong> Requires $100,000 in private medical coverage.</li>
            <li><strong>Income:</strong> Sponsor must meet LICO + 30%.</li>
          </ul>
        </div>

        <h2>Income Requirements for the Sponsor</h2>
        <p>The Canadian sponsor must meet Canada's Low Income Cut-Off (LICO) plus 30% for their family size. Proof of income via Notice of Assessment is required.</p>

        <h2>Medical Insurance Requirement</h2>
        <p>Applicants must prove they have private Canadian medical insurance with a minimum coverage of $100,000, valid for at least one year.</p>

        <h2>Super Visa FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How long can parents stay on a Super Visa?</h3>
            <p>As of 2024, parents can stay for up to 5 years per visit on a Super Visa.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "pgwp-guide-2025",
    category: "Work Permits",
    categoryColor: "bg-violet-100 text-violet-700",
    title: "Post-Graduation Work Permit (PGWP): Your Bridge to Canadian PR",
    excerpt: "The PGWP is one of Canada's most valuable immigration tools — giving international graduates up to 3 years of open work authorization and a direct path to permanent residence through the Canadian Experience Class.",
    readTime: "8 min read",
    date: "March 20, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">The Post-Graduation Work Permit (PGWP) grants open work authorization for a period equivalent to your program length (up to 3 years), creating essential Canadian work experience for <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link>.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Validity:</strong> Programs 2+ years grant a 3-year PGWP.</li>
            <li><strong>Pathway:</strong> Leads directly to Canadian Experience Class (CEC).</li>
            <li><strong>Deadline:</strong> Must apply within 180 days of graduation.</li>
          </ul>
        </div>

        <h2>Who is Eligible for the PGWP?</h2>
        <p>You must have studied full-time at an eligible DLI in a program of at least 8 months and graduated from a publicly-funded institution.</p>

        <h2>PGWP and the CEC Pathway to PR</h2>
        <p>The CEC requires 12 months of skilled Canadian work experience. The PGWP gives you the legal status to acquire this experience.</p>

        <h2>PGWP FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I renew my PGWP if it expires?</h3>
            <p>No. The PGWP is a one-time issuance. If it expires, you must secure a different type of work permit or leave Canada.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "canada-bangladesh-immigration",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "Canada Immigration for Bangladeshi Nationals: Your Complete Pathway Guide",
    excerpt: "Bangladesh is one of the top source countries for Canadian immigration. Whether you're a skilled professional, student, or family member, here's a detailed guide to the pathways available to Bangladeshi nationals.",
    readTime: "9 min read",
    date: "March 5, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Bangladeshi nationals have a strong track record of successfully immigrating to Canada. Route 2 Migrate has deep expertise in helping Bangladeshi clients navigate every step of the process.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Top Pathways:</strong> Express Entry, Study Permits, and Spousal Sponsorship.</li>
            <li><strong>Documentation:</strong> Proper attestation of Bangladeshi degrees is vital for <Link href="/blog/wes-eca-guide" className="text-primary font-semibold">WES ECA</Link>.</li>
          </ul>
        </div>

        <h2>Express Entry for Bangladeshi Professionals</h2>
        <p>Many professionals in IT, engineering, and healthcare from Bangladesh qualify for Express Entry. Strong IELTS scores are critical.</p>

        <h2>Study in Canada</h2>
        <p>A Canadian degree combined with a PGWP creates a clear pathway to PR. Proof of funds and genuine student intention are the critical factors.</p>

        <h2>Immigration from Bangladesh FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Is Bangladesh eligible for the Student Direct Stream (SDS)?</h3>
            <p>No. Bangladeshi students must apply via the standard study permit stream, which requires stronger documentation regarding source of funds.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "f1-rejection-to-canada-study",
    category: "Study Permits",
    categoryColor: "bg-blue-100 text-blue-700",
    title: "USA F-1 Visa Rejected? Here's Your Path to a Canadian Study Permit",
    excerpt: "A US F-1 visa refusal doesn't mean the end of your international education dreams. Many students who were refused US student visas have gone on to successfully study in Canada. Here's how to approach your Canadian application strategically.",
    readTime: "7 min read",
    date: "February 14, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">A refusal from the US immigration system is not the end. Canada evaluates applicants independently based on Canadian criteria, and a US refusal does not automatically disqualify you.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Disclosure:</strong> You must declare your US refusal to IRCC.</li>
            <li><strong>Explanation:</strong> A Letter of Explanation addressing the refusal is vital.</li>
          </ul>
        </div>

        <h2>Must You Disclose a US Refusal?</h2>
        <p>Yes. Failure to disclose a previous refusal constitutes misrepresentation and can result in a 5-year ban. Always disclose, and address it proactively.</p>

        <h2>Addressing the Refusal in Your Canadian Application</h2>
        <p>Include a Letter of Explanation acknowledging the refusal and clearly addressing why the concerns that led to it do not apply to your Canadian application.</p>

        <h2>Study Permit After US Refusal FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Will a US F-1 rejection affect my Canada study permit?</h3>
            <p>It does not automatically disqualify you, but the visa officer will scrutinize your application more closely. Strong financials and ties to your home country are essential.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "wes-eca-guide",
    category: "Immigration Tips",
    categoryColor: "bg-amber-100 text-amber-700",
    title: "WES vs MCC ECA: Which Educational Credential Assessment Do You Need?",
    excerpt: "An Educational Credential Assessment (ECA) is required for Express Entry if your education was obtained outside Canada. Learn the difference between WES and MCC, which programs accept which body, and how to get it done efficiently.",
    readTime: "6 min read",
    date: "January 22, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">If you earned your academic credentials outside Canada and are applying for <Link href="/blog/express-entry-2026-guide" className="text-primary font-semibold">Express Entry</Link>, you need an Educational Credential Assessment (ECA) to verify equivalency to Canadian standards.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>WES:</strong> Best for standard university degrees.</li>
            <li><strong>MCC:</strong> Mandatory for foreign medical doctors.</li>
          </ul>
        </div>

        <h2>World Education Services (WES)</h2>
        <p>WES is the most widely recognized ECA body. It provides a detailed analysis of each credential. Processing times range from 7 days to 7 weeks.</p>

        <h2>Medical Council of Canada (MCC) ECA</h2>
        <p>The MCC ECA is specifically for physicians. It includes a review of the medical school's accreditation status.</p>

        <h2>ECA FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How long is an ECA valid for Express Entry?</h3>
            <p>An ECA is valid for 5 years from the date it is issued for Express Entry purposes.</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    slug: "business-immigration-startup-visa",
    category: "Express Entry",
    categoryColor: "bg-primary/10 text-primary",
    title: "Start-Up Visa Program: Canada's PR Pathway for Entrepreneurs",
    excerpt: "Canada's Start-Up Visa (SUV) program offers permanent residence to innovative entrepreneurs who can secure the backing of a designated Canadian organization. Here's how the program works and whether you might qualify.",
    readTime: "8 min read",
    date: "January 8, 2025",
    author: " RCIC Riffat H. Mohaimen",
    content: (
      <div className="prose prose-lg max-w-none text-justify">
        <p className="lead text-lg text-foreground font-medium mb-8">Canada's Start-Up Visa (SUV) program offers permanent residence directly to foreign entrepreneurs who have a qualifying business idea and the backing of a designated Canadian investor or incubator.</p>

        <div className="my-8 p-6 bg-primary/5 border-l-4 border-primary rounded-r-xl not-prose">
          <h2 className="text-xl font-bold mt-0 mb-3 text-foreground">Key Takeaways</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li><strong>Designated Support:</strong> Requires backing from an Angel Investor, VC, or Incubator.</li>
            <li><strong>Language:</strong> Minimum CLB 5 required.</li>
            <li><strong>Work Permit:</strong> Temporary work permit available while PR processes.</li>
          </ul>
        </div>

        <h2>What is the Start-Up Visa Program?</h2>
        <p>To qualify, your business must be incorporated in Canada, be actively managed from Canada, and hold a letter of support from a designated organization.</p>

        <h2>Designated Organization Types</h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Venture Capital Funds:</strong> Minimum $200,000 investment.</li>
          <li><strong>Angel Investor Groups:</strong> Minimum $75,000 investment.</li>
          <li><strong>Business Incubators:</strong> No investment required, but acceptance is highly competitive.</li>
        </ul>

        <h2>Start-Up Visa FAQ</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Do I need to invest my own money for a Start-Up Visa?</h3>
            <p>No, you do not need to invest your own funds if you secure the minimum required investment from a designated Venture Capital Fund or Angel Investor group.</p>
          </div>
        </div>
      </div>
    ),
  },
];