import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routeQuestion } from '@/lib/mock-ai/router';
import { getResponse, getResponseTree } from '@/lib/mock-ai/responses';
import { streamWords, thinkingDelay } from '@/lib/mock-ai/streaming';
import { getToneOpener } from '@/lib/mock-ai/personality';
import { useStore, type ConversationEntry } from '@/lib/store';

const EMPTY_CONVERSATIONS: ConversationEntry[] = [];

interface AskAiPanelProps {
  recId: number;
  activeTab: string;
}

export default function AskAiPanel({ recId, activeTab }: AskAiPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const abortRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const conversations = useStore((s) => s.conversations[recId] ?? EMPTY_CONVERSATIONS);
  const addMessage = useStore((s) => s.addMessage);

  // Get suggested questions based on active tab
  const tree = getResponseTree(recId);
  const tabMap: Record<string, keyof typeof tree.suggestedQuestions> = {
    why: 'why',
    forecast: 'forecast',
    alternatives: 'alternatives',
    activity: 'activity',
  };
  const suggestions = tree.suggestedQuestions[tabMap[activeTab] ?? 'why'] ?? tree.suggestedQuestions.why;

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, streamingText, isThinking]);

  async function handleAsk(question: string) {
    if (!question.trim() || isStreaming || isThinking) return;

    setInput('');
    abortRef.current = false;

    // Add user message
    const userEntry: ConversationEntry = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question.trim(),
      timestamp: Date.now(),
    };
    addMessage(recId, userEntry);

    // Thinking phase
    setIsThinking(true);
    await thinkingDelay();
    if (abortRef.current) return;
    setIsThinking(false);

    // Route and get response
    const category = routeQuestion(question);
    const opener = getToneOpener(category);
    const body = getResponse(recId, category);
    const fullAnswer = opener + body;

    // Streaming phase
    setIsStreaming(true);
    setStreamingText('');
    let accumulated = '';

    for await (const word of streamWords(fullAnswer)) {
      if (abortRef.current) break;
      accumulated += word;
      setStreamingText(accumulated);
    }

    if (!abortRef.current) {
      // Add assistant message
      const assistantEntry: ConversationEntry = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: accumulated,
        timestamp: Date.now(),
      };
      addMessage(recId, assistantEntry);
    }

    setIsStreaming(false);
    setStreamingText('');
  }

  function handleClose() {
    abortRef.current = true;
    setIsOpen(false);
    setIsThinking(false);
    setIsStreaming(false);
    setStreamingText('');
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => { setIsOpen(true); setTimeout(() => inputRef.current?.focus(), 100); }}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-indigo-400 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 transition-colors"
        aria-label="Ask about this recommendation"
      >
        <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
        Ask about this rec
      </button>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-b from-indigo-50/50 to-white rounded-xl border border-indigo-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-100">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" strokeWidth={1.5} />
          <span className="text-sm font-bold text-graphite-900">Ask about this rec</span>
          <span className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest">AI Co-pilot</span>
        </div>
        <button onClick={handleClose} className="p-1 text-graphite-400 hover:text-graphite-900 rounded transition-colors" aria-label="Close AI panel">
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>

      {/* Conversation */}
      <div ref={scrollRef} className="max-h-64 overflow-y-auto px-4 py-3 space-y-3">
        {conversations.length === 0 && !isThinking && !isStreaming && (
          <p className="text-xs text-graphite-400 font-medium">Ask anything about this recommendation. Try one of the suggestions below.</p>
        )}

        {conversations.map((msg) => (
          <div key={msg.id} className={cn("text-sm leading-relaxed", msg.role === 'user' ? "text-right" : "")}>
            {msg.role === 'user' ? (
              <span className="inline-block bg-indigo-400 text-white px-3 py-2 rounded-xl rounded-tr-sm text-[13px] font-medium max-w-[80%]">{msg.content}</span>
            ) : (
              <div className="bg-white hairline-border rounded-xl rounded-tl-sm p-3 text-[13px] text-graphite-700 leading-relaxed card-shadow">{msg.content}</div>
            )}
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div className="flex items-center gap-2 text-xs text-graphite-400">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" strokeWidth={2} />
            <span className="font-medium">Thinking...</span>
          </div>
        )}

        {/* Streaming */}
        {isStreaming && streamingText && (
          <div className="bg-white hairline-border rounded-xl rounded-tl-sm p-3 text-[13px] text-graphite-700 leading-relaxed card-shadow">
            {streamingText}
            <span className="inline-block w-1.5 h-4 bg-indigo-400 ml-0.5 animate-pulse rounded-full align-middle" />
          </div>
        )}
      </div>

      {/* Suggestion chips */}
      {conversations.length < 2 && !isThinking && !isStreaming && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5">
          {suggestions.map((q) => (
            <button
              key={q}
              onClick={() => handleAsk(q)}
              className="px-3 py-1.5 bg-white hairline-border rounded-full text-[11px] font-semibold text-graphite-600 hover:bg-indigo-50 hover:text-indigo-400 hover:border-indigo-200 transition-colors card-shadow"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t border-indigo-100 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk(input)}
          placeholder="Ask a question..."
          className="flex-1 bg-white hairline-border rounded-lg px-3 py-2 text-sm text-graphite-900 placeholder-graphite-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400"
          disabled={isThinking || isStreaming}
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={!input.trim() || isThinking || isStreaming}
          className="p-2 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send question"
        >
          <Send className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
