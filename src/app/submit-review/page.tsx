'use client'

import { useState } from 'react'
import { Star, Upload, Eye, EyeOff } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function SubmitReviewPage() {
  const [anonymous, setAnonymous] = useState(false)
  const [ratings, setRatings] = useState({
    placement: 0,
    faculty: 0,
    campus: 0,
    roi: 0
  })

  const RatingStars = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#2F2F2F]">{label}</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`h-6 w-6 ${
                star <= value
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9A7EB]/20 via-[#F8FAFB] to-[#00B4D8]/20">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">📝</span> Submit Your Review
            </h1>
            <p className="text-lg text-[#2F2F2F]/60">
              Help future students with your honest experience
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
            <CardContent className="p-8">
              <form className="space-y-6">
                {/* College Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Select College <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all">
                    <option>Choose a college...</option>
                    <option>IIT Delhi</option>
                    <option>DTU Delhi</option>
                    <option>NSUT Delhi</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Course */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Your Course <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., B.Tech Computer Science"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                  />
                </div>

                {/* Year of Graduation */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Year of Graduation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2024"
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                  />
                </div>

                {/* Ratings */}
                <div className="space-y-4 p-6 bg-gradient-to-br from-[#C9A7EB]/10 to-[#00B4D8]/10 rounded-2xl">
                  <h3 className="font-semibold text-[#2F2F2F] mb-4">Rate Your Experience</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <RatingStars
                      label="📊 Placements"
                      value={ratings.placement}
                      onChange={(v) => setRatings({ ...ratings, placement: v })}
                    />
                    <RatingStars
                      label="👨‍🏫 Faculty"
                      value={ratings.faculty}
                      onChange={(v) => setRatings({ ...ratings, faculty: v })}
                    />
                    <RatingStars
                      label="🏫 Campus Life"
                      value={ratings.campus}
                      onChange={(v) => setRatings({ ...ratings, campus: v })}
                    />
                    <RatingStars
                      label="💎 ROI (Value for Money)"
                      value={ratings.roi}
                      onChange={(v) => setRatings({ ...ratings, roi: v })}
                    />
                  </div>
                </div>

                {/* Written Review */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Your Detailed Review <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Share your experience — placements, faculty, campus life, hostel, food, events, etc."
                    className="w-full px-4 py-3 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all resize-none"
                  ></textarea>
                  <p className="text-xs text-[#2F2F2F]/50">Minimum 100 characters</p>
                </div>

                {/* Video Upload */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#2F2F2F]">
                    Upload Video Review (Optional) 🎥
                  </label>
                  <div className="border-2 border-dashed border-[#8A2BE2]/30 rounded-xl p-8 text-center bg-gradient-to-br from-[#C9A7EB]/5 to-[#00B4D8]/5 hover:border-[#8A2BE2]/50 transition-all cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-3 text-[#8A2BE2]" />
                    <p className="font-medium text-[#2F2F2F]">Click to upload or drag and drop</p>
                    <p className="text-xs text-[#2F2F2F]/50 mt-1">MP4, MOV (Max 50MB)</p>
                  </div>
                </div>

                {/* Anonymous Toggle */}
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl">
                  <div className="flex items-center space-x-3">
                    {anonymous ? <EyeOff className="h-5 w-5 text-[#8A2BE2]" /> : <Eye className="h-5 w-5 text-[#00B4D8]" />}
                    <div>
                      <p className="font-medium text-[#2F2F2F]">Post Anonymously</p>
                      <p className="text-xs text-[#2F2F2F]/50">Your identity will be hidden</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAnonymous(!anonymous)}
                    className={`w-14 h-7 rounded-full transition-all ${
                      anonymous ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                        anonymous ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    ></div>
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full px-6 py-4 text-lg font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Submit Review
                </button>

                <p className="text-xs text-center text-[#2F2F2F]/50">
                  By submitting, you agree to our community guidelines and terms of service
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
