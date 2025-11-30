'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, X, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import CollegeCard from '@/components/ui/college-card'
import collegesData from '@/data/colleges.json'

interface Filters {
  search: string
  city: string
  course: string
  type: string
  feeRange: string
  sortBy: string
}

const CITIES = ['All', 'Delhi', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Vellore', 'Pilani', 'Patiala', 'Manipal']
const COURSES = ['All', 'Engineering', 'MBA', 'BTech', 'MTech', 'Computer Science', 'Management']
const TYPES = ['All', 'Government', 'Private']
const FEE_RANGES = ['All', 'Under 5L', '5L - 10L', '10L - 20L', 'Above 20L']
const SORT_OPTIONS = ['Relevance', 'NIRF Rank', 'Package', 'Fees', 'Rating']

export default function ExplorePage() {
  const [filters, setFilters] = useState<Filters>({
    search: '',
    city: 'All',
    course: 'All',
    type: 'All',
    feeRange: 'All',
    sortBy: 'Relevance'
  })
  
  const [showFilters, setShowFilters] = useState(false)

  const filteredColleges = useMemo(() => {
    let filtered = [...collegesData]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(college => 
        college.name.toLowerCase().includes(searchLower) ||
        college.city.toLowerCase().includes(searchLower) ||
        college.courseTags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }

    // City filter
    if (filters.city !== 'All') {
      filtered = filtered.filter(college => college.city === filters.city)
    }

    // Course filter
    if (filters.course !== 'All') {
      filtered = filtered.filter(college => 
        college.courseTags.some(tag => tag.toLowerCase().includes(filters.course.toLowerCase()))
      )
    }

    // Type filter
    if (filters.type !== 'All') {
      filtered = filtered.filter(college => college.type === filters.type)
    }

    // Fee range filter
    if (filters.feeRange !== 'All') {
      filtered = filtered.filter(college => {
        switch (filters.feeRange) {
          case 'Under 5L':
            return college.fees < 500000
          case '5L - 10L':
            return college.fees >= 500000 && college.fees <= 1000000
          case '10L - 20L':
            return college.fees > 1000000 && college.fees <= 2000000
          case 'Above 20L':
            return college.fees > 2000000
          default:
            return true
        }
      })
    }

    // Sort
    switch (filters.sortBy) {
      case 'NIRF Rank':
        filtered.sort((a, b) => a.nirfRank - b.nirfRank)
        break
      case 'Package':
        filtered.sort((a, b) => b.avgPackage - a.avgPackage)
        break
      case 'Fees':
        filtered.sort((a, b) => a.fees - b.fees)
        break
      case 'Rating':
        filtered.sort((a, b) => {
          const ratingA = (a.ratings.placement + a.ratings.faculty + a.ratings.campus + a.ratings.roi) / 4
          const ratingB = (b.ratings.placement + b.ratings.faculty + b.ratings.campus + b.ratings.roi) / 4
          return ratingB - ratingA
        })
        break
      default:
        // Relevance - keep original order
        break
    }

    return filtered
  }, [filters])

  const clearFilters = () => {
    setFilters({
      search: '',
      city: 'All',
      course: 'All',
      type: 'All',
      feeRange: 'All',
      sortBy: 'Relevance'
    })
  }

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
    key !== 'sortBy' && key !== 'search' && value !== 'All' && value !== ''
  ).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-heading">Explore Colleges</h1>
              <p className="text-muted-foreground">Find your perfect college from 100+ options</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {filteredColleges.length} colleges found
              </span>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 space-y-6`}>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear all
              </Button>
            </div>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Search</h3>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="College name, city, course..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">City</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {CITIES.map((city) => (
                  <label key={city} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="city"
                      checked={filters.city === city}
                      onChange={() => setFilters(prev => ({ ...prev, city }))}
                      className="text-primary"
                    />
                    <span className="text-sm">{city}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Course</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {COURSES.map((course) => (
                  <label key={course} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="course"
                      checked={filters.course === course}
                      onChange={() => setFilters(prev => ({ ...prev, course }))}
                      className="text-primary"
                    />
                    <span className="text-sm">{course}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">College Type</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {TYPES.map((type) => (
                  <label key={type} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={filters.type === type}
                      onChange={() => setFilters(prev => ({ ...prev, type }))}
                      className="text-primary"
                    />
                    <span className="text-sm">{type}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Fee Range</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                {FEE_RANGES.map((range) => (
                  <label key={range} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="feeRange"
                      checked={filters.feeRange === range}
                      onChange={() => setFilters(prev => ({ ...prev, feeRange: range }))}
                      className="text-primary"
                    />
                    <span className="text-sm">{range}</span>
                  </label>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Sort By</h3>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="w-full p-2 border rounded-lg bg-background"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {Object.entries(filters).map(([key, value]) => {
                  if (key === 'sortBy' || key === 'search' || value === 'All' || value === '') return null
                  return (
                    <Badge key={key} variant="secondary" className="cursor-pointer">
                      {value}
                      <X 
                        className="h-3 w-3 ml-1" 
                        onClick={() => setFilters(prev => ({ ...prev, [key]: key === 'city' || key === 'course' || key === 'type' || key === 'feeRange' ? 'All' : '' }))}
                      />
                    </Badge>
                  )
                })}
              </div>
            )}

            {/* College Grid */}
            {filteredColleges.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredColleges.map((college) => (
                  <CollegeCard 
                    key={college.id} 
                    college={college} 
                    showCompareButton={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No colleges found</h3>
                  <p>Try adjusting your filters or search terms</p>
                </div>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
