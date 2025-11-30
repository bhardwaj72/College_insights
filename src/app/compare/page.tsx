'use client'

import { useState } from 'react'
import { Search, Plus, X, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import collegesData from '@/data/colleges.json'

export default function ComparePage() {
  const [selectedColleges, setSelectedColleges] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredColleges = collegesData.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    college.city.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5)

  const addCollege = (college: any) => {
    if (selectedColleges.length < 3 && !selectedColleges.find(c => c.id === college.id)) {
      setSelectedColleges([...selectedColleges, college])
      setSearchQuery('')
    }
  }

  const removeCollege = (id: number) => {
    setSelectedColleges(selectedColleges.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9A7EB]/20 via-[#F8FAFB] to-[#00B4D8]/20">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-white/40 py-12">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-3 text-[#2F2F2F]">
              <span className="inline-block">⚖️</span> Compare Colleges
            </h1>
            <p className="text-lg text-[#2F2F2F]/60">
              Side-by-side comparison to find your perfect match
            </p>
          </div>
        </div>
      </div>

      <div className="container px-4 py-12">
        {/* Search & Add */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)]">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#8A2BE2]" />
                <input
                  type="text"
                  placeholder="Search college to add (max 3)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
                />
              </div>
              <div className="text-sm text-[#2F2F2F]/60">
                {selectedColleges.length}/3 selected
              </div>
            </div>

            {/* Search Results */}
            {searchQuery && filteredColleges.length > 0 && (
              <div className="mt-4 space-y-2">
                {filteredColleges.map((college) => (
                  <button
                    key={college.id}
                    onClick={() => addCollege(college)}
                    disabled={selectedColleges.find(c => c.id === college.id)}
                    className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-[#C9A7EB]/10 to-[#00B4D8]/10 hover:from-[#C9A7EB]/20 hover:to-[#00B4D8]/20 border border-white/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="font-semibold text-[#2F2F2F]">{college.name}</div>
                    <div className="text-sm text-[#2F2F2F]/60">{college.city}, {college.state}</div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Selected Colleges */}
        {selectedColleges.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#C9A7EB]/20 to-[#00B4D8]/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">⚖️</span>
            </div>
            <h3 className="text-xl font-semibold text-[#2F2F2F] mb-2">No colleges selected</h3>
            <p className="text-[#2F2F2F]/60">Search and add up to 3 colleges to compare</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedColleges.map((college) => (
              <Card key={college.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] relative">
                <button
                  onClick={() => removeCollege(college.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center transition-all"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-[#2F2F2F] mb-1">{college.name}</h3>
                    <p className="text-sm text-[#2F2F2F]/60">{college.city}, {college.state}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#C9A7EB]/10 to-[#FFD6E0]/10 rounded-xl">
                      <span className="text-sm font-medium">NIRF Rank</span>
                      <span className="font-bold text-[#8A2BE2]">#{college.nirfRank}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#00B4D8]/10 to-[#C9A7EB]/10 rounded-xl">
                      <span className="text-sm font-medium">Avg Package</span>
                      <span className="font-bold text-[#00B4D8]">₹{college.avgPackage}L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#FFD6E0]/20 to-[#C9A7EB]/10 rounded-xl">
                      <span className="text-sm font-medium">Annual Fees</span>
                      <span className="font-bold text-[#8A2BE2]">₹{(college.fees/100000).toFixed(1)}L</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/60 rounded-xl">
                      <span className="text-sm font-medium">Type</span>
                      <span className="font-bold text-[#2F2F2F]">{college.type}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="text-center p-2 bg-gradient-to-br from-[#C9A7EB]/10 to-[#FFD6E0]/10 rounded-lg">
                      <div className="text-xs text-[#2F2F2F]/60 mb-1">Placement</div>
                      <div className="font-bold text-[#8A2BE2]">{college.ratings.placement}/5</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-[#00B4D8]/10 to-[#C9A7EB]/10 rounded-lg">
                      <div className="text-xs text-[#2F2F2F]/60 mb-1">Faculty</div>
                      <div className="font-bold text-[#00B4D8]">{college.ratings.faculty}/5</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-[#FFD6E0]/20 to-[#C9A7EB]/10 rounded-lg">
                      <div className="text-xs text-[#2F2F2F]/60 mb-1">Campus</div>
                      <div className="font-bold text-[#C9A7EB]">{college.ratings.campus}/5</div>
                    </div>
                    <div className="text-center p-2 bg-white/60 rounded-lg">
                      <div className="text-xs text-[#2F2F2F]/60 mb-1">ROI</div>
                      <div className="font-bold text-[#FFD6E0]">{college.ratings.roi}/5</div>
                    </div>
                  </div>

                  <button className="w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>View Details</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
