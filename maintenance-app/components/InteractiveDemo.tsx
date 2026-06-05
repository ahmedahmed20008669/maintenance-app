"use client";

import { useEffect, useState } from "react";
import { RobotIcon, ToolsIcon } from "./ui";

export default function InteractiveDemo() {
  const [step, setStep] = useState(0);
  const [descriptionText, setDescriptionText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [aiThinking, setAiThinking] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const fullDescription = "Water is actively leaking from the kitchen sink ceiling. It's starting to pool on the floor.";

  // Handle typing effect for step 0
  useEffect(() => {
    if (step === 0) {
      setDescriptionText("");
      setButtonPressed(false);
      setAiThinking(false);
      setIsTyping(true);
      
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullDescription.length) {
          setDescriptionText((prev) => prev + fullDescription.charAt(index));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          // Auto press submit button after typing finishes
          const pressTimer = setTimeout(() => {
            setButtonPressed(true);
            const transitionTimer = setTimeout(() => {
              setStep(1); // Go to AI Triage
            }, 1000);
            return () => clearTimeout(transitionTimer);
          }, 1200);
          return () => clearTimeout(pressTimer);
        }
      }, 35); // 35ms per character typing speed
      
      return () => clearInterval(interval);
    }
  }, [step]);

  // Handle Step transitions
  useEffect(() => {
    if (step === 1) {
      setAiThinking(true);
      const timer = setTimeout(() => {
        setAiThinking(false);
        const nextTimer = setTimeout(() => {
          setStep(2); // Go to Dashboard Routing
        }, 3000); // Show AI result for 3 seconds
        return () => clearTimeout(nextTimer);
      }, 2500); // Triage analysis time
      return () => clearTimeout(timer);
    } else if (step === 2) {
      // Admin dashboard assignment routing
      const timer = setTimeout(() => {
        setStep(3); // Go to completed state
      }, 4500);
      return () => clearTimeout(timer);
    } else if (step === 3) {
      // Loop back to step 0 after 4 seconds
      const timer = setTimeout(() => {
        setStep(0);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className="relative rounded-2xl overflow-hidden glass border border-[rgba(0,153,173,0.3)] shadow-2xl aspect-[4/3] flex flex-col bg-[rgba(10,12,16,0.95)]">
      {/* Mockup Browser Top Bar */}
      <div className="w-full h-10 bg-[var(--neutral-900)] border-b border-[rgba(255,255,255,0.05)] flex items-center px-4 gap-2 relative shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        
        {/* Address Bar */}
        <div className="mx-auto w-[60%] h-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-md text-[10px] text-[var(--neutral-400)] flex items-center justify-center font-mono tracking-tight select-none">
          <span className="text-[var(--primary-400)] mr-0.5">https://</span>
          <span>{step === 2 || step === 3 ? "admin.adeer.ai/dashboard" : "tenant.adeer.ai/submit"}</span>
        </div>

        {/* Live Indicator */}
        <div className="absolute right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[rgba(0,153,173,0.1)] border border-[rgba(0,153,173,0.2)] text-[9px] text-[var(--primary-300)] font-semibold uppercase tracking-widest font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-400)] animate-ping" />
          <span>Demo Loop</span>
        </div>
      </div>

      {/* Screen Content Container */}
      <div className="flex-1 p-4 overflow-hidden relative text-xs">
        
        {/* ================= STEP 0: TENANT PORTAL ================= */}
        {step === 0 && (
          <div className="h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h4 className="font-bold text-white text-sm">Tenant Service Portal</h4>
                  <p className="text-[10px] text-[var(--neutral-500)]">Submit a new facility maintenance ticket</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-[rgba(255,255,255,0.05)] text-[9px] text-[var(--neutral-400)] border border-[rgba(255,255,255,0.05)] font-medium">Unit 412B</span>
              </div>

              {/* Form Mock */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Name</label>
                    <div className="h-8 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-2.5 flex items-center text-white">
                      Amina Al-Subaie
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Email</label>
                    <div className="h-8 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] px-2.5 flex items-center text-[var(--neutral-400)] truncate">
                      a.subaie@adeer.sa
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Description of Issue</label>
                  <div className="h-16 rounded bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.08)] p-2.5 text-white font-sans leading-relaxed relative flex items-start">
                    <span>{descriptionText}</span>
                    {isTyping && <span className="inline-block w-1.5 h-3.5 bg-[var(--primary-400)] ml-0.5 animate-pulse" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end">
              <button 
                className={`w-full py-2.5 rounded-lg text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  buttonPressed 
                    ? "bg-[var(--primary-600)] border-[var(--primary-400)] scale-[0.98]" 
                    : "bg-gradient-to-r from-[var(--primary-600)] to-[var(--primary-500)] border-[rgba(0,153,173,0.3)] hover:shadow-lg hover:shadow-[rgba(0,153,173,0.15)]"
                }`}
              >
                {buttonPressed ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Submitting to Gemini AI...</span>
                  </>
                ) : (
                  <>
                    <RobotIcon className="w-4 h-4 text-white shrink-0" />
                    <span>Analyze & Submit with AI</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 1: AI TRIAGE ================= */}
        {step === 1 && (
          <div className="h-full flex flex-col justify-between items-center py-4">
            {aiThinking ? (
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                {/* Glowing Brain / Radar Animation */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[var(--primary-500)]/30 animate-ping opacity-75" />
                  <div className="absolute inset-2 rounded-full border border-[var(--primary-400)]/50 animate-pulse" />
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary-900)]/80 border border-[var(--primary-400)]/40 flex items-center justify-center text-[var(--primary-400)] shadow-lg shadow-[var(--primary-500)]/20">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                      <path d="M12 5v14" />
                    </svg>
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <div className="font-bold text-white text-xs tracking-wide">Gemini Agentic Processing</div>
                  <p className="text-[9px] text-[var(--primary-300)] animate-pulse">Classifying request, estimating severity & priority...</p>
                </div>
              </div>
            ) : (
              <div className="w-full flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-[9px]">AI Classification Complete</h4>
                  </div>
                  
                  {/* Analysis Cards */}
                  <div className="space-y-2">
                    <div className="glass-light p-3 rounded-lg border border-[rgba(255,255,255,0.05)]">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] text-[var(--neutral-400)] font-semibold">Gemini NLP Summary:</span>
                        <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[9px] font-bold">Critical Severity</span>
                      </div>
                      <p className="text-white text-[10px] leading-relaxed italic">
                        &quot;Ceiling leakage in kitchen with active flooding. Major structural/water damage risk.&quot;
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="glass-light p-2.5 rounded-lg border border-[rgba(255,255,255,0.05)] space-y-0.5">
                        <span className="text-[9px] text-[var(--neutral-500)] uppercase tracking-wider font-semibold">Category</span>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <ToolsIcon className="w-3.5 h-3.5 text-[var(--primary-400)]" />
                          <span>Plumbing / Flooding</span>
                        </div>
                      </div>
                      <div className="glass-light p-2.5 rounded-lg border border-[rgba(255,255,255,0.05)] space-y-0.5">
                        <span className="text-[9px] text-[var(--neutral-500)] uppercase tracking-wider font-semibold">Priority Score</span>
                        <div className="font-bold text-red-400 flex items-center gap-1">
                          <span>P1</span>
                          <span className="text-[9px] text-[var(--neutral-500)] font-normal">(Response &lt; 2hr)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Routing Action */}
                <div className="w-full bg-[var(--primary-900)]/20 border border-[var(--primary-800)]/30 rounded-lg p-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[var(--primary-400)]">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <div className="text-left">
                      <p className="text-[9px] text-[var(--neutral-500)] uppercase font-semibold">Smart Routing Action</p>
                      <p className="font-bold text-white text-[10px]">Dispatch to QuickFix Plumbing Co.</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-[var(--primary-400)] font-bold animate-pulse">Routing...</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STEP 2: OPERATIONS DASHBOARD ================= */}
        {step === 2 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1 flex flex-col">
              {/* Dashboard Mini-Header */}
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="font-bold text-white text-xs">Operations Dashboard</h4>
                  <p className="text-[9px] text-[var(--neutral-500)]">Active Facility Maintenance Tickets</p>
                </div>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Live View</span>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="grid grid-cols-4 gap-2 mb-3">
                {[
                  { label: "Total", val: "13", color: "text-white" },
                  { label: "Pending", val: "2", color: "text-[#fbbf24]" },
                  { label: "In Progress", val: "7", color: "text-[var(--primary-400)]" },
                  { label: "Critical", val: "4", color: "text-rose-500" },
                ].map((s, i) => (
                  <div key={i} className="glass-light px-2 py-1.5 rounded-md border border-[rgba(255,255,255,0.03)] flex flex-col justify-center">
                    <span className="text-[8px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">{s.label}</span>
                    <span className={`text-xs font-bold ${s.color}`}>{s.val}</span>
                  </div>
                ))}
              </div>

              {/* Request Table / List */}
              <div className="flex-1 space-y-1.5 overflow-hidden">
                {/* Simulated Incoming Item (Pulsing Entry) */}
                <div className="rounded-lg bg-[rgba(0,153,173,0.1)] border border-[var(--primary-500)]/40 p-2 flex justify-between items-center relative overflow-hidden animate-pulse">
                  <div className="space-y-0.5 max-w-[65%]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold text-[8px] border border-rose-500/30">P1</span>
                      <span className="font-bold text-white text-[10px] truncate">Burst Pipe & Leak</span>
                    </div>
                    <p className="text-[9px] text-[var(--neutral-400)] truncate">Unit 412B · Amina Al-Subaie</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1 shrink-0">
                    <span className="px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[8px] font-bold flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-yellow-400 animate-pulse" />
                      Pending Routing
                    </span>
                    <span className="text-[8px] text-[var(--neutral-500)] font-mono">Assigned: Auto-Routing...</span>
                  </div>
                </div>

                {/* Existing item 1 */}
                <div className="rounded-lg glass-light border border-[rgba(255,255,255,0.05)] p-2 flex justify-between items-center opacity-70">
                  <div className="space-y-0.5 max-w-[65%]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold text-[8px] border border-amber-500/25">P2</span>
                      <span className="font-bold text-white text-[10px] truncate">AC Blowing Warm Air</span>
                    </div>
                    <p className="text-[9px] text-[var(--neutral-400)] truncate">Unit 703 · John Doe</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="px-1.5 py-0.5 rounded-full bg-[var(--primary-500)]/10 text-[var(--primary-300)] border border-[var(--primary-500)]/20 text-[8px] font-bold">
                      In Progress
                    </span>
                    <span className="text-[8px] text-[var(--neutral-400)] truncate font-mono">AirFlow HVAC Solutions</span>
                  </div>
                </div>

                {/* Existing item 2 */}
                <div className="rounded-lg glass-light border border-[rgba(255,255,255,0.05)] p-2 flex justify-between items-center opacity-70">
                  <div className="space-y-0.5 max-w-[65%]">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[8px] border border-emerald-500/25">P4</span>
                      <span className="font-bold text-white text-[10px] truncate">Cabinet door hinges loose</span>
                    </div>
                    <p className="text-[9px] text-[var(--neutral-400)] truncate">Unit 115 · Sarah Smith</p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold">
                      Resolved
                    </span>
                    <span className="text-[8px] text-[var(--neutral-400)] truncate font-mono">HandyHelp General Services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: WORKER ASSIGNED & RESOLVED ================= */}
        {step === 3 && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--primary-400)] animate-pulse" />
                  <h4 className="font-bold text-[var(--primary-300)] uppercase tracking-widest text-[9px]">Provider Assigned & Dispatched</h4>
                </div>

                {/* Dispatch Details Card */}
                <div className="glass-light p-3.5 rounded-lg border border-[var(--primary-500)]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[8px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Assigned Provider</p>
                      <p className="text-[11px] font-bold text-white">QuickFix Plumbing Co.</p>
                    </div>
                    <div className="px-2 py-1 rounded bg-[var(--primary-500)]/15 border border-[var(--primary-500)]/30 text-[9px] font-mono text-[var(--primary-300)]">
                      Job #3129
                    </div>
                  </div>

                  <div className="h-[1px] bg-[rgba(255,255,255,0.05)]" />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[8px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Est. Response Time</p>
                      <p className="text-[10px] font-bold text-emerald-400">45 Minutes</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-[var(--neutral-500)] font-semibold uppercase tracking-wider">Cost Estimate</p>
                      <p className="text-[10px] font-bold text-white">$180 - $220</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Update Overlay Pop */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-bold text-[10px]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-emerald-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Ticket Dispatched & Assigned Successfully</span>
                </div>
                <p className="text-[9px] text-[var(--neutral-400)]">SMS notification sent to tenant & provider dispatch terminal.</p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Progress Indicators / Timeline dot markers */}
      <div className="w-full bg-[var(--neutral-900)] border-t border-[rgba(255,255,255,0.05)] h-9 flex items-center justify-between px-6 shrink-0 text-[9px] font-medium text-[var(--neutral-500)]">
        <div className="flex gap-4">
          {[
            { label: "1. Submit", id: 0 },
            { label: "2. AI Triage", id: 1 },
            { label: "3. Dashboard", id: 2 },
            { label: "4. Dispatched", id: 3 }
          ].map((itm) => (
            <span 
              key={itm.id} 
              className={`transition-colors duration-300 cursor-pointer ${
                step === itm.id 
                  ? "text-[var(--primary-400)] font-bold scale-105" 
                  : step > itm.id 
                    ? "text-[var(--neutral-300)]" 
                    : ""
              }`}
              onClick={() => setStep(itm.id)}
            >
              {itm.label}
            </span>
          ))}
        </div>
        <div className="h-1.5 w-1.5 rounded-full bg-[var(--primary-400)] animate-ping" />
      </div>
    </div>
  );
}
