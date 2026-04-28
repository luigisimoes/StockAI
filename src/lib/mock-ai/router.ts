// PRD 5.4 — Pure keyword matching, no AI

const KEYWORD_MAP: Record<string, string[]> = {
  confidence: ['confidence', 'confident', '98%', 'sure', 'certain', 'why high', 'why low', 'accurate'],
  alternatives: ['alternative', 'instead', 'other option', 'what if', 'lower', 'higher', 'cut to', 'increase to', '300', '600', 'less', 'more units', 'conservative'],
  risk: ['risk', 'wrong', 'overstock', 'stockout', 'downside', 'worst case', 'fail', 'mistake', 'cancel'],
  history: ['past', 'history', 'before', 'previous', 'last time', 'similar', 'precedent', 'outcome', 'who approved'],
  explanation: ['why', 'reason', 'driver', 'signal', 'because', 'how did', 'explain', 'what makes'],
  timing: ['when', 'timing', 'lead time', 'how long', 'today', 'tomorrow', 'urgency', 'ship'],
  constraints: ['constraint', 'moq', 'capacity', 'budget', 'otb', 'vendor', 'limit', 'warehouse'],
  forecast: ['forecast', 'predict', 'demand', 'curve', 'peak', 'days', 'cover', 'units lose'],
  override: ['no', 'disagree', 'wrong', 'not buying', 'skeptical', 'pushback', 'doubt'],
};

export type ResponseCategory =
  | 'confidence'
  | 'alternatives'
  | 'risk'
  | 'history'
  | 'explanation'
  | 'timing'
  | 'constraints'
  | 'forecast'
  | 'override';

export function routeQuestion(question: string): ResponseCategory {
  const lower = question.toLowerCase();
  let bestMatch: ResponseCategory = 'explanation';
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(KEYWORD_MAP)) {
    const score = keywords.filter((k) => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = category as ResponseCategory;
    }
  }
  return bestMatch;
}
