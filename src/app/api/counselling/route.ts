import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import { join } from 'path'

const FALLBACK_PATH = join(process.cwd(), 'counselling-submissions.json')

export async function POST(req: Request) {
  const sheetUrl = process.env.COUNSELLING_SHEET_URL
  const payload = await req.json().catch(() => null)

  if (!payload || typeof payload !== 'object') {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  if (sheetUrl) {
    try {
      const res = await fetch(sheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text().catch(() => '')
        console.warn('Remote sheet webhook returned non-OK', res.status, text)
        return NextResponse.json({ error: 'Sheet webhook failed', status: res.status, message: text }, { status: 502 })
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Error sending to sheet webhook:', error)
      return NextResponse.json({ error: 'Could not reach sheet webhook' }, { status: 502 })
    }
  }

  // fallback: store locally in server file when external webhook is not configured
  try {
    let existing = []
    const file = await fs.readFile(FALLBACK_PATH, 'utf-8').catch(() => '')
    if (file) {
      existing = JSON.parse(file) || []
    }

    existing.push({ ...payload, receivedAt: new Date().toISOString() })
    await fs.writeFile(FALLBACK_PATH, JSON.stringify(existing, null, 2), 'utf-8')

    return NextResponse.json({ success: true, savedTo: FALLBACK_PATH })
  } catch (error) {
    console.error('Fallback write failed:', error)
    return NextResponse.json({ error: 'Could not save fallback submission' }, { status: 500 })
  }
}
