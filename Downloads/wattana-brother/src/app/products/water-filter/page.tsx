import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เครื่องกรองน้ำ - ระบบกรองน้ำสแตนเลสอุตสาหกรรม',
  description: 'ระบบกรองน้ำอุตสาหกรรมคุณภาพสูง ผลิตจากสแตนเลสทนการกัดกร่อน รับผลิตตามขนาดและรูปแบบที่ต้องการ',
  alternates: {
    canonical: 'https://www.wattanabrother.com/products/water-filter',
  },
  openGraph: {
    title: 'เครื่องกรองน้ำ | บริษัท วัฒนบราเดอร์ จำกัด',
    description: 'ระบบกรองน้ำสแตนเลสระดับอุตสาหกรรม',
    url: 'https://www.wattanabrother.com/products/water-filter',
  },
}

export default function WaterFilterPage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-fog-gray py-4" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-slate hover:text-steel-blue">หน้าแรก</Link>
            </li>
            <li className="text-slate">/</li>
            <li>
              <Link href="/products/" className="text-slate hover:text-steel-blue">สินค้า</Link>
            </li>
            <li className="text-slate">/</li>
            <li className="text-charcoal font-semibold">เครื่องกรองน้ำ</li>
          </ol>
        </div>
      </nav>

      {/* Product Header */}
      <section className="bg-steel-blue text-ice-white py-12">
        <div className="container mx-auto px-4">
          <Link
            href="/products/"
            className="inline-flex items-center text-ice-white/80 hover:text-ice-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            กลับไปหน้าสินค้า
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">เครื่องกรองน้ำ</h1>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Product Image */}
              <div className="rounded-lg h-96 overflow-hidden">
                <img
                  src="/images/water-filter.jpg"
                  alt="ระบบกรองน้ำ"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  ระบบกรองน้ำอุตสาหกรรม
                </h2>
                <p className="text-lg text-slate mb-6 leading-relaxed">
                  ระบบกรองน้ำระดับอุตสาหกรรมของเรา ผลิตจากสแตนเลสคุณภาพสูง
                  มั่นใจในประสิทธิภาพ ความทนทาน และความต้านทานการกัดกร่อน
                  ออกแบบมาสำหรับสภาพแวดล้อมอุตสาหกรรมที่ต้องการความแข็งแรง
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-charcoal mb-3">การใช้งาน:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-steel-blue mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">ระบบบำบัดน้ำอุตสาหกรรม</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-steel-blue mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">โรงงานแปรรูปเคมี</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-steel-blue mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">อุตสาหกรรมอาหารและเครื่องดื่ม</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 text-steel-blue mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">อุตสาหกรรมยา</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact/"
                  className="inline-block w-full bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>

            {/* Features & Specifications */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Features */}
              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">คุณสมบัติเด่น</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ทนการกัดกร่อน</h4>
                      <p className="text-slate text-sm">ผลิตจากสแตนเลสคุณภาพสูง ทนทานยาวนาน</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ประสิทธิภาพสูง</h4>
                      <p className="text-slate text-sm">เทคโนโลยีการกรองขั้นสูงเพื่อคุณภาพน้ำที่ดีที่สุด</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ขนาดตามสั่ง</h4>
                      <p className="text-slate text-sm">มีหลายขนาดให้เลือก ตรงตามความต้องการของคุณ</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">บำรุงรักษาง่าย</h4>
                      <p className="text-slate text-sm">ออกแบบให้ทำความสะอาดและเปลี่ยนไส้กรองได้ง่าย</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Specifications */}
              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">ข้อมูลจำเพาะ</h3>
                <div className="space-y-4">
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">วัสดุ</span>
                      <span className="text-slate">สแตนเลส 304/316</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">การประกอบ</span>
                      <span className="text-slate">เชื่อม/ไร้รอยต่อ</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ขนาด</span>
                      <span className="text-slate">ตามสั่ง</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ประเภทข้อต่อ</span>
                      <span className="text-slate">หน้าแปลน/เกลียว</span>
                    </div>
                  </div>
                  <div className="pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ผิวสำเร็จ</span>
                      <span className="text-slate">ขัดเงา/ขัดด้าน</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-12 bg-fog-gray p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-6">สินค้าที่เกี่ยวข้อง</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link href="/products/reactor/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">เครื่องปฏิกรณ์</h4>
                  <p className="text-slate text-sm">อุปกรณ์แปรรูปเคมี</p>
                </Link>
                <Link href="/products/plastic-mole/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">โม่พลาสติก</h4>
                  <p className="text-slate text-sm">ระบบแปรรูปวัสดุ</p>
                </Link>
                <Link href="/products/conveyor/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">สายพานลำเลียง</h4>
                  <p className="text-slate text-sm">ระบบขนส่งวัสดุ</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
