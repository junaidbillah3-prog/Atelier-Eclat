'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin() {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(false)
  const router = useRouter()
  const submit = async (e:any) => {
    e.preventDefault()
    const res = await fetch('/api/admin-login', { method: 'POST', body: JSON.stringify({ password: pw }) })
    if(res.ok){ router.push('/admin/orders') }
    else setErr(true)
  }
  return (
    <div className="mx-auto max-w- px-6 py-32">
      <h1 className="font-display text-4xl">ADMIN LOGIN</h1>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="Password" className="w-full border border-black/20 p-4 text-" />
        {err && <p className="text- text-red-500 uppercase tracking-[0.2em]">Wrong password</p>}
        <button className="w-full bg-black text-white py-4 text- tracking-[0.3em] uppercase">ENTER</button>
      </form>
    </div>
  )
}