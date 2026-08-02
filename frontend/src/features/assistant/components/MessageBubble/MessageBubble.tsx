import React from "react";
import { Sparkles, User, FileText } from "lucide-react";
import { ChatMessage } from "../../types/assistant";

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
          isUser ? "bg-brand-600 text-white" : "bg-slate-900 text-brand-400"
        }`}
      >
        {isUser ? <User size={16} /> : <Sparkles size={16} />}
      </div>

      <div className={`space-y-2 max-w-[80%] ${isUser ? "text-right" : "text-left"}`}>
        <div
          className={`p-4 rounded-2xl text-xs font-mono leading-relaxed shadow-sm ${
            isUser
              ? "bg-brand-600 text-white rounded-tr-none"
              : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
          }`}
        >
          {message.text}
        </div>

        {message.citations && message.citations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-start">
            {message.citations.map((c, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <FileText size={10} /> {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
