"use client";
import HeroBanner from '@/components/ui/hero-banner'
import ReelsCarousel from '@/components/ui/reels-carousel'
import CollegeCard from '@/components/ui/college-card'
import ChatBuddy from '@/components/chatbot/chat-buddy'
import collegesData from '@/data/colleges.json'

export default function HomePage() {
  // Get trending colleges (first 6 for demo)
  const trendingColleges = collegesData.slice(0, 6)

  const handleSearch = (query: string) => {
    console.log('Search query:', query)
    // TODO: Implement search navigation
  }

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

      {/* Trending Colleges */}
      <section className="py-16 bg-[#F8FAFB]">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">🔥</span> Trending Colleges
            </h2>
            <p className="text-lg text-[#2F2F2F]/60">Most searched and reviewed colleges this month</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {trendingColleges.map((college) => (
              <CollegeCard 
                key={college.id} 
                college={college} 
                showCompareButton={true}
              />
            ))}
          </div>

          <div className="text-center">
            <button className="px-8 py-4 text-lg font-semibold text-[#2F2F2F] rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              View All Colleges →
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div className="container px-4 text-center">
          <p className="text-[#2F2F2F]/60">Made with ❤️ by <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]">College Insights Team</span></p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[#C9A7EB]/20 hover:bg-[#C9A7EB]/30 flex items-center justify-center transition-all hover:scale-110">
              <span>🐦</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#00B4D8]/20 hover:bg-[#00B4D8]/30 flex items-center justify-center transition-all hover:scale-110">
              <span>📘</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[#FFD6E0]/20 hover:bg-[#FFD6E0]/30 flex items-center justify-center transition-all hover:scale-110">
              <span>📸</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Chat Buddy */}
      <ChatBuddy />
    </div>
  )
}
