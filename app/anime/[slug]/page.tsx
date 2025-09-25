import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function AnimeDetail({ params }: { params: { slug: string } }){
  const slug = params.slug;
  const { data } = useSWR('/api/anime/anime/' + slug, fetcher);
  const item = data || {};
  if(!data) return <div className="text-slate-400">Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{item.title || 'Detail'}</h1>
      <p className="text-slate-400">{item.synopsis}</p>
      <div className="mt-4">
        <a className="px-4 py-2 bg-blue-600 rounded" href={`/anime/episode/${item.episodes?.[0]?.slug || ''}`}>Watch First Episode</a>
      </div>
    </div>
  );
}
