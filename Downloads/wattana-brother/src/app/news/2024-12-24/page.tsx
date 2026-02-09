import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Holiday Notice - December 28, 2024',
  description: '28 December, is a holiday for us! Wattana Brother Co.,Ltd. will be closed.',
  alternates: {
    canonical: 'https://wattanabrother.com/news/2024-12-24',
  },
}

export default function NewsPost() {
  return (
    <>
      <nav className="bg-fog-gray py-4" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate hover:text-steel-blue">Home</Link></li>
            <li className="text-slate">/</li>
            <li><Link href="/news/" className="text-slate hover:text-steel-blue">News</Link></li>
            <li className="text-slate">/</li>
            <li className="text-charcoal font-semibold">2024-12-24</li>
          </ol>
        </div>
      </nav>

      <article className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-ice-white rounded-lg shadow-lg p-8 md:p-12">
              <div className="mb-6">
                <time className="text-slate text-sm font-semibold" dateTime="2024-12-24">
                  December 24, 2024
                </time>
              </div>
              
              <h1 className="text-4xl font-bold text-charcoal mb-6">
                Holiday Notice - December 28, 2024
              </h1>

              <div className="prose prose-lg max-w-none">
                <p className="text-xl text-slate mb-6">
                  28 December, is a holiday for us !
                </p>
                
                <p className="text-lg text-slate mb-4">
                  Wattana Brother Co.,Ltd. will be closed on December 28, 2024 for the holiday observance. 
                  We will resume normal business operations on the following business day.
                </p>

                <p className="text-lg text-slate mb-4">
                  For urgent matters during this time, please email us and we will respond as soon as possible 
                  when we return to the office.
                </p>

                <p className="text-lg text-slate">
                  Thank you for your understanding, and we wish you a wonderful holiday season!
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-fog-gray">
                <Link 
                  href="/news/"
                  className="inline-flex items-center text-steel-blue font-semibold hover:text-steel-blue-dark transition-colors"
                >
                  <svg 
                    className="w-5 h-5 mr-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to News
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
