import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function Verify() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const { pendingEmail, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!pendingEmail) {
      navigate("/auth", { replace: true });
    }
  }, [pendingEmail, navigate]);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleVerify = async () => {
    if (code.length !== 6 || !pendingEmail) return;
    setLoading(true);
    try {
      const res = await api.verifyOtp(pendingEmail, code);
      login(res.access_token, res.user_id);
      if (res.is_new_user) {
        navigate("/onboarding/interests", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message || "Invalid code");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || !pendingEmail) return;
    try {
      await api.requestOtp(pendingEmail);
      setResendTimer(60);
      toast.success("Code resent!");
    } catch {
      toast.error("Failed to resend");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-border bg-card p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Check your email</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a 6-digit code to{" "}
            <span className="font-medium text-foreground">{pendingEmail}</span>
          </p>
          <div className="mt-6 flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full mt-6 rounded-xl"
            onClick={handleVerify}
            disabled={code.length !== 6 || loading}
          >
            {loading ? "Verifying…" : "Verify"}
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Didn't get it?{" "}
            {resendTimer > 0 ? (
              <span>Resend after {resendTimer}s</span>
            ) : (
              <button
                onClick={handleResend}
                className="text-primary underline underline-offset-2"
              >
                Resend
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
