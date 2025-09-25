'use client';
import { useState } from 'react';
export default function Header(){
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-blue-700 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        <a href="/" className="font-bold text-xl">Sankavollerei</a>
        <nav className="space-x-4 hidden md:flex">
          <a href="/anime" className="hover:underline">Anime</a>
          <a href="/donghua" className="hover:underline">Donghua</a>
          <a href="/comic" className="hover:underline">Comic</a>
          <a href="/favorites" className="hover:underline">Favorites</a>
        </nav>
        <div className="md:hidden">
          <button onClick={()=>setOpen(!open)} className="p-2 bg-slate-800 rounded">Menu</button>
        </div>
      </div>
      {open && <div className="bg-blue-600 md:hidden p-4 space-y-2">
        <a href="/anime">Anime</a><br/>
        <a href="/donghua">Donghua</a><br/>
        <a href="/comic">Comic</a><br/>
        <a href="/favorites">Favorites</a>
      </div>}
    </header>
  );
}
