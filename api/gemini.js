// ---------------------------------------------------------------------------
// IP-based sliding-window rate limiter (no external dependencies needed).
// State lives in module scope — persists across warm Vercel invocations but
// resets on cold starts, which is acceptable for a low-traffic club site.
// ---------------------------------------------------------------------------
const RATE_LIMIT_MAX = 20;          // max requests per window per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10-minute window

/** @type {Map<string, number[]>} ip → array of request timestamps */
const ipTimestamps = new Map();

/**
 * Returns true if the IP is within the allowed rate limit.
 * Mutates ipTimestamps as a side effect.
 */
function checkRateLimit(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Retrieve and prune stale timestamps for this IP
  const timestamps = (ipTimestamps.get(ip) || []).filter(t => t > windowStart);

  if (timestamps.length >= RATE_LIMIT_MAX) {
    ipTimestamps.set(ip, timestamps);
    return false; // rate limit exceeded
  }

  timestamps.push(now);
  ipTimestamps.set(ip, timestamps);
  return true; // request allowed
}

// ---------------------------------------------------------------------------

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // --- Rate limiting ---
  // x-forwarded-for may contain a comma-separated list; take the first (client) IP.
  const ip = (req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim();
  if (!checkRateLimit(ip)) {
    res.setHeader("Retry-After", "600"); // seconds until window resets (approx.)
    return res.status(429).json({
      error: "Too many requests. Please wait a few minutes before trying again.",
    });
  }

  const { prompt, userInput } = req.body;
  if (!prompt || prompt === "ping") {
    return res.status(200).json({ text: "" });
  }
  // Cap the user-supplied portion only — system instructions are excluded.
  // Raise this limit if any feature needs to send large inputs (e.g. pasting a full financial statement).
  if (userInput && userInput.length > 4000) {
    return res.status(400).json({ error: "Prompt too long." });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 4096, temperature: 0.2 }, //raise to 8192 if necessary
      }),
    });
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    if (!text) {
      console.error(
        "Empty response from Gemini:",
        JSON.stringify(data).slice(0, 300),
      );
    }
    return res.status(200).json({ text });
  } catch (err) {
    console.error("Function error:", err.message);
    return res.status(500).json({ error: err.message });
  }
}
