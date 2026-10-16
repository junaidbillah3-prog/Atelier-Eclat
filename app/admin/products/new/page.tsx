'use client'
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const WARDROBE_CATS = {
  men: ['Trouser','Coat','Tshirt','Accessories','Blazer','Shirt'],
  women: ['Trouser','Coat','Tshirt','Accessories','Blazer','Shirt','Dresses'],
  unisex: ['Trouser','Coat','Tshirt','Accessories','Blazer','Shirt','Dresses']
}

const PARFUM_SEASONS = ['Spring','Summer','Fall','Winter','All-Season']
const GENDERS = ['men','women','unisex'] as const

export default function NewProduct() {
  const [form, setForm] = useState({ 
    title: '', 
    atelier: 'wardrobe', 
    price: '', 
    composition: '', 
    description: '',
    gender: 'men' as 'men'|'women'|'unisex',
    subcategory: 'Tshirt',
    season: 'All-Season'
  })
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const currentSubCats = form.atelier === 'wardrobe' 
    ? WARDROBE_CATS[form.gender]
    : PARFUM_SEASONS

  // reset subcategory when atelier/gender changes
  const handleAtelierChange = (atelier: string) => {
    if(atelier === 'wardrobe'){
      setForm({...form, atelier, subcategory: WARDROBE_CATS[form.gender][0]})
    } else if(atelier === 'parfum'){
      setForm({...form, atelier, season: 'All-Season'})
    } else {
      setForm({...form, atelier})
    }
  }

  const handleGenderChange = (gender: 'men'|'women'|'unisex') => {
    if(form.atelier === 'wardrobe'){
      setForm({...form, gender, subcategory: WARDROBE_CATS[gender][0]})
    } else {
      setForm({...form, gender})
    }
  }

  const submit = async (e: any) => {
    e.preventDefault()
    setSaving(true)

    let imageUrl = ''
    if(file){
      const name = `${Date.now()}-${file.name}`
      const { error: upErr } = await supabase.storage.from('product-images').upload(name, file)
      if(upErr){ alert(`Upload failed: ${upErr.message}\nCreate bucket 'product-images' public in Supabase Storage.`); setSaving(false); return }
      const { data } = supabase.storage.from('product-images').getPublicUrl(name)
      imageUrl = data.publicUrl
    }

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

    const payload: any = {
      title: form.title, 
      slug, 
      atelier: form.atelier,
      price: parseInt(form.price), 
      composition: form.composition,
      description: form.description, 
      images: [imageUrl],
      gender: form.gender,
    }

    if(form.atelier === 'wardrobe'){
      payload.subcategory = form.subcategory.toLowerCase()
    }
    if(form.atelier === 'parfum'){
      payload.season = form.season.toLowerCase()
      payload.subcategory = form.season.toLowerCase() // keep both for easy filtering
    }

    const { error } = await supabase.from('products').insert(payload)
    setSaving(false)
    if(error){ alert(error.message); return }
    router.push(form.atelier === 'wardrobe' ? '/wardrobe' : form.atelier === 'parfum' ? '/parfum' : '/admin/products')
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-6 py-12 md:py-16 overflow-x-hidden">
      <h1 className="font-display text-3xl md:text-4xl uppercase">NEW PRODUCT</h1>
      
      <form onSubmit={submit} className="mt-10 space-y-4">
        <input required placeholder="Title — e.g. Wool Blazer Noir" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border border-black/20 p-4 text-sm" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select value={form.atelier} onChange={e=>handleAtelierChange(e.target.value)} className="w-full border border-black/20 p-4 text-sm">
            <option value="wardrobe">WARDROBE</option>
            <option value="parfum">PARFUM</option>
            <option value="rituel">RITUEL</option>
          </select>

          <select value={form.gender} onChange={e=>handleGenderChange(e.target.value as any)} className="w-full border border-black/20 p-4 text-sm uppercase">
            <option value="men">MEN</option>
            <option value="women">WOMEN</option>
            <option value="unisex">UNISEX</option>
          </select>
        </div>

        {/* SUBCATEGORY LOGIC */}
        {form.atelier === 'wardrobe' && (
          <select value={form.subcategory} onChange={e=>setForm({...form, subcategory:e.target.value})} className="w-full border border-black/20 p-4 text-sm">
            {WARDROBE_CATS[form.gender].map(cat=>(
              <option key={cat} value={cat}>{cat.toUpperCase()}</option>
            ))}
          </select>
        )}

        {form.atelier === 'parfum' && (
          <select value={form.season} onChange={e=>setForm({...form, season:e.target.value})} className="w-full border border-black/20 p-4 text-sm">
            {PARFUM_SEASONS.map(s=>(
              <option key={s} value={s}>{s.toUpperCase()} SCENT</option>
            ))}
          </select>
        )}

        <input required type="number" placeholder="Price — 850" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full border border-black/20 p-4 text-sm" />
        <input required placeholder="Composition — e.g. 100% Wool / EDP 100ML" value={form.composition} onChange={e=>setForm({...form, composition:e.target.value})} className="w-full border border-black/20 p-4 text-sm" />
        <input required type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border border-black/20 p-4 text-sm" />
        <textarea required placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full border border-black/20 p-4 text-sm h-32" />
        
        <button disabled={saving} className="w-full bg-black text-white py-4 text-xs tracking-[0.3em] uppercase">{saving?'UPLOADING...':'CREATE PRODUCT'}</button>
      </form>
    </div>
  )
}