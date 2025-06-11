import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
import Container from '../components/Container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SungSu\'s site',
  description: 'Here is my personal website made by Next.js and Github Pages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900`}>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16 min-h-screen">
            <Container>
              {children}
            </Container>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 