import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Flame, Clock } from "lucide-react";

export default function DashboardHome() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(" ")[0] || "there";

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-xl font-bold text-foreground">Hey {firstName} 👋</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome to your AI learning dashboard.
        </p>
      </div>

      {/* Cycle status */}
      <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
        <Clock className="h-8 w-8 text-primary flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground">Day 1 of 3</p>
          <p className="text-sm text-muted-foreground">Next digest in 3 days</p>
        </div>
      </div>

      {/* Recent digests */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" /> Recent Digests
        </h2>
        <div className="flex flex-col items-center py-8 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">Your first digest is on its way</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Check back in a few days</p>
        </div>
      </div>

      {/* Quiz streak */}
      <div className="rounded-2xl border border-border bg-card p-6 flex items-center gap-4">
        <Flame className="h-8 w-8 text-muted-foreground/40 flex-shrink-0" />
        <div>
          <p className="font-semibold text-foreground">0 day streak</p>
          <p className="text-sm text-muted-foreground">Take your first quiz to start</p>
        </div>
      </div>
    </div>
  );
}
