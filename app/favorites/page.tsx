'use client';
import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url, { headers: { Authorization: 'Bearer '+localStorage.getItem('token') } }).then(r=>r.json());

export default function Favorites(){
  const { data } = useSWR('/api/favorites', fetcher);
  const list = data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold">Favorites</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {list.map((f:any)=>(
          <div key={f._id} className="bg-slate-800 p-3 rounded">
            <img src={f.cover} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 font-semibold">{f.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
