// import Link from 'next/link'
// import { MapPin, Star, Building } from 'lucide-react'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'

// export interface College {
//   id: number
//   slug: string
//   name: string
//   shortName: string
//   city: string
//   state: string
//   type: string
//   courseTags: string[]
//   nirfRank: number
//   avgPackage: number
//   fees: number
//   ratings: {
//     placement: number
//     faculty: number
//     campus: number
//     roi: number
//   }
//   description: string
//   logo?: string

//   // New fields from real data (all optional so older data still works)
//   region?: string
//   district?: string
//   userGroup?: string
//   locationDisplay?: string
//   ownership?: string
//   rating?: number
//   feesLakh?: number
//   feesDisplay?: string
//   avgPackageDisplay?: string
// }

// interface CollegeCardProps {
//   college: College
//   size?: 'small' | 'medium' | 'large'
//   showCompareButton?: boolean
// }

// export default function CollegeCard({
//   college,
//   size = 'medium',
//   showCompareButton = false,
// }: CollegeCardProps) {
//   const overallRating = (
//     (college.ratings.placement +
//       college.ratings.faculty +
//       college.ratings.campus +
//       college.ratings.roi) /
//     4
//   ).toFixed(1)

//   const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
//     small: 'max-w-sm',
//     medium: 'max-w-md',
//     large: 'max-w-lg',
//   }

//   return (
//     <Card
//       className={`${sizeClasses[size]} bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(138,43,226,0.15)] hover:-translate-y-2 transition-all duration-300`}
//     >
//       <CardHeader className="pb-3">
//         <div className="flex items-start justify-between">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-lg">
//                 {college.shortName.slice(0, 2)}
//               </span>
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg leading-tight">
//                 {college.name}
//               </h3>
//               <div className="flex items-center text-sm text-muted-foreground mt-1">
//                 <MapPin className="h-3 w-3 mr-1" />
//                 {college.city}, {college.state}
//               </div>
//               {college.ownership && (
//                 <div className="flex items-center text-xs text-muted-foreground mt-1">
//                   <Building className="h-3 w-3 mr-1" />
//                   <span>{college.ownership}</span>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="text-right">
//             <div className="flex items-center space-x-1 bg-[#FFD6E0]/30 px-3 py-1 rounded-full">
//               <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//               <span className="font-semibold text-[#2F2F2F]">
//                 {college.rating ?? overallRating}
//               </span>
//             </div>
//             {college.nirfRank > 0 && (
//               <div className="text-xs text-[#2F2F2F]/60 mt-1">
//                 NIRF #{college.nirfRank}
//               </div>
//             )}
//           </div>
//         </div>
//       </CardHeader>

//       <CardContent className="space-y-4">
//         <p className="text-sm text-muted-foreground line-clamp-2">
//           {college.description}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2">
//           {college.courseTags.slice(0, 3).map((tag) => (
//             <Badge
//               key={tag}
//               className="text-xs bg-[#C9A7EB]/20 text-[#2F2F2F] border-none rounded-full px-3 py-1"
//             >
//               {tag}
//             </Badge>
//           ))}
//           <Badge className="text-xs bg-[#00B4D8]/20 text-[#2F2F2F] border-none rounded-full px-3 py-1">
//             {college.type}
//           </Badge>
//         </div>

//         {/* Key Metrics */}
//         <div className="grid grid-cols-3 gap-3 text-sm">
//           <div className="text-center bg-gradient-to-br from-[#C9A7EB]/10 to-[#FFD6E0]/10 p-3 rounded-xl">
//             <div className="flex items-center justify-center text-[#8A2BE2]">
//               <span className="text-lg mr-1">💰</span>
//               <span className="font-semibold">
//                 ₹{(college.fees / 100000).toFixed(1)}L
//               </span>
//             </div>
//             <div className="text-xs text-[#2F2F2F]/60 mt-1">Fees</div>
//           </div>
//           <div className="text-center bg-gradient-to-br from-[#00B4D8]/10 to-[#C9A7EB]/10 p-3 rounded-xl">
//             <div className="flex items-center justify-center text-[#00B4D8]">
//               <span className="text-lg mr-1">🎓</span>
//               <span className="font-semibold">
//                 ₹{college.avgPackage}L
//               </span>
//             </div>
//             <div className="text-xs text-[#2F2F2F]/60 mt-1">Package</div>
//           </div>
//           <div className="text-center bg-gradient-to-br from-[#FFD6E0]/20 to-[#C9A7EB]/10 p-3 rounded-xl">
//             <div className="flex items-center justify-center text-[#8A2BE2]">
//               <span className="text-lg mr-1">
//                 {college.ratings.roi >= 4 ? '🌟' : '⭐'}
//               </span>
//               <span className="font-semibold">{college.ratings.roi}</span>
//             </div>
//             <div className="text-xs text-[#2F2F2F]/60 mt-1">ROI</div>
//           </div>
//         </div>

//         {/* Rating Breakdown */}
//         <div className="grid grid-cols-2 gap-2 text-xs">
//           <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
//             <div className="flex items-center space-x-1">
//               <span>📊</span>
//               <span className="font-medium">Placement</span>
//             </div>
//             <span className="font-semibold text-[#8A2BE2]">
//               {college.ratings.placement}
//             </span>
//           </div>
//           <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
//             <div className="flex items-center space-x-1">
//               <span>👨‍🏫</span>
//               <span className="font-medium">Faculty</span>
//             </div>
//             <span className="font-semibold text-[#00B4D8]">
//               {college.ratings.faculty}
//             </span>
//           </div>
//           <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
//             <div className="flex items-center space-x-1">
//               <span>🏫</span>
//               <span className="font-medium">Campus</span>
//             </div>
//             <span className="font-semibold text-[#C9A7EB]">
//               {college.ratings.campus}
//             </span>
//           </div>
//           <div className="flex items-center justify-between bg-white/60 p-2 rounded-lg">
//             <div className="flex items-center space-x-1">
//               <span>💎</span>
//               <span className="font-medium">ROI</span>
//             </div>
//             <span className="font-semibold text-[#FFD6E0]">
//               {college.ratings.roi}
//             </span>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="flex space-x-2 pt-2">
//           <Link href={`/college/${college.slug}`} className="flex-1">
//             <button className="w-full px-4 py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
//               View Details
//             </button>
//           </Link>
//           {showCompareButton && (
//             <button className="px-4 py-3 text-sm font-semibold text-[#2F2F2F] rounded-xl bg-white/80 border border-white/60 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
//               Compare
//             </button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }








import Link from 'next/link'
import {
  MapPin,
  Star,
  Building,
  Bookmark,
  Share2,
  Scale,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export interface College {
  id: number
  slug: string
  name: string
  shortName: string
  city: string
  state: string
  type: string
  nirfRank: number
  avgPackage: number
  fees: number

  // make these OPTIONAL so old/mock data doesn't crash
  courseTags?: string[]
  ratings?: {
    placement: number
    faculty: number
    campus: number
    roi: number
  }
  description: string
  logo?: string

  // extra optional fields
  region?: string
  district?: string
  userGroup?: string
  locationDisplay?: string
  ownership?: string
  rating?: number
  feesLakh?: number
  feesDisplay?: string
  avgPackageDisplay?: string
}

interface CollegeCardProps {
  college: College
  size?: 'small' | 'medium' | 'large'
  showCompareButton?: boolean
}

export default function CollegeCard({
  college,
  size = 'medium',
  showCompareButton = false,
}: CollegeCardProps) {
  // ----- SAFE VALUES FOR EVERYTHING -----
  const courseTags = college.courseTags ?? []

  const placement = college.ratings?.placement ?? 0
  const faculty = college.ratings?.faculty ?? 0
  const campus = college.ratings?.campus ?? 0
  const roi = college.ratings?.roi ?? 0

  const overallRating = (
    (placement + faculty + campus + roi) / 4 || 0
  ).toFixed(1)

  const sizeClasses: Record<'small' | 'medium' | 'large', string> = {
    small: 'p-3',
    medium: 'p-4',
    large: 'p-5',
  }

  return (
    <Card className="h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-[0_10px_25px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_40px_rgba(79,70,229,0.18)] hover:-translate-y-1.5 transition-all duration-300">
      <CardHeader className={`pb-3 ${sizeClasses[size]}`}>
        <div className="flex items-start justify-between gap-3">
          {/* Logo + name */}
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#8A2BE2] to-[#00B4D8] flex items-center justify-center shadow-md shrink-0">
              <span className="text-white font-semibold text-base md:text-lg">
                {college.shortName?.slice(0, 2) ?? 'CI'}
              </span>
            </div>
            <div className="space-y-0.5">
              <h3 className="font-semibold text-base md:text-lg leading-snug">
                {college.name}
              </h3>
              <div className="flex items-center text-xs text-slate-500">
                <MapPin className="h-3 w-3 mr-1" />
                {college.city}, {college.state}
              </div>
              {college.ownership && (
                <div className="flex items-center text-[11px] text-slate-500">
                  <Building className="h-3 w-3 mr-1" />
                  {college.ownership}
                </div>
              )}
            </div>
          </div>

          {/* Rating + icons */}
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 bg-[#FFECEF] px-2.5 py-1 rounded-full">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold text-slate-900">
                {college.rating ?? overallRating}
              </span>
            </div>
            {college.nirfRank > 0 && (
              <span className="text-[11px] text-slate-500">
                NIRF #{college.nirfRank}
              </span>
            )}

            {/* interactive icons */}
            <div className="mt-1 flex items-center gap-1.5">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white h-8 w-8 text-slate-500 hover:text-[#8A2BE2] hover:border-[#8A2BE2]/60 hover:bg-[#F3E8FF] transition-colors"
                aria-label="Save college"
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white h-8 w-8 text-slate-500 hover:text-[#0EA5E9] hover:border-[#0EA5E9]/60 hover:bg-[#E0F2FE] transition-colors"
                aria-label="Share college"
              >
                <Share2 className="h-4 w-4" />
              </button>
              {showCompareButton && (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white h-8 px-3 text-[11px] font-medium text-slate-600 hover:text-[#10B981] hover:border-[#10B981]/60 hover:bg-[#ECFDF5] transition-colors gap-1"
                >
                  <Scale className="h-3.5 w-3.5" />
                  Compare
                </button>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className={`space-y-3 ${sizeClasses[size]}`}>
        {/* description */}
        <p className="text-xs md:text-sm text-slate-600 line-clamp-2">
          {college.description}
        </p>

        {/* tags */}
        <div className="flex flex-wrap gap-1.5">
          {courseTags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              className="text-[11px] bg-[#F3E8FF] text-[#4C1D95] border-none rounded-full px-2.5 py-1"
            >
              {tag}
            </Badge>
          ))}
          <Badge className="text-[11px] bg-[#DBEAFE] text-[#1D4ED8] border-none rounded-full px-2.5 py-1">
            {college.type}
          </Badge>
        </div>

        {/* key metrics row */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="text-center bg-gradient-to-br from-[#EEF2FF] to-[#FDF2FF] p-2.5 rounded-xl">
            <div className="flex items-center justify-center text-[#4C1D95]">
              <span className="text-base mr-1">💰</span>
              <span className="font-semibold text-[13px]">
                ₹{(college.fees / 100000).toFixed(1)}L
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">Fees</div>
          </div>
          <div className="text-center bg-gradient-to-br from-[#E0F2FE] to-[#F1F5F9] p-2.5 rounded-xl">
            <div className="flex items-center justify-center text-[#0369A1]">
              <span className="text-base mr-1">🎓</span>
              <span className="font-semibold text-[13px]">
                ₹{college.avgPackage}L
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">Avg Package</div>
          </div>
          <div className="text-center bg-gradient-to-br from-[#ECFDF5] to-[#F5F3FF] p-2.5 rounded-xl">
            <div className="flex items-center justify-center text-[#16A34A]">
              <span className="text-base mr-1">
                {roi >= 4 ? '🌟' : '⭐'}
              </span>
              <span className="font-semibold text-[13px]">
                {roi.toFixed(1)}
              </span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">ROI Score</div>
          </div>
        </div>

        {/* rating breakdown */}
        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
          <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1.5 rounded-lg">
            <span className="flex items-center gap-1">
              <span>📊</span>
              <span className="font-medium">Placement</span>
            </span>
            <span className="font-semibold text-[#4C1D95]">
              {placement.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1.5 rounded-lg">
            <span className="flex items-center gap-1">
              <span>👨‍🏫</span>
              <span className="font-medium">Faculty</span>
            </span>
            <span className="font-semibold text-[#0EA5E9]">
              {faculty.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1.5 rounded-lg">
            <span className="flex items-center gap-1">
              <span>🏫</span>
              <span className="font-medium">Campus</span>
            </span>
            <span className="font-semibold text-[#8B5CF6]">
              {campus.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-50/80 px-2 py-1.5 rounded-lg">
            <span className="flex items-center gap-1">
              <span>💎</span>
              <span className="font-medium">ROI</span>
            </span>
            <span className="font-semibold text-[#F97316]">
              {roi.toFixed(1)}
            </span>
          </div>
        </div>

        {/* actions */}
        <div className="pt-2 flex gap-2">
          <Link href={`/college/${college.slug}`} className="flex-1">
            <button className="w-full px-4 py-2.5 text-xs md:text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
              View Details
            </button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
