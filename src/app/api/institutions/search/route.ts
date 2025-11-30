import { NextRequest } from 'next/server'
import { searchInstitutions } from '@/lib/institutions'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') ?? undefined
  const state = searchParams.get('state') ?? undefined
  const city = searchParams.get('city') ?? undefined
  const region = searchParams.get('region') ?? undefined
  const group = searchParams.get('group') ?? undefined
  const id = searchParams.get('id') ?? undefined
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : undefined
  const pageSize = searchParams.get('pageSize') ? Number(searchParams.get('pageSize')) : undefined
  const sort = (searchParams.get('sort') as any) ?? undefined

  try {
    const data = await searchInstitutions({ q, state, city, region, group, id, page, pageSize, sort })
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed to search institutions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
