'use client'
import { useState } from 'react'
export default function AddToCart({ product }: { product: any }) {
  const [added, setAdded] = useState(false)
  const add = () => {
    const cart = JSON.parse(localStorage.getItem('atelier-cart') || '[]')
    cart.push(product)
    localStorage.setItem('atelier-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
    setAdded(true)
    setTimeout(()=>setAdded(false), 1500)
  }
  return <button onClick={add} className="w-full mt-8 bg-[#121212] text-[#F6F2EB] py-4 text- tracking-[0.3em] uppercase">{added? 'ADDED ✓' : `ADD — R ${product.price}`}</button>
}