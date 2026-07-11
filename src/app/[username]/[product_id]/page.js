// Ubicación: app/[username]/[product_id]/page.js

import { supabase } from '@/lib/supabaseClient'

export default async function ProductPage({ params }) {
  const { product_id } = await params

  // 1. Consultar el producto actual
  const { data: product, error } = await supabase
    .from('products')
    .select('*, profiles(username, whatsapp_link), product_tags(tag_id)')
    .eq('id', product_id)
    .single()

  if (error || !product) return <div>Producto no encontrado</div>

  // 2. Obtener IDs de etiquetas del producto actual
  const tagIds = product.product_tags.map(pt => pt.tag_id)

  // 3. Buscar productos similares (que compartan etiquetas)
  const { data: relatedProducts } = await supabase
    .from('products')
    .select('*, product_tags!inner(tag_id)')
    .in('product_tags.tag_id', tagIds)
    .neq('id', product_id)
    .limit(3)

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>{product.title}</h1>
      <img src={product.image_url} alt={product.title} style={{ maxWidth: '300px' }} />
      <p>{product.description}</p>
      
      <a href={product.profiles.whatsapp_link} target="_blank" style={{ display: 'block', margin: '20px 0', padding: '10px', background: '#25D366', color: 'white', textAlign: 'center', borderRadius: '8px' }}>
        Contactar en WhatsApp
      </a>

      {/* Sección de Descubrimiento Contextual */}
      <section>
        <h3>Te podría interesar</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {relatedProducts?.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
              <p>{item.title}</p>
              <a href={`/${product.profiles.username}/${item.id}`}>Ver detalle</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}