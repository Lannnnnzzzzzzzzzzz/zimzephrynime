'use client';
import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url, { headers: { Authorization: 'Bearer '+localStorage.getItem('token') } }).then(r=>r.json());
export function useFavorites(){ const { data, mutate } = useSWR('/api/favorites', fetcher); return { data, mutate }; }
