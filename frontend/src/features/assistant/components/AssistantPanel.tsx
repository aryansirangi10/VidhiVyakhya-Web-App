import React, { useState } from "react";
import { Sparkles, Send, Bot, ShieldCheck } from "lucide-react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import MessageBubble from "./MessageBubble";
import { useAssistant } from "../hooks/useAssistant";

export function AssistantPanel() {
  const [input, setInput] = useState("");
  const { messages, isLoading, suggested, sendMessage } = useAssistant();

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[700px] w-full max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between bg-slate-900 px-6 py-4 text-white border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-brand-600 text-white">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">VidhiVyakhya AI Assistant</h3>
            <p className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck size={12} /> Grounded in Official Parliamentary Clauses
            </p>
          </div>
        </div>
        <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono font-bold">
          v2.0 AI Engine
        </span>
      </div>

      {/* MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 p-2">
            <Sparkles size={14} className="animate-spin text-brand-500" />
            Analyzing retrieved statutory clauses...
          </div>
        )}
      </div>

      {/* SUGGESTED QUESTIONS CHIPS */}
      <div className="px-6 py-2 bg-slate-100/60 border-t border-slate-200 flex flex-wrap gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 self-center mr-1 font-mono">
          <Sparkles size={12} /> Suggested
        </span>
        {suggested.map((q, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(q)}
            className="text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:border-brand-500 hover:bg-brand-50 rounded-lg px-2.5 py-1 transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
        <Input
          placeholder="Ask any statutory question (e.g. How does Section 115BAC affect me?)..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" loading={isLoading} rightIcon={<Send size={16} />}>
          Ask
        </Button>
      </form>
    </div>
  );
}

export default AssistantPanel;
