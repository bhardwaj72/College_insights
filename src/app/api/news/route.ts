import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams
  const query = searchParams.get('q')
  const lang = searchParams.get('lang') || 'en'
  const country = searchParams.get('country') || 'in'
  const max = searchParams.get('max') || '15'

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_GNEWS_KEY || process.env.GNEWS_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'GNews API key not configured' }, { status: 500 })
  }

  try {
    const url = new URL('https://gnews.io/api/v4/search')
    url.searchParams.set('q', query)
    url.searchParams.set('lang', lang)
    url.searchParams.set('country', country)
    url.searchParams.set('max', max)
    url.searchParams.set('apikey', apiKey)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `GNews API error: ${response.statusText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}
