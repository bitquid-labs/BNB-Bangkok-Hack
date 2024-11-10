import { Metadata } from 'next';
import * as React from 'react';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

import Footer from '@/components/layout/footer/components';
import Header from '@/components/layout/header/components';

import Providers from '@/app/provider';
import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='text-light flex min-h-screen flex-col bg-[#0C0C0C]'>
        {/* <ParticleConnectkit> */}
        <Providers>
          <ToastContainer
            position='top-center'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='dark'
            // transition:Bounce,
          />
          <div className='absolute bottom-0 left-0 right-0 top-0 flex flex-col'>
            <Header />
            <div className='flex-1'>{children}</div>
            <Footer />
          </div>
        </Providers>
        {/* </ParticleConnectkit> */}
      </body>
    </html>
  );
}
