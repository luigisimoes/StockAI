// PRD 5.6 — Tone modulator for realism
import type { ResponseCategory } from './router';

const TONE_OPENERS: Record<string, string[]> = {
  confident: ['', '', '', 'Yeah, ', 'Right, ', ''],
  exploratory: ['Good question. ', 'Hm. ', 'Let me think. ', ''],
  cautious: ['Worth flagging — ', 'Honest answer: ', 'Fair point. '],
  technical: ['', '', ''],
  conversational: ['I hear you. ', 'Fair pushback. ', ''],
};

const CATEGORY_TONE: Record<ResponseCategory, string> = {
  confidence: 'confident',
  alternatives: 'exploratory',
  risk: 'cautious',
  history: 'confident',
  explanation: 'technical',
  timing: 'technical',
  constraints: 'technical',
  forecast: 'technical',
  override: 'conversational',
};

export function getToneOpener(category: ResponseCategory): string {
  const tone = CATEGORY_TONE[category];
  const openers = TONE_OPENERS[tone] ?? [''];
  return openers[Math.floor(Math.random() * openers.length)];
}
