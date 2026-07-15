'use client' // Solo este pequeño componente será Client

export default function ProductImage({ src, alt }) {
  return (
    <img 
      src={src || '/placeholder.png'} 
      alt={alt} 
      className="w-full aspect-square object-cover" 
      onError={(e) => { e.target.src = '/placeholder.png'; }} 
    />
  );
}