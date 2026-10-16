'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import ProductCard from "@/components/store/ProductCard"

type Gender = 'all' | 'men' | 'women' | 'unisex'
type Season = 'all' | 'spring' | 'summer' | 'fall' | 'winter' | 'all-season'

export default function Parfum() {
  const [products, setProducts] = useState<any[]>([])
  const [gender, setGender] = useState<Gender>('all')
  const [season, setSeason] = useState<Season>('all')
  const supabase = createClient()

  useEffect(()=>{
    supabase.from('products').select('*').eq('atelier','parfum').order('created_at', { ascending: false }).then(({ data })=>{
      setProducts(data || [])
    })
  }, [])

  const filtered = products.filter(p => {
    const gMatch = gender === 'all' || (p.gender || 'unisex') === gender
    const sMatch = season === 'all' || (p.season || p.subcategory || 'all-season') === season
    return gMatch && sMatch
  })

  const seasons: Season[] = ['all','spring','summer','fall','winter','all-season']
  const genders: Gender[] = ['all','men','women','unisex']

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-6 py-12 md:py-16 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em]">PARFUM</h1>
          <p className="mt-4 text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#C2A27A]">
            EDP 100ML — SORT BY SEASON & GENDER
          </p>
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase opacity-40">{filtered.length} SCENTS</p>
      </div>

      {/* GENDER TABS */}
      <div className="mt-8 flex flex-wrap gap-px bg-black/10 border border-black/10 w-fit">
        {genders.map(g=>(
          <button
            key={g}
            onClick={()=>setGender(g)}
            className={`px-4 md:px-6 py-3 text-[11px] tracking-[0.2em] uppercase transition ${gender===g? 'bg-black text-white' : 'bg-[#F6F2EB] hover:bg-white'}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* SEASON PILLS */}
      <div className="mt-4 flex flex-wrap gap-2">
        {seasons.map(s=>(
          <button
            key={s}
            onClick={()=>setSeason(s)}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition ${season===s? 'bg-[#C2A27A] text-white border-[#C2A27A]' : 'bg-transparent border-black/15 hover:border-black'}`}
          >
            {s} {s!=='all' ? 'scent' : ''}
          </button>
        ))}
      </div>

      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 gap-y-10 md:gap-y-16">
        {filtered.map((p: any) => <ProductCard key={p.id} p={p} />)}
        {!filtered.length && <div className="col-span-full py-20 text-center text-xs tracking-[0.2em] uppercase opacity-40">No {gender} / {season} scents yet</div>}
      </div>
    </div>
  )
}