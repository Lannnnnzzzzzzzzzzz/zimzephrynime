import { NextResponse } from 'next/server';

const BASE = 'https://www.sankavollerei.com';

export async function GET(req, { params }) {
  try {
    const url = BASE + (`/anime/genre/${params.slug}?page=1`);
    const res = await fetch(url);
    const txt = await res.text();
    try { return NextResponse.json(JSON.parse(txt)); } catch(e) { return new NextResponse(txt, { status: res.status }) }
  } catch(err) { return NextResponse.json({ error: 'fetch failed', message: err.message }, { status:500 }) }
}
