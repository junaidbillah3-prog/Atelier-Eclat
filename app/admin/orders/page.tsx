import { createClient } from "@/lib/supabase/server"

export default async function OrdersAdmin() {
  const supabase = await createClient()
  const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false })

  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-5xl">ORDERS — {orders?.length || 0}</h1>
      <div className="mt-10 space-y-4">
        {orders?.map((o:any)=>(
          <div key={o.id} className="border border-black/10 p-6 grid md:grid-cols-[1fr_200px]">
            <div>
              <p className="font-display text-xl">{o.full_name} — {o.email}</p>
              <p className="text- opacity-60 mt-1">{o.address}, {o.city} {o.postal_code} • {new Date(o.created_at).toLocaleString()}</p>
              <p className="text- mt-3">{o.items?.map((i:any)=>i.title).join(', ')}</p>
            </div>
            <div className="text-right font-display text-2xl">R {o.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}