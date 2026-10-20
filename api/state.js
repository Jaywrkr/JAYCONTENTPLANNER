// Guarda y lee tu avance (pasos hechos, opción elegida) en Vercel Blob.
// Necesita un Blob store conectado al proyecto (crea BLOB_READ_WRITE_TOKEN).
const { put, list, del } = require('@vercel/blob');
const crypto = require('crypto');
const KEY_HASH = 'd7f2686ef0ac756307e1044e06c9692bd91136e03dc9b345a67cbd37346675a8'; // sha256 de tu clave privada
const ok = k => k && crypto.createHash('sha256').update(String(k)).digest('hex') === KEY_HASH;

module.exports = async (req, res) => {
  res.setHeader('cache-control', 'no-store');
  if (!ok(req.headers['x-key'])) return res.status(401).json({ error: 'clave' });
  if (!process.env.BLOB_READ_WRITE_TOKEN) return res.status(503).json({ error: 'sin almacenamiento' });
  const { blobs } = await list({ prefix: 'estado/' });
  blobs.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
  if (req.method === 'GET') {
    if (!blobs.length) return res.status(200).json({});
    const r = await fetch(blobs[0].url, { cache: 'no-store' });
    return res.status(200).json(await r.json());
  }
  if (req.method === 'PUT') {
    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
    JSON.parse(body);
    await put('estado/' + Date.now() + '.json', body, { access: 'public', addRandomSuffix: true, contentType: 'application/json' });
    const old = blobs.slice(4).map(b => b.url); if (old.length) await del(old);
    return res.status(200).json({ ok: true });
  }
  res.status(405).end();
};
