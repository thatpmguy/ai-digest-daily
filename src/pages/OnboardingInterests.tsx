import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";

const TOPICS = [
  "LLMs", "AI Agents", "Prompt Engineering", "AI Tools",
  "Computer Vision", "AI Research", "AI Ethics",
  "Startups & VC", "Robotics", "AI in Healthcare",
  "Generative AI", "Data & MLOps",
];

export default function OnboardingInterests() {
  const [selected, setSelected] = useState<string[]>([]);
  const { setOnboardingInterests } = useAuth();
  const navigate = useNavigate();

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));

  const handleContinue = () => {
    setOnboardingInterests(selected);
    navigate("/onboarding/level");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressBar step={1} total={4} />
        <h1 className="text-2xl font-bold text-foreground">What AI topics excite you?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pick at least 1. You can always change these later.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => toggle(t)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                selected.includes(t)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <Button
          className="w-full mt-8 rounded-xl"
          disabled={selected.length === 0}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
