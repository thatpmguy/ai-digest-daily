import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ProgressBar } from "@/components/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

function getLabel(v: number) {
  if (v <= 2) return "Beginner — just getting started";
  if (v <= 5) return "Amateur — know the basics";
  if (v <= 8) return "Advanced — pretty deep in it";
  return "Pro — live and breathe AI";
}

export default function OnboardingLevel() {
  const [value, setValue] = useState(5);
  const { token, onboardingData, setOnboardingScore } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setOnboardingScore(value);
    setLoading(true);
    try {
      await api.updateOnboarding(token!, {
        interests: onboardingData.interests,
        skill_self_score: value,
      });
      navigate("/onboarding/assess");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressBar step={2} total={4} />
        <h1 className="text-2xl font-bold text-foreground">How would you rate your AI knowledge?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Be honest — this helps us get your digest right.
        </p>
        <div className="mt-10 px-2">
          <Slider
            value={[value]}
            onValueChange={([v]) => setValue(v)}
            max={10}
            min={0}
            step={1}
            className="w-full"
          />
          <p className="mt-4 text-center text-sm font-medium text-primary">
            {getLabel(value)}
          </p>
        </div>
        <Button className="w-full mt-10 rounded-xl" onClick={handleContinue} disabled={loading}>
          {loading ? "Saving…" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
