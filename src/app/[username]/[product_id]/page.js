import { supabase } from '@/lib/supabaseClient'
import { Heart, MapPin, Star } from 'lucide-react'
import ProductImage from '@/components/ProductImage'
import OrderActions from '@/components/OrderActions' 
import SelectionBar from '@/components/SelectionBar'

export default async function ProductPage({ params }) {
  const { product_id } = await params

  // 1. Obtener datos principales
  const { data: product, error } = await supabase
    .from('products')
    .select('*, profiles(username, whatsapp_link)')
    .eq('id', product_id)
    .single();

  if (error) return <div className="p-10 text-center">Error: {error.message}</div>;

  // 2. Obtener etiquetas
  const { data: tagsData } = await supabase
    .from('product_tags')
    .select('tag_id, tags(name, type)')
    .eq('product_id', product_id);

  // 3. Obtener opciones y complementos
  const { data: options } = await supabase
    .from('product_options')
    .select('*')
    .eq('product_id', product_id);
  
  const { data: rawComplements } = await supabase
    .from('product_complements')
    .select('complement_id, complements(*)')
    .eq('product_id', product_id);

  // 4. Preparar finalData
  const finalData = {
    ...product,
    product_tags: tagsData || [],
    product_options: options || [],
    complements: rawComplements ? rawComplements.map(item => item.complements) : []
  };

  // 5. Obtener productos relacionados
  let relatedProducts = [];
  const tagIds = (finalData.product_tags || []).map(pt => pt.tag_id);

  if (tagIds.length > 0) {
    const { data: related } = await supabase
      .from('products')
      .select('*, product_tags!inner(tag_id), profiles(username)')
      .in('product_tags.tag_id', tagIds)
      .neq('id', product_id)
      .limit(4);
    
    relatedProducts = related || [];
  }

  return (
    <div className="min-h-screen bg-white text-[#4A4A4A]">
      <div className="max-w-[90rem] mx-auto px-6 md:px-10">
       <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100">
  {/* Usamos grid para replicar la estructura del main */}
  <div className="max-w-[90rem] mx-auto px-6 md:px-10 md:grid md:grid-cols-12 md:gap-12 items-center py-4">
    
    {/* Columna Izquierda (7/12): Alineada con la galería */}
    <div className="md:col-span-7">
      <a href="/" className="text-xl font-bold tracking-tighter text-rose-900">Woppa</a>
    </div>

    {/* Columna Derecha (5/12): Alineada con la información */}
    <div className="md:col-span-5 flex items-center justify-between gap-6">
      
      {/* Buscador: Ocupa el espacio restante del grid de 5 */}
      <div className="flex-1">
        <input 
          type="text" 
          placeholder="¿Qué buscas hoy?" 
          className="w-full bg-stone-50 px-4 py-2 rounded-full text-sm outline-none focus:ring-1 focus:ring-rose-800"
        />
      </div>

      {/* Iconos */}
      <div className="flex items-center gap-4">
        <button className="text-stone-600 hover:text-rose-800 transition-colors">
          <Heart className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-rose-800">
          <MapPin className="w-5 h-5" />
        </button>
      </div>
    </div>
    
  </div>
</nav>

        <main className="py-8 px-4 md:px-6">
          <div className="md:grid md:grid-cols-12 md:gap-12 items-start">
            {/* Columna Izquierda: Galería de imágenes */}
<div className="md:col-span-7 flex gap-4">
  {/* Miniaturas verticales */}
  <div className="hidden md:flex flex-col gap-3 shrink-0">
    {(() => {
      const allImages = [
        finalData.image_url,
        ...(finalData.product_options?.map(o => o.image_url).filter(Boolean) || []),
        ...(finalData.complements?.map(c => c.image_url).filter(Boolean) || [])
      ].slice(0, 4);

      return allImages.map((url, idx) => (
        <button 
          key={idx} 
          className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-stone-200 hover:border-rose-800 transition-all shrink-0 relative"
        >
          <ProductImage src={url} alt={`Vista ${idx + 1}`} />
          {idx === 3 && allImages.length >= 4 && (
            <div className="absolute inset-0 bg-stone-900/60 flex items-center justify-center text-white font-bold text-sm">
              Más
            </div>
          )}
        </button>
      ));
    })()}
    
    {/* Espacio adicional si hay menos de 4 fotos */}
    {(() => {
      const count = [
        finalData.image_url,
        ...(finalData.product_options?.map(o => o.image_url).filter(Boolean) || []),
        ...(finalData.complements?.map(c => c.image_url).filter(Boolean) || [])
      ].length;
      return count < 4 && (
        <div className="w-32 h-32 rounded-2xl bg-stone-100 border-2 border-dashed border-stone-200" />
      );
    })()}
  </div>

  {/* Contenedor de Imagen Principal - Tamaño restaurado */}
  <div className="sticky top-10 w-full">
    <div className="relative rounded-[2rem] overflow-hidden shadow-sm border border-stone-100 aspect-square">
       <button className="absolute top-6 right-6 z-10 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
          <Heart className="w-6 h-6 text-rose-800" />
       </button>
       <ProductImage src={finalData.image_url} alt={finalData.title} />
    </div>
  </div>
</div>

            {/* Columna Derecha: Información del producto */}
<div className="md:col-span-5 mt-10 md:mt-0">
  <div className="flex items-center justify-between mb-8">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-stone-200 rounded-full" />
      <div>
        <h2 className="text-sm font-bold text-stone-900">{finalData.profiles.username}</h2>
        <p className="text-[10px] text-stone-500 uppercase tracking-wider">Emprendimiento verificado</p>
      </div>
    </div>
    <button className="px-4 py-1 bg-stone-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">
      Seguir
    </button>
  </div>

  <div className="flex flex-wrap gap-2 mb-6">
    {finalData.product_tags?.map((pt, index) => (
      <span key={index} className="px-3 py-1 bg-rose-50 text-rose-800 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-rose-100">
        {pt.tags.name}
      </span>
    ))}
  </div>

  {/* Título y Precio */}
  <h1 className="text-4xl font-serif font-bold text-stone-900 leading-tight">{finalData.title}</h1>
  <p className="text-3xl font-bold text-rose-800 mt-4">${finalData.price.toLocaleString()}</p>
  
  {/* Descripción sin tarjeta (limpia) */}
  <p className="mt-8 text-stone-600 leading-relaxed text-sm">
    {finalData.description}
  </p>

{/* Calificación  */}
  <div className="flex items-center gap-4 mt-8 mb-8"> 
    <div className="flex text-amber-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-current" />
      ))}
    </div>
    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">5.0 (15 ventas)</span>
  </div>

  {/* Info adicional de confianza (Idea 1) */}
  <div className="mt-8 grid grid-cols-2 gap-4">
    <div className="p-4 border border-stone-100 rounded-xl hover:border-rose-200 transition-colors">
      <p className="font-bold text-stone-900 text-xs mb-1">Trato directo</p>
      <p className="text-[10px] text-stone-500">Hablas directo con el artesano</p>
    </div>
    <div className="p-4 border border-stone-100 rounded-xl hover:border-rose-200 transition-colors">
      <p className="font-bold text-stone-900 text-xs mb-1">Pieza única</p>
      <p className="text-[10px] text-stone-500">Hecho con dedicación</p>
    </div>
  </div>

  <OrderActions product={finalData} complements={finalData.complements} relatedProducts={relatedProducts} mode="buttonOnly" />
</div>
          </div>

          <div className="mt-12">
            <OrderActions product={finalData} complements={finalData.complements} relatedProducts={relatedProducts} mode="full" />
          </div>
        </main>
      </div>
      <SelectionBar />
    </div>
  )
}