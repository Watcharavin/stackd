import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'เครื่องปฏิกรณ์ - อุปกรณ์แปรรูปเคมีอุตสาหกรรม',
  description: 'เครื่องปฏิกรณ์เคมีที่ออกแบบอย่างแม่นยำสำหรับกระบวนการอุตสาหกรรม ทนทานต่อความดันพร้อมระบบควบคุมอุณหภูมิ',
  alternates: {
    canonical: 'https://www.wattanabrother.com/products/reactor',
  },
  openGraph: {
    title: 'เครื่องปฏิกรณ์ | บริษัท วัฒนบราเดอร์ จำกัด',
    description: 'เครื่องปฏิกรณ์แปรรูปเคมีอุตสาหกรรม',
    url: 'https://www.wattanabrother.com/products/reactor',
  },
}

export default function ReactorPage() {
  return (
    <>
      <nav className="bg-fog-gray py-4" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-slate hover:text-steel-blue">หน้าแรก</Link></li>
            <li className="text-slate">/</li>
            <li><Link href="/products/" className="text-slate hover:text-steel-blue">สินค้า</Link></li>
            <li className="text-slate">/</li>
            <li className="text-charcoal font-semibold">เครื่องปฏิกรณ์</li>
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
          <h1 className="text-4xl md:text-5xl font-bold">เครื่องปฏิกรณ์</h1>
        </div>
      </section>

      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="rounded-lg h-96 overflow-hidden">
                <img
                  src="/images/reactor.jpg"
                  alt="เครื่องปฏิกรณ์เคมี"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-ice-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-charcoal mb-4">เครื่องปฏิกรณ์เคมีอุตสาหกรรม</h2>
                <p className="text-lg text-slate mb-6 leading-relaxed">
                  เครื่องปฏิกรณ์เคมีที่ออกแบบอย่างแม่นยำ สร้างขึ้นเพื่อทนต่อสภาวะสุดขีด
                  และกระบวนการอุตสาหกรรมที่ต้องการความแข็งแรง ผลิตด้วยวัสดุคุณภาพสูงสุด
                  เพื่อความปลอดภัยและความน่าเชื่อถือ
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-charcoal mb-3">การใช้งาน:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">การสังเคราะห์และแปรรูปเคมี</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">การผลิตยา</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">การผลิตโพลิเมอร์</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-steel-blue mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-slate">การกลั่นปิโตรเคมี</span>
                    </li>
                  </ul>
                </div>

                <Link href="/contact/" className="inline-block w-full bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-bold py-3 px-6 rounded-lg transition-colors text-center">
                  ขอใบเสนอราคา
                </Link>
              </div>
            </div>

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
                      <h4 className="font-bold text-charcoal mb-1">ทนทานต่อความดัน</h4>
                      <p className="text-slate text-sm">ออกแบบให้รองรับปฏิกิริยาเคมีความดันสูงอย่างปลอดภัย</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ควบคุมอุณหภูมิ</h4>
                      <p className="text-slate text-sm">ระบบจัดการความร้อนขั้นสูงเพื่อสภาวะปฏิกิริยาที่แม่นยำ</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">หลายความจุ</h4>
                      <p className="text-slate text-sm">มีหลายขนาดตั้งแต่ระดับทดลองจนถึงระดับการผลิต</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-steel-blue rounded-full flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-ice-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-charcoal mb-1">ได้รับการรับรองความปลอดภัย</h4>
                      <p className="text-slate text-sm">เป็นไปตามมาตรฐานและข้อกำหนดความปลอดภัยสากล</p>
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
                      <span className="text-slate">สแตนเลส 316L</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ความดันออกแบบ</span>
                      <span className="text-slate">ตามสั่ง</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ช่วงอุณหภูมิ</span>
                      <span className="text-slate">-20°C ถึง 300°C</span>
                    </div>
                  </div>
                  <div className="border-b border-fog-gray pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ความจุ</span>
                      <span className="text-slate">50 ถึง 10,000 ลิตร</span>
                    </div>
                  </div>
                  <div className="pb-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-charcoal">ประเภทแจ็คเก็ต</span>
                      <span className="text-slate">Half-coil/Dimple</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 bg-fog-gray p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-charcoal mb-6">สินค้าที่เกี่ยวข้อง</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <Link href="/products/water-filter/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">เครื่องกรองน้ำ</h4>
                  <p className="text-slate text-sm">ระบบกรอง</p>
                </Link>
                <Link href="/products/plastic-mole/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">โม่พลาสติก</h4>
                  <p className="text-slate text-sm">แปรรูปวัสดุ</p>
                </Link>
                <Link href="/products/conveyor/" className="bg-ice-white rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-charcoal mb-2">สายพานลำเลียง</h4>
                  <p className="text-slate text-sm">ระบบขนส่ง</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
