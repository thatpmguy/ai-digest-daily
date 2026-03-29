const API_BASE = "http://localhost:8000";

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  requestOtp: (email: string, full_name?: string) =>
    request("/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email, full_name }),
    }),

  verifyOtp: (email: string, token: string) =>
    request<{ access_token: string; user_id: string; is_new_user: boolean }>(
      "/auth/verify-otp",
      { method: "POST", body: JSON.stringify({ email, token }) }
    ),

  getMe: (token: string) =>
    request<{
      id: string;
      email: string;
      full_name?: string;
      interests?: string[];
      skill_self_score?: number;
    }>("/users/me", {}, token),

  getAssessmentQuestions: (token: string) =>
    request<{ questions: { id: string; text: string }[] }>(
      "/users/assessment-questions",
      {},
      token
    ),

  updateOnboarding: (
    token: string,
    data: { interests: string[]; skill_self_score: number }
  ) =>
    request("/users/onboarding", {
      method: "PATCH",
      body: JSON.stringify(data),
    }, token),

  submitAssessment: (
    token: string,
    data: {
      questions: string[];
      answers: string[];
      assessment_attempts: number;
      skill_self_score: number;
    }
  ) =>
    request("/users/assess", {
      method: "POST",
      body: JSON.stringify(data),
    }, token),
};
