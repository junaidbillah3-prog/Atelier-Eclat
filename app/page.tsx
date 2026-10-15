import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/store/ProductCard"

export default async function Home() {
  const supabase = await createClient()
  const { data: featured } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(3)

  return (
    <div className="bg-[#F6F2EB]">

      {/* VIDEO HERO - RIGHT UNDER NAVBAR, MOVES WITH PAGE */}
      <section className="relative w-full h- md:h- overflow-hidden bg-[#F6F2EB] border-b border-black/10">
        {/* low opacity video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.48]"
        >
          <source src="/videos/jordan.mp4" type="video/mp4" />
        </video>
        {/* wash for readability */}
        <div className="absolute inset-0 bg-[#F6F2EB]/50" />

        {/* your original layout - now over video */}
        <div className="relative h-full mx-auto max-w- px-6 pt-20 md:pt-28 pb-16 grid md:grid-cols-[1.1fr_0.6fr] gap-12 items-end">
          <h1 className="font-display text- md:text-[8.5vw] leading-[0.82] tracking-[-0.05em] uppercase text-black">
            CLOTHING<br/>THAT<br/>SMELLS<br/>LIKE<br/>
            <span className="italic font-light">MONEY.</span>
          </h1>
          <div className="pb-2 md:pb-6">
            <p className="text- leading-[1.7] opacity-70 max-w-">
              Atelier Eclat — Wardrobe, Parfum, Rituel. Heavy fabrics, clean cuts, low logo. Scent-matched layering system.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/wardrobe" className="bg-black text-white px-10 py-4 text- tracking-[0.3em] uppercase">SHOP WARDROBE</Link>
              <Link href="/parfum" className="border border-black px-10 py-4 text- tracking-[0.3em] uppercase">SHOP PARFUM</Link>
            </div>
            <div className="mt-12 flex gap-8 text- tracking-[0.2em] uppercase opacity-40">
              <span>EST. 2026 PE</span><span>•</span><span>450 GSM</span>
            </div>
          </div>
        </div>
      </section>

      {/* REST */}
      <section className="mx-auto max-w- px-6 py-12 grid md:grid-cols-3 gap- bg-black/10 border-y border-black/10">
        {[
          { href: "/wardrobe", title: "WARDROBE", sub: "450 GSM Tees, Wool Trousers", img: "/images/wardrobe.jpg" },
          { href: "/parfum", title: "PARFUM", sub: "Noir / Blanc / Eclat 100ML", img: "/images/parfum.jpg" },
          { href: "/rituel", title: "RITUEL", sub: "Gel, Lotion, Body — Scent Locked", img: "/images/rituel.jpg" },
        ].map(c=>(
          <Link key={c.href} href={c.href} className="group relative aspect-[4/5] bg-[#D6D2C8] overflow-hidden">
            <img src={c.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition duration-[1.2s]" alt={c.title} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 p-8 text-white w-full">
              <h3 className="font-display text- leading-none">{c.title}</h3>
              <p className="text- tracking-[0.2em] uppercase opacity-80 mt-3">{c.sub}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w- px-6 py-24">
        <div className="flex justify-between items-end border-b border-black/10 pb-6">
          <h2 className="font-display text-5xl md:text-6xl">LATEST DROP</h2>
          <Link href="/wardrobe" className="text- tracking-[0.3em] uppercase opacity-60">View All →</Link>
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-10">
          {featured?.map((p:any)=><ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  )
}