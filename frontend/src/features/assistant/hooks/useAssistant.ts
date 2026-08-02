import { useState } from "react";
import { ChatMessage } from "../types/assistant";
import { assistantApi } from "../services/assistant.api";

export function useAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-0",
      sender: "assistant",
      text: "Hello! I am VidhiVyakhya AI. Ask me any question about Parliamentary Bills, statutory rules, or tax amendments.",
      timestamp: "Just now",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggested, setSuggested] = useState<string[]>([
    "How does Finance Bill 2024 affect salaried employees earning ₹12 lakh?",
    "Compare Finance Bill 2024 and 2025.",
    "Which clauses discuss standard deduction?",
  ]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await assistantApi.askQuestion(text);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: "assistant",
        text: res.answer,
        citations: res.citations,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, assistantMsg]);
      if (res.suggested_questions) setSuggested(res.suggested_questions);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    suggested,
    sendMessage,
  };
}

export default useAssistant;
