'use client'
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter, useParams } from "next/navigation"

export default function EditProduct() {
  const { id } = useParams() as { id: string }
  const [form, setForm] = useState<any>(null)
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(()=>{
    supabase.from('products').select('*').eq('id', id).single().then(({ data })=>{
      setForm(data)
    })
  }, [])

  if(!form) return <div className="p-10 text- opacity-60">LOADING...</div>

  const submit = async (e:any) => {
    e.preventDefault()
    setSaving(true)
    let imageUrl = form.images?.[0]

    if(file){
      const name = `${Date.now()}-${file.name}`
      await supabase.storage.from('product-images').upload(name, file)
      const { data } = supabase.storage.from('product-images').getPublicUrl(name)
      imageUrl = data.publicUrl
    }

    const { error } = await supabase.from('products').update({
      title: form.title,
      atelier: form.atelier,
      price: parseInt(form.price),
      composition: form.composition,
      description: form.description,
      images: [imageUrl]
    }).eq('id', id)

    setSaving(false)
    if(error){ alert(error.message); return }
    router.push('/admin/products')
  }

  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-4xl uppercase">EDIT: {form.title}</h1>
      <img src={form.images?.[0]} className="mt-6 w-full aspect-[4/5] object-cover bg-[#D6D2C8]" />
      <form onSubmit={submit} className="mt-10 space-y-4">
        <input required value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <select value={form.atelier} onChange={e=>setForm({...form, atelier:e.target.value})} className="w-full border border-black/20 p-4 text-">
          <option value="wardrobe">WARDROBE</option>
          <option value="parfum">PARFUM</option>
          <option value="rituel">RITUEL</option>
        </select>
        <input required type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <input required value={form.composition} onChange={e=>setForm({...form, composition:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border border-black/20 p-4 text-" />
        <p className="text- opacity-50 uppercase tracking-[0.2em]">Leave empty to keep current image</p>
        <textarea required value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full border border-black/20 p-4 text- h-32" />
        <button disabled={saving} className="w-full bg-black text-white py-4 text- tracking-[0.3em] uppercase">{saving?'SAVING...':'UPDATE PRODUCT'}</button>
      </form>
    </div>
  )
}