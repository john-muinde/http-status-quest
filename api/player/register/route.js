// api/player/register/route.js
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
})

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const now = Date.now();
    const clientId = request.headers.get('x-forwarded-for') || 'unknown';

    // Add player to active set with current timestamp
    await redis.hset('active_players', {
      [clientId]: now.toString() // Convert to string since some KV stores prefer string values
    });

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    console.error('KV Store error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to register player' }),
      { status: 500 }
    );
  }
}