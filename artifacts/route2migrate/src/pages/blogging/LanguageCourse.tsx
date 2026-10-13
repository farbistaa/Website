// src/pages/blogging/LanguageCourse.tsx
import { useEffect } from "react";
import BlogLayout from "@/components/BlogLayout";

export const postData = {
  slug: "ielts-celpip-test-prep-guide",
  category: "Language Tests",
  categoryColor: "bg-[#800000]/10 text-[#800000]",
  title: "IELTS & CELPIP Test Prep: Maximize Your CRS Score for Canada",
  excerpt: "Your English language test score is the single most impactful factor in your Canadian immigration journey. Achieving a high Canadian Language Benchmark (CLB) can drastically alter your fate.",
  readTime: "8 min read",
  date: "September 17, 2026",
  author: "Foyaj Ahmmad Farabi",
  seoTitle: "IELTS & CELPIP Test Prep Guide Canada | Route 2 Migrate",
  seoDescription: "Maximize your CRS score for Canadian immigration with strategic IELTS and CELPIP test prep. Learn which test is right for you and how to achieve CLB 9+.",
  content: `
Your English language test score is the single most impactful factor in your Canadian immigration journey. Whether you are applying for a <a href="/study-permits" className="text-[#800000] font-semibold hover:underline">Study Permit</a> or <a href="/express-entry" className="text-[#800000] font-semibold hover:underline">Express Entry</a>, achieving a high Canadian Language Benchmark (CLB) can drastically alter your fate. For Express Entry, jumping from CLB 7 to CLB 9 can add over 100 CRS points to your profile.

<div className="not-prose my-10 rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#800000] text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M9 12l2 2 4-4"></path><path d="M12 3l8 4v5c0 5-3.5 7-8 9-4.5-2-8-4-8-9V7l8-4z"></path></svg>
    </span>
    <h2 className="text-xl md:text-2xl font-bold m-0 text-black tracking-tight">Key Takeaways</h2>
  </div>
  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 list-none p-0 m-0">
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed"><strong className="text-black">Maximum CRS Impact:</strong> Language proficiency yields the highest points in the Express Entry grid.</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed"><strong className="text-black">IELTS vs. CELPIP:</strong> Both are accepted by IRCC, but they differ in format, scoring, and difficulty depending on your strengths.</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed"><strong className="text-black">CLB 9 is the Magic Number:</strong> Reaching CLB 9 unlocks maximum core human capital points.</span>
    </li>
    <li className="flex items-start gap-3 py-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed"><strong className="text-black">Strategic Prep:</strong> Immigration-focused prep aligns your study strategy with the specific points you need.</span>
    </li>
    <li className="flex items-start gap-3 py-2 md:col-span-2">
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </span>
      <span className="text-sm text-gray-700 leading-relaxed"><strong className="text-black">SDS Requirement:</strong> A minimum IELTS score of 6.0 is mandatory for the fast-track Student Direct Stream (SDS).</span>
    </li>
  </ul>
</div>

## Why Language Scores Matter for Canadian Immigration

Immigration, Refugees and Citizenship Canada (IRCC) uses the Canadian Language Benchmark (CLB) to standardize language test scores. Under the Comprehensive Ranking System (CRS), language points are divided into first and second official languages. A strong score can earn you up to 136 core points (or 260 if applying with a spouse) plus additional adaptability points. Without a competitive score, even highly educated professionals with years of experience may struggle to receive an Invitation to Apply (ITA).

## IELTS vs. CELPIP: Which Should You Choose?

For Canadian immigration, you must choose between IRCC-approved English tests. Neither is "easier" than the other, but they suit different skill sets.

* **IELTS General Training:** A globally recognized test. It features a face-to-face speaking interview with a human examiner. If you prefer conversational speaking and handwritten exams (if paper-based), IELTS is the traditional choice. It is also the only test currently accepted for the Student Direct Stream (SDS).
* **CELPIP General:** A 100% computer-delivered test designed specifically for Canadian immigration. It uses North American accents and contexts. The speaking component requires you to record your answers into a microphone. If you type fast and are comfortable with a completely digital environment, CELPIP might be your best bet.

## Which Test Should You Take for Immigration?

For Canadian Immigration (Express Entry, PNP, etc.), you <strong>must</strong> take the specific test versions designed for immigration, not the academic ones. IRCC currently accepts four designated English language tests:

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 not-prose">
  <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#800000]/10 text-[#800000] mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base">IELTS</h4>
    <p className="text-sm text-gray-700 leading-relaxed m-0 mt-1">Take <strong className="text-black">General Training</strong> (Not Academic)</p>
  </div>
  <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#800000]/10 text-[#800000] mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base">CELPIP</h4>
    <p className="text-sm text-gray-700 leading-relaxed m-0 mt-1">Take <strong className="text-black">General</strong> (Not LS)</p>
  </div>
  <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#800000]/10 text-[#800000] mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base">PTE</h4>
    <p className="text-sm text-gray-700 leading-relaxed m-0 mt-1">Take <strong className="text-black">Core</strong> (Not Academic)</p>
  </div>
  <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300">
    <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#800000]/10 text-[#800000] mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20"></path><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    </span>
    <h4 className="font-bold text-black m-0 text-base">TOEFL</h4>
    <p className="text-sm text-gray-700 leading-relaxed m-0 mt-1">Take <strong className="text-black">iBT</strong> (Not Essentials)</p>
  </div>
</div>

## CLB Conversion Chart for Canadian Immigration

If you prefer to manually map your scores, use the official reference chart below to map your scores across the four major English tests. 

<div className="not-prose my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
  <table className="w-full text-sm md:text-base text-left border-collapse min-w-[850px]">
    <thead className="bg-[#800000] text-white">
      <tr>
        <th className="px-6 py-4 text-center font-bold align-middle w-24">CLB Level</th>
        <th className="px-6 py-4 text-center font-bold align-middle">IELTS (General)</th>
        <th className="px-6 py-4 text-center font-bold align-middle">CELPIP (General)</th>
        <th className="px-6 py-4 text-center font-bold align-middle">PTE (Core)</th>
        <th className="px-6 py-4 text-center font-bold align-middle">TOEFL (iBT)</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-100">
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">4</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">4.5</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">3.5</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">4.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">4.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">4</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">4</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">4</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">4</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">14-21</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">15-22</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">18-25</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">15-22</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">10</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">4</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">7</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">9</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">5</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">5.0</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">4.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">5.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">5.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">5</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">5</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">5</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">5</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">22-28</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">23-29</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">26-31</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">23-28</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">15</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">7</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">12</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">15</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">6</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">5.5</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">5.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">5.5</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">5.5</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">6</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">6</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">6</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">6</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">29-34</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">30-36</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">32-37</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">29-34</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">18</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">8</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">15</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">18</span></div></td>
      </tr>
      <tr className="bg-[#800000]/5 hover:bg-[#800000]/10 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-[#800000] align-middle">7</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">6.0</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">6.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">6.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">6.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">7</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">7</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">7</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">7</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">35-41</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">37-43</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">38-44</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">35-41</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">24</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">11</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">17</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">23</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">8</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">7.5</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">6.5</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">6.5</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">6.5</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">8</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">8</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">8</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">8</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">42-49</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">44-50</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">45-50</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">42-50</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">28</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">12</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">21</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">25</span></div></td>
      </tr>
      <tr className="bg-[#800000]/10 hover:bg-[#800000]/15 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-[#800000] align-middle">9</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">8.0</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">7.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">7.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">7.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">9</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">9</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">9</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">9</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">50-57</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">51-57</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">51-57</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">51-57</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">32</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">13</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">22</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">28</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">10</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">8.5</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">8.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">7.5</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">7.5</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">10</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">10</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">10</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">10</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">58-65</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">58-65</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">58-65</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">58-65</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">35</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">15</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">24</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">31</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">11</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">9.0</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">8.5</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">8.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">8.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">11</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">11</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">11</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">11</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">66-75</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">66-75</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">66-75</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">66-75</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">38</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">18</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">26</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">34</span></div></td>
      </tr>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-6 py-4 text-center font-bold text-black align-middle">12</td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">9.0</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">9.0</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">9.0</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">9.0</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">12</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">12</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">12</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">12</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">76-90</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">76-90</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">76-90</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">76-90</span></div></td>
        <td className="px-6 py-4 text-center align-middle"><div className="inline-grid grid-cols-2 gap-x-6 gap-y-2 text-left text-xs md:text-sm"><span className="text-gray-500">Listening:</span><span className="font-semibold text-black">42</span><span className="text-gray-500">Reading:</span><span className="font-semibold text-black">21</span><span className="text-gray-500">Writing:</span><span className="font-semibold text-black">28</span><span className="text-gray-500">Speaking:</span><span className="font-semibold text-black">37</span></div></td>
      </tr>
    </tbody>
  </table>
</div>
<p className="text-xs md:text-sm text-gray-600 -mt-4 px-1 flex items-start gap-2 mb-10">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4 mt-0.5 shrink-0 text-[#800000]"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
  <span><strong>CLB 7</strong> (Minimum) is the threshold to enter the Express Entry pool. <strong>CLB 9</strong> (Target) is the score to maximize your CRS points for an Invitation to Apply (ITA).</span>
</p>

## Our Language Test Prep Courses

As an official CELPIP partner, we specialize in computer-delivered test prep tailored for Canadian immigration. We don't just teach English; we teach test strategy. Our prep courses are specifically designed for aspiring students and professionals migrating to Canada. Explore our specialized training packages below:

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-10 not-prose">
  <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300 pt-12">
    <div className="absolute -top-3 -right-3 bg-[#800000] text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-10">Official Partner</div>
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><rect width="20" height="14" x="2" y="3" rx="2"></rect><line x1="8" x2="16" y1="21" y2="21"></line><line x1="12" x2="12" y1="17" y2="21"></line></svg>
      </span>
      <h4 className="font-bold text-black m-0 text-base">CELPIP General Prep</h4>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed mb-4 m-0">The Canadian English Language Proficiency Index Program, fully computer-delivered and recognized by IRCC.</p>
    <ul className="space-y-3 text-sm text-gray-700 list-none p-0 m-0 flex-grow">
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>100% computer-delivered test format training</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>North American accents and context mastery</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Speaking component recording strategies</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Direct mapping to Canadian Language Benchmarks</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Ideal for Express Entry & PNP applications</span>
      </li>
    </ul>
  </div>

  <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 hover:border-[#800000]/40 hover:shadow-md transition-all duration-300 pt-12">
    <div className="absolute -top-3 -right-3 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md z-10">CRS Optimization</div>
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000]/10 text-[#800000] shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M12 2v4"></path><path d="m6.2 6.2 1.4 1.4"></path><path d="M2 12h4"></path><path d="m6.2 17.8 1.4-1.4"></path><path d="M12 18v4"></path><path d="m16.2 17.8-1.4-1.4"></path><path d="M18 12h4"></path><path d="m16.2 6.2-1.4 1.4"></path></svg>
      </span>
      <h4 className="font-bold text-black m-0 text-base">Strategic Mock Tests</h4>
    </div>
    <p className="text-sm text-gray-700 leading-relaxed mb-4 m-0">Targeted prep focusing on the specific CLB thresholds needed to maximize your CRS score.</p>
    <ul className="space-y-3 text-sm text-gray-700 list-none p-0 m-0 flex-grow">
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Identify weaknesses across all 4 modules</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Targeted strategy to break CLB 9 barrier</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Time management techniques for exam day</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Detailed feedback from certified trainers</span>
      </li>
      <li className="flex items-start gap-3">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
        <span>Immigration-aligned scoring goals</span>
      </li>
    </ul>
  </div>
</div>

## Why Take a Prep Course With an Immigration Consultancy?

Most language centers focus purely on teaching English. As a professional immigration consultancy firm led by a Licensed Regulated Canadian Immigration Consultant (RCIC), Riffat H. Mohaimen (R710078), we approach language testing from an immigration perspective. Here is why that matters:

<ul className="space-y-3 my-6 not-prose">
  <li className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 transition-all">
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <div className="flex-1 min-w-0"><strong className="text-black">CRS-Aligned Strategy:</strong> We analyze your current Express Entry profile to determine exactly what CLB you need to get an ITA. If you only need CLB 8, we won't force you to over-study for CLB 10.</div>
  </li>
  <li className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 transition-all">
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <div className="flex-1 min-w-0"><strong className="text-black">Targeted Weaknesses:</strong> We identify the specific modules (Listening, Reading, Writing, Speaking) that will yield the most CRS point gains if improved.</div>
  </li>
  <li className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 transition-all">
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <div className="flex-1 min-w-0"><strong className="text-black">Avoiding Costly Retakes:</strong> Language tests are expensive. Our strategic mock tests ensure you only take the real exam when you are truly ready, saving you time and money.</div>
  </li>
  <li className="flex items-start gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-[#800000]/40 transition-all">
    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 mt-0.5">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" className="w-3 h-3"><polyline points="20 6 9 17 4 12"></polyline></svg>
    </span>
    <div className="flex-1 min-w-0"><strong className="text-black">End-to-End Integration:</strong> We seamlessly integrate your language prep with your ECA applications, Express Entry profile creation, and PR submission.</div>
  </li>
</ul>

## Official CELPIP Partner in Bangladesh

<div className="not-prose my-10 rounded-xl border-l-4 border-[#800000] bg-gray-50 p-6 md:p-8">
  <div className="flex items-start gap-4">
    <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#800000] text-white shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
    </span>
    <div className="flex-1 min-w-0">
      <h4 className="text-base font-bold text-black m-0 mb-2">Official CELPIP Partner in Bangladesh</h4>
      <p className="text-sm text-gray-700 leading-relaxed m-0 mb-4">We are proud to be an officially recognized partner of CELPIP in Bangladesh. Trust our certified trainers to guide you through the test format and help you achieve your desired CLB score.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-start">
        <a href="https://www.celpip.ca/celpip-for-agents/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#800000] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#600000] transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
          Verify Partnership
        </a>
        <a href="https://www.facebook.com/celpipbd" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-white border border-gray-300 text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          Facebook
        </a>
      </div>
    </div>
  </div>
</div>

## Frequently Asked Questions (FAQ)

<div className="not-prose my-10 space-y-3">
  <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-[#800000]/30">
    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-black list-none hover:bg-gray-50 transition-colors">
      <span className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-xs shrink-0">Q</span>
        <span className="text-sm md:text-base truncate">Which is easier, IELTS or CELPIP?</span>
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 transition-transform group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </summary>
    <div className="px-5 pb-5 pl-16">
      <p className="text-sm text-gray-700 leading-relaxed m-0">It depends on your strengths. If you prefer face-to-face interactions and are used to British/Australian contexts, IELTS might feel easier. If you are fast at typing, comfortable with computers, and familiar with North American accents, CELPIP is often considered easier.</p>
    </div>
  </details>
  <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-[#800000]/30">
    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-black list-none hover:bg-gray-50 transition-colors">
      <span className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-xs shrink-0">Q</span>
        <span className="text-sm md:text-base truncate">What IELTS score is required for Canada PR?</span>
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 transition-transform group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </summary>
    <div className="px-5 pb-5 pl-16">
      <p className="text-sm text-gray-700 leading-relaxed m-0">There is no single passing score. To enter the Express Entry pool, you need a minimum of CLB 7 (IELTS 6.0 in each band). However, to receive an ITA, you generally need CLB 9 (IELTS Listening 8.0, Reading 7.0, Writing 7.0, Speaking 7.0) to maximize your points, though program-specific draws sometimes accept lower scores.</p>
    </div>
  </details>
  <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-[#800000]/30">
    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-black list-none hover:bg-gray-50 transition-colors">
      <span className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-xs shrink-0">Q</span>
        <span className="text-sm md:text-base truncate">Can I apply for Express Entry without IELTS?</span>
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 transition-transform group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </summary>
    <div className="px-5 pb-5 pl-16">
      <p className="text-sm text-gray-700 leading-relaxed m-0">No, you cannot apply for Express Entry without proof of language proficiency. However, you can take the CELPIP General test instead of IELTS, or prove French proficiency via TEF/TCF exams.</p>
    </div>
  </details>
  <details className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all hover:border-[#800000]/30">
    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 font-semibold text-black list-none hover:bg-gray-50 transition-colors">
      <span className="flex items-center gap-3 min-w-0">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#800000] text-white font-bold text-xs shrink-0">Q</span>
        <span className="text-sm md:text-base truncate">How long are IELTS and CELPIP scores valid for IRCC?</span>
      </span>
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#800000]/10 text-[#800000] shrink-0 transition-transform group-open:rotate-180">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </summary>
    <div className="px-5 pb-5 pl-16">
      <p className="text-sm text-gray-700 leading-relaxed m-0">Both IELTS and CELPIP test results are valid for exactly two years from the date of the test. If your scores expire before you receive an ITA, you will need to retake the test and update your Express Entry profile.</p>
    </div>
  </details>
</div>

## Conclusion: Maximize Your CRS Score Today

Navigating language test requirements can be confusing, especially when your CRS score depends entirely on hitting specific CLB thresholds. A lower-than-required score can delay your Express Entry ITA by months. As an RCIC, I ensure your prep strategy is optimized for the exact points you need, maximizing your chances of success.

<div className="not-prose my-12">
  <div className="bg-gradient-to-br from-[#3b0a0a] via-[#7f1d1d] to-[#3b0a0a] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-xl">
    <div className="absolute inset-0 opacity-10 [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.15)_0,rgba(255,255,255,0.15)_1px,transparent_0,transparent_50%)] [background-size:12pxx12px]" aria-hidden="true"></div>
    <div className="relative z-10">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">IELTS & CELPIP Assessment</p>
      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6 leading-tight">Ready to Maximize Your CRS Score?</h3>
      <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">Stop guessing about CLB 9 thresholds, IELTS vs CELPIP format, and CRS point optimization. Get your language profile assessed by a licensed RCIC and align your test prep with your immigration goals.</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <a href="https://riffathmohaimen.setmore.com/" target="_blank" rel="noopener noreferrer" aria-label="Book a consultation" className="inline-flex items-center justify-center bg-white text-[#800000] hover:bg-white/90 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
          Book Consultation
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="w-5 h-5 ml-2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </a>
        <a href="/contact" aria-label="Contact us" className="inline-flex items-center justify-center bg-transparent border border-white/60 text-white hover:bg-white/10 rounded-full font-bold text-base px-10 h-12 hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
          Contact Us
        </a>
      </div>
    </div>
  </div>
</div>
  `,
};

export default function LanguageCoursePage() {
  useEffect(() => {
    const testTypeEl = document.getElementById("clb-test-type") as HTMLSelectElement | null;
    const lEl = document.getElementById("clb-listening") as HTMLInputElement | null;
    const rEl = document.getElementById("clb-reading") as HTMLInputElement | null;
    const wEl = document.getElementById("clb-writing") as HTMLInputElement | null;
    const sEl = document.getElementById("clb-speaking") as HTMLInputElement | null;
    const resultEl = document.getElementById("clb-result");

    if (!testTypeEl || !lEl || !rEl || !wEl || !sEl || !resultEl) return;

    const getIeltsClb = (band: string, score: number): number => {
      if (band === "L") {
        if (score >= 9.0) return 12;
        if (score >= 8.5) return 10;
        if (score >= 8.0) return 9;
        if (score >= 7.5) return 8;
        if (score >= 6.0) return 7;
        if (score >= 5.5) return 6;
        if (score >= 5.0) return 5;
        if (score >= 4.5) return 4;
        return 0;
      }
      if (band === "R") {
        if (score >= 9.0) return 12;
        if (score >= 8.5) return 11;
        if (score >= 8.0) return 10;
        if (score >= 7.0) return 9;
        if (score >= 6.5) return 8;
        if (score >= 6.0) return 7;
        if (score >= 5.0) return 6;
        if (score >= 4.0) return 5;
        if (score >= 3.5) return 4;
        return 0;
      }
      if (band === "W") {
        if (score >= 9.0) return 12;
        if (score >= 8.0) return 11;
        if (score >= 7.5) return 10;
        if (score >= 7.0) return 9;
        if (score >= 6.5) return 8;
        if (score >= 6.0) return 7;
        if (score >= 5.5) return 6;
        if (score >= 5.0) return 5;
        if (score >= 4.0) return 4;
        return 0;
      }
      if (band === "S") {
        if (score >= 9.0) return 12;
        if (score >= 8.0) return 11;
        if (score >= 7.5) return 10;
        if (score >= 7.0) return 9;
        if (score >= 6.5) return 8;
        if (score >= 6.0) return 7;
        if (score >= 5.5) return 6;
        if (score >= 5.0) return 5;
        if (score >= 4.0) return 4;
        return 0;
      }
      return 0;
    };

    const getToeflClb = (band: string, score: number): number => {
      if (band === "L") {
        if (score >= 32) return 12;
        if (score >= 31) return 11;
        if (score >= 29) return 10;
        if (score >= 27) return 9;
        if (score >= 25) return 8;
        if (score >= 23) return 7;
        if (score >= 19) return 6;
        if (score >= 15) return 5;
        if (score >= 7) return 4;
      }
      if (band === "R") {
        if (score >= 26) return 12;
        if (score >= 25) return 11;
        if (score >= 23) return 10;
        if (score >= 21) return 9;
        if (score >= 19) return 8;
        if (score >= 15) return 7;
        if (score >= 12) return 6;
        if (score >= 7) return 5;
        if (score >= 4) return 4;
      }
      if (band === "W") {
        if (score >= 28) return 12;
        if (score >= 27) return 11;
        if (score >= 23) return 10;
        if (score >= 21) return 9;
        if (score >= 19) return 8;
        if (score >= 17) return 7;
        if (score >= 15) return 6;
        if (score >= 12) return 5;
        if (score >= 7) return 4;
      }
      if (band === "S") {
        if (score >= 25) return 12;
        if (score >= 23) return 10;
        if (score >= 21) return 9;
        if (score >= 19) return 8;
        if (score >= 17) return 7;
        if (score >= 15) return 6;
        if (score >= 9) return 5;
        if (score >= 7) return 4;
      }
      return 0;
    };

    const getPteClb = (band: string, score: number): number => {
      const ranges: Record<string, [number, number, number][]> = {
        L: [[76,90,12],[66,75,11],[58,65,10],[50,57,9],[42,49,8],[35,41,7],[29,34,6],[22,28,5],[14,21,4]],
        R: [[76,90,12],[66,75,11],[58,65,10],[51,57,9],[44,50,8],[37,43,7],[30,36,6],[23,29,5],[15,22,4]],
        W: [[76,90,12],[66,75,11],[58,65,10],[51,57,9],[45,50,8],[38,44,7],[32,37,6],[26,31,5],[18,25,4]],
        S: [[76,90,12],[66,75,11],[58,65,10],[51,57,9],[42,50,8],[35,41,7],[29,34,6],[23,28,5],[15,22,4]]
      };
      for (const [min, max, clb] of ranges[band]) {
        if (score >= min && score <= max) return clb;
      }
      return 0;
    };

    const calculate = () => {
      const test = testTypeEl.value;
      const lScore = parseFloat(lEl.value);
      const rScore = parseFloat(rEl.value);
      const wScore = parseFloat(wEl.value);
      const sScore = parseFloat(sEl.value);

      if (isNaN(lScore) && isNaN(rScore) && isNaN(wScore) && isNaN(sScore)) {
        resultEl.innerHTML = '<span className="text-gray-400 text-sm">Your CLB levels will appear here.</span>';
        return;
      }

      let clbL = 0, clbR = 0, clbW = 0, clbS = 0;

      if (test === "ielts") {
        clbL = isNaN(lScore) ? 0 : getIeltsClb("L", lScore);
        clbR = isNaN(rScore) ? 0 : getIeltsClb("R", rScore);
        clbW = isNaN(wScore) ? 0 : getIeltsClb("W", wScore);
        clbS = isNaN(sScore) ? 0 : getIeltsClb("S", sScore);
      } else if (test === "celpip") {
        clbL = isNaN(lScore) ? 0 : Math.floor(lScore);
        clbR = isNaN(rScore) ? 0 : Math.floor(rScore);
        clbW = isNaN(wScore) ? 0 : Math.floor(wScore);
        clbS = isNaN(sScore) ? 0 : Math.floor(sScore);
      } else if (test === "pte") {
        clbL = isNaN(lScore) ? 0 : getPteClb("L", lScore);
        clbR = isNaN(rScore) ? 0 : getPteClb("R", rScore);
        clbW = isNaN(wScore) ? 0 : getPteClb("W", wScore);
        clbS = isNaN(sScore) ? 0 : getPteClb("S", sScore);
      } else if (test === "toefl") {
        clbL = isNaN(lScore) ? 0 : getToeflClb("L", lScore);
        clbR = isNaN(rScore) ? 0 : getToeflClb("R", rScore);
        clbW = isNaN(wScore) ? 0 : getToeflClb("W", wScore);
        clbS = isNaN(sScore) ? 0 : getToeflClb("S", sScore);
      }

      const validScores = [clbL, clbR, clbW, clbS].filter(s => s > 0);
      const minClb = validScores.length > 0 ? Math.min(...validScores) : 0;

      const getCardClass = (clb: number) => {
        if (clb >= 9) return "border-emerald-200 bg-emerald-50";
        if (clb >= 7) return "border-indigo-200 bg-indigo-50";
        if (clb > 0) return "border-gray-200 bg-white";
        return "border-gray-200 bg-gray-50";
      };

      const getScoreClass = (clb: number) => {
        if (clb >= 9) return "text-emerald-600";
        if (clb >= 7) return "text-indigo-600";
        return "text-gray-800";
      };

      const getBadgeClass = (clb: number) => {
        if (clb >= 9) return "bg-emerald-100 text-emerald-700";
        if (clb >= 7) return "bg-indigo-100 text-indigo-700";
        if (clb > 0) return "bg-gray-100 text-gray-700";
        return "bg-gray-100 text-gray-400";
      };

      const formatScore = (s: number) => (s > 0 ? s.toString() : "-");

      resultEl.innerHTML = `
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="relative flex flex-col items-center justify-center p-4 border rounded-xl ${getCardClass(clbL)}">
            <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">Listening</span>
            <span className="text-4xl font-extrabold ${getScoreClass(clbL)}">${formatScore(clbL)}</span>
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${getBadgeClass(clbL)}">CLB ${clbL > 0 ? clbL : 'N/A'}</span>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4 border rounded-xl ${getCardClass(clbR)}">
            <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">Reading</span>
            <span className="text-4xl font-extrabold ${getScoreClass(clbR)}">${formatScore(clbR)}</span>
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${getBadgeClass(clbR)}">CLB ${clbR > 0 ? clbR : 'N/A'}</span>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4 border rounded-xl ${getCardClass(clbW)}">
            <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">Writing</span>
            <span className="text-4xl font-extrabold ${getScoreClass(clbW)}">${formatScore(clbW)}</span>
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${getBadgeClass(clbW)}">CLB ${clbW > 0 ? clbW : 'N/A'}</span>
          </div>
          <div className="relative flex flex-col items-center justify-center p-4 border rounded-xl ${getCardClass(clbS)}">
            <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-medium">Speaking</span>
            <span className="text-4xl font-extrabold ${getScoreClass(clbS)}">${formatScore(clbS)}</span>
            <span className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${getBadgeClass(clbS)}">CLB ${clbS > 0 ? clbS : 'N/A'}</span>
          </div>
        </div>
        ${minClb > 0 ? `
          <div className="mt-6 pt-4 border-t border-gray-200 w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Effective CLB Level for Express Entry:</span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold ${getBadgeClass(minClb)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
              CLB ${minClb}
            </span>
          </div>
        ` : ''}
      `;
    };

    testTypeEl.addEventListener("change", calculate);
    lEl.addEventListener("input", calculate);
    rEl.addEventListener("input", calculate);
    wEl.addEventListener("input", calculate);
    sEl.addEventListener("input", calculate);

    return () => {
      testTypeEl.removeEventListener("change", calculate);
      lEl.removeEventListener("input", calculate);
      rEl.removeEventListener("input", calculate);
      wEl.removeEventListener("input", calculate);
      sEl.removeEventListener("input", calculate);
    };
  }, []);

  return <BlogLayout post={postData} />;
}