import Link from "next/link"

export default function Admin() {
  return (
    <div className="mx-auto max-w- px-6 py-20">
      <h1 className="font-display text-6xl">ADMIN</h1>
      <p className="mt-3 text- tracking-[0.3em] uppercase opacity-60">Atelier Eclat — Private</p>

      <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-">
        <Link href="/admin/orders" className="border border-black p-8 hover:bg-black hover:text-white transition">
          <p className="font-display text-2xl">ORDERS</p>
          <p className="text- mt-2 opacity-60">View all paid orders</p>
        </Link>

        <Link href="/admin/products/new" className="border border-black p-8 bg-black text-white hover:bg-white hover:text-black transition">
          <p className="font-display text-2xl">+ NEW PRODUCT</p>
          <p className="text- mt-2 opacity-60">Add tee, parfum, rituel without SQL</p>
        </Link>

        <Link href="/admin/products" className="border border-black/20 p-8 hover:bg-black/5 transition">
          <p className="font-display text-2xl">ALL PRODUCTS</p>
          <p className="text-[11px] mt-2 opacity-60">Edit / Delete stock</p>
        </Link>
      </div>
    </div>
  )
}