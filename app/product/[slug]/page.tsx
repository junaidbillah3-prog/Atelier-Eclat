import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import AddToCart from "@/components/store/AddToCart"

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from('products').select('*').eq('slug', slug).single()

  if (!product) return notFound()

  return (
    <div className="mx-auto max-w- px-6 py-16 grid md:grid-cols-2 gap-16">
      <div className="aspect-[4/5] bg-[#D6D2C8]">
        <img src={product.images?.[0]} className="w-full h-full object-cover" alt={product.title} />
      </div>
      <div className="pt-8">
        <p className="text- tracking-[0.3em] uppercase text-[#C2A27A]">{product.atelier} • {product.composition}</p>
        <h1 className="font-display text-5xl mt-4 leading-[0.9]">{product.title}</h1>
        <p className="mt-6 text- leading-relaxed opacity-70 max-w-">{product.description}</p>
        <p className="mt-8 text-2xl font-display">R {product.price}</p>
        <AddToCart product={product} />
      </div>
    </div>
  )
}