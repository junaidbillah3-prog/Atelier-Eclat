'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function Checkout() {
  const [cart, setCart] = useState<any[]>([])
  const [form, setForm] = useState({ full_name: '', email: '', address: '', city: '', postal_code: '' })
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => { setCart(JSON.parse(localStorage.getItem('atelier-cart') || '[]')) }, [])
  const total = cart.reduce((s,p)=>s+p.price,0)

  const handlePay = async (e: any) => {
    e.preventDefault()
    if(!cart.length) return
    setLoading(true)
    const { error } = await supabase.from('orders').insert({
     ...form,
      total,
      items: cart
    })
    setLoading(false)
    if(error){ alert(error.message); return }
    localStorage.removeItem('atelier-cart')
    window.dispatchEvent(new Event('cart-updated'))
    router.push('/checkout/success')
  }

  if(!cart.length) return <div className="p-20 font-display text-4xl">No items.</div>

  return (
    <div className="mx-auto max-w- px-6 py-16 grid md:grid-cols-[1.2fr_0.8fr] gap-16">
      <form onSubmit={handlePay} className="space-y-6">
        <h1 className="font-display text-5xl">CHECKOUT</h1>
        <div className="grid grid-cols-2 gap-4">
          <input required placeholder="Full Name" value={form.full_name} onChange={e=>setForm({...form, full_name: e.target.value})} className="border border-black/20 bg-transparent p-4 text-" />
          <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} className="border border-black/20 bg-transparent p-4 text-" />
        </div>
        <input required placeholder="Address" value={form.address} onChange={e=>setForm({...form, address: e.target.value})} className="w-full border border-black/20 bg-transparent p-4 text-" />
        <div className="grid grid-cols-2 gap-4">
          <input required placeholder="City" value={form.city} onChange={e=>setForm({...form, city: e.target.value})} className="border border-black/20 bg-transparent p-4 text-" />
          <input required placeholder="Postal Code" value={form.postal_code} onChange={e=>setForm({...form, postal_code: e.target.value})} className="border border-black/20 bg-transparent p-4 text-" />
        </div>
        <button disabled={loading} className="w-full bg-[#121212] text-[#F6F2EB] py-4 text- tracking-[0.3em] uppercase">
          {loading? 'SAVING ORDER...' : `PAY R ${total}`}
        </button>
      </form>
      <div className="border border-black/10 p-8 h-fit">
        <p className="text- tracking-[0.3em] uppercase">Order ({cart.length})</p>
        <div className="mt-6 space-y-3">{cart.map((p,i)=><div key={i} className="flex justify-between text-"><span>{p.title}</span><span>R {p.price}</span></div>)}</div>
        <div className="border-t border-black/10 mt-6 pt-6 flex justify-between font-display text-xl"><span>Total</span><span>R {total}</span></div>
      </div>
    </div>
  )
}