import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
}

// Mock data — replace with API
const MOCK_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    text: "What does LLM stand for?",
    options: ["Large Language Model", "Low Latency Memory", "Linear Learning Machine", "Long Lasting Module"],
    correct: 0,
    explanation: "LLM stands for Large Language Model, a type of AI model trained on vast text data.",
  },
  {
    id: 2,
    text: "Which company created GPT-4?",
    options: ["Google", "Meta", "OpenAI", "Anthropic"],
    correct: 2,
    explanation: "GPT-4 was created by OpenAI.",
  },
  {
    id: 3,
    text: "What is 'prompt engineering'?",
    options: ["Building hardware", "Designing AI prompts for better outputs", "Training models from scratch", "Database optimization"],
    correct: 1,
    explanation: "Prompt engineering is the practice of crafting inputs to get better AI outputs.",
  },
  {
    id: 4,
    text: "What is RAG in AI?",
    options: ["Random Attention Generation", "Retrieval-Augmented Generation", "Recursive Algorithm Growth", "Robust AI Gateway"],
    correct: 1,
    explanation: "RAG stands for Retrieval-Augmented Generation, combining search with generation.",
  },
  {
    id: 5,
    text: "What is a transformer in ML?",
    options: ["A robot", "A neural network architecture using attention", "A data format", "A type of GPU"],
    correct: 1,
    explanation: "Transformers are neural network architectures that use self-attention mechanisms.",
  },
];

export default function Quiz() {
  const { id } = useParams();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = MOCK_QUESTIONS;
  const allAnswered = Object.keys(selectedAnswers).length === questions.length;

  const score = submitted
    ? questions.filter((q) => selectedAnswers[q.id] === q.correct).length
    : 0;

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Quiz — Digest #{id}</h1>
        {!submitted && (
          <div className="mt-3 h-1.5 rounded-full bg-muted">
            <div
              className="h-1.5 rounded-full bg-primary transition-all"
              style={{ width: `${(Object.keys(selectedAnswers).length / questions.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {submitted && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center">
          <p className="text-3xl font-bold text-foreground">
            {score}/{questions.length}
          </p>
          <p className="text-sm text-muted-foreground mt-1">correct answers</p>
        </div>
      )}

      {questions.map((q, qi) => {
        const chosen = selectedAnswers[q.id];
        const isCorrect = chosen === q.correct;

        return (
          <div key={q.id} className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs text-muted-foreground mb-2">
              Question {qi + 1} of {questions.length}
            </p>
            <p className="font-medium text-foreground mb-4">{q.text}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                let classes =
                  "w-full text-left rounded-xl border p-3 text-sm transition-colors ";
                if (submitted) {
                  if (oi === q.correct) classes += "border-primary bg-accent text-accent-foreground";
                  else if (oi === chosen && !isCorrect) classes += "border-destructive bg-destructive/5 text-foreground";
                  else classes += "border-border text-muted-foreground";
                } else {
                  classes +=
                    chosen === oi
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border hover:border-primary/40 text-foreground";
                }

                return (
                  <button
                    key={oi}
                    className={classes}
                    onClick={() => !submitted && setSelectedAnswers((s) => ({ ...s, [q.id]: oi }))}
                    disabled={submitted}
                  >
                    <div className="flex items-center gap-2">
                      {submitted && oi === q.correct && <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />}
                      {submitted && oi === chosen && !isCorrect && <XCircle className="h-4 w-4 text-destructive flex-shrink-0" />}
                      {opt}
                    </div>
                  </button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-3 text-xs text-muted-foreground">{q.explanation}</p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <Button
          className="w-full rounded-xl"
          disabled={!allAnswered}
          onClick={() => setSubmitted(true)}
        >
          Submit answers
        </Button>
      ) : (
        <Link to="/dashboard">
          <Button variant="outline" className="w-full rounded-xl">
            Back to dashboard
          </Button>
        </Link>
      )}
    </div>
  );
}
