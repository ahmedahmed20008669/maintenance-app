import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 relative overflow-hidden">
        {/* Background Orbs */}
        <div className="orb w-[500px] h-[500px] bg-[var(--primary-600)] top-[-200px] left-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-[#a78bfa] bottom-[-150px] right-[-100px]" style={{ animationDelay: "5s" }} />
        <div className="orb w-[300px] h-[300px] bg-[#f472b6] top-[40%] left-[60%]" style={{ animationDelay: "10s" }} />

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-[var(--primary-300)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--primary-400)] animate-pulse" />
              AI-Powered Property Management
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">Smart </span>
              <span className="gradient-text">Maintenance</span>
              <br />
              <span className="text-white">Made Simple</span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--neutral-400)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Automate tenant requests with AI-powered classification,
              intelligent prioritization, and seamless coordination between
              tenants, managers, and service providers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/submit"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] text-white font-semibold text-base hover:from-[var(--primary-500)] hover:to-[var(--primary-400)] transition-all duration-300 shadow-lg shadow-[rgba(99,102,241,0.3)] hover:shadow-[rgba(99,102,241,0.5)] hover:-translate-y-0.5 text-center"
              >
                Submit a Request
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl glass text-white font-semibold text-base hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 text-center"
              >
                Operations Dashboard →
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🤖",
                title: "AI Classification",
                description:
                  "Natural language processing automatically categorizes and prioritizes every maintenance request with precision.",
                delay: "0s",
              },
              {
                icon: "⚡",
                title: "Instant Routing",
                description:
                  "Requests are intelligently routed to the right service provider based on category, severity, and availability.",
                delay: "0.1s",
              },
              {
                icon: "📊",
                title: "Real-Time Dashboard",
                description:
                  "Comprehensive operations view with live status tracking, priority indicators, and actionable insights.",
                delay: "0.2s",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-8 card-hover fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <span className="text-4xl mb-5 block">{feature.icon}</span>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--neutral-400)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <div className="glass rounded-2xl p-8 sm:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "95%", label: "Faster Classification" },
                { value: "60%", label: "Cost Reduction" },
                { value: "24/7", label: "Availability" },
                { value: "4.9★", label: "Tenant Satisfaction" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--neutral-400)] font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Describe",
                desc: "Tenant describes the issue in plain language — no forms to fill.",
              },
              {
                step: "02",
                title: "Classify",
                desc: "AI instantly analyzes, categorizes, and assigns a priority score.",
              },
              {
                step: "03",
                title: "Route",
                desc: "The request is routed to the right team or service provider.",
              },
              {
                step: "04",
                title: "Resolve",
                desc: "Track progress with real-time updates until resolution.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass rounded-2xl p-6 card-hover relative group"
              >
                <div className="text-[var(--primary-500)] text-xs font-bold mb-3 tracking-widest">
                  STEP {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--neutral-400)] leading-relaxed">
                  {item.desc}
                </p>
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[rgba(99,102,241,0.1)] to-transparent rounded-bl-3xl rounded-tr-2xl" />
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-[rgba(99,102,241,0.1)] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[var(--neutral-500)]">
              © 2026 MaintenanceAI — AI-Powered Property Management
            </div>
            <div className="flex items-center gap-6 text-sm text-[var(--neutral-500)]">
              <span>Built with Next.js & Gemini AI</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
