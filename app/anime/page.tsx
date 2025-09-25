import Link from 'next/link';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r=>r.json());

export default function AnimePage(){
  const { data, error } = useSWR('/api/anime/home', fetcher);
  const list = data?.results || data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Anime — Home</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {list.length ? list.map((item:any)=>(
          <Link key={item.slug || item.id} href={`/anime/${item.slug || item.id}`} className="bg-slate-800 p-3 rounded">
            <img src={item.thumb || item.image} alt={item.title} className="w-full h-40 object-cover rounded"/>
            <div className="mt-2 font-semibold">{item.title}</div>
          </Link>
        )) : <div className="text-slate-400">Loading...</div>}
      </div>
    </div>
  );
}
