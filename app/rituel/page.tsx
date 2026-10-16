import { createClient } from "@/lib/supabase/server"
import ProductCard from "@/components/store/ProductCard"

export default async function Rituel() {
  const supabase = await createClient()
  const { data: products } = await supabase.from('products').select('*').eq('atelier','rituel').order('price')
  return (
    <div className="mx-auto max-w-[1600px] px-4 md:px-6 py-12 md:py-16 overflow-x-hidden">
      <h1 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9] tracking-[-0.04em]">RITUEL</h1>
      <p className="mt-4 text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#C2A27A] max-w-full">
        Capsule 01 — Heavy fabrics, clean cuts, low logo
      </p>
      <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 gap-y-10 md:gap-y-16">
        {products?.map((p) => <ProductCard key={p.id} p={p} />)}
        {!products?.length && (
          <p className="opacity-50 text-sm col-span-full">
            No products yet — run the SQL seed I gave you earlier in Supabase.
          </p>
        )}
      </div>
    </div>
  )
}