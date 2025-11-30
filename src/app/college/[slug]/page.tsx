import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Globe, DollarSign, GraduationCap, Star, Building, Calendar, ExternalLink, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import collegesData from '@/data/colleges.json'
import reviewsData from '@/data/reviews.json'

interface CollegeProfileProps {
  params: Promise<{
    slug: string
  }>
}

export default async function CollegeProfile({ params }: CollegeProfileProps) {
  const { slug } = await params
  const college = collegesData.find(c => c.slug === slug)
  
  if (!college) {
    notFound()
  }

  const collegeReviews = reviewsData.filter(r => r.collegeId === college.id)
  const overallRating = (
    (college.ratings.placement + college.ratings.faculty + college.ratings.campus + college.ratings.roi) / 4
  ).toFixed(1)

  const similarColleges = collegesData
    .filter(c => c.id !== college.id && c.city === college.city)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border-b">
        <div className="container px-4 py-8">
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-2xl">{college.shortName.slice(0, 2)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold font-heading mb-2">{college.name}</h1>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {college.city}, {college.state}
                    </div>
                    <div className="flex items-center">
                      <Building className="h-4 w-4 mr-1" />
                      {college.type}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Est. {college.established}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {college.courseTags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-2xl font-bold">{overallRating}</span>
                    <span className="text-muted-foreground">/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">NIRF Rank #{college.nirfRank}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Review */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Campus Video Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={college.videoUrl}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Key Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Key Facts & Figures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-2">
                      <DollarSign className="h-5 w-5 mr-1" />
                      <span className="text-xl font-bold">₹{(college.fees/100000).toFixed(1)}L</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Annual Fees</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-2">
                      <GraduationCap className="h-5 w-5 mr-1" />
                      <span className="text-xl font-bold">₹{college.avgPackage}L</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Avg Package</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-2">
                      <Star className="h-5 w-5 mr-1" />
                      <span className="text-xl font-bold">{overallRating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-2">
                      <Building className="h-5 w-5 mr-1" />
                      <span className="text-xl font-bold">#{college.nirfRank}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">NIRF Rank</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ratings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Student Ratings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(college.ratings).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize font-medium">{key}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                          style={{ width: `${(value / 5) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center space-x-1 w-20">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{value}</span>
                        <span className="text-muted-foreground text-sm">/5</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About {college.shortName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{college.description}</p>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Official Website
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Student Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews ({collegeReviews.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {collegeReviews.map((review) => (
                  <div key={review.id} className="border-b last:border-b-0 pb-4 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{review.anonymous ? 'Anonymous' : review.user}</h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString('en-IN', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">
                          {Object.values(review.ratings).reduce((a, b) => a + b, 0) / Object.values(review.ratings).length}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{review.comment}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      {Object.entries(review.ratings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="capitalize">{key}</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span>{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Button variant="outline">View All Reviews</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Summary */}
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg">🤖 AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Best for students looking for top placements in Delhi NCR. Strong ROI with excellent industry connections. 
                  Campus life is vibrant with good hostel facilities. Consider this if you prioritize career outcomes over campus experience.
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-gradient">Apply Now</Button>
                <Button variant="outline" className="w-full">Download Brochure</Button>
                <Button variant="outline" className="w-full">Schedule Visit</Button>
                <Button variant="outline" className="w-full">Save to List</Button>
              </CardContent>
            </Card>

            {/* Similar Colleges */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar Colleges in {college.city}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {similarColleges.map((similar) => (
                  <div key={similar.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{similar.shortName.slice(0, 2)}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{similar.name}</h4>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        {((similar.ratings.placement + similar.ratings.faculty + similar.ratings.campus + similar.ratings.roi) / 4).toFixed(1)}
                        <span className="mx-1">•</span>
                        ₹{similar.avgPackage}L
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/college/${similar.slug}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
