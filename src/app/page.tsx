'use client'

import { useState, useMemo } from 'react'
import { Instagram, Youtube } from 'lucide-react'
import HeroBanner from '@/components/ui/hero-banner'
import ReelsCarousel from '@/components/ui/reels-carousel'
import CollegeCard, { College } from '@/components/ui/college-card'
import ChatBuddy from '@/components/chatbot/chat-buddy'
import CounsellingWidget from '@/components/counselling/CounsellingWidget'
import ExamNews from '@/components/news/ExamNews'
import { collegesData } from '@/data/colleges-normalized' // ✅ use normalized real data

export default function HomePage() {
  const [showAllTrending, setShowAllTrending] = useState(false)

  // ----- build TOP 50 trending colleges from real data -----
  const trendingColleges: College[] = useMemo(() => {
    const copy = [...collegesData]

    const getRating = (c: College) => {
      if (typeof c.rating === 'number') return c.rating
      if (!c.ratings) return 0
      const { placement, faculty, campus, roi } = c.ratings
      return (placement + faculty + campus + roi) / 4
    }

    copy.sort((a, b) => getRating(b) - getRating(a))
    return copy.slice(0, 50) // top 50
  }, [])

  const visibleColleges = showAllTrending
    ? trendingColleges
    : trendingColleges.slice(0, 15) // first 15 on initial view

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Hero Section */}
      <HeroBanner />

      {/* Reels Carousel */}
      <section className="py-16 bg-gradient-to-b from-white/50 to-[#F8FAFB]">
        <div className="container px-4">
          <ReelsCarousel />
        </div>
      </section>

      {/* 📰 Exam News */}
      <ExamNews />


      {/* Trending Colleges */}
      <section className="py-16 bg-[#F8FAFB]">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">🔥</span> Trending Colleges
            </h2>
            <p className="text-lg text-[#2F2F2F]/60">
              Top colleges students are exploring right now
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12">
            {visibleColleges.map((college, index) => (
              <CollegeCard
                key={`${college.id ?? college.slug ?? college.name}-${index}`}
                college={college}
                size="medium"
                showCompareButton={true}
              />
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setShowAllTrending((prev) => !prev)}
              className="px-8 py-4 text-lg font-semibold text-[#2F2F2F] rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {showAllTrending
                ? 'Show Top 15 Colleges'
                : `View All Colleges →`}
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div className="container px-4 text-center">
          <p className="text-[#2F2F2F]/60">
            Made with ❤️ by{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]">
              College Insights Team
            </span>
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <a
              href="https://www.instagram.com/college_insights01?igsh=MWhua3dyaXA4dXF2Nw%3D%3D&utm_source=qr"
              className="w-10 h-10 rounded-full bg-[#E1306C]/20 hover:bg-[#E1306C]/30 flex items-center justify-center transition-all hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://youtube.com/@collegeinsights01?si=XLn3v_YDx-McENfS"
              className="w-10 h-10 rounded-full bg-[#FF0000]/20 hover:bg-[#FF0000]/30 flex items-center justify-center transition-all hover:scale-110"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Counselling Widget */}
      <CounsellingWidget />

      {/* Chat Buddy */}
      <ChatBuddy />
    </div>
  )
}
