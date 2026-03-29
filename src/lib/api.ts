const API_BASE = "http://localhost:8000";

// Demo mode — set to true to bypass the real backend
const DEMO_MODE = true;

const MOCK_USER = {
  id: "demo-user-001",
  email: "demo@aidigest.ai",
  full_name: "Alex Demo",
  interests: ["LLMs", "AI Agents", "Prompt Engineering"],
  skill_self_score: 6,
};

const MOCK_QUESTIONS = [
  { id: "q1", text: "What is the main advantage of transformer architecture over RNNs?" },
  { id: "q2", text: "Explain what 'hallucination' means in the context of LLMs." },
  { id: "q3", text: "What is the difference between fine-tuning and prompt engineering?" },
];

function delay(ms = 400) {
  return new Promise((r) => setTimeout(r, ms));
}

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
  requestOtp: async (email: string, full_name?: string) => {
    if (DEMO_MODE) {
      await delay();
      return { message: "OTP sent (demo)" };
    }
    return request("/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ email, full_name }),
    });
  },

  verifyOtp: async (email: string, token: string) => {
    if (DEMO_MODE) {
      await delay();
      return { access_token: "demo-token-xyz", user_id: MOCK_USER.id, is_new_user: true };
    }
    return request<{ access_token: string; user_id: string; is_new_user: boolean }>(
      "/auth/verify-otp",
      { method: "POST", body: JSON.stringify({ email, token }) }
    );
  },

  getMe: async (token: string) => {
    if (DEMO_MODE) {
      await delay(200);
      return MOCK_USER;
    }
    return request<{
      id: string;
      email: string;
      full_name?: string;
      interests?: string[];
      skill_self_score?: number;
    }>("/users/me", {}, token);
  },

  getAssessmentQuestions: async (token: string) => {
    if (DEMO_MODE) {
      await delay();
      return { questions: MOCK_QUESTIONS };
    }
    return request<{ questions: { id: string; text: string }[] }>(
      "/users/assessment-questions",
      {},
      token
    );
  },

  updateOnboarding: async (
    token: string,
    data: { interests: string[]; skill_self_score: number }
  ) => {
    if (DEMO_MODE) {
      await delay();
      return { message: "Onboarding updated (demo)" };
    }
    return request("/users/onboarding", {
      method: "PATCH",
      body: JSON.stringify(data),
    }, token);
  },

  submitAssessment: async (
    token: string,
    data: {
      questions: string[];
      answers: string[];
      assessment_attempts: number;
      skill_self_score: number;
    }
  ) => {
    if (DEMO_MODE) {
      await delay();
      return { message: "Assessment submitted (demo)" };
    }
    return request("/users/assess", {
      method: "POST",
      body: JSON.stringify(data),
    }, token);
  },
};
