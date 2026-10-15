'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [count, setCount] = useState(0)
  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem('atelier-cart') || '[]')
    setCount(cart.length)
  }
  useEffect(() => {
    updateCount()
    window.addEventListener('cart-updated', updateCount)
    window.addEventListener('storage', updateCount)
    return () => {
      window.removeEventListener('cart-updated', updateCount)
      window.removeEventListener('storage', updateCount)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-[#F6F2EB] border-b border-black/10">
      <div className="mx-auto max-w- px-6 h- flex items-center justify-between">
        <Link href="/" className="font-display text- tracking-[0.2em]">ATELIER ECLAT</Link>
        <div className="flex gap-8 text- tracking-[0.2em]">
          <Link href="/wardrobe" className="hover:opacity-60">WARDROBE</Link>
          <Link href="/parfum" className="hover:opacity-60">PARFUM</Link>
          <Link href="/rituel" className="hover:opacity-60">RITUEL</Link>
        </div>
        <Link href="/cart" className="text- tracking-[0.2em]">CART ({count})</Link>
      </div>
    </nav>
  )
}