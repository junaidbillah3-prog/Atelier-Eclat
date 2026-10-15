'use client'
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function NewProduct() {
  const [form, setForm] = useState({ title: '', atelier: 'wardrobe', price: '', composition: '', description: '' })
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const submit = async (e: any) => {
    e.preventDefault()
    setSaving(true)

    let imageUrl = ''
    if(file){
      const name = `${Date.now()}-${file.name}`
      const { error: upErr } = await supabase.storage.from('product-images').upload(name, file)
      if(upErr){ alert(upErr.message); setSaving(false); return }
      const { data } = supabase.storage.from('product-images').getPublicUrl(name)
      imageUrl = data.publicUrl
    }

    const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
    const { error } = await supabase.from('products').insert({
      title: form.title, slug, atelier: form.atelier,
      price: parseInt(form.price), composition: form.composition,
      description: form.description, images: [imageUrl]
    })
    setSaving(false)
    if(error){ alert(error.message); return }
    router.push('/wardrobe')
  }

  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-4xl">NEW PRODUCT</h1>
      <form onSubmit={submit} className="mt-10 space-y-4">
        <input required placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <select value={form.atelier} onChange={e=>setForm({...form, atelier:e.target.value})} className="w-full border border-black/20 p-4 text-">
          <option value="wardrobe">WARDROBE</option>
          <option value="parfum">PARFUM</option>
          <option value="rituel">RITUEL</option>
        </select>
        <input required type="number" placeholder="Price — 850" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <input required placeholder="Composition" value={form.composition} onChange={e=>setForm({...form, composition:e.target.value})} className="w-full border border-black/20 p-4 text-" />
        <input required type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full border border-black/20 p-4 text-" />
        <textarea required placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="w-full border border-black/20 p-4 text- h-32" />
        <button disabled={saving} className="w-full bg-black text-white py-4 text- tracking-[0.3em] uppercase">{saving?'UPLOADING...':'CREATE PRODUCT'}</button>
      </form>
    </div>
  )
}