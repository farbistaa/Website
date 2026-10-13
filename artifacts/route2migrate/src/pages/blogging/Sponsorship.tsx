// src/pages/blogging/Sponsorship.tsx
import BlogLayout from "@/components/BlogLayout";

export interface BlogPost {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  author: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
}

const BOOKING_URL = "https://riffathmohaimen.setmore.com/";

// Improvement #1: Fix DRY Violation - Centralize FAQ Data
const faqData = [
  {
    question: "Can I sponsor my parents if I don't meet the PGP income requirements?",
    answer: "No, you cannot. The MNI (LICO + 30%) is strictly enforced. However, you can have your spouse/common-law partner co-sign to combine your incomes, or you can apply for the Super Visa, which only requires the standard LICO and $100,000 in medical insurance."
  },
  {
    question: "What happens if my spouse and I divorce during the 3-year undertaking?",
    answer: "The undertaking remains legally binding. Even if you divorce, you are responsible for repaying any provincial social assistance your ex-spouse claims during the 3-year period. The obligation ends only at the 3-year mark."
  },
  {
    question: "Can I sponsor my 23-year-old brother to come to Canada?",
    answer: "Generally, no. Siblings over 22 do not qualify as dependent children. The only exceptions are if he is orphaned and under 18, or if you qualify under the 'lonely relative' policy where you have no other family in Canada or abroad."
  }
];

// LICO Table - Exactly 2 lines per header, clean alignment
const licoTableHtml = `
<div className="not-prose my-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
  <div className="bg-[#800000] px-6 md:px-8 py-4">
    <h3 className="text-base md:text-lg font-semibold text-white m-0 flex items-center gap-2.5 text-left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true" focusable="false"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
      Table 1: Low Income Cut-Offs (LICO) Before Tax (2024)
    </h3>
  </div>
  <div className="overflow-x-auto">
    <table className="w-full border-collapse">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left min-w-[160px]">
            <span className="block">Size of</span>
            <span className="block">Family Unit</span>
          </th>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left">
            <span className="block">Rural areas</span>
            <span className="block font-normal normal-case text-gray-500 whitespace-nowrap">(outside CMA/CA)</span>
          </th>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left">
            <span className="block">CA</span>
            <span className="block font-normal normal-case text-gray-500 whitespace-nowrap">Fewer than 30k</span>
          </th>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left">
            <span className="block">CA</span>
            <span className="block font-normal normal-case text-gray-500 whitespace-nowrap">30,000 to 99,999</span>
          </th>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left">
            <span className="block">CMA</span>
            <span className="block font-normal normal-case text-gray-500 whitespace-nowrap">100k to 499,999</span>
          </th>
          <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-bold text-gray-700 uppercase tracking-wider text-left">
            <span className="block">CMA</span>
            <span className="block font-normal normal-case text-gray-500 whitespace-nowrap">500,000 or more</span>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">1 person</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$29,380</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$33,533</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$37,372</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$41,679</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$46,564</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">2 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$36,510</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$41,675</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$46,447</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$51,794</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$57,866</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">3 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$44,806</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$51,145</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$57,005</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$63,566</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$71,023</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">4 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$54,386</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$62,082</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$69,200</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$77,162</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$86,215</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">5 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$61,615</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$70,326</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$78,397</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$87,420</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$97,680</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">6 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$69,434</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$79,247</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$88,343</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$98,512</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$110,083</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">7 persons</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$77,253</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$88,168</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$98,288</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$109,603</td>
          <td className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right tabular-nums">$122,486</td>
        </tr>
        <tr className="hover:bg-gray-50 transition-colors">
          <td className="px-4 md:px-6 py-4 font-medium text-gray-900 text-sm md:text-base text-left">More than 7</td>
          <td colSpan="5" className="px-4 md:px-6 py-4 text-gray-700 text-sm md:text-base text-right italic">$77,253 (Rural base) + $7,819 for each additional person</td>
        </tr>
      </tbody>
    </table>
    <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-200">
      <p className="text-xs text-gray-600 m-0 leading-relaxed text-left"><strong className="text-black">Note:</strong> LICO figures are used to determine the base financial requirement for Super Visa hosts based on community size.</p>
      <a href="https://www.canada.ca/en/employment-social-development/services/foreign-workers/caregiver/financial-ability.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white rounded-full font-bold text-xs px-5 h-9 transition-all duration-300 shrink-0">
        View Official Source
      </a>
    </div>
  </div>
</div>
`;

// Improvement #1 & #5: Map over FAQ data for HTML and add a11y attributes
const faqHtml = faqData.map((faq, index) => `
  <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-[#800000]/30">
    <summary id="faq-summary-${index}" aria-controls="faq-content-${index}" className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-black list-none hover:bg-gray-50 transition-colors">
      <span className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-xs shrink-0">Q</span>
        <span className="text-sm md:text-base truncate text-left">${faq.question}</span>
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 transition-transform group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5" aria-hidden="true" focusable="false"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </summary>
    <div id="faq-content-${index}" role="region" aria-labelledby="faq-summary-${index}" className="px-5 pb-5 pl-16">
      <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">${faq.answer}</p>
    </div>
  </details>
`).join('');

export const postData: BlogPost = {
  slug: "canada-family-sponsorship-2026-guide",
  // Improvement #1: Make the Family Sponsorship tag text white
  categoryColor: "bg-[#800000] text-white",
  category: "Family Sponsorship",
  title: "Canada Family Sponsorship 2026: Spousal, PGP & Dependent Child Guide",
  excerpt:
    "Complete 2026 guide to Canada Family Sponsorship. Learn about spousal PR, PGP income requirements, Super Visa alternatives, and dependent child rules from a licensed RCIC.",
  readTime: "15 min read",
  // Improvement #4: Fix Date Discrepancy - Aligning date closer to 2026 Guide context
  date: "March 15, 2025",
  author: "Foyaj Ahmmad Farabi",
  seoTitle: "Canada Family Sponsorship 2026 Guide | Route 2 Migrate",
  seoDescription:
    "Complete 2026 guide to Canada Family Sponsorship. Master spousal PR, PGP lotteries, Super Visas, and dependent child rules. Learn about IRCC undertakings and appeals.",
  content: `
<p className="text-gray-700 leading-relaxed mb-8 text-justify"><strong>Canada Family Sponsorship</strong> allows Canadian citizens and permanent residents to reunite with their loved ones. However, navigating the legal framework—whether for a spouse, parents, or dependent children—requires strict compliance with Immigration, Refugees and Citizenship Canada (IRCC) regulations. Our immigration consultancy ensures your application is backed by legal rigor, maximizing your chances of approval.</p>

<div className="not-prose my-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#800000] text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4" aria-hidden="true" focusable="false"><path d="M9 12l2 2 4-4"></path><path d="M12 3l8 4v5c0 5-3.5 7-8 9-4.5-2-8-4-8-9V7l8-4z"></path></svg>
    </span>
    <h2 className="text-xl md:text-2xl font-bold m-0 text-black tracking-tight text-left">Key Takeaways</h2>
  </div>
  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed text-left"><strong className="text-black">3-Year Undertaking:</strong> Spousal sponsorship carries a mandatory 3-year legal financial commitment.</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed text-left"><strong className="text-black">PGP 20-Year Liability:</strong> Sponsoring parents binds you to a 20-year financial undertaking (10 in Quebec).</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed text-left"><strong className="text-black">Age Lock-In:</strong> Dependent children must be under 22 and unmarried at the time of application.</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3" aria-hidden="true" focusable="false"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed text-left"><strong className="text-black">5-Year Bar:</strong> You cannot sponsor a new spouse if you were sponsored as a spouse within the last 5 years.</span>
    </li>
  </ul>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">1. Sponsor your spouse, partner or dependent children</h2>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">Sponsoring your spouse, common-law partner, or dependent children to Canada as permanent residents requires meticulous documentation to prove both your eligibility as a sponsor and the genuineness of your relationship.</p>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Inside Canada vs Outside Canada spousal sponsorship work permit</h3>

<div className="not-prose my-10 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
  <div className="bg-[#800000] px-6 md:px-8 py-4">
    <h3 className="text-base font-semibold text-white m-0 flex items-center gap-2.5 text-left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true" focusable="false"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
      Inside vs Outside Canada Sponsorship
    </h3>
  </div>
  <div className="divide-y divide-gray-100">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 md:px-8 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="flex items-center gap-2.5 font-semibold text-black text-sm text-left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 text-[#800000] shrink-0" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle></svg>
        Feature
      </div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700 font-semibold text-black text-left">
        <span>Inside Canada</span><span>Outside Canada</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 md:px-8 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="flex items-center gap-2.5 font-semibold text-black text-sm text-left">Location</div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700 text-left">
        <span>Inside Canada</span><span>Outside Canada</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 md:px-8 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="flex items-center gap-2.5 font-semibold text-black text-sm text-left">Work Permit</div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700 text-left">
        <span>Eligible for SOWP</span><span>Not eligible via this stream</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 md:px-8 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="flex items-center gap-2.5 font-semibold text-black text-sm text-left">Travel</div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700 text-left">
        <span>Risky (may break inland status)</span><span>Free to travel</span>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 px-6 md:px-8 py-4 hover:bg-gray-50 transition-colors items-center">
      <div className="flex items-center gap-2.5 font-semibold text-black text-sm text-left">Appeal Rights</div>
      <div className="md:col-span-2 grid grid-cols-2 gap-4 text-sm text-gray-700 text-left">
        <span>No IAD appeal right</span><span>Has IAD appeal right</span>
      </div>
    </div>
  </div>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Proof of genuine relationship IMM 5533 spousal sponsorship</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Tiered Evidence Strategy</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed mb-4 text-justify">To satisfy the <strong>proof of genuine relationship IMM 5533 spousal sponsorship</strong> requirements, officers look for a combination of the following evidence tiers:</p>
  <div className="grid md:grid-cols-2 gap-4">
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-1 text-left">Tier 1: Primary Evidence</div>
      <p className="text-sm text-gray-700 m-0 text-left">Joint leases, joint bank accounts, co-signed loans, and insurance beneficiaries.</p>
    </div>
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-1 text-left">Tier 2: Secondary Evidence</div>
      <p className="text-sm text-gray-700 m-0 text-left">Photos together, communication logs, gifts, and affidavits from family.</p>
    </div>
  </div>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Common law partner sponsorship Canada 12 month cohabitation</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Continuous Cohabitation Rule</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify"><strong>Common law partner sponsorship Canada 12 month cohabitation</strong> requires both partners to have lived together in a conjugal relationship for at least 12 continuous months. Brief separations for work or travel are allowed, but the primary residence must be shared continuously.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Spousal sponsorship undertaking length financial obligation Canada</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">3-Year Legal Commitment</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">The <strong>spousal sponsorship undertaking length financial obligation Canada</strong> rule mandates that the sponsor is legally responsible for the sponsored spouse for <strong>3 years</strong> from the date they become a PR, regardless of relationship breakdown.</p>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">2. Sponsor your parents and grandparents (Paused)</h2>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">Sponsoring parents involves stricter financial scrutiny than spousal applications. IRCC uses the Minimum Necessary Income (MNI) to evaluate your ability to support them. Note: The Parents and Grandparents Program (PGP) intake is currently paused and operates via random lottery invitations.</p>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Parents and Grandparents Program PGP income requirements chart</h3>

<div className="not-prose my-10 rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
  <div className="bg-[#800000] px-6 md:px-8 py-4">
    <h3 className="text-base font-semibold text-white m-0 flex items-center gap-2.5 text-left">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 shrink-0" aria-hidden="true" focusable="false"><line x1="12" x2="12" y1="2" y2="22"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
      Minimum Necessary Income (MNI) for Super Visa Hosts
    </h3>
  </div>
  <table className="w-full text-left border-collapse">
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-left">Number of Family Members</th>
        <th className="px-4 py-3 text-xs font-bold text-gray-600 uppercase text-left">Minimum Income (CAD)</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">1 person</td><td className="px-4 py-3 text-gray-700 text-left">$30,526</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">2 persons</td><td className="px-4 py-3 text-gray-700 text-left">$38,002</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">3 persons</td><td className="px-4 py-3 text-gray-700 text-left">$46,663</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">4 persons</td><td className="px-4 py-3 text-gray-700 text-left">$56,534</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">5 persons</td><td className="px-4 py-3 text-gray-700 text-left">$64,031</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">6 persons</td><td className="px-4 py-3 text-gray-700 text-left">$72,214</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">7 persons</td><td className="px-4 py-3 text-gray-700 text-left">$80,784</td></tr>
      <tr><td className="px-4 py-3 font-medium text-gray-900 text-left">More than 7 persons</td><td className="px-4 py-3 text-gray-700 text-left">$80,784 + $8,224 per additional person</td></tr>
    </tbody>
  </table>
  <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-200">
    <p className="text-xs text-gray-600 m-0 leading-relaxed text-left"><strong className="text-black">Note:</strong> Income must be proven via CRA Notice of Assessments (NOA) Line 15000 for the past 3 consecutive tax years for PGP.</p>
    <a href="https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa/forms-documents/host-financial-support.html#minimum-income-requirement" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white border border-[#800000] text-[#800000] hover:bg-[#800000] hover:text-white rounded-full font-bold text-xs px-5 h-9 transition-all duration-300 shrink-0">
      View Official Source
    </a>
  </div>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Low Income Cut-Offs (LICO) Table (2024)</h3>

 ${licoTableHtml}

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Co-signer eligibility PGP sponsorship spouse combined income</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Combining Income</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">Under <strong>co-signer eligibility PGP sponsorship spouse combined income</strong> rules, a legal spouse or common-law partner can co-sign the undertaking to combine their 3 consecutive tax years of income to meet the MNI threshold.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">20 year sponsorship undertaking parents and grandparents IRCC</h3>

<div className="not-prose my-10 rounded-xl border border-red-200 bg-red-50/50 p-6 md:p-8">
  <div className="flex items-start gap-4">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000] text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
    </span>
    <div className="flex-1 min-w-0">
      <h4 className="text-base md:text-lg font-bold text-black m-0 mb-3 text-left">20-Year Financial Liability</h4>
      <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">The <strong>20 year sponsorship undertaking parents and grandparents IRCC</strong> policy means sponsors are legally bound to repay any provincial social assistance claimed by the sponsored parents for 20 years from their PR date (10 years for residents of Quebec). This undertaking cannot be cancelled.</p>
    </div>
  </div>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">PGP intake pause alternatives Super Visa Canada</h3>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">Due to high demand, the PGP often operates on a limited lottery system. </p>

<div className="grid md:grid-cols-2 gap-5 my-10 not-prose">
  <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#800000] hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle></svg>
      </span>
      <h4 className="font-bold text-black m-0 text-base text-left">PGP Lottery</h4>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">If <strong>PGP intake pause alternatives Super Visa Canada</strong> are needed, it is because the PGP is currently utilizing an invitation-to-apply lottery system, leaving many eligible sponsors unable to submit applications.</p>
  </div>
  <div className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#800000] hover:shadow-md transition-all duration-300">
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-black text-white shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z"></path></svg>
      </span>
      <h4 className="font-bold text-black m-0 text-base text-left">Super Visa (5-Year)</h4>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">Allows parents/grandparents to visit for up to 5 consecutive years per entry, valid for 10 years. No 20-year undertaking required.</p>
  </div>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Super Visa Canada medical insurance and LICO requirement</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Super Visa Rules</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">To meet <strong>Super Visa Canada medical insurance and LICO requirement</strong> standards, you must purchase private medical insurance from a Canadian provider with at least <strong>$100,000 coverage</strong> for 1 year, and the host child must meet the Low Income Cut-Off (LICO) minimum for their family size.</p>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">3. Sponsor your relatives (Dependent Children, Siblings & Others)</h2>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Dependent child age limit Canada sponsorship age lock in</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Age Lock-In Rules</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">The <strong>dependent child age limit Canada sponsorship age lock in</strong> rule dictates that a child must be <strong>under 22 years of age</strong> and unmarried/not in a common-law relationship at the time the application is received by IRCC. Once locked in, the child will not age out, even if they turn 22 during processing.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Sponsoring adult child with physical or mental disability IRCC</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Edge-Case Pathway</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify"><strong>Sponsoring adult child with physical or mental disability IRCC</strong> pathways allow children over 22 to be sponsored if they have depended financially on their parents since before turning 22 and are unable to be self-supporting due to a physical or mental condition.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Sponsor orphaned sibling niece nephew grandchild Canada</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Strict Dependency</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">To <strong>sponsor orphaned sibling niece nephew grandchild Canada</strong>, the relative must be under 18, orphaned (both parents deceased), and unmarried. They must be related by blood or adoption.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Lonely relative policy Canada sponsor any relative of any age</h3>

<div className="not-prose my-10 rounded-xl border border-red-200 bg-red-50/50 p-6 md:p-8">
  <div className="flex items-start gap-4">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000] text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
    </span>
    <div className="flex-1 min-w-0">
      <h4 className="text-base md:text-lg font-bold text-black m-0 mb-3 text-left">Rare Exception: Lonely Relative</h4>
      <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">Under the <strong>lonely relative policy Canada sponsor any relative of any age</strong>, you can sponsor one relative regardless of age or relationship if you do not have a living spouse, common-law partner, child, sibling, parent, grandparent, aunt/uncle, or niece/nephew who is a Canadian citizen/PR or whom you can sponsor.</p>
    </div>
  </div>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">4. Sponsor your adopted child</h2>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Adopted child citizenship and permanent residence sponsorship</h3>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">For <strong>adopted child citizenship and permanent residence sponsorship</strong>, there are two pathways:</p>
<ol className="list-decimal pl-8 mb-8 text-gray-700 text-justify space-y-2">
  <li><strong>Direct Citizenship Route</strong>: For children adopted abroad by a Canadian citizen.</li>
  <li><strong>PR Sponsorship Route</strong>: Sponsoring an adopted child to come to Canada as a PR, often used when the adoption process is finalized inside Canada or the sponsor is a PR.</li>
</ol>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">5. Sponsor Eligibility & Legal Bars</h2>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">IRCC imposes strict bans to prevent relationship fraud. Understanding the <strong>sponsorship bar 5 year rule prior sponsored spouse</strong> is critical: if you were sponsored as a spouse/partner, you cannot sponsor a new spouse or partner until 5 years have passed since you became a PR.</p>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Sponsor eligibility default on previous undertaking bankruptcy</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">
  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-sm shrink-0">!</span>
    <div className="flex-1 min-w-0"><strong className="text-black block mb-1 text-sm text-left">Undischarged Bankruptcy</strong><span className="text-sm text-gray-700 leading-relaxed text-left">You cannot sponsor if you are an undischarged bankrupt under the Bankruptcy and Insolvency Act.</span></div>
  </div>
  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-sm shrink-0">!</span>
    <div className="flex-1 min-w-0"><strong className="text-black block mb-1 text-sm text-left">Social Assistance</strong><span className="text-sm text-gray-700 leading-relaxed text-left">Receiving social assistance (other than disability) renders you ineligible to sponsor.</span></div>
  </div>
  <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300 md:col-span-2">
    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-sm shrink-0">!</span>
    <div className="flex-1 min-w-0"><strong className="text-black block mb-1 text-sm text-left">Default on Previous Undertaking</strong><span className="text-sm text-gray-700 leading-relaxed text-left">If you failed to repay a previous undertaking (e.g., parents who claimed welfare), you are barred from <strong>sponsor eligibility default on previous undertaking bankruptcy</strong> situations until the debt is paid in full.</span></div>
  </div>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">6. Processing & Appeals</h2>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">Spousal Open Work Permit SOWP inland processing timeline</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Status Extension</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">If you submit an Inland sponsorship, your spouse can apply for a Spousal Open Work Permit (SOWP) concurrently. The <strong>Spousal Open Work Permit SOWP inland processing timeline</strong> typically takes 4 to 6 months, allowing the applicant to work in Canada while the PR application processes.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">TRV dual intent spousal sponsorship visitor visa approval</h3>

<div className="not-prose my-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base text-left">Strategic Entry</h4>
  </div>
  <p className="text-sm text-gray-700 leading-relaxed m-0 text-justify">Understanding <strong>TRV dual intent spousal sponsorship visitor visa approval</strong> is vital for outland spouses wanting to visit Canada. IRCC allows an applicant to hold temporary intent (TRV) while having permanent intent (PR Application). Approval hinges on proving strong ties to the home country.</p>
</div>

<h3 className="text-xl md:text-2xl font-bold text-black mb-6 mt-8 text-left">IAD spousal sponsorship appeal bad faith relationship</h3>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">If an outland sponsorship is refused for Section 4 (bad faith relationship), the sponsor has the right to appeal to the Immigration Appeal Division (IAD).</p>

<div className="not-prose my-10 relative">
  <div className="absolute left-5 top-2 bottom-2 w-px bg-gray-200"></div>
  <div className="space-y-5">
    <div className="relative flex gap-4 group">
      <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#800000] text-white font-bold text-sm shrink-0 ring-4 ring-white">1</div>
      <div className="flex-1 p-5 bg-white rounded-xl border border-gray-200 group-hover:border-[#800000]/40 group-hover:shadow-md transition-all duration-300">
        <h4 className="font-bold text-black m-0 mb-2 text-sm md:text-base text-left">Receive Refusal Letter</h4>
        <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">Identify the exact Section 4(1) refusal clause indicating the officer believed the marriage was entered into primarily for immigration purposes.</p>
      </div>
    </div>
    <div className="relative flex gap-4 group">
      <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#800000] text-white font-bold text-sm shrink-0 ring-4 ring-white">2</div>
      <div className="flex-1 p-5 bg-white rounded-xl border border-gray-200 group-hover:border-[#800000]/40 group-hover:shadow-md transition-all duration-300">
        <h4 className="font-bold text-black m-0 mb-2 text-sm md:text-base text-left">File IAD Notice of Appeal</h4>
        <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">Submit the appeal within <strong>30 days</strong> of receiving the refusal. Missing this deadline forfeits your right to appeal.</p>
      </div>
    </div>
    <div className="relative flex gap-4 group">
      <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#800000] text-white font-bold text-sm shrink-0 ring-4 ring-white">3</div>
      <div className="flex-1 p-5 bg-white rounded-xl border border-gray-200 group-hover:border-[#800000]/40 group-hover:shadow-md transition-all duration-300">
        <h4 className="font-bold text-black m-0 mb-2 text-sm md:text-base text-left">Alternative Dispute Resolution (ADR)</h4>
        <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">Prepare an updated narrative and evidence package for an ADR interview or proceed to a full IAD hearing to dismantle the bad faith refusal.</p>
      </div>
    </div>
    <div className="relative flex gap-4 group">
      <div className="relative z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-bold text-sm shrink-0 ring-4 ring-white">4</div>
      <div className="flex-1 p-5 bg-white rounded-xl border border-gray-200 group-hover:border-[#800000]/40 group-hover:shadow-md transition-all duration-300">
        <h4 className="font-bold text-black m-0 mb-2 text-sm md:text-base text-left">Win Appeal & PR Grant</h4>
        <p className="text-sm text-gray-700 m-0 leading-relaxed text-justify">If the <strong>IAD spousal sponsorship appeal bad faith relationship</strong> decision is overturned, IRCC will resume processing the PR application and issue the visa.</p>
      </div>
    </div>
  </div>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">Frequently Asked Questions (FAQ)</h2>

<div className="not-prose my-10 space-y-3">
  ${faqHtml}
</div>

<h2 className="text-2xl md:text-3xl font-bold text-black mb-6 mt-12 text-left border-b pb-3 border-gray-100">Conclusion: Reunite Your Family with Legal Confidence</h2>

<p className="text-gray-700 leading-relaxed mb-8 text-justify">Canadian Family Sponsorship is a legally binding commitment. A minor error in your IMM 5533 documentation or failing to understand your 20-year undertaking can result in severe financial liability and application refusal. As a licensed RCIC, I ensure your application is backed by legal expertise and strict compliance with IRCC regulations.</p>

<div className="not-prose my-10 rounded-2xl bg-[#800000] p-6 md:p-8 shadow-lg">
  <div className="flex items-start gap-4">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/15 text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>
    </span>
    <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-white m-0 mb-2 text-left">Disclaimer</h4>
      <p className="text-sm text-white/80 leading-relaxed m-0 text-justify">Immigration laws and IRCC policies are subject to change. For the most accurate and updated information regarding your specific family sponsorship case, please consult our regulated immigration consultancy.</p>
    </div>
  </div>
</div>

<div className="not-prose my-12">
  <div className="bg-gradient-to-br from-[#3b0a0a] via-[#7f1d1d] to-[#3b0a0a] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
    <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_1px,transparent_0,transparent_50%)] [background-size:12px_12px]" aria-hidden="true"></div>
    <div className="relative z-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4 text-left">Family Sponsorship Assessment</p>
      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 leading-tight text-left">Ready to Reunite Your Family?</h3>
      <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto text-justify">Stop guessing about PGP income requirements, 20-year undertakings, and IMM 5533 documentation. Get your family sponsorship profile assessed by a licensed RCIC before you submit to IRCC.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a href="${BOOKING_URL}" target="_blank" rel="noopener noreferrer" aria-label="Book a consultation" className="inline-flex items-center justify-center bg-white text-primary hover:bg-white/90 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#800000]">
          Book Consultation
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 ml-2" aria-hidden="true" focusable="false"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a href="/contact" aria-label="Contact us" className="inline-flex items-center justify-center bg-transparent border border-white/60 text-white hover:bg-white/10 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#800000]">
          Contact Us
        </a>
      </div>
    </div>
  </div>
</div>
  `,
};

export default function SponsorshipPage() {
  // Improvement #1: Fix DRY Violation - Map over centralized FAQ data for Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": postData.title,
    "description": postData.excerpt,
    "author": {
      "@type": "Person",
      "name": postData.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Route 2 Migrate",
    },
    // Improvement #2: Fix Hardcoded Dates in Schema - Use postData.date dynamically
    "datePublished": postData.date,
    "dateModified": postData.date
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BlogLayout post={postData} />
    </>
  );
}