// 'use client'

// import { useState, useMemo } from 'react'
// import { Search, Filter, X, ChevronDown } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// import { Badge } from '@/components/ui/badge'
// import CollegeCard from '@/components/ui/college-card'
// import collegesData from '@/data/colleges.json'

// interface Filters {
//   search: string
//   city: string
//   course: string
//   type: string
//   feeRange: string
//   sortBy: string
// }

// const CITIES = ['All', 'Delhi', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Vellore', 'Pilani', 'Patiala', 'Manipal']
// const COURSES = ['All', 'Engineering', 'MBA', 'BTech', 'MTech', 'Computer Science', 'Management']
// const TYPES = ['All', 'Government', 'Private']
// const FEE_RANGES = ['All', 'Under 5L', '5L - 10L', '10L - 20L', 'Above 20L']
// const SORT_OPTIONS = ['Relevance', 'NIRF Rank', 'Package', 'Fees', 'Rating']

// export default function ExplorePage() {
//   const [filters, setFilters] = useState<Filters>({
//     search: '',
//     city: 'All',
//     course: 'All',
//     type: 'All',
//     feeRange: 'All',
//     sortBy: 'Relevance'
//   })

//   const [showFilters, setShowFilters] = useState(false)

//   const filteredColleges = useMemo(() => {
//     let filtered = [...collegesData]

//     // Search filter
//     if (filters.search) {
//       const searchLower = filters.search.toLowerCase()
//       filtered = filtered.filter(college => 
//         college.name.toLowerCase().includes(searchLower) ||
//         college.city.toLowerCase().includes(searchLower) ||
//         college.courseTags.some(tag => tag.toLowerCase().includes(searchLower))
//       )
//     }

//     // City filter
//     if (filters.city !== 'All') {
//       filtered = filtered.filter(college => college.city === filters.city)
//     }

//     // Course filter
//     if (filters.course !== 'All') {
//       filtered = filtered.filter(college => 
//         college.courseTags.some(tag => tag.toLowerCase().includes(filters.course.toLowerCase()))
//       )
//     }

//     // Type filter
//     if (filters.type !== 'All') {
//       filtered = filtered.filter(college => college.type === filters.type)
//     }

//     // Fee range filter
//     if (filters.feeRange !== 'All') {
//       filtered = filtered.filter(college => {
//         switch (filters.feeRange) {
//           case 'Under 5L':
//             return college.fees < 500000
//           case '5L - 10L':
//             return college.fees >= 500000 && college.fees <= 1000000
//           case '10L - 20L':
//             return college.fees > 1000000 && college.fees <= 2000000
//           case 'Above 20L':
//             return college.fees > 2000000
//           default:
//             return true
//         }
//       })
//     }

//     // Sort
//     switch (filters.sortBy) {
//       case 'NIRF Rank':
//         filtered.sort((a, b) => a.nirfRank - b.nirfRank)
//         break
//       case 'Package':
//         filtered.sort((a, b) => b.avgPackage - a.avgPackage)
//         break
//       case 'Fees':
//         filtered.sort((a, b) => a.fees - b.fees)
//         break
//       case 'Rating':
//         filtered.sort((a, b) => {
//           const ratingA = (a.ratings.placement + a.ratings.faculty + a.ratings.campus + a.ratings.roi) / 4
//           const ratingB = (b.ratings.placement + b.ratings.faculty + b.ratings.campus + b.ratings.roi) / 4
//           return ratingB - ratingA
//         })
//         break
//       default:
//         // Relevance - keep original order
//         break
//     }

//     return filtered
//   }, [filters])

//   const clearFilters = () => {
//     setFilters({
//       search: '',
//       city: 'All',
//       course: 'All',
//       type: 'All',
//       feeRange: 'All',
//       sortBy: 'Relevance'
//     })
//   }

//   const activeFiltersCount = Object.entries(filters).filter(([key, value]) => 
//     key !== 'sortBy' && key !== 'search' && value !== 'All' && value !== ''
//   ).length

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Header */}
//       <div className="border-b bg-muted/30">
//         <div className="container px-4 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//             <div>
//               <h1 className="text-3xl font-bold font-heading">Explore Colleges</h1>
//               <p className="text-muted-foreground">Find your perfect college from 100+ options</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-muted-foreground">
//                 {filteredColleges.length} colleges found
//               </span>
//               <Button
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="lg:hidden"
//               >
//                 <Filter className="h-4 w-4 mr-2" />
//                 Filters
//                 {activeFiltersCount > 0 && (
//                   <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
//                     {activeFiltersCount}
//                   </Badge>
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container px-4 py-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           {/* Filters Sidebar */}
//           <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 space-y-6`}>
//             <div className="flex items-center justify-between">
//               <h2 className="text-lg font-semibold">Filters</h2>
//               <Button variant="ghost" size="sm" onClick={clearFilters}>
//                 <X className="h-4 w-4 mr-1" />
//                 Clear all
//               </Button>
//             </div>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">Search</h3>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     placeholder="College name, city, course..."
//                     value={filters.search}
//                     onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
//                     className="pl-10"
//                   />
//                 </div>
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">City</h3>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {CITIES.map((city) => (
//                   <label key={city} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="city"
//                       checked={filters.city === city}
//                       onChange={() => setFilters(prev => ({ ...prev, city }))}
//                       className="text-primary"
//                     />
//                     <span className="text-sm">{city}</span>
//                   </label>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">Course</h3>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {COURSES.map((course) => (
//                   <label key={course} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="course"
//                       checked={filters.course === course}
//                       onChange={() => setFilters(prev => ({ ...prev, course }))}
//                       className="text-primary"
//                     />
//                     <span className="text-sm">{course}</span>
//                   </label>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">College Type</h3>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {TYPES.map((type) => (
//                   <label key={type} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="type"
//                       checked={filters.type === type}
//                       onChange={() => setFilters(prev => ({ ...prev, type }))}
//                       className="text-primary"
//                     />
//                     <span className="text-sm">{type}</span>
//                   </label>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">Fee Range</h3>
//               </CardHeader>
//               <CardContent className="space-y-2">
//                 {FEE_RANGES.map((range) => (
//                   <label key={range} className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="feeRange"
//                       checked={filters.feeRange === range}
//                       onChange={() => setFilters(prev => ({ ...prev, feeRange: range }))}
//                       className="text-primary"
//                     />
//                     <span className="text-sm">{range}</span>
//                   </label>
//                 ))}
//               </CardContent>
//             </Card>

//             <Card>
//               <CardHeader className="pb-3">
//                 <h3 className="font-medium">Sort By</h3>
//               </CardHeader>
//               <CardContent>
//                 <div className="relative">
//                   <select
//                     value={filters.sortBy}
//                     onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
//                     className="w-full p-2 border rounded-lg bg-background"
//                   >
//                     {SORT_OPTIONS.map((option) => (
//                       <option key={option} value={option}>{option}</option>
//                     ))}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Results */}
//           <div className="flex-1">
//             {/* Active Filters */}
//             {activeFiltersCount > 0 && (
//               <div className="mb-4 flex flex-wrap gap-2">
//                 {Object.entries(filters).map(([key, value]) => {
//                   if (key === 'sortBy' || key === 'search' || value === 'All' || value === '') return null
//                   return (
//                     <Badge key={key} variant="secondary" className="cursor-pointer">
//                       {value}
//                       <X 
//                         className="h-3 w-3 ml-1" 
//                         onClick={() => setFilters(prev => ({ ...prev, [key]: key === 'city' || key === 'course' || key === 'type' || key === 'feeRange' ? 'All' : '' }))}
//                       />
//                     </Badge>
//                   )
//                 })}
//               </div>
//             )}

//             {/* College Grid */}
//             {filteredColleges.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {filteredColleges.map((college) => (
//                   <CollegeCard 
//                     key={college.id} 
//                     college={college} 
//                     showCompareButton={true}
//                   />
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-muted-foreground mb-4">
//                   <Search className="h-12 w-12 mx-auto mb-4" />
//                   <h3 className="text-lg font-medium">No colleges found</h3>
//                   <p>Try adjusting your filters or search terms</p>
//                 </div>
//                 <Button onClick={clearFilters}>Clear Filters</Button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }





























'use client'

import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import CollegeCard, { College } from '@/components/ui/college-card'
import { collegesData } from '@/data/colleges-normalized'
import { cn } from '@/lib/utils'

type MultiFilterKey = 'locations' | 'courses' | 'types'

interface Filters {
  search: string
  locations: string[]
  courses: string[]
  types: string[]
  feeRange: string
  sortBy: string
}

const FEE_RANGES = ['All', 'Under 5L', '5L - 10L', '10L - 20L', 'Above 20L']
const SORT_OPTIONS = ['Relevance', 'NIRF Rank', 'Package', 'Fees', 'Rating']

const ITEMS_PER_PAGE = 20

// ---------- helper: counts & option lists ----------
const buildCountMap = (values: string[]) => {
  const map: Record<string, number> = {}
  for (const v of values) {
    if (!v) continue
    map[v] = (map[v] || 0) + 1
  }
  return map
}

const locationCounts = buildCountMap(collegesData.map((c) => c.city))
const LOCATION_OPTIONS = Object.keys(locationCounts).sort()

const courseCounts = buildCountMap(
  collegesData.flatMap((c) => c.courseTags || [])
)
const COURSE_OPTIONS = Object.keys(courseCounts).sort()

const typeCounts = buildCountMap(collegesData.map((c) => c.type))
const TYPE_OPTIONS = Object.keys(typeCounts).sort()

export default function ExplorePage() {
  const searchParams = useSearchParams()
  const queryFromUrl = searchParams?.get('q') ?? ''

  const [filters, setFilters] = useState<Filters>({
    search: queryFromUrl,
    locations: [],
    courses: [],
    types: [],
    feeRange: 'All',
    sortBy: 'Relevance',
  })

  const [sectionOpen, setSectionOpen] = useState({
    locations: true,
    courses: true,
    types: true,
    fees: true,
  })

  const [locationSearch, setLocationSearch] = useState('')
  const [courseSearch, setCourseSearch] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const q = searchParams?.get('q') ?? ''
    if (q) {
      setFilters((prev) => ({ ...prev, search: q }))
    }
  }, [searchParams])

  const toggleMultiFilter = (key: MultiFilterKey, value: string) => {
    setFilters((prev) => {
      const current = prev[key]
      const exists = current.includes(value)
      const next = exists
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...prev, [key]: next }
    })
  }

  const setFeeRange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      feeRange: prev.feeRange === value ? 'All' : value,
    }))
  }

  const setSortBy = (value: string) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }

  const resetFilters = () => {
    setFilters({
      search: '',
      locations: [],
      courses: [],
      types: [],
      feeRange: 'All',
      sortBy: 'Relevance',
    })
    setLocationSearch('')
    setCourseSearch('')
  }

  const filteredColleges = useMemo(() => {
    let filtered: College[] = [...collegesData]

    // Search text
    if (filters.search.trim()) {
      const s = filters.search.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(s) ||
          c.city.toLowerCase().includes(s) ||
          c.state.toLowerCase().includes(s) ||
          c.courseTags?.some((t) => t.toLowerCase().includes(s))
      )
    }

    // Locations (multi)
    if (filters.locations.length > 0) {
      filtered = filtered.filter((c) => filters.locations.includes(c.city))
    }

    // Courses (multi)
    if (filters.courses.length > 0) {
      filtered = filtered.filter((c) =>
        c.courseTags?.some((t) => filters.courses.includes(t))
      )
    }

    // Types (multi)
    if (filters.types.length > 0) {
      filtered = filtered.filter((c) => filters.types.includes(c.type))
    }

    // Fees
    if (filters.feeRange !== 'All') {
      filtered = filtered.filter((college) => {
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
      case 'Rating': {
        const rating = (c: College) => {
          if (!c.ratings) return 0
          return (
            (c.ratings.placement +
              c.ratings.faculty +
              c.ratings.campus +
              c.ratings.roi) /
            4
          )
        }
        filtered.sort((a, b) => rating(b) - rating(a))
        break
      }
      default:
      // Relevance – original order
    }

    return filtered
  }, [filters])

  // ----- PAGINATION -----
  const totalPages = Math.max(
    1,
    Math.ceil(filteredColleges.length / ITEMS_PER_PAGE)
  )

  const paginatedColleges = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredColleges.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredColleges, currentPage])

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const activeChips = [
    ...filters.locations.map((value) => ({ type: 'locations' as const, value })),
    ...filters.courses.map((value) => ({ type: 'courses' as const, value })),
    ...filters.types.map((value) => ({ type: 'types' as const, value })),
    ...(filters.feeRange !== 'All'
      ? [{ type: 'feeRange' as const, value: filters.feeRange }]
      : []),
  ]

  const activeFiltersCount = activeChips.length

  const visibleLocations = LOCATION_OPTIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  )

  const visibleCourses = COURSE_OPTIONS.filter((course) =>
    course.toLowerCase().includes(courseSearch.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F5F7FB]">
      <div className="container px-4 py-6">
        <div className="flex gap-6">
          {/* LEFT FILTER PANEL */}
          <aside className="hidden lg:block w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 max-h-[calc(100vh-120px)] sticky top-24 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>All Filters</span>
                </div>
                <button
                  onClick={resetFilters}
                  className="text-xs font-medium text-[#2563eb] hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Active filter chips */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {activeChips.map((chip) => (
                    <Badge
                      key={chip.type + chip.value}
                      variant="outline"
                      className="rounded-full px-3 py-1 text-xs flex items-center gap-1 bg-slate-50"
                    >
                      {chip.value}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => {
                          if (chip.type === 'feeRange') {
                            setFilters((prev) => ({ ...prev, feeRange: 'All' }))
                          } else {
                            toggleMultiFilter(chip.type, chip.value)
                          }
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              <div className="border-b mb-3" />

              {/* Location section */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between text-sm font-medium"
                  onClick={() =>
                    setSectionOpen((p) => ({
                      ...p,
                      locations: !p.locations,
                    }))
                  }
                >
                  <span>Location</span>
                  {sectionOpen.locations ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {sectionOpen.locations && (
                  <div className="mt-3 space-y-3">
                    {/* Location search inside section */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Location"
                        className="pl-8 h-9 bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-slate-300"
                      />
                    </div>

                    {/* Scrollable list */}
                    <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
                      {visibleLocations.map((loc) => (
                        <label
                          key={loc}
                          className="flex items-center justify-between gap-2 cursor-pointer text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 text-[#4c1d95]"
                              checked={filters.locations.includes(loc)}
                              onChange={() =>
                                toggleMultiFilter('locations', loc)
                              }
                            />
                            <span>{loc}</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            ({locationCounts[loc]})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b mb-3" />

              {/* Course section */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between text-sm font-medium"
                  onClick={() =>
                    setSectionOpen((p) => ({ ...p, courses: !p.courses }))
                  }
                >
                  <span>Course / Specialization</span>
                  {sectionOpen.courses ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {sectionOpen.courses && (
                  <div className="mt-3 space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <Input
                        value={courseSearch}
                        onChange={(e) => setCourseSearch(e.target.value)}
                        placeholder="Course"
                        className="pl-8 h-9 bg-slate-50 border-0 focus-visible:ring-1 focus-visible:ring-slate-300"
                      />
                    </div>
                    <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
                      {visibleCourses.map((course) => (
                        <label
                          key={course}
                          className="flex items-center justify-between gap-2 cursor-pointer text-sm"
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              className="h-4 w-4 rounded border-slate-300 text-[#4c1d95]"
                              checked={filters.courses.includes(course)}
                              onChange={() =>
                                toggleMultiFilter('courses', course)
                              }
                            />
                            <span>{course}</span>
                          </div>
                          <span className="text-xs text-slate-400">
                            ({courseCounts[course]})
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-b mb-3" />

              {/* Type section */}
              <div className="mb-4">
                <button
                  className="w-full flex items-center justify-between text-sm font-medium"
                  onClick={() =>
                    setSectionOpen((p) => ({ ...p, types: !p.types }))
                  }
                >
                  <span>College Type</span>
                  {sectionOpen.types ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {sectionOpen.types && (
                  <div className="mt-3 max-h-40 overflow-y-auto pr-1 space-y-2">
                    {TYPE_OPTIONS.map((type) => (
                      <label
                        key={type}
                        className="flex items-center justify-between gap-2 cursor-pointer text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-slate-300 text-[#4c1d95]"
                            checked={filters.types.includes(type)}
                            onChange={() => toggleMultiFilter('types', type)}
                          />
                          <span>{type}</span>
                        </div>
                        <span className="text-xs text-slate-400">
                          ({typeCounts[type]})
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b mb-3" />

              {/* Fee range section */}
              <div className="mb-2">
                <button
                  className="w-full flex items-center justify-between text-sm font-medium"
                  onClick={() =>
                    setSectionOpen((p) => ({ ...p, fees: !p.fees }))
                  }
                >
                  <span>Fee Range</span>
                  {sectionOpen.fees ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {sectionOpen.fees && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {FEE_RANGES.map((range) => (
                      <button
                        key={range}
                        onClick={() => setFeeRange(range)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs border',
                          filters.feeRange === range
                            ? 'bg-[#4c1d95]/10 border-[#4c1d95] text-[#4c1d95]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        )}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* RIGHT: RESULTS */}
          <main className="flex-1">
            {/* Top search + sort */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by college name, city, state or course"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        search: e.target.value,
                      }))
                    }
                    className="pl-9 bg-white border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 text-sm mt-1">
                <span className="text-slate-500">
                  {filteredColleges.length} colleges found
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Sort by:</span>
                  <div className="flex flex-wrap gap-1">
                    {SORT_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => setSortBy(option)}
                        className={cn(
                          'px-3 py-1 rounded-full text-xs border',
                          filters.sortBy === option
                            ? 'bg-[#0f766e]/10 border-[#0f766e] text-[#0f766e]'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        )}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="text-xs text-slate-400">
                  {activeFiltersCount} active filter
                  {activeFiltersCount > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* College cards + pagination */}
            {filteredColleges.length > 0 ? (
              <>
                <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginatedColleges.map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      size="medium"
                      showCompareButton
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                    {/* Previous */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={cn(
                        'px-3 py-1.5 rounded-lg border text-sm',
                        currentPage === 1
                          ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'border-slate-300 hover:bg-slate-100'
                      )}
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={cn(
                            'px-3 py-1.5 rounded-lg border text-sm',
                            currentPage === page
                              ? 'bg-[#4c1d95] text-white border-[#4c1d95]'
                              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                          )}
                        >
                          {page}
                        </button>
                      )
                    })}

                    {/* Next */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={cn(
                        'px-3 py-1.5 rounded-lg border text-sm',
                        currentPage === totalPages
                          ? 'border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'border-slate-300 hover:bg-slate-100'
                      )}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <Search className="h-10 w-10 mx-auto mb-4 text-slate-400" />
                <h3 className="text-lg font-medium mb-1">No colleges found</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Try changing location, course, or fee range.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Reset Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

