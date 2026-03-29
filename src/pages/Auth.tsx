import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { setPendingEmail } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await api.requestOtp(email.trim(), name.trim() || undefined);
      setPendingEmail(email.trim());
      navigate("/auth/verify");
    } catch (err: any) {
      toast.error(err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h1 className="text-2xl font-bold text-foreground">Welcome to AIDigest</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email to sign in or create an account
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="rounded-xl"
            />
            <Input
              type="text"
              placeholder="Your name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl"
            />
            <Button type="submit" className="w-full rounded-xl" disabled={loading}>
              {loading ? "Sending…" : "Send me a code"}
            </Button>
          </form>
          <p className="mt-4 text-xs text-center text-muted-foreground">
            We'll send a 6-digit code to your email
          </p>
        </div>
      </div>
    </div>
  );
}
