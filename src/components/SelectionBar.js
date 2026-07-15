'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelection } from '@/context/SelectionContext'

export default function SelectionBar() {
  const { selection } = useSelection();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const target = document.getElementById('add-button');
    if (target) observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence mode="wait">
        {!isVisible && (
          <motion.div
            // Animación de flotación constante
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <motion.button
  key="icon"
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => selection.length > 0 && console.log("Abrir WhatsApp")}
  className="p-4 bg-rose-800 text-white rounded-full shadow-2xl flex items-center justify-center"
>
  <span>🛒</span>
  {selection.length > 0 && (
    <motion.span
      key={selection.length}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="absolute -top-1 -right-1 bg-rose-950 text-[10px] w-5 h-5 flex items-center justify-center rounded-full text-white font-bold"
    >
      {selection.length}
    </motion.span>
  )}
</motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}