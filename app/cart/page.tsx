'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([])
  useEffect(() => { setCart(JSON.parse(localStorage.getItem('atelier-cart') || '[]')) }, [])

  const remove = (index: number) => {
    const newCart = cart.filter((_, i) => i!== index)
    setCart(newCart)
    localStorage.setItem('atelier-cart', JSON.stringify(newCart))
    window.dispatchEvent(new Event('cart-updated'))
  }

  const total = cart.reduce((sum, p) => sum + (p.price || 0), 0)

  if (!cart.length) {
    return (
      <div className="mx-auto max-w- px-6 py-32 text-center">
        <h1 className="font-display text-5xl">CART EMPTY</h1>
        <Link href="/wardrobe" className="inline-block mt-8 text- tracking-[0.3em] uppercase border border-black px-8 py-3">SHOP WARDROBE</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w- px-6 py-16">
      <h1 className="font-display text-6xl">CART</h1>
      <div className="mt-12 grid md:grid-cols-[1.5fr_0.5fr] gap-16">
        <div className="space-y-6">
          {cart.map((p, i) => (
            <div key={`${p.id}-${i}`} className="flex gap-6 border-b border-black/10 pb-6">
              <div className="w-24 h-32 bg-[#D6D2C8]"><img src={p.images?.[0]} className="w-full h-full object-cover" alt={p.title} /></div>
              <div className="flex-1">
                <h4 className="font-display text-">{p.title}</h4>
                <p className="text- uppercase opacity-60 mt-1">{p.composition}</p>
                <p className="mt-3 text-">R {p.price}</p>
              </div>
              <button onClick={() => remove(i)} className="text- tracking-[0.2em] uppercase opacity-50 hover:opacity-100">REMOVE</button>
            </div>
          ))}
        </div>
        <div className="border border-black/10 p-8 h-fit">
          <div className="flex justify-between text-"><span>Subtotal</span><span>R {total}</span></div>
          <div className="flex justify-between mt-2 text- opacity-60"><span>Shipping</span><span>Calculated at checkout</span></div>
          <Link href="/checkout" className="block mt-8 bg-[#121212] text-[#F6F2EB] text-center py-4 text- tracking-[0.3em] uppercase">CHECKOUT</Link>
        </div>
      </div>
    </div>
  )
}