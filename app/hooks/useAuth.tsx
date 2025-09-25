'use client';
import { useState } from 'react';

export function useAuth(){
  const [token, setToken] = useState<string | null>(typeof window !== 'undefined' ? localStorage.getItem('token') : null);

  function save(tokenStr:string){
    localStorage.setItem('token', tokenStr);
    setToken(tokenStr);
  }
  function logout(){
    localStorage.removeItem('token');
    setToken(null);
  }
  return { token, save, logout };
}
