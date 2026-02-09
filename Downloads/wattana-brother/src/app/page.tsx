import Link from 'next/link'
import type { Metadata } from 'next'
import ClientLogos from '@/components/ClientLogos'

export const metadata: Metadata = {
  title: 'หน้าแรก',
  description: 'บริษัท วัฒนาบราเดอร์ จำกัด ผู้เชี่ยวชาญงานขึ้นรูปโลหะและสแตนเลส รับผลิตถังแรงดัน ถังผสมสารเคมี งานตัดเหล็ก ตั้งแต่ปี 1984',
  alternates: {
    canonical: 'https://wattanabrother.com',
  },
}

export default function Home() {
  const products = [
    { name: 'ถังกรองน้ำ', slug: 'water-filter', image: '/images/water-filter.jpg' },
    { name: 'ถังปฏิกรณ์', slug: 'reactor', image: '/images/reactor.jpg' },
    { name: 'เครื่องบดพลาสติก', slug: 'plastic-mole', image: '/images/plastic-mole.jpg' },
    { name: 'สายพานลำเลียง', slug: 'conveyor', image: '/images/conveyor.jpg' },
  ]

  const services = [
    {
      icon: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
      title: 'งานตัดเหล็กตามแบบ',
      description: 'บริการตัดเหล็กหนา เหล็กโค้ง และเหล็กพิเศษตามแบบที่ลูกค้าต้องการด้วยเครื่องจักรที่ทันสมัย'
    },
    {
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
      title: 'ถังแรงดันอุตสาหกรรม',
      description: 'ผลิตถังแรงดันเหล็กและสแตนเลสคุณภาพสูง รองรับการใช้งานในโรงงานอุตสาหกรรม'
    },
    {
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z',
      title: 'ถังผสมสารเคมี',
      description: 'ถังผสมและเก็บสารเคมีที่ออกแบบเพื่อความปลอดภัยและประสิทธิภาพสูงสุด'
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: 'งานขึ้นรูปโลหะ',
      description: 'งานขึ้นรูปฝาถัง โครงสร้าง และชิ้นส่วนโลหะตามแบบที่กำหนด'
    }
  ]

  const whyChooseUs = [
    {
      number: '27+',
      label: 'ปีประสบการณ์',
      description: 'ความเชี่ยวชาญสั่งสมมากว่า 27 ปี'
    },
    {
      number: '1000+',
      label: 'โปรเจกต์สำเร็จ',
      description: 'ผลงานที่ได้รับความไว้วางใจ'
    },
    {
      number: '100+',
      label: 'ลูกค้าองค์กร',
      description: 'บริษัทชั้นนำที่ไว้วางใจเรา'
    },
    {
      number: '24/7',
      label: 'บริการหลังการขาย',
      description: 'พร้อมให้คำปรึกษาตลอดเวลา'
    }
  ]

  const industriesServed = [
    {
      name: 'อุตสาหกรรมยานยนต์',
      icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 5h-2v4H7l5 6 5-6h-4V5z M3 13h2v4h14v-4h2v6H3v-6z'
    },
    {
      name: 'อุตสาหกรรมเคมีภัณฑ์',
      icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z'
    },
    {
      name: 'อุตสาหกรรมอาหาร',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
    },
    {
      name: 'อุตสาหกรรมน้ำมันและก๊าซ',
      icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z'
    },
    {
      name: 'อุตสาหกรรมอิเล็กทรอนิกส์',
      icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
    },
    {
      name: 'โรงงานผลิตพลาสติก',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/hero-factory.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-navy opacity-60" aria-hidden="true"></div>
        <div className="relative z-10 text-center text-ice-white px-4">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-4">
            WATTANA BROTHER
          </h1>
          <p className="hero-subtitle text-2xl md:text-3xl font-light mb-2">
            Established Since 1984
          </p>
          <p className="hero-text text-xl md:text-2xl text-fog-gray mb-8">
            27 Years Experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="btn-primary bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              ขอใบเสนอราคา
            </Link>
            <Link
              href="/products/"
              className="bg-transparent border-2 border-ice-white hover:bg-ice-white hover:text-navy text-ice-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              ดูผลิตภัณฑ์
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="bg-steel-blue text-ice-white py-4 px-8 mb-8 animate-slide-left">
            <h2 className="text-3xl font-bold">เกี่ยวกับเรา</h2>
          </div>

          <div className="bg-ice-white rounded-lg shadow-lg p-8 md:p-12 hover-lift card">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="animate-slide-left delay-200">
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-6">
                  รับผลิตงานเหล็กและสแตนเลสตามสั่ง
                </h3>
                <p className="text-slate text-lg mb-6">
                  บริษัท วัฒนาบราเธอร์ จำกัด ดำเนินธุรกิจด้านการผลิตงานเหล็กและสแตนเลสมาตั้งแต่ปี พ.ศ. 2527 ด้วยประสบการณ์มากกว่า 27 ปี เราเชี่ยวชาญงานผลิตตามแบบ งานโครงสร้าง และงานถังอุตสาหกรรม ใส่ใจในคุณภาพ ความแข็งแรง และความแม่นยำในทุกขั้นตอนการผลิต เพื่อตอบโจทย์การใช้งานของภาคอุตสาหกรรมอย่างแท้จริง
                </p>
                <Link
                  href="/contact/"
                  className="btn-primary inline-block bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  ติดต่อสั่งผลิต!
                </Link>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden animate-slide-right delay-300 hover-scale">
                <img
                  src="/images/about-factory.jpg"
                  alt="Wattana Brother Factory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - ใหม่ */}
      <section className="py-20 bg-ice-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">บริการของเรา</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              เราให้บริการครบวงจรด้านงานเหล็กและสแตนเลส พร้อมทีมช่างมืออาชีพและเครื่องจักรที่ทันสมัย
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-fog-gray p-6 rounded-lg hover-lift card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-steel-blue rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">{service.title}</h3>
                <p className="text-slate">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Section */}
      <section
        className="relative py-32 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/bg-factory.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-charcoal opacity-10" aria-hidden="true"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto bg-navy bg-opacity-90 p-8 md:p-12 rounded-lg hover-lift card animate-scale-in">
            <h2 className="text-3xl font-bold text-ice-white mb-6">ศักยภาพในการผลิตของเรา</h2>
            <p className="text-fog-gray text-lg leading-relaxed mb-6">
              เรารับผลิตงานเหล็กและสแตนเลสตามแบบที่ลูกค้ากำหนด
              ครอบคลุมงานตัดเหล็กหนา งานตัดโค้ง งานขึ้นรูปถังแรงดัน
              ถังแรงดันเหล็กและสแตนเลส ถังผสมสารเคมี ถังเก็บของเหลว
              รวมถึงงานขึ้นรูปฝาถังเหล็กและฝาถังสแตนเลสสำหรับงานอุตสาหกรรม
            </p>
            <Link
              href="/factory/"
              className="btn-primary inline-block bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              ดูขั้นตอนการผลิต
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Beautiful Card Design */}
      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">ทำไมต้องเลือกเรา</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              ความเชี่ยวชาญและความไว้วางใจที่สั่งสมมากว่า 27 ปี
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <div
                key={index}
                className="relative group"
              >
                {/* Card */}
                <div className="relative bg-ice-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                  {/* Decorative background gradient */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-steel-blue via-accent-cyan to-steel-blue"></div>

                  {/* Icon Circle */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-steel-blue to-accent-cyan rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      <svg className="w-10 h-10 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {index === 0 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                        {index === 1 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        )}
                        {index === 2 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        )}
                        {index === 3 && (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        )}
                      </svg>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-accent-cyan rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  </div>

                  {/* Number */}
                  <div className="text-5xl font-bold text-center mb-3 bg-gradient-to-r from-steel-blue to-accent-cyan bg-clip-text text-transparent">
                    {item.number}
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-bold text-charcoal text-center mb-2">
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-slate text-center text-sm">
                    {item.description}
                  </p>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-steel-blue/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                </div>

                {/* Shadow card effect */}
                <div className="absolute inset-0 bg-steel-blue/10 rounded-2xl transform translate-y-2 -z-10 group-hover:translate-y-3 transition-transform duration-300"></div>
              </div>
            ))}
          </div>

          {/* Optional: Stats Summary */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-ice-white rounded-2xl px-8 py-4 shadow-lg">
              <p className="text-slate">
                <span className="font-bold text-steel-blue">มากกว่า 27 ปี</span> ของประสบการณ์ที่พร้อมให้บริการคุณ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-ice-white">
        <div className="container mx-auto px-4">
          <div className="bg-steel-blue text-ice-white py-4 px-8 mb-8 animate-slide-left">
            <h2 className="text-3xl font-bold">ผลิตภัณฑ์ของเรา</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}/`}
                className="group bg-fog-gray rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover-lift card animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 bg-ice-white">
                  <h3 className="text-xl font-semibold text-charcoal group-hover:text-steel-blue transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10 animate-fade-in delay-500">
            <Link
              href="/products/"
              className="btn-primary inline-block bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 pulse-animation"
            >
              ดูผลิตภัณฑ์ทั้งหมด
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Served Section - ใหม่ */}
      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-4">อุตสาหกรรมที่เราให้บริการ</h2>
            <p className="text-slate text-lg max-w-2xl mx-auto">
              ผลิตภัณฑ์และบริการของเราครอบคลุมหลากหลายอุตสาหกรรม
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {industriesServed.map((industry, index) => (
              <div
                key={index}
                className="bg-ice-white rounded-lg p-6 text-center hover-lift card animate-scale-in group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="w-14 h-14 mx-auto bg-steel-blue rounded-full flex items-center justify-center mb-3 group-hover:bg-steel-blue-dark transition-colors duration-300">
                  <svg className="w-7 h-7 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={industry.icon} />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-charcoal">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* CTA Section - ใหม่ */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-steel-blue-dark text-ice-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              พร้อมเริ่มโปรเจกต์ของคุณหรือยัง?
            </h2>
            <p className="text-xl text-fog-gray mb-8">
              ติดต่อเราวันนี้เพื่อรับคำปรึกษาและใบเสนอราคาฟรี
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact/"
                className="bg-ice-white text-steel-blue hover:bg-fog-gray font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                ติดต่อเรา
              </Link>
              <a
                href="tel:+6627498115"
                className="bg-transparent border-2 border-ice-white hover:bg-ice-white hover:text-steel-blue font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                โทร: 02-749-8115-6
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}