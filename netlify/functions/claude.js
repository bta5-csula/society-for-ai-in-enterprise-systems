exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try { body = JSON.parse(event.body); }
  catch { return { statusCode: 400, body: 'Invalid JSON' }; }

  if (!body.prompt || body.prompt === 'ping') {
    return { statusCode: 200, body: JSON.stringify({ text: '' }) };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const model  = 'gemini-2.5-flash';
    const url    = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: body.prompt }] }],
        generationConfig: { maxOutputTokens: 1500, temperature: 0.2 }
      })
    });

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Log what we got so it appears in Netlify function logs
    console.log('HTTP status:', response.status);
    console.log('Text length:', text.length);
    console.log('Text preview:', text.slice(0, 200));
    if (!text) {
      console.error('Empty text. Full response:', JSON.stringify(data).slice(0, 500));
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    };
  } catch (err) {
    console.error('Function error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
