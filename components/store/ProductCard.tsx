import Link from "next/link"
export default function ProductCard({ p }: { p: any }) {
  return (
    <Link href={`/product/${p.slug}`} className="group block">
      <div className="aspect-[3/4] bg-[#D6D2C8] overflow-hidden">
        <img src={p.images?.[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" alt={p.title} />
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h4 className="font-display text- leading-tight">{p.title}</h4>
          <p className="text- tracking-[0.2em] uppercase opacity-60 mt-1">{p.atelier} • {p.composition}</p>
        </div>
        <p className="text- font-medium">R {p.price}</p>
      </div>
    </Link>
  )
}