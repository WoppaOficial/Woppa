// Ubicación: app/[username]/[product_id]/page.js
import { supabase } from '@/lib/supabaseClient'

export default async function ProductPage({ params }) {
  // Resolvemos los params (necesario en versiones recientes de Next.js)
  const { product_id } = await params

  // 1. Consultar el producto actual y los datos de su perfil
  const { data: product, error } = await supabase
    .from('products')
    .select('*, profiles(username, whatsapp_link), product_tags(tag_id)')
    .eq('id', product_id)
    .single()

  if (error || !product) {
    return <div className="p-10 text-center text-stone-500">Producto no encontrado</div>
  }

  // 2. Obtener IDs de etiquetas del producto actual para la comparación
  const tagIds = product.product_tags.map(pt => pt.tag_id)

  // 3. Buscar productos similares que compartan etiquetas
  // Incluimos profiles(username) para que el enlace del producto relacionado sea correcto
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*, product_tags!inner(tag_id), profiles(username)')
    .in('product_tags.tag_id', tagIds)
    .neq('id', product_id)
    .limit(3)

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 text-[#4A4A4A]">
      {/* Tarjeta del Producto Principal */}
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden">
        <img 
          src={product.image_url} 
          alt={product.title} 
          className="w-full h-64 object-cover" 
        />
        
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-stone-800">{product.title}</h1>
          <p className="mt-2 text-stone-600">{product.description}</p>
          <p className="mt-4 text-xl font-bold text-stone-900">${product.price}</p>
          
          <a 
            href={product.profiles.whatsapp_link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block mt-6 py-3 bg-[#E8F5E9] text-[#2E7D32] text-center font-medium rounded-2xl hover:bg-[#C8E6C9] transition-colors"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      {/* Sección de Productos Relacionados */}
      <section className="max-w-md mx-auto mt-8">
        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-4">
          Te podría interesar
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {relatedProducts?.map(item => (
            <a 
              key={item.id} 
              href={`/${item.profiles.username}/${item.id}`} 
              className="bg-white p-4 rounded-2xl border border-stone-100 hover:shadow-md transition-shadow"
            >
              <p className="text-sm font-medium text-stone-700">{item.title}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}