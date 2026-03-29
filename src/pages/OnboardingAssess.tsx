import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/ProgressBar";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
}

export default function OnboardingAssess() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { token, onboardingData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getAssessmentQuestions(token!)
      .then((data) => {
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
      })
      .catch(() => {
        toast.error("Failed to load questions");
        setQuestions([]);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const total = questions.length || 3;
  const isLast = currentIdx >= total - 1;
  const allSkipped = answers.every((a) => a === "");

  const handleNext = async () => {
    if (isLast) {
      await submit();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const handleSkip = () => {
    setAnswers((a) => {
      const copy = [...a];
      copy[currentIdx] = "";
      return copy;
    });
    if (isLast) {
      if (allSkipped && answers[currentIdx] === "") {
        navigate("/onboarding/done", { replace: true });
        return;
      }
      submit();
    } else {
      setCurrentIdx((i) => i + 1);
    }
  };

  const submit = async () => {
    setSubmitting(true);
    try {
      await api.submitAssessment(token!, {
        questions: questions.map((q) => q.text),
        answers,
        assessment_attempts: answers.filter(a => a.trim() !== "").length,
        skill_self_score: onboardingData.skill_self_score,
      });
      navigate("/onboarding/done", { replace: true });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (questions.length === 0) {
    navigate("/onboarding/done", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <ProgressBar step={3} total={4} />
        <h1 className="text-2xl font-bold text-foreground">Quick knowledge check</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This helps us personalise your content. Completely optional.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-card p-6">
          <p className="text-xs text-muted-foreground mb-2">
            Question {currentIdx + 1} of {total}
          </p>
          <p className="font-medium text-foreground mb-4">
            {questions[currentIdx].text}
          </p>
          <Textarea
            placeholder="Your answer…"
            value={answers[currentIdx]}
            onChange={(e) =>
              setAnswers((a) => {
                const copy = [...a];
                copy[currentIdx] = e.target.value;
                return copy;
              })
            }
            rows={4}
            className="rounded-xl"
          />
        </div>

        <div className="flex gap-3 mt-6">
          <Button variant="outline" className="flex-1 rounded-xl" onClick={handleSkip} disabled={submitting}>
            Skip
          </Button>
          <Button
            className="flex-1 rounded-xl"
            onClick={handleNext}
            disabled={submitting || (!answers[currentIdx].trim() && !isLast)}
          >
            {submitting ? "Submitting…" : isLast ? "Submit" : "Next"}
          </Button>
        </div>
        <p className="mt-3 text-xs text-center text-muted-foreground">
          No worries — we'll learn your level as you engage
        </p>
      </div>
    </div>
  );
}
