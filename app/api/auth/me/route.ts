import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { User } from '@/app/lib/models/User';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret123';

export async function GET(req: Request){
  await connectDB();
  const auth = req.headers.get('authorization') || '';
  const m = auth.split(' ');
  if(m[0] !== 'Bearer' || !m[1]) return NextResponse.json({ error: 'unauth' }, { status:401 });
  try{
    const decoded:any = jwt.verify(m[1], SECRET);
    const user = await User.findById(decoded.sub).lean();
    if(!user) return NextResponse.json({ error: 'not found' }, { status:404 });
    return NextResponse.json({ id: user._id, email: user.email, username: user.username });
  }catch(e){
    return NextResponse.json({ error: 'invalid token' }, { status:401 });
  }
}
