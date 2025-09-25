import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request){
  await connectDB();
  const body = await req.json();
  const { email, username, password } = body;
  if(!email || !password || !username) return NextResponse.json({ error: 'missing fields' }, { status:400 });
  const existing = await User.findOne({ email }).lean();
  if(existing) return NextResponse.json({ error: 'email exists' }, { status:409 });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ email, username, password: hash });
  return NextResponse.json({ id: user._id, email: user.email, username: user.username });
}
