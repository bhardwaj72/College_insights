import fs from 'fs/promises'
import path from 'path'
import { parse } from 'csv-parse/sync'
import type { Institution, InstitutionSearchFilters } from '@/types/institution'

let cache: { items: Institution[]; mtimeMs: number } | null = null

function csvPath() {
  return path.join(process.cwd(), 'src', 'data', 'institutions.csv')
}

async function loadFromDisk(): Promise<{ items: Institution[]; mtimeMs: number }> {
  const file = csvPath()
  const stat = await fs.stat(file)
  const csv = await fs.readFile(file, 'utf8')

  // Normalize header names (remove newlines, trim)
  const records = parse(csv, {
    columns: (header: string[]) =>
      header.map((h) => h.replace(/\r?\n/g, ' ').trim()),
    skip_empty_lines: true,
    relax_quotes: true,
    relax_column_count: true,
  }) as any[]

  const toInstitution = (row: any): Institution | null => {
    const get = (key: string) => {
      // try exact, then case-insensitive fallback
      if (row[key] !== undefined) return row[key]
      const found = Object.keys(row).find((k) => k.toLowerCase() === key.toLowerCase())
      return found ? row[found] : undefined
    }

    const srNoRaw = get('Sr.No') ?? get('Sr. No') ?? get('SrNo')
    const aicteId = get('AICTE Permanent Id') ?? get('AICTE Permanent ID') ?? get('AICTE Permanent Id'.replace(/\s+/g, ' '))
    const instituteName = get('Institute Name')
    const region = get('Region')
    const state = get('State')
    const district = get('District')
    const city = get('City')
    const userGroup = get('User Group') ?? get('UserGroup')

    if (!aicteId || !instituteName) return null

    return {
      srNo: Number(srNoRaw ?? 0) || 0,
      aictePermanentId: String(aicteId).trim(),
      instituteName: String(instituteName).trim(),
      region: String(region ?? '').trim(),
      state: String(state ?? '').trim(),
      district: String(district ?? '').trim(),
      city: String(city ?? '').trim(),
      userGroup: String(userGroup ?? '').trim(),
    }
  }

  const items: Institution[] = []
  for (const r of records) {
    const inst = toInstitution(r)
    if (inst) items.push(inst)
  }

  return { items, mtimeMs: stat.mtimeMs }
}

export async function getAllInstitutions(): Promise<Institution[]> {
  const file = csvPath()
  const stat = await fs.stat(file)
  if (!cache || cache.mtimeMs !== stat.mtimeMs) {
    cache = await loadFromDisk()
  }
  return cache.items
}

export async function searchInstitutions(filters: InstitutionSearchFilters) {
  const items = await getAllInstitutions()
  const {
    q,
    state,
    city,
    region,
    group,
    id,
    page = 1,
    pageSize = 20,
    sort = 'name',
  } = filters

  let result = items

  if (q && q.trim()) {
    const s = q.toLowerCase()
    result = result.filter((i) =>
      i.instituteName.toLowerCase().includes(s) ||
      i.city.toLowerCase().includes(s) ||
      i.state.toLowerCase().includes(s) ||
      i.region.toLowerCase().includes(s) ||
      i.aictePermanentId.toLowerCase().includes(s) ||
      i.userGroup.toLowerCase().includes(s)
    )
  }

  if (state && state !== 'All') {
    result = result.filter((i) => i.state.toLowerCase() === state.toLowerCase())
  }
  if (city && city !== 'All') {
    result = result.filter((i) => i.city.toLowerCase() === city.toLowerCase())
  }
  if (region && region !== 'All') {
    result = result.filter((i) => i.region.toLowerCase() === region.toLowerCase())
  }
  if (group && group !== 'All') {
    result = result.filter((i) => i.userGroup.toLowerCase() === group.toLowerCase())
  }
  if (id) {
    result = result.filter((i) => i.aictePermanentId.toLowerCase() === id.toLowerCase())
  }

  switch (sort) {
    case 'state':
      result = [...result].sort((a, b) => a.state.localeCompare(b.state))
      break
    case 'city':
      result = [...result].sort((a, b) => a.city.localeCompare(b.city))
      break
    case 'region':
      result = [...result].sort((a, b) => a.region.localeCompare(b.region))
      break
    case 'name':
    default:
      result = [...result].sort((a, b) => a.instituteName.localeCompare(b.instituteName))
      break
  }

  const total = result.length
  const p = Math.max(1, Number(page) || 1)
  const ps = Math.min(100, Math.max(1, Number(pageSize) || 20))
  const start = (p - 1) * ps
  const end = start + ps

  return {
    total,
    page: p,
    pageSize: ps,
    items: result.slice(start, end),
  }
}
