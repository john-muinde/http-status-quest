// api/player-count.js
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  
  if (req.method === 'GET') {
    const now = Date.now();
    
    // Clean up old entries (older than 1 minute)
    await kv.zremrangebyscore('active_players', 0, now - 60000);
    
    // Add or update current player
    const clientId = req.headers['x-forwarded-for'] || 'unknown';
    await kv.zadd('active_players', {
      score: now,
      member: clientId
    });
    
    // Get current count
    const currentPlayers = await kv.zcount('active_players', now - 60000, '+inf');
    
    res.status(200).json({ count: currentPlayers });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}