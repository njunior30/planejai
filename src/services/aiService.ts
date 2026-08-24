interface GeminiResponse {
  candidates?: {
    content: {
      parts: { text: string }[]
    }
  }[]
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const MODEL_NAMES = ['gemini-flash-lite-latest', 'gemini-3.5-flash']
const MAX_RETRIES = 2

const wait = (milliseconds: number) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds))

const callGeminiAPI = async (prompt: string) => {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY não configurada.')
  }

  for (const modelName of MODEL_NAMES) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      })

      if (response.ok) {
        return (await response.json()) as GeminiResponse
      }

      const isTransientError = response.status === 429 || response.status >= 500
      if (!isTransientError || attempt === MAX_RETRIES) {
        break
      }

      await wait(500 * 2 ** attempt)
    }
  }

  throw new Error('A API Gemini está temporariamente indisponível.')
}

export interface InsightData {
  feasibility: {
    status: 'viable' | 'needs_adjustment' | 'unfeasible'
    content: string
  }
  diagnosis: { content: string }
  suggestions: { items: string[] }
  extraIncome: { items: string[] }
  investment: { items: string[] }
  motivation: { content: string }
}

export const getInsight = async (prompt: string) => {
  const response = await callGeminiAPI(prompt)
  const json = response.candidates?.[0]?.content.parts[0]?.text

  if (!json) {
    throw new Error('A API Gemini retornou uma resposta vazia.')
  }

  return JSON.parse(json) as InsightData
}
