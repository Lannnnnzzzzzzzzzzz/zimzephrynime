import useSWR from 'swr';
const fetcher = (url:string)=>fetch(url).then(r=>r.json());

export default function ComicChapter({ params }: { params: { slug: string } }){
  const slug = params.slug;
  const { data } = useSWR('/api/comic/chapter/' + slug, fetcher);
  const images = data?.images || [];
  if(!data) return <div className="text-slate-400">Loading...</div>;
  return (
    <div>
      <h1 className="text-2xl font-bold">{data.title || 'Chapter'}</h1>
      <div className="space-y-6 mt-4">
        {images.map((img:string,i:number)=>(
          <img key={i} src={img} alt={'page'+i} className="w-full rounded shadow"/>
        ))}
      </div>
    </div>
  );
}
