'use client'

export default function SafeImage({ src, alt, className, type = 'product' }: { src: string, alt: string, className: string, type?: 'product' | 'avatar' }) {
  const placeholder = type === 'avatar' ? '/placeholderavatar.png' : '/placeholder.png';

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className}
      onError={(e) => { e.currentTarget.src = placeholder; }} 
    />
  )
}