import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ฝาถังเหล็กและแสตนเลส - ขึ้นรูปฝาถังตามสั่ง',
  description: 'รับผลิตฝาถังเหล็กและแสตนเลสขึ้นรูปตามสั่ง ทั้งแบบฝาแบน ฝาโค้ง และฝาแรงดัน สำหรับงานอุตสาหกรรม โดยบริษัท วัฒนบราเดอร์',
  alternates: { canonical: 'https://www.wattanabrother.com/products/tank-lid' },
  openGraph: {
    title: 'ฝาถังเหล็กและแสตนเลส | บริษัท วัฒนบราเดอร์ จำกัด',
    description: 'ฝาถังเหล็กและแสตนเลสขึ้นรูปตามสั่ง',
    url: 'https://www.wattanabrother.com/products/tank-lid',
  },
}

export default function TankLidPage() {
  return (
    <>
      <nav className="bg-fog-gray py-4" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate hover:text-steel-blue">หน้าแรก</Link></li>
            <li className="text-slate">/</li>
            <li><Link href="/products/" className="text-slate hover:text-steel-blue">สินค้า</Link></li>
            <li className="text-slate">/</li>
            <li className="text-charcoal font-semibold">ฝาถังเหล็กและแสตนเลส</li>
          </ol>
        </div>
      </nav>

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
          <h1 className="text-4xl md:text-5xl font-bold">ฝาถังเหล็กและแสตนเลส</h1>
        </div>
      </section>

      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Product Image */}
              <div className="rounded-lg h-96 overflow-hidden">
                <img
                  src="/images/tank-lid.jpg"
                  alt="ฝาถังเหล็กและแสตนเลส"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-4">
                  ฝาถังขึ้นรูปตามสั่ง
                </h2>
                <p className="text-lg text-slate mb-6 leading-relaxed">
                  รับผลิตฝาถังเหล็กและสแตนเลสคุณภาพสูง ขึ้นรูปตามแบบที่ลูกค้าต้องการ
                  ทั้งฝาแบน ฝาโค้งนูน (Dish End) และฝาแรงดัน สำหรับถังเก็บของเหลว
                  ถังผสมสารเคมี และถังแรงดันในงานอุตสาหกรรม
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-charcoal mb-3">ประเภทฝาถัง:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">ฝาถังแบน (Flat Head)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">ฝาถังโค้งนูน (Dish End)</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">ฝาถังแรงดัน (Pressure Head)</span>
                    </li>
                  </ul>
                </div>

                <Link href="/contact/" className="inline-block w-full bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-3 px-6 rounded-lg transition-colors text-center">
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>

            {/* Features & Specifications */}
            <div className="grid md:grid-cols-2 gap-8">
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
                      <h4 className="font-bold text-charcoal mb-1">ขึ้นรูปได้ทุกขนาด</h4>
                      <p className="text-slate text-sm">รองรับฝาถังตั้งแต่ขนาดเล็กถึงขนาดใหญ่ ตามแบบที่กำหนด</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">รองรับแรงดันสูง</h4>
                      <p className="text-slate text-sm">ผลิตตามมาตรฐานสำหรับถังแรงดันในงานอุตสาหกรรม</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ผิวเรียบสวยงาม</h4>
                      <p className="text-slate text-sm">ขัดผิวเรียบ พร้อมใช้งานหรือเชื่อมต่อกับตัวถังได้ทันที</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">วัสดุคุณภาพ</h4>
                      <p className="text-slate text-sm">ใช้เหล็กและสแตนเลสเกรดอุตสาหกรรม ทนทานต่อการกัดกร่อน</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-charcoal mb-6">ข้อมูลจำเพาะ</h3>
                <div className="space-y-4">
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">วัสดุ</span>
                      <span className="text-slate">เหล็ก / สแตนเลส</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ขนาดเส้นผ่านศูนย์กลาง</span>
                      <span className="text-slate">ตามสั่ง</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ความหนา</span>
                      <span className="text-slate">ตามแบบกำหนด</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">รูปแบบ</span>
                      <span className="text-slate">แบน / โค้ง / แรงดัน</span>
                    </div>
                  </div>
                  <div className="pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">การตกแต่งผิว</span>
                      <span className="text-slate">ขัดเงา / ขัดด้าน / พ่นสี</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-12 bg-fog-gray p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-6">สินค้าที่เกี่ยวข้อง</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link href="/products/water-filter/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">เครื่องกรองน้ำ</h4>
                  <p className="text-slate text-sm">ระบบกรอง</p>
                </Link>
                <Link href="/products/reactor/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">เครื่องปฏิกรณ์</h4>
                  <p className="text-slate text-sm">อุปกรณ์แปรรูปเคมี</p>
                </Link>
                <Link href="/products/advertising-pole/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">เสาป้ายโฆษณา</h4>
                  <p className="text-slate text-sm">โครงสร้างเสาป้าย</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
