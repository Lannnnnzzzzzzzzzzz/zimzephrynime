import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function DonghuaEpisode({ params }: { params: { slug: string } }){
  const slug = params.slug;
  const { data } = useSWR('/api/donghua/episode/' + slug, fetcher);
  const res = data || {};
  if(!data) return <div className="text-slate-400">Loading...</div>;
  const servers = res.streaming?.servers || [];
  const first = servers[0]?.url || res.streaming?.main_url?.url || '';
  return (
    <div>
      <h1 className="text-2xl font-bold">{res.episode || 'Episode'}</h1>
      <div className="mt-4">
        <iframe src={first} className="w-full h-[480px] rounded" />
      </div>
    </div>
  );
}
