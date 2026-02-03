// Minimal stub for local development.
// Replace with real API client for production integration.

export async function askGemini(prompt: string, stream = false, systemMessage = ''): Promise<string> {
  console.warn('askGemini (stub) called. Prompt length:', prompt.length, 'stream:', stream);
  // Very small mock response:
  return Promise.resolve(
    `[[MOCK RESPONSE]]\nATS_SCORE: 85\n\nThis is a stubbed Gemini response. Replace src/services/geminiService.ts with a real integration.`
  );
}