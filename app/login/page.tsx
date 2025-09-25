'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login(){
  const [email,setEmail]=useState(''); const [pw,setPw]=useState(''); const router = useRouter();
  async function submit(e:any){ e.preventDefault(); const res = await fetch('/api/auth/login', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email, password: pw }) }); const j = await res.json(); if(j.token){ localStorage.setItem('token', j.token); router.push('/'); } else alert('Login failed'); }
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 rounded bg-slate-800"/>
        <input value={pw} onChange={e=>setPw(e.target.value)} type="password" placeholder="Password" className="w-full p-2 rounded bg-slate-800"/>
        <button className="px-4 py-2 bg-blue-600 rounded">Login</button>
      </form>
    </div>
  );
}
