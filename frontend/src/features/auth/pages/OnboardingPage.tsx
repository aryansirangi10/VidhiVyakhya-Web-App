import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, CheckCircle2, User, ArrowRight, Bookmark, ShieldCheck } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const topicsList = ["Income Tax", "GST Amendments", "MSME Relief", "Capital Gains", "Digital Privacy", "Corporate Law"];
const goalsList = ["Track Tax Slab Changes", "Monitor Business Regulations", "Follow Parliament Bills", "Calculate Financial Impact"];

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [profileName, setProfileName] = useState("Primary Household");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Income Tax", "Capital Gains"]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["Track Tax Slab Changes"]);
  const navigate = useNavigate();

  const toggleTopic = (t: string) => {
    setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  const toggleGoal = (g: string) => {
    setSelectedGoals((prev) => (prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-mono">
      <div className="max-w-xl w-full bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
        {/* STEP PROGRESS HEADER */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs text-brand-400 font-bold uppercase tracking-wider">
            <Sparkles size={16} /> Onboarding Wizard
          </div>
          <span className="text-xs text-slate-500 font-bold">Step {step} of 4</span>
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="space-y-6 animate-fade">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-white">Welcome to VidhiVyakhya 2.0</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Let's personalize your legal intelligence workspace to automatically calculate tax changes, track parliamentary bills, and dispatch citizen alerts.
              </p>
            </div>
            <Button className="w-full" size="lg" onClick={() => setStep(2)} rightIcon={<ArrowRight size={18} />}>
              Get Started
            </Button>
          </div>
        )}

        {/* STEP 2: CREATE FIRST PROFILE */}
        {step === 2 && (
          <div className="space-y-6 animate-fade">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">1. Create Encrypted Profile</h2>
              <p className="text-xs text-slate-400">Give your primary financial entity profile a name (e.g. Spouse, HUF, My Company).</p>
            </div>
            <Input
              label="Profile Name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              leftIcon={<User size={16} />}
              required
            />
            <Button className="w-full" onClick={() => setStep(3)} rightIcon={<ArrowRight size={16} />}>
              Next: Select Topics
            </Button>
          </div>
        )}

        {/* STEP 3: INTERESTS & TOPICS */}
        {step === 3 && (
          <div className="space-y-6 animate-fade">
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">2. Select Legislative Topics</h2>
              <p className="text-xs text-slate-400">Choose subjects to track for gazette notifications and AI recommendations.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {topicsList.map((t) => {
                const active = selectedTopics.includes(t);
                return (
                  <button
                    key={t}
                    onClick={() => toggleTopic(t)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all ${
                      active
                        ? "bg-brand-600/20 text-brand-300 border-brand-500/50"
                        : "bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    #{t}
                  </button>
                );
              })}
            </div>
            <Button className="w-full" onClick={() => setStep(4)} rightIcon={<ArrowRight size={16} />}>
              Next: Select Goals
            </Button>
          </div>
        )}

        {/* STEP 4: GOALS & COMPLETE */}
        {step === 4 && (
          <div className="space-y-6 animate-fade text-center">
            <div className="p-4 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 w-16 h-16 mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-white">You're Ready to Roll!</h2>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Your encrypted profile <span className="font-bold text-emerald-400">{profileName}</span> is configured. You can now calculate grounded impacts.
              </p>
            </div>
            <Button className="w-full" size="lg" onClick={() => navigate("/dashboard")} rightIcon={<ArrowRight size={18} />}>
              Enter Personal Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OnboardingPage;
