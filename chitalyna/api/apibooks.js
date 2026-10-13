export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const url = new URL(req.url, 'http://' + (req.headers.host || 'localhost'));
    const params = new URLSearchParams();
    if (url.searchParams.get('page')) params.set('page', url.searchParams.get('page'));
    if (url.searchParams.get('search')) params.set('search', url.searchParams.get('search'));
    if (url.searchParams.get('languages')) params.set('languages', url.searchParams.get('languages'));

    const gutendexUrl = 'https://gutendex.com/books?' + params.toString();
    const response = await fetch(gutendexUrl);
    const data = await response.text();

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}