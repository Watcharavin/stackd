'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

interface Client {
  name: string
  logo?: string // path to logo image in /public/images/clients/
}

const clients: Client[] = [
  { name: 'Fujikura', logo: '/images/clients/fujikura.jpg' },
  { name: 'Taiko-Sha', logo: '/images/clients/taiki-sha.jpg' },
  { name: 'NOK', logo: '/images/clients/nok.jpg' },
  { name: 'Honda', logo: '/images/clients/honda.jpg' },
  { name: 'ABB', logo: '/images/clients/abb.jpg' },
  { name: 'Goshu Kohsan', logo: '/images/clients/goshu-kohsan.jpg' },
  { name: 'Atlas Copco', logo: '/images/clients/atlas-copco.jpg' },
  { name: 'Sumitomo Electric', logo: '/images/clients/sumitomo-electric.jpg' },
  { name: 'Ritta', logo: '/images/clients/ritta.jpg' },
  { name: 'Tokai Rika', logo: '/images/clients/tokai-rika.jpg' },
  { name: 'Isuzu', logo: '/images/clients/isuzu.jpg' },
  { name: 'Patkol', logo: '/images/clients/patkol.jpg' },
]

export default function ClientLogos() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollInterval: NodeJS.Timeout

    const startScroll = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0
        } else {
          scrollContainer.scrollLeft += 1
        }
      }, 30)
    }

    startScroll()

    return () => {
      if (scrollInterval) clearInterval(scrollInterval)
    }
  }, [])

  // Duplicate clients for infinite scroll effect
  const duplicatedClients = [...clients, ...clients]

  return (
    <section className="py-16 bg-fog-gray overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          Trusted By Leading Companies
        </h2>

        <div 
          ref={scrollRef}
          className="flex gap-8 overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {duplicatedClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-48 bg-ice-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center justify-center h-full">
                {client.logo ? (
                  <div className="w-full h-24 relative mb-3 flex items-center justify-center">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 192px"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-steel-blue rounded-full mb-3 flex items-center justify-center">
                    <span className="text-ice-white font-bold text-2xl">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                )}
                <p className="text-sm font-semibold text-slate text-center">
                  {client.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </section>
  )
}