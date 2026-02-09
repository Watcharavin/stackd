import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News & Updates',
  description: 'Latest news and updates from Wattana Brother Co.,Ltd.',
  alternates: {
    canonical: 'https://wattanabrother.com/news',
  },
}

export default function NewsPage() {
  const newsItems = [
    {
      id: '2024-12-24',
      title: 'Holiday Notice - December 28, 2024',
      date: 'December 24, 2024',
      excerpt: '28 December, is a holiday for us !',
      slug: '2024-12-24'
    }
  ]

  return (
    <>
      <section className="bg-steel-blue text-ice-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Updates</h1>
          <p className="text-xl text-fog-gray">Stay informed about our latest announcements</p>
        </div>
      </section>

      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {newsItems.map((item) => (
              <article 
                key={item.id}
                className="bg-ice-white rounded-lg shadow-md p-8 mb-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <time className="text-slate text-sm font-semibold" dateTime={item.date}>
                    {item.date}
                  </time>
                  <span className="bg-steel-blue text-ice-white px-3 py-1 rounded-full text-xs font-semibold">
                    Announcement
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-charcoal mb-3">
                  <Link href={`/news/${item.slug}/`} className="hover:text-steel-blue transition-colors">
                    {item.title}
                  </Link>
                </h2>
                <p className="text-slate text-lg mb-4">{item.excerpt}</p>
                <Link 
                  href={`/news/${item.slug}/`}
                  className="inline-flex items-center text-steel-blue font-semibold hover:text-steel-blue-dark transition-colors"
                >
                  Read more
                  <svg 
                    className="w-5 h-5 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </article>
            ))}

            <div className="text-center mt-12">
              <p className="text-slate">More news coming soon...</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
