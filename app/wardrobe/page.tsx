'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import ProductCard from "@/components/store/ProductCard"

type Gender = 'all' | 'men' | 'women' | 'unisex'
type WardrobeCat = 'all' | 'trouser' | 'coat' | 'tshirt' | 'accessories' | 'blazer' | 'shirt' | 'dresses'

const CATS = {
  men: ['trouser','coat','tshirt','accessories','blazer','shirt'] as WardrobeCat[],
  women: ['trouser','coat','tshirt','accessories','blazer','shirt','dresses'] as WardrobeCat[],
  unisex: ['trouser','coat','tshirt','accessories','blazer','shirt','dresses'] as WardrobeCat[],
  all: ['trouser','coat','tshirt','accessories','blazer','shirt','dresses'] as WardrobeCat[]
}

export default function Wardrobe() {
  const [products, setProducts] = useState<any[]>([])
  const [gender, setGender] = useState<Gender>('all')
  const [cat, setCat] = useState<WardrobeCat>('all')
  const supabase = createClient()

  useEffect(()=>{
    supabase.from('products').select('*').eq('atelier','wardrobe').order('created_at', { ascending: false }).then(({ data })=>{
      setProducts(data || [])
    })
  }, [])

  const filtered = products.filter(p => {
    const gMatch = gender === 'all' || (p.gender || 'unisex') === gender
    const cMatch = cat === 'all' || (p.subcategory || '').toLowerCase() === cat
    return gMatch && cMatch
  })

  const availableCats = CATS[gender]
  const genders: Gender[] = ['all','men','women','unisex']

  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-6 py-12 md:py-16 overflow-x-hidden">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em]">WARDROBE</h1>
          <p className="mt-4 text-[11px] md:text-xs tracking-[0.3em] uppercase opacity-60">450 GSM • HEAVY FABRICS • LOW LOGO</p>
        </div>
        <p className="text-[11px] tracking-[0.2em] uppercase opacity-40">{filtered.length} PIECES</p>
      </div>

      {/* GENDER */}
      <div className="mt-8 flex flex-wrap gap-px bg-black/10 border border-black/10 w-fit">
        {genders.map(g=>(
          <button
            key={g}
            onClick={()=>{ setGender(g); setCat('all') }}
            className={`px-5 md:px-7 py-3 text-[11px] tracking-[0.2em] uppercase transition ${gender===g? 'bg-black text-white' : 'bg-[#F6F2EB] hover:bg-white'}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* SUB CATS */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={()=>setCat('all')} className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition ${cat==='all'? 'bg-black text-white border-black' : 'bg-transparent border-black/15 hover:border-black'}`}>ALL</button>
        {availableCats.map(c=>(
          <button
            key={c}
            onClick={()=>setCat(c)}
            className={`px-4 py-2 text-[11px] tracking-[0.2em] uppercase border transition ${cat===c? 'bg-black text-white border-black' : 'bg-transparent border-black/15 hover:border-black'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 gap-y-10 md:gap-y-16">
        {filtered.map((p: any) => <ProductCard key={p.id} p={p} />)}
        {!filtered.length && <div className="col-span-full py-20 text-center text-xs tracking-[0.2em] uppercase opacity-40">No {gender} / {cat} pieces yet</div>}
      </div>
    </div>
  )
}