'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles, TrendingUp, Users, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/explore')
    }
  }
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#C9A7EB]/30 via-[#00B4D8]/20 to-[#FFD6E0]/30 min-h-[80vh] flex items-center">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#C9A7EB]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#00B4D8]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFD6E0]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-white/40 text-[#2F2F2F] px-6 py-3 rounded-full text-sm font-medium shadow-lg">
            <span className="text-lg">🚀</span>
            <span>100 Colleges. 100 Days. 1 Platform.</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold font-heading leading-tight">
              <span className="text-[#2F2F2F]">Don't Get Influenced.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] mt-2">
                Get Informed.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[#2F2F2F]/70 max-w-2xl mx-auto font-medium">
              College ka asli review — bina filter. Real students. Real insights. Real decisions.
            </p>
          </div>

          {/* Search Bar - Prominent and centered */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#8A2BE2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find your college (name, city, state...)"
                className="w-full pl-16 pr-6 py-5 text-lg rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-xl focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                Search
              </button>
            </form>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => router.push('/explore')}
              className="px-8 py-4 text-lg font-semibold text-white rounded-2xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>🎥</span>
              <span>Watch Reviews</span>
            </button>
            <button
              onClick={() => router.push('/compare')}
              className="px-8 py-4 text-lg font-semibold text-[#2F2F2F] rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <span>⚖️</span>
              <span>Compare Colleges</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#2F2F2F]/60">
            <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Verified Reviews</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>Real Data</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>Student-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
