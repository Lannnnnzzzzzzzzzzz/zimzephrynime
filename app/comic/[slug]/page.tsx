import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function ComicDetail({ params }: { params: { slug: string } }){
  const slug = params.slug;
  const { data } = useSWR('/api/comic/comic/' + slug, fetcher);
  const item = data || {};
  if(!data) return <div className="text-slate-400">Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{item.title || 'Komik'}</h1>
      <p className="text-slate-400">{item.description}</p>
    </div>
  );
}
