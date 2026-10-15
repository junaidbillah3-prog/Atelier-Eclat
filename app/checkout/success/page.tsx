import Link from "next/link"
export default function Success() {
  return (
    <div className="mx-auto max-w- px-6 py-32 text-center">
      <h1 className="font-display text-7xl leading-[0.9]">ORDER<br/>CONFIRMED</h1>
      <p className="mt-6 text- opacity-60 max-w- mx-auto">We’ve got it. Your Atelier Eclat parcel is being cut, packed and scented. You’ll get an email with tracking. Wear it like you own the room.</p>
      <Link href="/wardrobe" className="inline-block mt-10 bg-[#121212] text-[#F6F2EB] px-10 py-4 text- tracking-[0.3em] uppercase">CONTINUE SHOPPING</Link>
    </div>
  )
}