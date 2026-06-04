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

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import InteractiveDemo from "@/components/InteractiveDemo";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Background Orbs matching Adeer Gold/Navy identity */}
        <div className="orb w-[500px] h-[500px] bg-[var(--primary-600)] top-[-200px] left-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-[#0099ad] bottom-[-150px] right-[-100px]" style={{ animationDelay: "5s" }} />
        <div className="orb w-[300px] h-[300px] bg-[#e0f6f8] top-[40%] left-[60%]" style={{ animationDelay: "10s" }} />

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-[var(--primary-300)] mb-8">
                <span className="w-2 h-2 rounded-full bg-[var(--primary-400)] animate-pulse" />
                Available for Innovation & Leadership Roles
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 font-prompt">
                <span className="text-white">Mohamed </span>
                <span className="gradient-text">Samir Hassan, MSc, PhD R</span>
              </h1>

              <h2 className="text-2xl font-semibold text-[var(--primary-300)] mb-6 font-prompt">
                AI and innovation manager
              </h2>

              <p className="text-lg text-[var(--foreground)] max-w-2xl mb-10 leading-relaxed">
                Bridging the gap between cutting-edge technology and real estate innovation. 
                Specializing in building AI-powered platforms, robust system architectures, and 
                premium digital experiences that drive operational excellence.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] text-white font-semibold text-base hover:from-[var(--primary-500)] hover:to-[var(--primary-400)] transition-all duration-300 shadow-lg shadow-[rgba(0,153,173,0.3)] hover:shadow-[rgba(0,153,173,0.5)] hover:-translate-y-0.5 text-center font-prompt"
                >
                  View Featured Projects
                </a>
                <a
                  href="https://www.linkedin.com/in/mohamedsamirhassan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl glass text-white font-semibold text-base hover:bg-[rgba(255,255,255,0.08)] hover:text-[var(--link-hover)] transition-all duration-300 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2 font-prompt"
                >
                  <span>Connect on LinkedIn</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md relative fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative aspect-square rounded-3xl overflow-hidden glass p-2 border border-[rgba(0,153,173,0.3)] glow-primary">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                   <Image 
                     src="/profile-pic.png" 
                     alt="Mohamed Samir Hassan" 
                     fill 
                     className="object-cover hover:scale-105 transition-all duration-500" 
                   />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Projects / Portfolio Section */}
        <section id="projects" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 pt-12">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-prompt">Featured Innovation</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[var(--primary-500)] to-transparent rounded-full"></div>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
            {/* Project background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[rgba(0,153,173,0.15)] to-transparent rounded-bl-full pointer-events-none transition-opacity duration-500 opacity-50 group-hover:opacity-100" />
            
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[rgba(16,185,129,0.1)] text-[#10b981] border border-[rgba(16,185,129,0.2)] text-xs font-bold uppercase tracking-wide mb-6 font-prompt">
                  Live Prototype
                </div>
                
                <h3 className="text-3xl font-extrabold text-white mb-4 font-prompt">
                  AI-Powered Property Maintenance Portal
                </h3>
                
                <p className="text-[var(--foreground)] text-lg mb-8 leading-relaxed">
                  A next-generation facility management platform built for modern real estate portfolios. 
                  Leveraging Google's Gemini AI, this system automatically classifies, prioritizes, and routes tenant 
                  maintenance requests—dramatically reducing operational overhead and improving response times.

                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="glass-light p-4 rounded-xl flex flex-col items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="url(#primary-gradient)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 mb-2"
                    >
                      <defs>
                        <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary-400)" />
                          <stop offset="100%" stopColor="var(--primary-200)" />
                        </linearGradient>
                      </defs>
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                      <path d="M12 5v14" />
                      <path d="M12 9h4a2 2 0 0 0 2-2v0" />
                      <path d="M12 15h4a2 2 0 0 1 2 2v0" />
                      <path d="M12 9H8a2 2 0 0 1-2-2v0" />
                      <path d="M12 15H8a2 2 0 0 0-2 2v0" />
                    </svg>
                    <div className="font-bold text-white mb-1 font-prompt">AI Triage</div>
                    <div className="text-xs text-[var(--foreground)]">Auto-categorizes issues using NLP</div>
                  </div>
                  <div className="glass-light p-4 rounded-xl flex flex-col items-start">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="url(#primary-gradient-2)" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-6 h-6 mb-2"
                    >
                      <defs>
                        <linearGradient id="primary-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="var(--primary-400)" />
                          <stop offset="100%" stopColor="var(--primary-200)" />
                        </linearGradient>
                      </defs>
                      <circle cx="6" cy="19" r="3" />
                      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
                      <circle cx="18" cy="5" r="3" />
                      <path d="M14 8l3-3-3-3" />
                    </svg>
                    <div className="font-bold text-white mb-1 font-prompt">Smart Routing</div>
                    <div className="text-xs text-[var(--foreground)]">Assigns directly to the right provider</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 font-prompt">
                  <Link
                    href="/submit"
                    className="flex-1 px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-[var(--primary-50)] transition-colors text-center shadow-lg hover:-translate-y-0.5"
                  >
                    Test Tenant Portal
                  </Link>
                  <Link
                    href="/dashboard"
                    className="flex-1 px-6 py-3 rounded-xl glass border border-[var(--primary-500)] text-white font-bold hover:bg-[rgba(0,153,173,0.1)] transition-colors text-center hover:-translate-y-0.5"
                  >
                    Admin Dashboard
                  </Link>
                </div>
                           <InteractiveDemo />   </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[rgba(0,153,173,0.1)] py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[var(--neutral-500)]">
              © {new Date().getFullYear()} Mohamed Samir Hassan, MSc, PhD R
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--neutral-500)]">
              <a href="https://www.linkedin.com/in/mohamedsamirhassan/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary-400)] transition-colors">
                LinkedIn Profile
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
