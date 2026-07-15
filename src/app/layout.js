import { SelectionProvider } from '@/context/SelectionContext'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SelectionProvider>
          {children}
        </SelectionProvider>
      </body>
    </html>
  );
}