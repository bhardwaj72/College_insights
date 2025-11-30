'use client'

import { Play, ThumbsUp, MessageCircle, Share2, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import insightsData from '@/data/insights.json'

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9A7EB]/20 via-[#F8FAFB] to-[#FFD6E0]/20">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">💡</span> College Insights
            </h1>
            <p className="text-lg text-[#2F2F2F]/60">
              Tips, tricks, and real stories from students across India
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {['All', 'Placements', 'Campus Life', 'Exams', 'Admissions', 'Career'].map((cat) => (
            <button
              key={cat}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                cat === 'All'
                  ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white shadow-md'
                  : 'bg-white/60 backdrop-blur-sm border border-white/60 text-[#2F2F2F] hover:scale-105'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insightsData.map((insight) => (
            <Card
              key={insight.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-[#C9A7EB]/20 to-[#00B4D8]/20">
                {insight.videoUrl ? (
                  <div className="relative w-full h-full group cursor-pointer">
                    <img
                      src={insight.thumbnail || `https://picsum.photos/seed/${insight.id}/600/400`}
                      alt={insight.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://picsum.photos/seed/${insight.id}/600/400`
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-[#8A2BE2] ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      2:30
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>
                )}
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Category Badge */}
                <Badge className="bg-[#C9A7EB]/20 text-[#2F2F2F] border-none rounded-full">
                  {insight.tags[0] || 'General'}
                </Badge>

                {/* Title */}
                <h3 className="font-bold text-lg text-[#2F2F2F] line-clamp-2">
                  {insight.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#2F2F2F]/60 line-clamp-3">
                  {insight.content.substring(0, 150)}...
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[#2F2F2F]/50 pt-2 border-t border-white/60">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(insight.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{Math.floor(Math.random() * 50) + 10}</span>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                  Read More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 text-lg font-semibold text-[#2F2F2F] rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-white/60 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Load More Insights
          </button>
        </div>
      </div>
    </div>
  )
}
