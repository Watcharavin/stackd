'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { name: 'หน้าแรก', href: '/' },
  { name: 'เกี่ยวกับเรา', href: '/about/' },
  { name: 'โรงงาน', href: '/factory/' },
  { name: 'สินค้า', href: '/products/' },
  { name: 'บริการ', href: '/supply/' },
  { name: 'ข่าวสาร', href: '/news/' },
  { name: 'ติดต่อ', href: '/contact/' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-navy text-ice-white z-50 shadow-xl border-b border-steel-blue/30">
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              {/* Icon/Logo */}
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-1.5 shadow-md transform transition-all duration-300 group-hover:scale-110">
                <img
                  src="/logo.svg"
                  alt="Wattana Brother Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-ice-white transition-all duration-300 group-hover:text-accent-cyan">
                WATTANA BROTHER
              </span>
              <p className="text-xs text-fog-gray -mt-1">ตั้งแต่ปี 1984</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative px-4 py-2 text-sm font-medium text-ice-white hover:text-accent-cyan transition-all duration-300 group"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute inset-0 bg-steel-blue/0 group-hover:bg-steel-blue/30 rounded-lg transition-all duration-300"></span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-cyan transform -translate-x-1/2 group-hover:w-3/4 transition-all duration-300"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side - Phone + CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+6627498115"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-ice-white hover:text-accent-cyan transition-all duration-300 group"
              aria-label="Call us at 02-749-8115"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
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
              <span className="font-semibold">02-749-8115-6</span>
            </a>

            <Link
              href="/contact/"
              className="relative px-6 py-2.5 bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="flex items-center space-x-2">
                <span>ขอใบเสนอราคา</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2.5 rounded-lg hover:bg-steel-blue/30 transition-colors duration-300"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="py-4 space-y-1 border-t border-steel-blue/30">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-3 text-ice-white hover:bg-steel-blue/30 hover:text-accent-cyan rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Phone */}
            <li className="pt-2 border-t border-steel-blue/30 mt-2">
              <a
                href="tel:+6627498115"
                className="flex items-center space-x-3 px-4 py-3 text-ice-white hover:bg-steel-blue/30 hover:text-accent-cyan rounded-lg transition-all duration-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className="font-semibold">02-749-8115-6</span>
              </a>
            </li>

            {/* Mobile CTA */}
            <li className="px-4 pt-2">
              <Link
                href="/contact/"
                className="block w-full text-center px-6 py-3 bg-steel-blue hover:bg-steel-blue-dark text-ice-white font-semibold rounded-lg transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                ขอใบเสนอราคา
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
