// PRD 5.5 — Streaming simulator. Single most important piece of the mock.

export async function* streamWords(
  text: string,
  baseDelayMs: number = 35
): AsyncGenerator<string> {
  const words = text.split(/(\s+)/); // preserve whitespace tokens
  for (const word of words) {
    const isPunctuation = /[.,;:?!]$/.test(word);
    const delay = isPunctuation
      ? baseDelayMs + 80 + Math.random() * 60 // 145-175ms after punctuation
      : baseDelayMs + Math.random() * 25; // 35-60ms normal
    await new Promise((r) => setTimeout(r, delay));
    yield word;
  }
}

export function thinkingDelay(): Promise<void> {
  return new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
}
