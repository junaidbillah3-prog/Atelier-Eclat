import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/store/ProductCard"

export default async function Home() {
  const supabase = await createClient()
  const { data: featured } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(3)

  return (
    <div className="bg-[#F6F2EB] overflow-x-hidden">
      {/* VIDEO HERO - MOBILE FIXED */}
      <section className="relative w-full min-h-[88vh] md:min-h-[92vh] overflow-hidden bg-[#F6F2EB] border-b border-black/10">
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
        <div className="absolute inset-0 bg-[#F6F2EB]/50" />

        <div className="relative h-full min-h-[88vh] md:min-h-[92vh] mx-auto max-w-[1600px] px-4 md:px-6 pt-20 md:pt-28 pb-10 md:pb-16 grid grid-cols-1 md:grid-cols-[1.1fr_0.6fr] gap-8 md:gap-12 items-end">
          <h1 className="font-display text-[14vw] sm:text-[12vw] md:text-[8.5vw] lg:text-[7.2rem] leading-[0.82] tracking-[-0.05em] uppercase text-black break-words">
            CLOTHING<br/>THAT<br/>SMELLS<br/>LIKE<br/>
            <span className="italic font-light">MONEY.</span>
          </h1>
          <div className="pb-2 md:pb-6">
            <p className="text-sm md:text-[15px] leading-[1.7] opacity-70 max-w-[38ch]">
              Atelier Eclat — Wardrobe, Parfum, Rituel. Heavy fabrics, clean cuts, low logo. Scent-matched layering system.
            </p>
            <div className="mt-8 md:mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link href="/wardrobe" className="bg-black text-white px-6 md:px-10 py-4 text-xs tracking-[0.3em] uppercase text-center">
                SHOP WARDROBE
              </Link>
              <Link href="/parfum" className="border border-black px-6 md:px-10 py-4 text-xs tracking-[0.3em] uppercase text-center bg-white/20 backdrop-blur">
                SHOP PARFUM
              </Link>
            </div>
            <div className="mt-8 md:mt-12 flex gap-6 md:gap-8 text-[11px] tracking-[0.2em] uppercase opacity-40">
              <span>EST. 2026 PE</span><span>•</span><span>450 GSM</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES - STACKS ON MOBILE */}
      <section className="mx-auto max-w-[1600px] px-4 md:px-6 py-4 md:py-12 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1px] bg-black/10 border-y border-black/10">
        {[
          { href: "/wardrobe", title: "WARDROBE", sub: "450 GSM Tees, Wool Trousers", img: "/images/wardrobe.jpg" },
          { href: "/parfum", title: "PARFUM", sub: "Noir / Blanc / Eclat 100ML", img: "/images/parfum.jpg" },
          { href: "/rituel", title: "RITUEL", sub: "Gel, Lotion, Body — Scent Locked", img: "/images/rituel.jpg" },
        ].map((c) => (
          <Link key={c.href} href={c.href} className="group relative aspect-[4/3] md:aspect-[4/5] bg-[#D6D2C8] overflow-hidden">
            <img src={c.img} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition duration-[1.2s]" alt={c.title} />
            <div className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-0 p-6 md:p-8 text-white w-full">
              <h3 className="font-display text-3xl md:text-4xl leading-none">{c.title}</h3>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-80 mt-3">{c.sub}</p>
            </div>
          </Link>
        ))}
      </section>

      <section className="mx-auto max-w-[1600px] px-4 md:px-6 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-black/10 pb-6">
          <h2 className="font-display text-4xl md:text-6xl">LATEST DROP</h2>
          <Link href="/wardrobe" className="text-xs tracking-[0.3em] uppercase opacity-60">
            View All →
          </Link>
        </div>
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {featured?.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  )
}