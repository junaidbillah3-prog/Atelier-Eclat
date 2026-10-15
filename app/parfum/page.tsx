import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/store/ProductCard"
export default async function Parfum() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').eq('atelier','parfum').order('price')
  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-6xl md:text-7xl">PARFUM</h1>
      <p className="mt-4 text- tracking-[0.3em] uppercase text-[#C2A27A]">EDP 100ML — 12H Longevity, SA Made</p>
      <div className="mt-16 grid md:grid-cols-3 gap-8 gap-y-16">
        {products?.map((p: any) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  )
}