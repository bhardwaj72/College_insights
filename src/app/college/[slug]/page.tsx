import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  MapPin, Globe, DollarSign, GraduationCap, Star,
  Building, Calendar, ExternalLink, Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import collegesData from '@/data/colleges.json'
import reviewsData from '@/data/reviews.json'

// ✅ Slug generator
const generateSlug = (name: string) =>
  name?.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

interface CollegeProfileProps {
  params: {
    slug: string
  }
}

export default function CollegeProfile({ params }: CollegeProfileProps) {
  const { slug } = params

  const college = collegesData.find((c: any) =>
    generateSlug(c.name || c['Institute Name']) === slug
  ) as any

  if (!college) {
    notFound()
  }

  const collegeReviews = reviewsData.filter((r: any) => r.collegeId === college["Sr.No"])

  const collegeAny = college as any
  const ratings = collegeAny.ratings || {
    placement: collegeAny.Placement_Score ?? collegeAny.Rating ?? 0,
    faculty: collegeAny.Faculty_Score ?? collegeAny.Rating ?? 0,
    campus: collegeAny.Campus_Score ?? collegeAny.Rating ?? 0,
    roi: collegeAny.ROI_Score ?? collegeAny.Rating ?? 0
  }

  const overallRating = (
    (ratings.placement + ratings.faculty + ratings.campus + ratings.roi) / 4
  ).toFixed(1)

  const similarColleges = collegesData
    .filter((c: any) =>
      c["Sr.No"] !== college["Sr.No"] &&
      (c.City === college.City)
    )
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container px-4 py-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {(college.shortName || college['Institute Name']).slice(0, 2)}
              </span>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">
                {college.name || college['Institute Name']}
              </h1>

              <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{college.City}, {college.State}</span>

                <Building className="h-4 w-4" />
                <span>{college.type || college.Ownership}</span>

                <Calendar className="h-4 w-4" />
                <span>Est. {college.established || '-'}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {(college.courseTags || [college.Tag1, college.Tag2, college.Tag3].filter(Boolean)).map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{overallRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                NIRF Rank #{college.nirfRank || college["Synthetic NIRF Rank"] || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 grid lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">

          {/* Video */}
          {college.videoUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Campus Video Review</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src={college.videoUrl}
                  className="w-full aspect-video rounded-lg"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          )}

          {/* Key Info */}
          <Card>
            <CardHeader>
              <CardTitle>Key Facts</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>₹{(((college.fees || (college.Fees_Lakh * 100000) || 0))/100000).toFixed(1)}L Fees</div>
              <div>₹{college.avgPackage || Number(college.Avg_Package_LPA) || 0}L Avg</div>
              <div>{overallRating} Rating</div>
              <div>#{college.nirfRank || college["Synthetic NIRF Rank"] || '-'} Rank</div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Reviews ({collegeReviews.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {collegeReviews.map((r: any) => (
                <p key={r.id} className="mb-3 text-sm">{r.comment}</p>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Similar Colleges</CardTitle>
            </CardHeader>
            <CardContent>
              {similarColleges.map((c: any) => (
                <Link
                  key={c["Sr.No"]}
                  href={`/college/${generateSlug(c.name || c['Institute Name'])}`}
                  className="block mb-3"
                >
                  {c.name || c['Institute Name']}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}