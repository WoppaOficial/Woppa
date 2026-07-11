// Ubicación: src/app/page.tsx
import { supabase } from '@/lib/supabaseClient'

export default async function Home() {
  const { data: products } = await supabase.from('products').select('*, profiles(username)')

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6">
      <h1 className="text-3xl font-bold text-stone-800 mb-8">Catálogo Woppa</h1>
      <div className="grid grid-cols-2 gap-4">
        {products?.map((product) => (
          <a key={product.id} href={`/${product.profiles.username}/${product.id}`} className="bg-white p-4 rounded-2xl border border-stone-100 shadow-sm">
            <img src={product.image_url} alt={product.title} className="rounded-xl mb-2" />
            <h2 className="font-semibold text-stone-700">{product.title}</h2>
          </a>
        ))}
      </div>
    </div>
  )
}