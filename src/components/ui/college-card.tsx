import Link from 'next/link'
import { MapPin, GraduationCap, DollarSign, Star, Building } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface CollegeCardProps {
  college: {
    id: number
    slug: string
    name: string
    shortName: string
    city: string
    state: string
    type: string
    courseTags: string[]
    nirfRank: number
    avgPackage: number
    fees: number
    ratings: {
      placement: number
      faculty: number
      campus: number
      roi: number
    }
    description: string
    logo?: string
  }
  size?: 'small' | 'medium' | 'large'
  showCompareButton?: boolean
}

export default function CollegeCard({ college, size = 'medium', showCompareButton = false }: CollegeCardProps) {
  const overallRating = (
    (college.ratings.placement + college.ratings.faculty + college.ratings.campus + college.ratings.roi) / 4
  ).toFixed(1)

  const sizeClasses = {
    small: 'max-w-sm',
    medium: 'max-w-md',
    large: 'max-w-lg'
  }

  return (
    <Card className={`${sizeClasses[size]} bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">{college.shortName.slice(0, 2)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{college.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {college.city}, {college.state}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1 bg-[#FFD6E0]/30 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-[#2F2F2F]">{overallRating}</span>
            </div>
            <div className="text-xs text-[#2F2F2F]/60 mt-1">NIRF #{college.nirfRank}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{college.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {college.courseTags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="text-xs bg-[#C9A7EB]/20 text-[#2F2F2F] border-none rounded-full px-3 py-1">
              {tag}
            </Badge>
          ))}
          <Badge className="text-xs bg-[#00B4D8]/20 text-[#2F2F2F] border-none rounded-full px-3 py-1">
            {college.type}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="text-center bg-gradient-to-br from-[#C9A7EB]/10 to-[#FFD6E0]/10 p-3 rounded-xl">
            <div className="flex items-center justify-center text-[#8A2BE2]">
              <span className="text-lg mr-1">💰</span>
              <span className="font-semibold">₹{college.fees/1000}L</span>
            </div>
            <div className="text-xs text-[#2F2F2F]/60 mt-1">Fees</div>
          </div>
          <div className="text-center bg-gradient-to-br from-[#00B4D8]/10 to-[#C9A7EB]/10 p-3 rounded-xl">
            <div className="flex items-center justify-center text-[#00B4D8]">
              <span className="text-lg mr-1">🎓</span>
              <span className="font-semibold">₹{college.avgPackage}L</span>
            </div>
            <div className="text-xs text-[#2F2F2F]/60 mt-1">Package</div>
          </div>
          <div className="text-center bg-gradient-to-br from-[#FFD6E0]/20 to-[#C9A7EB]/10 p-3 rounded-xl">
            <div className="flex items-center justify-center text-[#8A2BE2]">
              <span className="text-lg mr-1">{college.ratings.roi >= 4 ? '🌟' : '⭐'}</span>
              <span className="font-semibold">{college.ratings.roi}</span>
            </div>
            <div className="text-xs text-[#2F2F2F]/60 mt-1">ROI</div>
          </div>
        </div>

        {/* Rating Breakdown with emojis */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span>📊</span>
              <span className="font-medium">Placement</span>
            </div>
            <span className="font-semibold text-[#8A2BE2]">{college.ratings.placement}</span>
          </div>
          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span>👨‍🏫</span>
              <span className="font-medium">Faculty</span>
            </div>
            <span className="font-semibold text-[#00B4D8]">{college.ratings.faculty}</span>
          </div>
          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span>🏫</span>
              <span className="font-medium">Campus</span>
            </div>
            <span className="font-semibold text-[#C9A7EB]">{college.ratings.campus}</span>
          </div>
          <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
            <div className="flex items-center space-x-1">
              <span>💎</span>
              <span className="font-medium">ROI</span>
            </div>
            <span className="font-semibold text-[#FFD6E0]">{college.ratings.roi}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          <Link href={`/college/${college.slug}`} className="flex-1">
            <button className="w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              View Details
            </button>
          </Link>
          {showCompareButton && (
            <button className="px-4 py-3 text-sm font-semibold text-[#2F2F2F] rounded-xl bg-white/80 border border-white/60 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              Compare
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
