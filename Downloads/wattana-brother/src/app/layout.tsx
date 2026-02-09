import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://wattanabrother.com'),
  title: {
    default: 'บริษัท วัฒนบราเดอร์ จำกัด - ผู้เชี่ยวชาญงานโลหะและสแตนเลส ตั้งแต่ปี 1984',
    template: '%s | บริษัท วัฒนบราเดอร์ จำกัด'
  },
  description: 'บริษัท วัฒนบราเดอร์ จำกัด ผู้เชี่ยวชาญงานขึ้นรูปโลหะและสแตนเลสกว่า 27 ปี รับผลิตถังแรงดัน ถังผสมสารเคมี งานตัดเหล็ก และโซลูชันเหล็กอุตสาหกรรม',
  keywords: ['งานโลหะ', 'สแตนเลส', 'ถังแรงดัน', 'ถังผสมสารเคมี', 'ตัดเหล็ก', 'ขึ้นรูปโลหะ', 'โรงงานเหล็ก', 'กรุงเทพ'],
  authors: [{ name: 'บริษัท วัฒนบราเดอร์ จำกัด' }],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://wattanabrother.com',
    siteName: 'บริษัท วัฒนบราเดอร์ จำกัด',
    title: 'บริษัท วัฒนบราเดอร์ จำกัด - ผู้เชี่ยวชาญงานโลหะและสแตนเลส',
    description: 'ผู้เชี่ยวชาญงานขึ้นรูปโลหะและสแตนเลสกว่า 27 ปี รับผลิตถังแรงดัน ถังผสมสารเคมี',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'โรงงานบริษัท วัฒนบราเดอร์ จำกัด',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'บริษัท วัฒนบราเดอร์ จำกัด',
    description: 'ผู้เชี่ยวชาญงานโลหะและสแตนเลส',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'บริษัท วัฒนบราเดอร์ จำกัด',
              description: 'ผู้เชี่ยวชาญงานขึ้นรูปโลหะและสแตนเลส',
              url: 'https://wattanabrother.com',
              logo: 'https://wattanabrother.com/logo.svg',
              foundingDate: '1984',
              telephone: '+66-2-749-8115',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'TH',
                addressLocality: 'กรุงเทพมหานคร',
              },
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <Header />
        {/* Add padding-top to prevent content from being hidden under fixed header */}
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}