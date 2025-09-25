import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { Favorite } from '@/app/lib/models/Favorite';
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
  const items = await Favorite.find({ userId }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const body = await req.json();
  const doc = await Favorite.create({ ...body, userId });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const { id } = await req.json();
  if(!id) return NextResponse.json({ error: 'missing id' }, { status:400 });
  await Favorite.deleteOne({ _id: id, userId });
  return NextResponse.json({ ok: true });
}
