'use client'

import { useState, useEffect } from 'react'
import { Play, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ReelItem {
  id: number
  title: string
  collegeName: string
  thumbnail: string
  videoUrl: string
  views: string
  likes: string
  duration: string
}

const mockReels: ReelItem[] = [
  {
    id: 1,
    title: "A Day at DTU Delhi",
    collegeName: "Delhi Technological University",
    thumbnail: "/images/reels/dtu-day.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "45K",
    likes: "2.3K",
    duration: "1:30"
  },
  {
    id: 2,
    title: "IIT Delhi Placement Truth",
    collegeName: "IIT Delhi",
    thumbnail: "/images/reels/iitd-placement.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "82K",
    likes: "5.1K",
    duration: "2:15"
  },
  {
    id: 3,
    title: "Hostel Life at VIT",
    collegeName: "VIT Vellore",
    thumbnail: "/images/reels/vit-hostel.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "67K",
    likes: "3.8K",
    duration: "1:45"
  },
  {
    id: 4,
    title: "NSUT Campus Tour",
    collegeName: "NSUT Delhi",
    thumbnail: "/images/reels/nsut-tour.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "38K",
    likes: "1.9K",
    duration: "3:20"
  },
  {
    id: 5,
    title: "MBA Life at IIM Bangalore",
    collegeName: "IIM Bangalore",
    thumbnail: "/images/reels/iimb-mba.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    views: "91K",
    likes: "6.2K",
    duration: "2:30"
  }
]

export default function ReelsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [playingId, setPlayingId] = useState<number | null>(null)

  // Responsive visible reels count
  const getVisibleReels = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1 // Mobile: 1 reel
      if (window.innerWidth < 1024) return 2 // Tablet: 2 reels
      return 3 // Desktop: 3 reels
    }
    return 3 // Default for SSR
  }

  const [visibleReels, setVisibleReels] = useState(getVisibleReels())

  // Update visible reels on resize
  useEffect(() => {
    const handleResize = () => {
      setVisibleReels(getVisibleReels())
      // Reset index if it's out of bounds
      const maxIndex = Math.max(0, mockReels.length - getVisibleReels())
      if (currentIndex > maxIndex) {
        setCurrentIndex(maxIndex)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentIndex])

  const maxIndex = Math.max(0, mockReels.length - visibleReels)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handlePlay = (reelId: number) => {
    setPlayingId(playingId === reelId ? null : reelId)
  }

  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-heading">Today's College Review</h2>
          <p className="text-sm text-muted-foreground">Real students, real stories 📱</p>
        </div>
        <div className="flex space-x-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="rounded-full h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex === maxIndex}
            className="rounded-full h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-3 sm:gap-4"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleReels)}%)` }}
        >
          {mockReels.map((reel) => (
            <div
              key={reel.id}
              className="flex-none w-full sm:w-1/2 lg:w-1/3"
            >
              <Card className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  {/* Thumbnail/Video Container */}
                  <div className="relative aspect-[9/16] bg-muted">
                    {playingId === reel.id ? (
                      <iframe
                        src={reel.videoUrl}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://picsum.photos/seed/${reel.id}/300/533.jpg`
                          }}
                        />

                        {/* Play Button */}
                        <button
                          onClick={() => handlePlay(reel.id)}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group-hover:scale-110 transition-transform"
                        >
                          <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary ml-0.5 sm:ml-1" />
                        </button>

                        {/* Duration Badge */}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {reel.duration}
                        </div>

                        {/* College Name */}
                        <div className="absolute bottom-2 left-2 text-white">
                          <p className="text-xs sm:text-sm font-semibold line-clamp-1">{reel.collegeName}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Reel Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2">{reel.title}</h3>

                    {/* Engagement Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Play className="h-3 w-3 mr-1" />
                          {reel.views}
                        </span>
                        <span className="flex items-center">
                          <Heart className="h-3 w-3 mr-1" />
                          {reel.likes}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                        </button>
                        <button className="hover:text-primary transition-colors">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mt-6">
        <Button variant="outline" className="rounded-full px-4 sm:px-6">
          <span className="hidden sm:inline">View All Reviews →</span>
          <span className="sm:hidden">View All →</span>
        </Button>
      </div>
    </div>
  )
}
