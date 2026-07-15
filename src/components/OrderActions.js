'use client'
import { useState, useImperativeHandle, forwardRef } from 'react'
import { useSelection } from '@/context/SelectionContext'
import ProductImage from '@/components/ProductImage'

const OrderActions = forwardRef(({ product, complements, relatedProducts, mode = 'full' }, ref) => {
  const { addProduct } = useSelection();
  const [selectedWrapper, setSelectedWrapper] = useState('Kraft Clásico');
  const [message, setMessage] = useState('');
  const [selectedComplements, setSelectedComplements] = useState([]);

  const toggleComplement = (comp) => {
    setSelectedComplements(prev => 
      prev.find(c => c.id === comp.id) ? prev.filter(c => c.id !== comp.id) : [...prev, comp]
    );
  };

  const handleWhatsApp = () => {
    const total = product.price + selectedComplements.reduce((acc, c) => acc + c.price, 0);
    const mensaje = `Hola! Quiero pedir: ${product.title}.%0A%0AEnvoltorio: ${selectedWrapper}%0AMensaje: ${message}%0AComplementos: ${selectedComplements.map(c => c.title).join(', ')}%0A%0ATotal: $${total.toLocaleString()}`;
    window.open(`${product.profiles.whatsapp_link}?text=${mensaje}`, '_blank');
  };

  useImperativeHandle(ref, () => ({ handleWhatsApp }));

  return (
    <>
      {mode === 'buttonOnly' && (

<button 
  id="add-button"
  onClick={() => addProduct(product)}
  className="w-full mt-6 py-4 bg-rose-800 text-white rounded-2xl font-bold hover:bg-rose-900 transition-colors"
>
  Añadir a Mi Selección
</button>
      )}

      {mode === 'full' && (
        <div className="mt-12 space-y-10">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4">Elige el Envoltorio</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Kraft Clásico', 'Negro Mate'].map((estilo) => (
                <div key={estilo} onClick={() => setSelectedWrapper(estilo)} 
                     className={`border p-4 rounded-2xl cursor-pointer transition-all ${selectedWrapper === estilo ? 'border-rose-800 bg-rose-50' : 'border-stone-200 hover:border-rose-800'}`}>
                  <p className="font-bold text-stone-800">{estilo}</p>
                  <p className="text-xs text-stone-500 mt-1">Natural y sofisticado</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-4">Mensaje Personalizado</h3>
            <textarea onChange={(e) => setMessage(e.target.value)} 
              className="w-full p-4 border border-stone-200 rounded-2xl bg-white text-sm focus:ring-2 focus:ring-rose-800 outline-none h-32 resize-none" 
              placeholder="Escribe tu mensaje aquí..." />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-stone-900 mb-6">Añade algo que le encantará</h3>
            <div className="space-y-4">
              {complements.map((comp) => (
                <div key={comp.id} onClick={() => toggleComplement(comp)} 
                     className={`flex items-center gap-4 p-3 bg-white border rounded-2xl cursor-pointer transition-all ${selectedComplements.find(c => c.id === comp.id) ? 'border-rose-300 bg-rose-50' : 'border-stone-200 hover:border-rose-300'}`}>
                  <div className="w-16 h-16 bg-stone-100 rounded-xl overflow-hidden shrink-0">
                    <ProductImage src={comp.image_url} alt={comp.title} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-stone-900">{comp.title}</p>
                    <p className="text-sm font-bold text-rose-800 mt-1">${comp.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <section className="mt-20">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-8">También podría gustarte</h2>
            {Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((item) => (
                  <a key={item.id} href={`/${item.profiles?.username ?? 'user'}/${item.id}`} className="group cursor-pointer">
                    <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden mb-4"><ProductImage src={item.image_url} alt={item.title} /></div>
                    <p className="text-sm font-bold text-stone-900">{item.title}</p>
                    <p className="text-sm font-bold text-rose-800">${item.price.toLocaleString()}</p>
                  </a>
                ))}
              </div>
            ) : <p className="text-stone-500 text-sm italic">No hay productos relacionados.</p>}
          </section>
        </div>
      )}
    </>
  )
});

export default OrderActions;