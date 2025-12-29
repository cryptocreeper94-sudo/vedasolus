import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "21m00Tcm4TlvDq8ikWAM"; // Rachel - calm, soothing voice

export interface WellnessMessage {
  role: "user" | "assistant";
  content: string;
}

const WELLNESS_SYSTEM_PROMPT = `You are VedaSolus, a holistic wellness coach combining Eastern wisdom (Ayurveda, Traditional Chinese Medicine, yoga, meditation) with modern Western health science. Your approach is warm, supportive, and grounded in ancient traditions.

Your expertise includes:
- Ayurvedic dosha analysis (Vata, Pitta, Kapha) and lifestyle recommendations
- Traditional Chinese Medicine concepts (qi, yin/yang, meridians, five elements)
- Meditation and breathwork techniques (pranayama)
- Sleep optimization and circadian rhythms
- Nutrition from both Eastern and Western perspectives
- Stress management and emotional wellness
- Exercise and movement recommendations

When responding:
- Be warm, encouraging, and compassionate
- Blend Eastern and Western perspectives naturally
- Provide practical, actionable advice
- Ask clarifying questions when needed
- Keep responses conversational and under 150 words for voice clarity
- Reference specific traditions when relevant (e.g., "In Ayurveda..." or "TCM suggests...")`;

export async function getWellnessResponse(
  messages: WellnessMessage[],
  userContext?: string
): Promise<string> {
  const systemMessage = userContext
    ? `${WELLNESS_SYSTEM_PROMPT}\n\nUser context: ${userContext}`
    : WELLNESS_SYSTEM_PROMPT;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ],
    max_tokens: 500,
    temperature: 0.7,
  });

  return response.choices[0]?.message?.content || "I'm here to help with your wellness journey.";
}

export async function textToSpeech(text: string): Promise<Buffer> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error("ElevenLabs API key not configured");
  }

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${error}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export async function speechToText(audioBuffer: Buffer): Promise<string> {
  const formData = new FormData();
  const blob = new Blob([audioBuffer], { type: "audio/webm" });
  formData.append("file", blob, "audio.webm");
  formData.append("model", "whisper-1");

  const response = await openai.audio.transcriptions.create({
    file: await openai.files.create({
      file: blob as any,
      purpose: "assistants",
    }) as any,
    model: "whisper-1",
  });

  return response.text;
}
