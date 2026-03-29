import { BookmarkCheck } from "lucide-react";

export default function ReadingList() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Reading List</h1>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <BookmarkCheck className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
        <p className="text-sm text-muted-foreground">
          Articles from your digests will appear here
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          Bookmark articles from your digests to save them
        </p>
      </div>
    </div>
  );
}
