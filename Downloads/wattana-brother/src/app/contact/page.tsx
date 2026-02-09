import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อบริษัท วัฒนบราเดอร์ จำกัด สำหรับบริการขึ้นรูปโลหะและสแตนเลสตามสั่ง โทร 02-749-8115-6, 081-138-1555',
  alternates: {
    canonical: 'https://wattanabrother.com/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-steel-blue text-ice-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อเรา</h1>
          <p className="text-xl text-fog-gray">ติดต่อทีมงานของเรา</p>
        </div>
      </section>

      <section className="py-20 bg-fog-gray">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="bg-navy text-ice-white rounded-lg p-8 md:p-10">
                <h2 className="text-3xl font-bold mb-6">ติดต่อเรา</h2>
                <p className="text-fog-gray text-lg mb-8">
                  มีโครงการที่ต้องการปรึกษาหรือไม่? เรายินดีรับฟังจากคุณ 
                  ส่งข้อความถึงเรา แล้วเราจะตอบกลับโดยเร็วที่สุด
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-steel-blue rounded-full flex items-center justify-center">
                        <svg 
                          className="w-6 h-6 text-ice-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">โทรศัพท์</h3>
                      <div className="space-y-1">
                        <a
                          href="tel:+6627498115"
                          className="block text-fog-gray hover:text-accent-cyan transition-colors"
                        >
                          02-749-8115-6
                        </a>
                        <a
                          href="tel:+66811381555"
                          className="block text-fog-gray hover:text-accent-cyan transition-colors"
                        >
                          081-138-1555
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* LINE */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-[#06C755] rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-ice-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">LINE</h3>
                      <a
                        href="https://line.me/ti/p/qX-tjXru2k"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#06C755] hover:bg-[#05B04A] text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                      >
                        <span>เพิ่มเพื่อน</span>
                      </a>
                      <div className="mt-3">
                        <p className="text-fog-gray text-sm mb-2">หรือสแกน QR Code</p>
                        <div className="w-24 h-24 bg-white rounded-lg p-1">
                          <img
                            src="/images/line-qr.png"
                            alt="LINE QR Code"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ที่อยู่ */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-steel-blue rounded-full flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-ice-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">ที่อยู่</h3>
                      <p className="text-fog-gray">
                        กรุงเทพมหานคร ประเทศไทย
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-steel-blue rounded-full flex items-center justify-center">
                        <svg 
                          className="w-6 h-6 text-ice-white" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-1">เวลาทำการ</h3>
                      <p className="text-fog-gray">จันทร์ - ศุกร์: 08:00 - 17:00 น.</p>
                      <p className="text-fog-gray">เสาร์ - อาทิตย์: ปิดทำการ</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <ContactForm />
            </div>

            {/* Google Maps */}
            <div className="mt-12">
              <div className="bg-ice-white rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-bold text-charcoal mb-6">แผนที่</h2>
                <div className="relative w-full h-96 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.124537467808!2d100.60774207599498!3d13.65018749963614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a100493c9ba7%3A0xe3d3203584de8a6b!2z4Lia4Lij4Li04Lip4Lix4LiX4Lin4Lix4LiS4LiZ4Liy4Lia4Lij4Liy4LmA4LiU4Lit4Lij4LmM4LiI4Liz4LiB4Lix4LiU!5e0!3m2!1sth!2sth!4v1770364555302!5m2!1sth!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="แผนที่สถานที่ตั้งบริษัท วัฒนบราเดอร์ จำกัด"
                  ></iframe>
                </div>
                <p className="text-slate mt-4 text-center">
                  คลิกที่แผนที่เพื่อดูเส้นทางและรายละเอียดเพิ่มเติม
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-steel-blue text-ice-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">พร้อมเริ่มโครงการของคุณแล้วหรือยัง?</h2>
          <p className="text-xl text-fog-gray mb-8 max-w-2xl mx-auto">
            โทรหาเราตอนนี้ที่{' '}
            <a href="tel:+6627498115" className="font-bold hover:text-accent-cyan transition-colors">02-749-8115-6</a>
            {' '}หรือ{' '}
            <a href="tel:+66811381555" className="font-bold hover:text-accent-cyan transition-colors">081-138-1555</a>
            {' '}เพื่อปรึกษาเกี่ยวกับงานขึ้นรูปโลหะของคุณ
          </p>
        </div>
      </section>
    </>
  )
}