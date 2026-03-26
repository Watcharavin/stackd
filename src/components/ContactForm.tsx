'use client'

import { useState, FormEvent, useRef } from 'react'
import emailjs from '@emailjs/browser'

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formRef.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      setSubmitStatus('success')
      formRef.current?.reset()
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-ice-white rounded-lg shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-charcoal mb-6">ส่งข้อความถึงเรา</h2>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-semibold">ส่งข้อความสำเร็จ!</span>
          </div>
          <p className="mt-1 text-sm">ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด</p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <span className="font-semibold">เกิดข้อผิดพลาด</span>
          </div>
          <p className="mt-1 text-sm">ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้งหรือโทรหาเราโดยตรง</p>
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-charcoal mb-2">
            ชื่อของคุณ *
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            required
            className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="สมชาย ใจดี"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-charcoal mb-2">
            อีเมล *
          </label>
          <input
            type="email"
            id="email"
            name="from_email"
            required
            className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="somchai@example.com"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-charcoal mb-2">
            เบอร์โทรศัพท์
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue"
            placeholder="081-234-5678"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-charcoal mb-2">
            ข้อความ *
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 border border-slate rounded-lg focus:outline-none focus:ring-2 focus:ring-steel-blue resize-none"
            placeholder="บอกเราเกี่ยวกับโครงการของคุณ..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center ${
            isSubmitting
              ? 'bg-slate text-ice-white cursor-not-allowed'
              : 'bg-steel-blue hover:bg-steel-blue-dark text-ice-white'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              กำลังส่ง...
            </>
          ) : (
            'ส่งข้อความ'
          )}
        </button>
      </form>
    </div>
  )
}
