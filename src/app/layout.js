import { Libre_Baskerville, Poppins } from 'next/font/google';
import './globals.css';
import SessionProviderWarp from '@/providers/SessionProviderWarp';
import { Toaster } from 'react-hot-toast';
import { CartProviders } from '@/providers/providers';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  subsets: ['latin'],
});

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '500', '600', '700'],
  variable: '--font-libre-baskerville',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://harlow.alaminhere.com/'),
  title: 'Harlow | Modern E-Commerce Platform',
  description:
    'Harlow is a modern e-commerce platform where users can explore quality products and enjoy a smooth shopping experience.',
  openGraph: {
    title: 'Harlow | Modern E-Commerce Platform',
    description:
      'A modern e-commerce platform built for a smooth and simple shopping experience.',
    url: 'https://harlow.alaminhere.com/',
    siteName: 'Harlow',
    images: [
      {
        url: 'https://harlow.alaminhere.com/images/harlow.webp',
        width: 1200,
        height: 630,
        alt: 'Harlow E-Commerce Preview',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Harlow | Modern E-Commerce Platform',
    description:
      'A modern e-commerce platform built for a smooth and simple shopping experience.',
    images: ['https://harlow.alaminhere.com/images/harlow.webp'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${libreBaskerville.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-right" reverseOrder={false} />
        <SessionProviderWarp>
          <CartProviders>{children}</CartProviders>
        </SessionProviderWarp>
      </body>
    </html>
  );
}
