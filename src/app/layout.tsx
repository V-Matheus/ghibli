import type { Metadata } from 'next';
import './globals.css';
import { ClientProvider } from '@/components/ClientProvider';

export const metadata: Metadata = {
  title: 'Studio Ghibli',
  description: 'Studio Ghibli Movies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ClientProvider>
        <body className={` antialiased`}>{children}</body>
      </ClientProvider>
    </html>
  );
}
