'use client'
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [count, setCount] = useState(0)
  const [open, setOpen] = useState(false)

  const updateCount = () => {
    try {
      const cart = JSON.parse(localStorage.getItem('atelier-cart') || '[]')
      setCount(cart.length)
    } catch {
      setCount(0)
    }
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
    <nav className="sticky top-0 z-50 w-full bg-[#F6F2EB] border-b border-black/10 overflow-x-hidden">
      <div className="mx-auto max-w-[1600px] w-full px-4 md:px-6 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="font-display text-sm tracking-[0.2em] shrink-0">
          ATELIER ECLAT
        </Link>

        {/* desktop links - hidden on mobile */}
        <div className="hidden md:flex gap-8 text-xs tracking-[0.2em]">
          <Link href="/wardrobe" className="hover:opacity-60 transition">
            WARDROBE
          </Link>
          <Link href="/parfum" className="hover:opacity-60 transition">
            PARFUM
          </Link>
          <Link href="/rituel" className="hover:opacity-60 transition">
            RITUEL
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-xs tracking-[0.2em] shrink-0">
            CART ({count})
          </Link>

          {/* mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-xs tracking-[0.2em] border border-black/10 px-3 py-1.5"
            aria-label="Toggle menu"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* mobile menu - stacks, no horizontal overflow */}
      {open && (
        <div className="md:hidden w-full px-4 pb-6 pt-4 flex flex-col gap-5 text-xs tracking-[0.2em] border-t border-black/10 bg-[#F6F2EB]">
          <Link href="/wardrobe" onClick={() => setOpen(false)} className="py-1">
            WARDROBE
          </Link>
          <Link href="/parfum" onClick={() => setOpen(false)} className="py-1">
            PARFUM
          </Link>
          <Link href="/rituel" onClick={() => setOpen(false)} className="py-1">
            RITUEL
          </Link>
        </div>
      )}
    </nav>
  )
}