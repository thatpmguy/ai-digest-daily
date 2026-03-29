import { Link } from "react-router-dom";
import { CheckCircle, Mail, Brain, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";

const nextSteps = [
  { icon: Mail, text: "Digest arrives in 3 days" },
  { icon: Brain, text: "Quiz follows to test your knowledge" },
  { icon: TrendingUp, text: "Content adapts as you grow" },
];

export default function OnboardingDone() {
  const { user, onboardingData } = useAuth();
  const firstName = user?.full_name?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg text-center">
        <ProgressBar step={4} total={4} />

        <CheckCircle className="mx-auto h-14 w-14 text-primary mb-4" />
        <h1 className="text-2xl font-bold text-foreground">
          You're all set, {firstName}!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your first digest is being prepared based on your interests.
        </p>

        {onboardingData.interests.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {onboardingData.interests.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 space-y-3">
          {nextSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left">
              <s.icon className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-sm text-foreground">{s.text}</span>
            </div>
          ))}
        </div>

        <Link to="/dashboard" className="block mt-8">
          <Button className="w-full rounded-xl">Go to dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
