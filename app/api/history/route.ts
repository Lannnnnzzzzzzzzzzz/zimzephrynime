import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { History } from '@/app/lib/models/History';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'secret123';

async function getUserIdFromReq(req){
  const auth = req.headers.get('authorization') || '';
  const token = auth.split(' ')[1];
  if(!token) return null;
  try{ const dec:any = jwt.verify(token, SECRET); return dec.sub; }catch(e){ return null; }
}

export async function GET(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const items = await History.find({ userId }).sort({ updatedAt: -1 }).limit(100).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const body = await req.json();
  // upsert by slug+userId
  await History.findOneAndUpdate({ userId, slug: body.slug }, { $set: { ...body, lastPlayedAt: new Date(), progress: body.progress || 0 } }, { upsert: true });
  return NextResponse.json({ ok: true });
}
