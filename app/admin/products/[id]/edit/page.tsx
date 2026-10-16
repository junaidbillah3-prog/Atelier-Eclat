'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

type Atelier = 'all' | 'wardrobe' | 'parfum' | 'rituel'
type Gender = 'all' | 'men' | 'women' | 'unisex'

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([])
  const [filter, setFilter] = useState<Atelier>('all')
  const [genderFilter, setGenderFilter] = useState<Gender>('all')
  const supabase = createClient()

  const load = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if(error){ console.error(error); alert(error.message); return }
    setProducts(data || [])
  }
  useEffect(()=>{ load() }, [])

  const del = async (id: string) => {
    if(!confirm('Delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if(error){ alert(error.message); return }
    load()
  }

  const filtered = products.filter(p => {
    const atelierMatch = filter === 'all' || p.atelier === filter
    const genderMatch = genderFilter === 'all' || (p.gender || 'unisex') === genderFilter
    return atelierMatch && genderMatch
  })

  const count = (a: string) => products.filter(p => p.atelier === a).length

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-6 py-12 md:py-16 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
        <h1 className="font-display text-4xl uppercase">Products</h1>
        <Link href="/admin/products/new" className="bg-black text-white px-6 py-3 text-xs tracking-[0.3em] uppercase text-center">+ NEW</Link>
      </div>

      {/* ATELIER TABS */}
      <div className="mt-8 flex flex-wrap gap-px bg-black/10 border border-black/10 w-fit">
        {[
          { k: 'all', label: `ALL (${products.length})` },
          { k: 'wardrobe', label: `WARDROBE (${count('wardrobe')})` },
          { k: 'parfum', label: `PARFUM (${count('parfum')})` },
          { k: 'rituel', label: `RITUEL (${count('rituel')})` },
        ].map(tab=>(
          <button
            key={tab.k}
            onClick={()=>setFilter(tab.k as Atelier)}
            className={`px-4 md:px-6 py-3 text-[11px] md:text-xs tracking-[0.2em] uppercase transition ${filter===tab.k? 'bg-black text-white' : 'bg-[#F6F2EB] hover:bg-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* GENDER TABS */}
      <div className="mt-3 flex flex-wrap gap-px bg-black/10 border border-black/10 w-fit">
        {(['all','men','women','unisex'] as Gender[]).map(g=>(
          <button
            key={g}
            onClick={()=>setGenderFilter(g)}
            className={`px-4 md:px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase transition ${genderFilter===g? 'bg-black text-white' : 'bg-white hover:bg-[#F6F2EB]'}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="mt-6 grid gap-px bg-black/10 border border-black/10">
        {filtered.map(p=>(
          <div key={p.id} className="bg-[#F6F2EB] p-4 flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6">
            <img src={p.images?.[0]} className="w-20 h-24 object-cover bg-[#D6D2C8] shrink-0" alt={p.title} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-lg md:text-xl uppercase truncate">{p.title}</p>
                <span className={`text-[10px] tracking-[0.2em] px-2 py-1 border uppercase ${p.atelier==='parfum'? 'border-[#C2A27A] text-[#C2A27A]' : p.atelier==='rituel'? 'border-black/20' : 'border-black'}`}>{p.atelier}</span>
                <span className="text-[10px] tracking-[0.2em] px-2 py-1 border border-black/10 uppercase">{p.gender || 'unisex'}</span>
                {p.subcategory && <span className="text-[10px] tracking-[0.2em] px-2 py-1 bg-black text-white uppercase">{p.subcategory}</span>}
                {p.season && <span className="text-[10px] tracking-[0.2em] px-2 py-1 bg-[#C2A27A] text-white uppercase">{p.season} scent</span>}
              </div>
              <p className="text-[11px] tracking-[0.2em] opacity-60 mt-1 truncate">R{p.price} • {p.slug} • {p.composition}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link href={`/admin/products/${p.id}/edit`} className="border border-black px-4 md:px-5 py-2 text-[11px] tracking-[0.2em] uppercase hover:bg-black hover:text-white transition">EDIT</Link>
              <button onClick={()=>del(p.id)} className="border border-red-500/30 text-red-600 px-4 md:px-5 py-2 text-[11px] tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition">DELETE</button>
            </div>
          </div>
        ))}
        {!filtered.length && <div className="bg-[#F6F2EB] p-12 text-xs opacity-40 uppercase tracking-[0.2em] text-center">No {filter} / {genderFilter} products</div>}
      </div>
    </div>
  )
}