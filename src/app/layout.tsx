import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import Navbar from '../components/Navbar';
import Container from '../components/Container';
import ScrollReset from '../components/ScrollReset';

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
    <html lang="ko" suppressHydrationWarning className="bg-white dark:bg-zinc-900">
      <body className={`${inter.className} bg-white dark:bg-zinc-900 min-h-screen`} suppressHydrationWarning>
        <ThemeProvider>
          <div className="min-h-screen bg-white transition-colors duration-200 dark:bg-zinc-900">
            <ScrollReset />
            <Navbar />
            <main className="pt-16">
              <Container>
                {children}
              </Container>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
} 