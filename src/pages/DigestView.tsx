import { useParams, Link } from "react-router-dom";
import { Bookmark, ExternalLink, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Placeholder — in a real app this would fetch from backend
export default function DigestView() {
  const { id } = useParams();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <p className="text-xs text-muted-foreground">March 27, 2026</p>
        <h1 className="text-2xl font-bold text-foreground mt-1">AI Digest #{id}</h1>
      </div>

      {/* Empty state */}
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <ExternalLink className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">Digest content loading…</p>
      </div>

      <div className="pt-4">
        <Link to={`/dashboard/quiz/${id}`}>
          <Button className="rounded-xl">
            Ready for the quiz? <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
