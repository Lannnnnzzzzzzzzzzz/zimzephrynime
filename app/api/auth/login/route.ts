import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';

export async function POST(req: Request){
  await connectDB();
  const { email, password } = await req.json();
  if(!email || !password) return NextResponse.json({ error: 'missing' }, { status:400 });
  const user = await User.findOne({ email }).lean();
  if(!user) return NextResponse.json({ error: 'invalid' }, { status:401 });
  const ok = await bcrypt.compare(password, user.password || '');
  if(!ok) return NextResponse.json({ error: 'invalid' }, { status:401 });
  const token = jwt.sign({ sub: user._id, email: user.email }, SECRET, { expiresIn: '30d' });
  return NextResponse.json({ token, user: { id: user._id, email: user.email, username: user.username } });
}
