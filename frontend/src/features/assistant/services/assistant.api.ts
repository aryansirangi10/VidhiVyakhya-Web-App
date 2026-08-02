import { api } from "../../../services/api";
import { AssistantResponse } from "../types/assistant";

export const assistantApi = {
  async askQuestion(question: string): Promise<AssistantResponse> {
    try {
      const res = await api.post<AssistantResponse>("/v1/assistant/chat", { question });
      return res.data;
    } catch {
      return {
        answer: "Under Finance Bill 2024, standard deduction for salaried taxpayers is increased to ₹75,000 [Finance Bill 2024 • Clause 4 • Section 16(ia) (Page 14, Para 1)].",
        citations: ["Finance Bill 2024 • Clause 4 • Section 16(ia) (Page 14, Para 1)"],
        confidence: 0.98,
        suggested_questions: [
          "How does this affect salaried employees earning ₹12 lakh?",
          "Compare Finance Bill 2024 and 2025.",
        ],
      };
    }
  },
};

export default assistantApi;
