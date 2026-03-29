import { Link } from "react-router-dom";
import { Zap, BookOpen, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Zap, title: "Tell us your interests and level", desc: "Pick the AI topics you care about and how deep you want to go." },
  { icon: BookOpen, title: "Get a curated AI digest every 3 days", desc: "Handpicked articles, summaries, and insights tailored to you." },
  { icon: BarChart3, title: "Take a quiz, track your growth", desc: "Reinforce what you learn and watch your knowledge grow." },
];

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <Link to="/" className="text-xl font-bold text-foreground">
          AIDigest
        </Link>
        <Link to="/auth">
          <Button variant="ghost" size="sm">Sign in</Button>
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto py-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Stay ahead in AI.{" "}
          <span className="text-primary">Learn. Get quizzed. Grow.</span>
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-lg">
          A personalized AI digest that adapts to your level — delivered every 3 days with a quiz to make it stick.
        </p>
        <Link to="/auth" className="mt-8">
          <Button size="lg" className="text-base px-8 py-6 rounded-xl">
            Get started free
          </Button>
        </Link>
      </main>

      {/* How it works */}
      <section className="px-6 py-16 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl font-semibold text-center mb-10 text-foreground">
          How it works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col items-start"
            >
              <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center mb-4">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} AIDigest. All rights reserved.
      </footer>
    </div>
  );
}
