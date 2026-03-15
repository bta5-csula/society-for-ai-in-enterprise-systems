export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { prompt } = req.body;

  if (!prompt || prompt === 'ping') {
    return res.status(200).json({ text: '' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model  = 'gemini-2.5-flash';
    const url    = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 8192, temperature: 0.2 }
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      console.error('Empty response from Gemini:', JSON.stringify(data).slice(0, 300));
    }

    return res.status(200).json({ text });
  } catch (err) {
    console.error('Function error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
