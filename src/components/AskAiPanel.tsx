import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Sparkles, Send, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { routeQuestion } from '@/lib/mock-ai/router';
import { getResponse, getResponseTree } from '@/lib/mock-ai/responses';
import { streamWords, thinkingDelay } from '@/lib/mock-ai/streaming';
import { getToneOpener } from '@/lib/mock-ai/personality';
import { useStore, type ConversationEntry } from '@/lib/store';
import { motion } from 'motion/react';

const EMPTY_CONVERSATIONS: ConversationEntry[] = [];

interface AskAiPanelProps {
  recId: number;
  activeTab: string;
}

export default function AskAiPanel({ recId, activeTab }: AskAiPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
  const suggestedChips = useMemo(() => {
    const tree = getResponseTree(recId);
    switch (activeTab) {
      case 'why': return tree.suggestedQuestions.why;
      case 'forecast': return tree.suggestedQuestions.forecast;
      case 'alternatives': return tree.suggestedQuestions.alternatives;
      case 'activity': return tree.suggestedQuestions.activity;
      default: return tree.suggestedQuestions.why;
    }
  }, [recId, activeTab]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversations, streamingText, isThinking]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isExpanded]);

  async function handleAsk(question: string) {
    if (!question.trim() || isStreaming || isThinking) return;

    setInput('');
    setIsExpanded(true);
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
    setIsExpanded(false);
    setIsThinking(false);
    setIsStreaming(false);
    setStreamingText('');
  }

  function handleSubmit() {
    if (input.trim()) handleAsk(input);
  }

  return (
    <motion.div
      layout
      initial={false}
      animate={{ height: isExpanded ? 380 : 60 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="bg-gradient-to-r from-indigo-50/80 via-white to-indigo-50/40 border border-indigo-200 rounded-xl overflow-hidden"
    >
      {!isExpanded ? (
        /* ─── COLLAPSED STATE ─── */
        <div className="flex items-center justify-between px-5 h-[60px]">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-indigo-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            </div>
            <span className="text-sm font-bold text-graphite-900">AI Co-Pilot</span>
            <span className="text-[11px] text-graphite-500 font-medium hidden sm:inline">Ready to explain this rec</span>
          </div>

          <div className="flex items-center gap-2">
            {suggestedChips.slice(0, 2).map((q) => (
              <button
                key={q}
                onClick={() => handleAsk(q)}
                className="px-3 py-1.5 text-[11px] font-medium bg-white border border-indigo-200 text-indigo-700 rounded-full hover:bg-indigo-50 hover:border-indigo-300 transition-colors max-w-[200px] truncate"
              >
                {q}
              </button>
            ))}
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[11px] font-bold text-indigo-600 px-2 hover:text-indigo-700 transition-colors"
            >
              Ask →
            </button>
          </div>
        </div>
      ) : (
        /* ─── EXPANDED STATE ─── */
        <div className="flex flex-col h-full">
          {/* Header bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-indigo-100 bg-white/50 backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-indigo-400 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-sm font-bold text-graphite-900">AI Co-Pilot</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-500">Conversation</span>
            </div>
            <button onClick={handleClose} className="p-1.5 hover:bg-graphite-100 rounded-lg transition-colors">
              <X className="w-4 h-4 text-graphite-500" strokeWidth={2} />
            </button>
          </div>

          {/* Conversation area (scrollable) */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {conversations.length === 0 && !isThinking && !isStreaming ? (
              <div className="space-y-2.5">
                <p className="text-[11px] text-graphite-500 font-medium">Try asking:</p>
                {suggestedChips.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAsk(q)}
                    className="w-full text-left px-4 py-2.5 text-[13px] bg-white border border-indigo-100 text-graphite-700 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 hover:text-graphite-900 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Input bar */}
          <div className="border-t border-indigo-100 p-3 bg-white/70 shrink-0">
            <div className="flex items-center gap-2 bg-white border border-graphite-200 rounded-lg px-3 py-2 focus-within:border-indigo-300 transition-colors">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask a question..."
                className="flex-1 text-[13px] outline-none bg-transparent text-graphite-900 placeholder-graphite-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                disabled={isThinking || isStreaming}
              />
              <button
                onClick={handleSubmit}
                disabled={!input.trim() || isThinking || isStreaming}
                className="w-7 h-7 rounded-md bg-indigo-400 flex items-center justify-center hover:bg-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-white" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
