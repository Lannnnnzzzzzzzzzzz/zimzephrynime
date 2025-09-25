import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function DonghuaDetail({ params }: { params: { slug: string } }){
  const slug = params.slug;
  const { data } = useSWR('/api/donghua/detail/' + slug, fetcher);
  const item = data || {};
  if(!data) return <div className="text-slate-400">Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{item.title || 'Detail'}</h1>
      <p className="text-slate-400">{item.synopsis}</p>
    </div>
  );
}
