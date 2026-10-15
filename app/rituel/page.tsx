import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/store/ProductCard"

export default async function Rituel() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').eq('atelier','rituel').order('price')
  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-6xl md:text-7xl">RITUEL</h1>
      <p className="mt-4 text- tracking-[0.3em] uppercase text-[#C2A27A]">Capsule 01 — Heavy fabrics, clean cuts, low logo</p>
      <div className="mt-16 grid md:grid-cols-3 gap-8 gap-y-16">
        {products?.map((p) => <ProductCard key={p.id} p={p} />)}
        {!products?.length && <p className="opacity-50 text-">No products yet — run the SQL seed I gave you earlier in Supabase.</p>}
      </div>
    </div>
  )
}