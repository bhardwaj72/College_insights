'use client'

import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/compare', label: 'Compare' },
    { href: '/insights', label: 'Insights' },
    { href: '/submit-review', label: 'Submit Review' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Glass base */}
      <div
        className="
          relative
          backdrop-blur-2xl
          bg-white/40
          border-b border-white/30
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        "
      >
        {/* glass light refraction */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/30 via-white/5 to-white/30" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/40 to-transparent" />

        <div className="container flex h-16 items-center justify-between px-4 relative">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-transform hover:scale-[1.02]"
          >
            <div
              className="
                h-11 w-11 rounded-xl
                bg-gradient-to-br from-[#8A2BE2] to-[#00B4D8]
                flex items-center justify-center
                shadow-[0_8px_30px_rgba(138,43,226,0.45)]
                group-hover:shadow-[0_12px_40px_rgba(138,43,226,0.6)]
                transition-all
              "
            >
              <span className="text-white font-bold text-xl">🎓</span>
            </div>
            <span className="font-heading font-semibold text-lg text-slate-900">
              College Insights
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                  relative text-sm font-medium text-slate-700
                  transition-all duration-300
                  hover:text-[#8A2BE2]
                  hover:-translate-y-[1px]
                  after:absolute after:left-0 after:-bottom-1
                  after:h-[2px] after:w-0
                  after:bg-gradient-to-r after:from-[#8A2BE2] after:to-[#00B4D8]
                  after:rounded-full
                  after:transition-all after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">

            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
                md:hidden
                h-10 w-10
                rounded-xl
                backdrop-blur-xl
                bg-white/40
                border border-white/40
                flex items-center justify-center
                shadow-md
                hover:bg-white/70
                hover:scale-105
                transition-all
              "
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-800" />
              ) : (
                <Menu className="h-5 w-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="
              md:hidden
              backdrop-blur-2xl
              bg-white/50
              border-t border-white/30
              shadow-[0_20px_50px_rgba(0,0,0,0.15)]
            "
          >
            <nav className="container px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="
                    block rounded-xl px-4 py-2
                    text-sm font-medium text-slate-700
                    hover:bg-[#8A2BE2]/10
                    hover:text-[#8A2BE2]
                    hover:translate-x-1
                    transition-all
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
