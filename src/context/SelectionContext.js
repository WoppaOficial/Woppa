'use client'
import { createContext, useContext, useState } from 'react'

const SelectionContext = createContext();

export function SelectionProvider({ children }) {
  const [selection, setSelection] = useState([]);

  const addProduct = (product) => {
    setSelection(prev => [...prev, product]);
  };

  return (
    <SelectionContext.Provider value={{ selection, addProduct }}>
      {children}
    </SelectionContext.Provider>
  );
}

export const useSelection = () => {
  const context = useContext(SelectionContext);
  // Validación de seguridad
  if (!context) {
    return { selection: [], addProduct: () => {} };
  }
  return context;
};