import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'ติดต่อเรา',
  description: 'ติดต่อวัฒนาบราเดอร์ จำกัด สำหรับบริการขึ้นรูปโลหะและสแตนเลสตามสั่ง โทร 02-749-8115-6',
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
                      <a 
                        href="tel:+6627498115" 
                        className="text-fog-gray hover:text-accent-cyan transition-colors"
                      >
                        02-749-8115-6
                      </a>
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
                    title="แผนที่สถานที่ตั้งวัฒนาบราเดอร์"
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
            โทรหาเราตอนนี้ที่ <a href="tel:+6627498115" className="font-bold hover:text-accent-cyan transition-colors">02-749-8115-6</a> เพื่อ
            ปรึกษาเกี่ยวกับงานขึ้นรูปโลหะของคุณ
          </p>
        </div>
      </section>
    </>
  )
}