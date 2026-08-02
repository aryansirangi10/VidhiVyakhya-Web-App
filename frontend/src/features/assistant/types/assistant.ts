export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  citations?: string[];
  timestamp: string;
}

export interface AssistantResponse {
  answer: string;
  citations: string[];
  confidence: number;
  suggested_questions: string[];
}
