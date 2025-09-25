import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const WatchSchema = new Schema({ userId: Schema.Types.ObjectId, slug: String, title: String, type: String }, { timestamps:true });
const Watch = models.Watch || model('Watch', WatchSchema);

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
  const items = await Watch.find({ userId }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const body = await req.json();
  const doc = await Watch.create({ ...body, userId });
  return NextResponse.json(doc);
}

export async function DELETE(req: Request){
  await connectDB();
  const userId = await getUserIdFromReq(req);
  if(!userId) return NextResponse.json({ error: 'unauth' }, { status:401 });
  const { id } = await req.json();
  if(!id) return NextResponse.json({ error: 'missing id' }, { status:400 });
  await Watch.deleteOne({ _id: id, userId });
  return NextResponse.json({ ok: true });
}
