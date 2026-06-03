import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

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
                <span className="gradient-text">Samir Hassan</span>
              </h1>

              <h2 className="text-2xl font-semibold text-[var(--primary-300)] mb-6 font-prompt">
                Innovation Manager & Full Stack Developer
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
                  <div className="glass-light p-4 rounded-xl">
                    <div className="text-[var(--primary-400)] text-2xl mb-2">🤖</div>
                    <div className="font-bold text-white mb-1 font-prompt">AI Triage</div>
                    <div className="text-xs text-[var(--foreground)]">Auto-categorizes issues using NLP</div>
                  </div>
                  <div className="glass-light p-4 rounded-xl">
                    <div className="text-[var(--primary-400)] text-2xl mb-2">⚡</div>
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
              </div>

              <div className="relative rounded-2xl overflow-hidden glass border border-[rgba(255,255,255,0.1)] shadow-2xl aspect-[4/3]">
                {/* Mockup UI representation */}
                <div className="absolute top-0 w-full h-8 bg-[var(--neutral-900)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 opacity-80"></div>
                </div>
                <div className="pt-8 p-6 h-full bg-[var(--neutral-950)] flex flex-col">
                  <div className="h-10 w-48 bg-[rgba(255,255,255,0.05)] rounded-lg mb-8 animate-pulse"></div>
                  <div className="flex gap-4 mb-6">
                    <div className="h-24 flex-1 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)]"></div>
                    <div className="h-24 flex-1 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)]"></div>
                    <div className="h-24 flex-1 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)]"></div>
                  </div>
                  <div className="flex-1 bg-[rgba(255,255,255,0.02)] rounded-xl border border-[rgba(255,255,255,0.05)] p-4">
                    <div className="h-6 w-32 bg-[rgba(255,255,255,0.05)] rounded mb-4"></div>
                    <div className="space-y-3">
                      <div className="h-12 w-full bg-[rgba(255,255,255,0.03)] rounded flex items-center px-4">
                        <div className="h-4 w-4 rounded-full bg-green-500 mr-4"></div>
                        <div className="h-3 w-1/3 bg-[rgba(255,255,255,0.05)] rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-[rgba(255,255,255,0.03)] rounded flex items-center px-4">
                        <div className="h-4 w-4 rounded-full bg-yellow-500 mr-4"></div>
                        <div className="h-3 w-1/2 bg-[rgba(255,255,255,0.05)] rounded"></div>
                      </div>
                      <div className="h-12 w-full bg-[rgba(255,255,255,0.03)] rounded flex items-center px-4">
                        <div className="h-4 w-4 rounded-full bg-red-500 mr-4"></div>
                        <div className="h-3 w-1/4 bg-[rgba(255,255,255,0.05)] rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[rgba(0,153,173,0.1)] py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[var(--neutral-500)]">
              © {new Date().getFullYear()} Mohamed Samir Hassan
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
