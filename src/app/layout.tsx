import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeDoc AI - Documentação Inteligente",
  description: "Gere documentação automática para seu código com IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <nav style={{ 
          padding: '1rem 2rem', 
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>🤖 CodeDoc AI</span>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: 'var(--secondary)' }}>
            <span>MVP v1.0</span>
          </div>
        </nav>
        {children}
        <footer style={{ 
          textAlign: 'center', 
          padding: '2rem', 
          fontSize: '0.8rem', 
          color: 'var(--secondary)',
          borderTop: '1px solid var(--border)',
          marginTop: '4rem'
        }}>
          Criado com Synkra AIOX & Next.js
        </footer>
      </body>
    </html>
  );
}
