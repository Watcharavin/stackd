import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'สินค้า',
  description: 'สำรวจผลิตภัณฑ์โลหะและสแตนเลสของบริษัท วัฒนบราเดอร์ จำกัด รวมถึงเครื่องกรองน้ำ เครื่องปฏิกรณ์ โม่พลาสติก และสายพานลำเลียง',
  alternates: {
    canonical: 'https://www.wattanabrother.com/products',
  },
  openGraph: {
    title: 'สินค้า | บริษัท วัฒนบราเดอร์ จำกัด',
    description: 'ผลิตภัณฑ์ขึ้นรูปโลหะและสแตนเลส',
    url: 'https://www.wattanabrother.com/products',
  },
}

export default function ProductsPage() {
  const products = [
    {
      name: 'เครื่องกรองน้ำ',
      slug: 'water-filter',
      description: 'ระบบกรองน้ำระดับอุตสาหกรรม ผลิตจากสแตนเลสคุณภาพสูง เพื่อประสิทธิภาพและความทนทานสูงสุด',
      features: [
        'โครงสร้างทนทานต่อการกัดกร่อน',
        'ประสิทธิภาพการกรองสูง',
        'ตัวเลือกขนาดตามสั่ง',
        'ออกแบบเพื่อง่ายต่อการบำรุงรักษา',
      ],
    },
    {
      name: 'เครื่องปฏิกรณ์',
      slug: 'reactor',
      description: 'เครื่องปฏิกรณ์เคมีที่ออกแบบอย่างแม่นยำสำหรับกระบวนการอุตสาหกรรม สร้างขึ้นเพื่อทนต่อสภาวะสุดขีด',
      features: [
        'ออกแบบทนทานต่อความดัน',
        'ความสามารถควบคุมอุณหภูมิ',
        'ตัวเลือกความจุหลากหลาย',
        'โครงสร้างได้รับการรับรองความปลอดภัย',
      ],
    },
    {
      name: 'โม่พลาสติก',
      slug: 'plastic-mole',
      description: 'อุปกรณ์เฉพาะทางสำหรับการแปรรูปพลาสติกและการจัดการวัสดุในสภาพแวดล้อมการผลิต',
      features: [
        'โครงสร้างเหล็กที่ทนทาน',
        'ประมวลผลวัสดุได้อย่างมีประสิทธิภาพ',
        'สามารถปรับแต่งการกำหนดค่าได้',
        'ต้องการการบำรุงรักษาต่ำ',
      ],
    },
    {
      name: 'สายพานลำเลียง',
      slug: 'conveyor',
      description: 'ระบบสายพานลำเลียงที่แข็งแรง ออกแบบสำหรับการขนส่งวัสดุอุตสาหกรรมและการผสานรวมสายการผลิต',
      features: [
        'โครงเหล็กแบบหนักหน่วง',
        'ควบคุมความเร็วได้',
        'การออกแบบแบบโมดูลาร์',
        'ประสิทธิภาพที่ยาวนาน',
      ],
    },
  ]

  return (
    <>
      {/* Page Header */}
      <section className="bg-steel-blue text-ice-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">สินค้าของเรา</h1>
          <p className="text-xl text-fog-gray">ผลิตภัณฑ์โลหะและสแตนเลสคุณภาพสูง</p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8">
              {products.map((product, index) => (
                <div 
                  key={product.slug}
                  className="bg-ice-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`relative h-80 md:h-auto overflow-hidden ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                      <img
                        src={`/images/${product.slug}.jpg`}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                      <h2 className="text-3xl font-bold text-charcoal mb-4">
                        {product.name}
                      </h2>
                      <p className="text-lg text-slate mb-6 leading-relaxed">
                        {product.description}
                      </p>

                      <h3 className="text-lg font-bold text-charcoal mb-3">คุณสมบัติเด่น:</h3>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg 
                              className="w-5 h-5 text-steel-blue mr-2 mt-0.5 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 13l4 4L19 7" 
                              />
                            </svg>
                            <span className="text-slate">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link 
                        href={`/products/${product.slug}/`}
                        className="inline-block bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                      >
                        ดูรายละเอียด
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Orders CTA */}
      <section className="py-16 bg-navy text-ice-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ต้องการสินค้าตามสั่งหรือไม่?
            </h2>
            <p className="text-xl text-fog-gray mb-8">
              เราเชี่ยวชาญในงานขึ้นรูปโลหะและสแตนเลสตามสั่ง 
              บอกความต้องการของคุณ และเราจะทำให้แบบของคุณเป็นจริง
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact/"
                className="inline-block bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-4 px-8 rounded-lg transition-colors"
              >
                ขอใบเสนอราคา
              </Link>
              <Link 
                href="/supply/"
                className="inline-block bg-transparent border-2 border-ice-white hover:bg-ice-white hover:text-navy text-ice-white font-bold py-4 px-8 rounded-lg transition-colors"
              >
                ดูความสามารถของเรา
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}