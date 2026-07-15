// app/page.tsx
import { supabase } from '@/lib/supabaseClient'
import { Star, Heart, MapPin, Search } from 'lucide-react';
import SafeImage from '@/components/SafeImage';

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "/placeholder.png";
};

const handleAvatarError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = "/placeholderavatar.png";
};

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Contenido Izquierdo */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 bg-rose-50 text-rose-800 text-xs font-bold uppercase tracking-widest rounded-full border border-rose-100">
              Artesanal y Personalizado
            </span>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-stone-900 leading-tight">
              Momentos que se convierten en tesoros.
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed max-w-md">
              Descubre una selección curada de productos diseñados para expresar lo que las palabras no alcanzan a decir.
            </p>
            <button className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-colors">
              Explorar Detalles
            </button>
          </div>

          {/* Imagen Hero */}
<div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-stone-100">
  <SafeImage 
    src="https://images.unsplash.com/photo-1549465220-1a8b1e4640ae?auto=format&fit=crop&q=80&w=1000" 
    alt="Regalo artesanal" 
    type="product"
    className="w-full h-full object-cover"
  />
</div>
        </div>
      </section>

      {/* Sección de Categorías */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-stone-900">Nuestras Categorías</h2>
          <p className="text-stone-500 mt-2">Seleccionadas con amor y cuidado.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoría Grande 1 */}
<div className="relative h-[400px] rounded-[2rem] overflow-hidden group">
  <SafeImage 
    src="https://images.unsplash.com/photo-1518398046578-8cca57788e04?auto=format&fit=crop&q=80&w=800" 
    alt="Categoría Rosas" 
    type="product"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  />
  <div className="absolute bottom-8 left-8">
    <h3 className="text-2xl font-bold text-white mb-1">Rosas</h3>
    <p className="text-white/90 underline cursor-pointer hover:text-rose-200">Ver Colección</p>
  </div>
</div>

          {/* Columna derecha con 2 categorías más pequeñas */}
          <div className="grid grid-rows-2 gap-6">
            <div className="relative h-[190px] rounded-[2rem] overflow-hidden group">
  <SafeImage 
    src="https://images.unsplash.com/photo-1549465220-1a8b1e4640ae?auto=format&fit=crop&q=80&w=800" 
    alt="Cajas de Regalo" 
    type="product"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  />
  <div className="absolute bottom-6 left-6">
    <h3 className="text-xl font-bold text-white">Cajas de Regalo</h3>
  </div>
</div>

            <div className="relative h-[190px] rounded-[2rem] overflow-hidden bg-rose-100 flex items-center px-8">
              <div>
                <h3 className="text-xl font-bold text-stone-900 mb-2">¿Buscas algo único?</h3>
                <p className="text-stone-600 text-sm mb-4">Personaliza tu regalo con nuestros artesanos locales.</p>
                <button className="px-6 py-2 bg-stone-900 text-white rounded-xl text-sm font-bold hover:bg-stone-800">
                  Ver todo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Emprendedores */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-16 bg-white">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-900">Conoce a nuestros Emprendedores</h2>
            <p className="text-stone-500 mt-2">Detrás de cada regalo hay una historia de pasión y dedicación.</p>
          </div>
          <a href="/emprendedores" className="hidden md:block text-sm font-bold text-rose-800 underline hover:text-rose-900">
            Ver todas las historias
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta de Emprendedor */}
          {[
            { name: 'Elena García', rol: 'Arte Floral', desc: 'Cada ramo que diseño lleva un pedacito de mi jardín y de mi alma.' },
            { name: 'Mateo Ruiz', rol: 'Chocolatería Fina', desc: 'Transformamos el cacao premium en experiencias sensoriales inolvidables.' },
            { name: 'Sofía Valdés', rol: 'Cerámica Artesanal', desc: 'Creo objetos que invitan a pausar y disfrutar de los pequeños rituales diarios.' }
          ].map((item, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="h-[450px] rounded-[2rem] overflow-hidden mb-6 bg-stone-100">
  <SafeImage 
    src={`https://images.unsplash.com/photo-1549465220-1a8b1e4640ae?auto=format&fit=crop&q=80&w=600`} 
    alt={item.name} 
    type="avatar" // Especificamos que es para personas
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
  />
</div>
              <h3 className="text-xl font-bold text-stone-900">{item.name}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-rose-800 mb-3">{item.rol}</p>
              <p className="text-stone-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Momentos Compartidos */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-16 bg-stone-50">
        <h2 className="text-3xl font-bold text-stone-900 mb-12 text-center">Momentos Compartidos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              name: 'Laura M.', 
              testimonio: 'El desayuno sorpresa para el aniversario de mis padres fue impecable. La atención al detalle y la frescura de los productos hicieron que lloraran de emoción.' 
            },
            { 
              name: 'Ricardo F.', 
              testimonio: 'Compré una caja de regalo para una amiga que vive lejos y la presentación superó mis expectativas. Realmente entiende el valor de lo artesanal.' 
            },
            { 
              name: 'Carla B.', 
              testimonio: 'Las rosas más hermosas que he recibido, el aroma duró muchísimo tiempo. Se nota la calidad premium en todo el proceso.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col">
              {/* Estrellas */}
              <div className="flex text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              
              <p className="text-stone-600 text-sm leading-relaxed mb-8 flex-grow italic">
                "{item.testimonio}"
              </p>
              
              <div className="flex items-center gap-4 border-t border-stone-50 pt-6">
                <div className="w-10 h-10 rounded-full bg-stone-200" />
                <p className="font-bold text-stone-900">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección Comunidad (Newsletter) */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-10 py-16">
        <div className="bg-rose-50 rounded-[3rem] px-8 py-16 text-center">
          <h2 className="text-3xl font-serif font-bold text-stone-900 mb-4">Únete a nuestra comunidad</h2>
          <p className="text-stone-600 mb-8 max-w-md mx-auto">Recibe inspiración, historias de emprendedores y ofertas exclusivas directamente en tu correo.</p>
          
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="flex-1 px-6 py-4 rounded-full border border-rose-100 outline-none focus:ring-2 focus:ring-rose-800"
            />
            <button className="px-8 py-4 bg-rose-800 text-white rounded-full font-bold hover:bg-rose-900 transition-colors">
              Suscribirse
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-[90rem] mx-auto px-6 md:px-10 py-12 border-t border-stone-100 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-xl font-bold tracking-tighter text-rose-900 mb-4 block">Woppa</a>
            <p className="text-stone-500 text-sm">© 2026 Woppa. <br/>Crafted with love.</p>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="#" className="hover:text-rose-800">Nuestra Historia</a></li>
              <li><a href="#" className="hover:text-rose-800">Política de Envío</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li><a href="#" className="hover:text-rose-800">Contacto</a></li>
              <li><a href="#" className="hover:text-rose-800">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-stone-900 mb-4">Emprendedores</h4>
            <a href="#" className="text-sm font-bold text-rose-800 underline">Sé parte de Woppa</a>
          </div>
        </div>
      </footer>
      
      {/* Aquí continuaremos con las Categorías */}
    </div>
  )
}