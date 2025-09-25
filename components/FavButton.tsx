'use client';
import { useState } from 'react';
export default function FavButton({ item }: any){
  const [saved, setSaved] = useState(false);
  async function add(){
    const token = localStorage.getItem('token');
    if(!token){ alert('Login first'); return; }
    const res = await fetch('/api/favorites', { method:'POST', headers:{ 'content-type':'application/json', Authorization: 'Bearer '+token }, body: JSON.stringify(item) });
    if(res.ok) setSaved(true);
  }
  return <button onClick={add} className={'px-3 py-2 rounded '+(saved? 'bg-green-600':'bg-blue-600')}>{saved? 'Saved':'Save'}</button>;
}
