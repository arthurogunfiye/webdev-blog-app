import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import { ThemeProvider } from 'next-themes';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import { EdgeStoreProvider } from '@/lib/edgestore';
import { Toaster } from 'react-hot-toast';
import { SocketContextProvider } from '@/context/SocketContext';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700']
});

export const metadata: Metadata = {
  title: 'WebDev Blog',
  description: 'Your favourite web development blog',
  icons: { icon: '/logo.svg' },
  authors: [{ name: 'Arthur Ogunfuye' }],
  keywords: ['Next.js', 'TypeScript', 'Tutorial', 'React']
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <SocketContextProvider>
        <html lang='en' suppressHydrationWarning>
          <body
            className={cn(
              'antialiased flex flex-col min-h-screen px-2',
              roboto.className
            )}
          >
            <Toaster
              position='top-center'
              toastOptions={{
                style: { background: 'rgb(51 65 85)', color: '#fff' }
              }}
            />
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />

              <main className='flex-grow'>
                <EdgeStoreProvider>{children}</EdgeStoreProvider>
              </main>
            </ThemeProvider>
          </body>
        </html>
      </SocketContextProvider>
    </SessionProvider>
  );
}
