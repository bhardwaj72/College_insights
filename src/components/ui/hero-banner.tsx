'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

const HERO_IMAGES = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
  '/images/hero-5.jpg',
  '/images/hero-6.jpg',
  '/images/hero-7.jpg',
]

const STREAM_PILLS = [
  { label: 'Engineering (B.Tech)', q: 'b.tech' },
  { label: 'MBA', q: 'mba' },
  { label: 'MBBS', q: 'mbbs' },
  { label: 'LAW', q: 'law' },
  { label: 'Design', q: 'design' },
  { label: 'Commerce', q: 'commerce' },
]

export default function HeroBanner() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState<Record<string, boolean>>({})
  const intervalRef = useRef<number | null>(null)

  // Auto-slide carousel
  useEffect(() => {
    startRotation()
    return () => stopRotation()
  }, [])

  const startRotation = () => {
    stopRotation()
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, 5000)
  }

  const stopRotation = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/explore?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <section className="relative min-h-[78vh] flex items-center justify-center text-center">

      {/* Background Carousel */}
      <div className="absolute inset-0 -z-0">
        {HERO_IMAGES.map((src, idx) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: idx === index ? 1 : 0,
            }}
          >
            <Image
              src={src}
              alt="hero background image"
              fill
              priority={idx === 0}
              loading={idx === 0 ? 'eager' : 'lazy'}
              style={{ objectFit: 'cover' }}
            />
          </div>
        ))}

        {/* Improve Text Visibility */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1.5px] z-[1]" />
      </div>

      {/* Content on top */}
      <div className="relative mt-4 z-10 w-full px-4 py-20">

        {/* Badge
        <div className="inline-flex items-center space-x-2 bg-white/90 px-6 py-3 rounded-full shadow-md text-sm font-medium">
          🚀 <span>100 Colleges. 100 Days. 1 Platform.</span>
        </div> */}

        {/* Headings */}
        <h1 className="mt-6 text-5xl md:text-7xl font-bold text-white drop-shadow-lg">
          Don't Get Influenced.
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#A78BFA] to-[#60A5FA]">
            Get Informed.
          </span>
        </h1>

        <p className="mt-4 text-white/90 text-lg drop-shadow max-w-2xl mx-auto">
          College ka asli review — bina filter. Real students. Real insights. Real decisions.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-[#8A2BE2]" />

            <input
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/95 shadow-lg text-lg"
              placeholder="Find your college (name, city, state...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white font-semibold"
            >
              Search
            </button>
          </form>
        </div>

        {/* Popular Streams */}
        <div className="mt-16 max-w-3xl mx-auto">
          <p className="text-md text-white mb-3 font-medium text-center">
            Popular streams
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {STREAM_PILLS.map((p) => (
              <button
                key={p.q}
                onClick={() => router.push(`/explore?q=${p.q}`)}
                className="
          group px-4 py-2 rounded-full
          bg-white 
          border border-slate-200 
          text-slate-700 font-medium 
          shadow-[0_2px_6px_rgba(138,43,226,0.15)]
          transition-all duration-300
          hover:border-[#8A2BE2]
          hover:text-[#8A2BE2]
          hover:shadow-[0_4px_14px_rgba(124,58,237,0.25)]
          hover:-translate-y-[3px]
          flex items-center gap-2 text-sm
        "
              >
                <span
                  className="
            w-2 h-2 rounded-full
            bg-gradient-to-br from-[#8A2BE2] to-[#00B4D8]
            transition-transform duration-300
            group-hover:scale-125
          "
                />
                {p.label}
              </button>
            ))}
          </div>
        </div>


      </div>
    </section>
  )
}
