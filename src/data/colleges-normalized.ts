// // src/data/colleges-normalized.ts

// import rawColleges from '@/data/colleges.json'
// import type { College } from '@/components/ui/college-card'

// // Match your current JSON structure exactly
// export interface RawCollege {
//   'Sr.No': number
//   'Institute Name': string
//   Region: string
//   State: string
//   District: string
//   City: string
//   'User Group': string
//   'Location Display': string
//   Rating: number
//   'Synthetic NIRF Rank': number
//   'Short Description': string
//   Tag1: string
//   Tag2: string
//   Tag3: string
//   Ownership: string
//   Fees_Lakh: number
//   Fees_Display: string
//   Avg_Package_LPA: string | number   // ⬅ some rows are strings
//   Avg_Package_Display: string
//   ROI_Score: string | number         // ⬅ string in your sample
//   Placement_Score: number
//   Faculty_Score: number
//   Campus_Score: number
// }

// function slugify(name: string): string {
//   return name
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, '-')
//     .replace(/^-+|-+$/g, '')
// }

// function toCollege(row: RawCollege, index: number): College {
//   const name = row['Institute Name']?.trim() ?? ''

//   const shortName =
//     name
//       .split(' ')
//       .filter(Boolean)
//       .slice(0, 2)
//       .map((w) => w[0])
//       .join('')
//       .toUpperCase() || name.slice(0, 2).toUpperCase()

//   const feesLakh = Number(row.Fees_Lakh) || 0
//   const avgLpa = Number(row.Avg_Package_LPA) || 0
//   const roiScore = Number(row.ROI_Score) || 0

//   const placementScore = Number(row.Placement_Score) || 0
//   const facultyScore = Number(row.Faculty_Score) || 0
//   const campusScore = Number(row.Campus_Score) || 0

//   const nirfRank = Number(row['Synthetic NIRF Rank']) || 0
//   const rating = Number(row.Rating) || undefined

//   const tags = [row.Tag1, row.Tag2, row.Tag3].filter(Boolean)

//   return {
//     // base fields used by your UI
//     id: Number(row['Sr.No']) || index + 1,
//     slug: slugify(name),
//     name,
//     shortName,
//     city: row.City,
//     state: row.State,
//     type: row.Ownership,           // Government / Private
//     courseTags: tags,
//     nirfRank,
//     avgPackage: avgLpa,            // number (LPA)
//     fees: feesLakh * 100000,       // rupees (for filters)
//     ratings: {
//       placement: placementScore,
//       faculty: facultyScore,
//       campus: campusScore,
//       roi: roiScore,
//     },
//     description: row['Short Description'],

//     // extra optional fields your card type can expose
//     region: row.Region,
//     district: row.District,
//     userGroup: row['User Group'],
//     locationDisplay: row['Location Display'],
//     ownership: row.Ownership,
//     rating,
//     feesLakh,
//     feesDisplay: row.Fees_Display,
//     avgPackageDisplay: row.Avg_Package_Display,
//   }
// }

// // ✅ This is the normalized, strongly-typed data you should use everywhere
// export const collegesData: College[] = (rawColleges as RawCollege[]).map(
//   toCollege
// )







// src/data/colleges-normalized.ts
import rawColleges from '@/data/colleges.json'
import type { College } from '@/components/ui/college-card'

export interface RawCollege {
  'Sr.No': number
  'Institute Name': string
  Region: string
  State: string
  District: string
  City: string
  'User Group': string
  'Location Display': string
  Rating: number
  'Synthetic NIRF Rank': number
  'Short Description': string
  Tag1: string
  Tag2: string
  Tag3: string
  Ownership: string
  Fees_Lakh: number
  Fees_Display: string
  Avg_Package_LPA: string | number
  Avg_Package_Display: string
  ROI_Score: string | number
  Placement_Score: number
  Faculty_Score: number
  Campus_Score: number
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function normalizeUserGroup(userGroup?: string): string[] {
  if (!userGroup) return []
  const g = userGroup.toLowerCase()
  const out: string[] = []
  if (g.includes('b.tech') || g.includes('btech') || g.includes('engineering')) out.push('b.tech')
  if (g.includes('m.tech') || g.includes('mtech')) out.push('m.tech')
  if (g.includes('mba') || g.includes('management') || g.includes('pgdm')) out.push('mba')
  if (g.includes('mbbs') || g.includes('medical')) out.push('mbbs')
  if (g.includes('law')) out.push('law')
  if (g.includes('design')) out.push('design')
  if (g.includes('commerce') || g.includes('bcom')) out.push('commerce')
  if (g.includes('b.arch') || g.includes('b.architecture')) out.push('b.arch')
  return Array.from(new Set(out))
}

function toCollege(row: RawCollege, index: number): College {
  const name = (row['Institute Name'] || '').trim()
  const shortName =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join('')
      .toUpperCase() || name.slice(0, 2).toUpperCase()

  const feesLakh = Number(row.Fees_Lakh) || 0
  const avgLpa = Number(row.Avg_Package_LPA) || 0
  const roiScore = Number(row.ROI_Score) || 0
  const placementScore = Number(row.Placement_Score) || 0
  const facultyScore = Number(row.Faculty_Score) || 0
  const campusScore = Number(row.Campus_Score) || 0
  const nirfRank = Number(row['Synthetic NIRF Rank']) || 0
  const rating = Number(row.Rating) || undefined

  // Build tags: use Tag1/2/3 plus normalized user group tokens to ensure 'b.tech' exists
  const rowTags = [row.Tag1, row.Tag2, row.Tag3].filter(Boolean).map((t) => String(t).trim())
  const derivedUserGroups = normalizeUserGroup(row['User Group'])
  // Map normalized tokens into readable tags and include both token and readable variants
  const derivedTags = derivedUserGroups.flatMap((g) => {
    if (g === 'b.tech') return ['Engineering', 'B.Tech']
    if (g === 'm.tech') return ['M.Tech']
    if (g === 'mba') return ['MBA']
    if (g === 'mbbs') return ['MBBS']
    if (g === 'law') return ['Law']
    if (g === 'design') return ['Design']
    if (g === 'commerce') return ['Commerce']
    if (g === 'b.arch') return ['B.Arch']
    return [g]
  })

  const tags = Array.from(new Set([...derivedTags, ...rowTags])).filter(Boolean)

  return {
    id: Number(row['Sr.No']) || index + 1,
    slug: slugify(name || `college-${index + 1}`),
    name,
    shortName,
    city: row.City || '',
    state: row.State || '',
    type: row.Ownership || row.Ownership || '',
    courseTags: tags,
    nirfRank,
    avgPackage: avgLpa,
    fees: feesLakh * 100000,
    ratings: {
      placement: placementScore,
      faculty: facultyScore,
      campus: campusScore,
      roi: roiScore,
    },
    description: row['Short Description'] || '',
    // extras
    region: row.Region,
    district: row.District,
    userGroup: row['User Group'],
    locationDisplay: row['Location Display'],
    ownership: row.Ownership,
    rating,
    feesLakh,
    feesDisplay: row.Fees_Display,
    avgPackageDisplay: row.Avg_Package_Display,
  } as unknown as College
}

export const collegesData: College[] = (rawColleges as RawCollege[]).map(toCollege)
