/**
 * @license
 * © 2026 Dr. Mohamed Samir Hassan, MSc, PhD R. All rights reserved.
 * 
 * This code is part of the technical challenge submission for the position of
 * AI and Innovation Manager. Unauthorized copying, modification, distribution,
 * or use of this source code or any portion of it without the express written
 * permission of Dr. Mohamed Samir Hassan is strictly prohibited.
 * 
 * Digital Signature / Verification: mohamedsamirhassan-portfolio-verification-2026
 */

"use client";

import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative overflow-hidden text-white font-prompt">
        {/* Background Decorative Orbs */}
        <div className="orb w-[500px] h-[500px] bg-[var(--primary-600)] top-[-100px] left-[-200px] opacity-20 pointer-events-none" />
        <div className="orb w-[400px] h-[400px] bg-[#0099ad] bottom-[-100px] right-[-150px] opacity-15 pointer-events-none" style={{ animationDelay: "4s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          
          {/* Page Title Header */}
          <div className="mb-12 border-b border-[rgba(255,255,255,0.06)] pb-8 fade-in">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-3">About Me</h1>
            <p className="text-[var(--neutral-400)] text-lg max-w-3xl leading-relaxed">
              Dr. Mohamed Samir Hassan — Principal AI Solutions Architect, PhD Researcher, and Metaverse Expert.
            </p>
          </div>

          {/* Two-Column Grid */}
          <div className="grid lg:grid-cols-12 gap-10">

            {/* Left Column (Stats, Links, Education, Languages) */}
            <div className="lg:col-span-4 space-y-8 fade-in" style={{ animationDelay: "0.1s" }}>
              
              {/* Profile Card */}
              <div className="glass rounded-3xl p-6 border border-[rgba(0,153,173,0.15)] flex flex-col items-center text-center">
                <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-[var(--primary-400)] shadow-lg mb-5 group">
                  <img 
                    src="/profile-pic.png" 
                    alt="Dr. Mohamed Samir Hassan" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                  />
                </div>
                <h2 className="text-xl font-bold text-white leading-tight">Dr. Mohamed Samir Hassan</h2>
                <p className="text-xs text-[var(--primary-300)] font-semibold mt-1">MSc, PhD Researcher</p>
                <p className="text-xs text-[var(--neutral-400)] mt-2 italic px-4 leading-relaxed">
                  "Building intelligent, scalable AI systems & immersive environments that bridge research with real-world impact."
                </p>

                {/* Info Pills */}
                <div className="grid grid-cols-2 gap-3 w-full mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-3 flex flex-col items-center">
                    <span className="text-lg font-bold text-white">12+</span>
                    <span className="text-[10px] text-[var(--neutral-400)] uppercase font-semibold">Years Exp</span>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-2xl p-3 flex flex-col items-center">
                    <span className="text-lg font-bold text-white">21+</span>
                    <span className="text-[10px] text-[var(--neutral-400)] uppercase font-semibold">GitHub Repos</span>
                  </div>
                </div>
              </div>

              {/* Connect & Contact Card */}
              <div className="glass rounded-3xl p-6 border border-[rgba(0,153,173,0.1)] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  Connect & Contact
                </h3>
                <div className="space-y-2.5 text-sm">
                  <a href="mailto:SamirPhD@outlook.com" className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <span className="text-xs text-[var(--primary-400)]">✉</span>
                    <span className="truncate">SamirPhD@outlook.com</span>
                  </a>
                  <a href="https://github.com/MohamedSamirHassanPhD" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <span className="text-xs text-[var(--primary-400)]">🐙</span>
                    <span>MohamedSamirHassanPhD</span>
                  </a>
                  <a href="https://www.linkedin.com/in/mohamedsamirhassan/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <span className="text-xs text-[var(--primary-400)]">🔗</span>
                    <span>LinkedIn Profile</span>
                  </a>
                  <a href="https://www.artstation.com/msamiir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <span className="text-xs text-[var(--primary-400)]">🎨</span>
                    <span>ArtStation Portfolio</span>
                  </a>
                  <a href="https://www.researchgate.net/profile/Mohamed-Samir-Hassan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.05)] transition-all">
                    <span className="text-xs text-[var(--primary-400)]">🔬</span>
                    <span>ResearchGate profile</span>
                  </a>
                </div>
              </div>

              {/* Education Card */}
              <div className="glass rounded-3xl p-6 border border-[rgba(0,153,173,0.1)] space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                  </svg>
                  Education
                </h3>
                <div className="space-y-4 text-sm relative border-l border-[rgba(255,255,255,0.08)] pl-4 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[var(--primary-400)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--primary-300)] font-bold">2024 – Present</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">PhD Researcher in AI Immersive Solutions</h4>
                    <p className="text-[11px] text-[var(--neutral-400)]">Faculty of Computers & AI, Helwan University</p>
                    <p className="text-[11px] text-[var(--primary-400)] mt-1 font-medium">Research: MSHR++ (SLMs + Task-Ready Networks for multi-agent routing)</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-500)] font-bold">2016 – 2024</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">Master’s in 3D Mesh Compression & AI</h4>
                    <p className="text-[11px] text-[var(--neutral-400)]">Helwan University</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-500)] font-bold">2013 – 2015</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">Postgraduate Diploma in Computer Science</h4>
                    <p className="text-[11px] text-[var(--neutral-400)]">Menoufia University</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-500)] font-bold">2009 – 2013</span>
                    <h4 className="font-bold text-white text-xs mt-0.5">Bachelor’s in Information Systems</h4>
                    <p className="text-[11px] text-[var(--neutral-400)]">Egyptian Academy of Computers & IS</p>
                  </div>
                </div>
              </div>

              {/* Languages Card */}
              <div className="glass rounded-3xl p-6 border border-[rgba(0,153,173,0.1)] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Languages
                </h3>
                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-2.5">
                    <p className="font-semibold text-white">Arabic</p>
                    <p className="text-[10px] text-[var(--neutral-400)] mt-1">Native</p>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-2.5">
                    <p className="font-semibold text-white">English</p>
                    <p className="text-[10px] text-[var(--neutral-400)] mt-1">Advanced</p>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] rounded-xl p-2.5">
                    <p className="font-semibold text-white">German</p>
                    <p className="text-[10px] text-[var(--neutral-400)] mt-1">Beginner</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (Experience, Skills, Certifications, Awards) */}
            <div className="lg:col-span-8 space-y-8 fade-in" style={{ animationDelay: "0.2s" }}>
              
              {/* Summary Card */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(0,153,173,0.1)]">
                <h3 className="text-xl font-bold mb-4 font-prompt text-white">Professional Summary</h3>
                <p className="text-sm text-[var(--foreground)] leading-relaxed">
                  Innovative **AI Engineer, AI Solution Architect, and AI Project Manager** with over **12 years of international experience** building intelligent, scalable AI systems. Expertise spans Machine Learning, LLMs & Agentic AI, Computer Vision, Cloud DevOps architectures, 3D Metaverse engines, VR/AR simulation systems, and complex automation workflows. Successfully brought numerous research-level architectures to market as stable commercial software products.
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(0,153,173,0.1)] space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                  Professional Experience
                </h3>
                <div className="relative border-l border-[rgba(255,255,255,0.08)] pl-6 space-y-8 ml-2">
                  
                  {/* Job 1 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--primary-500)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--primary-300)] font-bold">Jul 2025 – Oct 2025</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Application Analyst & AI Lead — StaffDocs (USA, Remote)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Built AI pipelines for provider scoring, NPI matching, classification, and compliance checks.</li>
                      <li>Processed large national datasets &gt;10GB using Python, Azure ML, and Pandas.</li>
                      <li>Developed and deployed FastAPI forecasting modules integrated via Azure Functions.</li>
                      <li>Led smooth IT/data migrations from Zoho CRM to Microsoft 365.</li>
                    </ul>
                  </div>

                  {/* Job 2 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--primary-500)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--primary-300)] font-bold">May 2024 – Jul 2025</span>
                    <h4 className="text-base font-bold text-white mt-0.5">AI Project Manager | Solutions Architect | Technical Supervisor — VEEM Solutions (Saudi Arabia)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Designed and architected enterprise-level AI applications in image, voice, and text processing.</li>
                      <li>Successfully shipped platforms: <strong className="text-white">Vminds.ai</strong>, <strong className="text-white">Dualize.ai</strong>, <strong className="text-white">GlassHub</strong>, <strong className="text-white">Oqail Agent</strong>, <strong className="text-white">PixiCamel</strong>, <strong className="text-white">Fahy Game</strong>, and <strong className="text-white">Shrwd.ai</strong>.</li>
                      <li>Integrated cutting-edge AI toolsets: LangChain, Azure OpenAI, Qwen-VL, FastAPI, and Docker containerizations.</li>
                      <li>Built and launched 15+ multimodal processing utilities.</li>
                    </ul>
                  </div>

                  {/* Job 3 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-400)] font-bold">Apr 2024 – Nov 2024</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Lead Solutions Architect & Team Leader — AVR Labs (UAE)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Directed VR/AR game development pipelines focused on immersive training, education, and simulation.</li>
                      <li>Led cross-functional developer teams and optimized 3D graphics compilation performance.</li>
                    </ul>
                  </div>

                  {/* Job 4 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-400)] font-bold">Nov 2023 – Apr 2024</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Lead 3D Metaverse Expert — VVERSE (UAE)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Designed comprehensive Metaverse ecosystems and customized automated 3D rendering pipelines.</li>
                    </ul>
                  </div>

                  {/* Job 5 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-400)] font-bold">Sep 2022 – Nov 2023</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Technical Director — MOJOMOTO (Denmark)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Supervised production pipelines for AR/NFT digital fashion applications and Web3 decentralized platforms.</li>
                    </ul>
                  </div>

                  {/* Job 6 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-400)] font-bold">2021 – 2022</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Lead 3D Artist — Simservices GmbH (Germany)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Built hyper-realistic, highly optimized VR flight simulator environments using Unreal Engine.</li>
                    </ul>
                  </div>

                  {/* Job 7 */}
                  <div className="relative">
                    <div className="absolute -left-[29px] top-1.5 w-3 h-3 rounded-full bg-[var(--neutral-700)] border border-[var(--neutral-950)]" />
                    <span className="text-[10px] text-[var(--neutral-400)] font-bold">2018 – 2021</span>
                    <h4 className="text-base font-bold text-white mt-0.5">Founder & CEO — TICONERS (Egypt)</h4>
                    <ul className="text-xs text-[var(--neutral-300)] mt-2 list-disc list-inside space-y-1.5 leading-relaxed pl-1">
                      <li>Bootstrapped a product studio creating VR/AR mobile applications and hologram educational kiosks.</li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Technical Skills */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(0,153,173,0.1)] space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                  </svg>
                  Technical Skills Matrix
                </h3>
                <div className="space-y-4">
                  {[
                    { cat: "Programming & Math", items: ["Python", "C#", "JavaScript", "TypeScript", "Dart", "SQL", "MATLAB"] },
                    { cat: "AI, ML & Agents", items: ["PyTorch", "TensorFlow", "Scikit-learn", "HuggingFace", "LangChain", "RAG", "Agent Pipelines"] },
                    { cat: "Immersive & 3D", items: ["VR/AR/XR Development", "Unreal Engine", "Unity", "3D Studio Max", "Blender", "Holograms"] },
                    { cat: "Cloud & Data", items: ["Azure ML", "Azure AI Foundry", "Docker", "ETL Pipelines", "GitHub Actions", "FastAPI"] },
                    { cat: "Project & Product Strategy", items: ["Agile Management", "Scrum", "Team Leadership", "Risk Assessment", "Product Roadmaps"] },
                  ].map((group) => (
                    <div key={group.cat} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-[rgba(255,255,255,0.04)] pb-3 last:border-0 last:pb-0">
                      <span className="text-xs font-bold text-white w-48 shrink-0">{group.cat}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((skill) => (
                          <span key={skill} className="text-[10px] px-2 py-1 rounded bg-[rgba(0,153,173,0.1)] text-[var(--primary-300)] border border-[rgba(0,153,173,0.15)] font-semibold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications List */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(0,153,173,0.1)] space-y-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Selected & Verified Certifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-xs">
                  {[
                    { title: "Google AI Essentials", issuer: "Google (2025)" },
                    { title: "Azure AI Essentials: Workloads & ML", issuer: "Microsoft (2025)" },
                    { title: "Agentic AI & AI Agents Primer", issuer: "Vanderbilt University (2025)" },
                    { title: "Initiating and Planning Projects", issuer: "UC Irvine (2025)" },
                    { title: "Digital Product Management Specialization", issuer: "University of Virginia (2025)" },
                    { title: "Agile Project Management", issuer: "Google (2024)" },
                    { title: "AI-Powered Product Building", issuer: "IBM / SkillUp EdTech (2024)" },
                    { title: "Data Science and AI for Healthcare", issuer: "NASBA (2025)" },
                  ].map((cert) => (
                    <div key={cert.title} className="p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] flex flex-col justify-center">
                      <p className="font-semibold text-white">{cert.title}</p>
                      <p className="text-[10px] text-[var(--primary-400)] mt-1 font-medium">{cert.issuer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards Card */}
              <div className="glass rounded-3xl p-6 sm:p-8 border border-[rgba(0,153,173,0.1)] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--neutral-400)] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[var(--primary-400)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  Awards & Achievements
                </h3>
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)] rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                    <span className="font-bold text-[#10b981] mb-1">1st Place</span>
                    <span className="text-[10px] text-[var(--neutral-400)]">National Programming Competition, Egypt</span>
                  </div>
                  <div className="bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)] rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                    <span className="font-bold text-[#a5b4fc] mb-1">Best AI Solution</span>
                    <span className="text-[10px] text-[var(--neutral-400)]">VEEM Solutions (2024)</span>
                  </div>
                  <div className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.1)] rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                    <span className="font-bold text-[#fbbf24] mb-1">Conference Winner</span>
                    <span className="text-[10px] text-[var(--neutral-400)]">Springer ITAF VR Mesh Compression</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  );
}
