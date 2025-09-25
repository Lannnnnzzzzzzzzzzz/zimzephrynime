import Link from 'next/link';

export default function Home(){
  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-4">
        <Link href='/anime' className="p-6 bg-slate-800 rounded hover:scale-105 transition">Anime</Link>
        <Link href='/donghua' className="p-6 bg-slate-800 rounded hover:scale-105 transition">Donghua</Link>
        <Link href='/comic' className="p-6 bg-slate-800 rounded hover:scale-105 transition">Comic</Link>
      </section>
      <section>
        <h2 className="text-2xl font-bold">Trending</h2>
        <p className="text-slate-400">Data loads from API endpoints</p>
      </section>
    </div>
  );
}
