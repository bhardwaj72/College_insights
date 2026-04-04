'use client'
import { useEffect, useState } from 'react'

const TABS = [
    { key: 'govt', label: '🏛 Govt Exams', q: 'UPSC OR SSC OR Banking OR Government exam India' },
    { key: 'medical', label: '🩺 Medical', q: 'NEET OR MBBS OR Medical exam India' },
    { key: 'engineering', label: '⚙ Engineering', q: 'JEE OR Engineering exam India' },
    { key: 'defence', label: '🪖 Defence', q: 'NDA OR CDS OR AFCAT OR Defence exam India' }
]

const EXAMS = [
    { name: 'JEE Main', date: '2026-01-20' },
    { name: 'NEET', date: '2026-05-05' },
    { name: 'CAT', date: '2025-11-30' },
    { name: 'UPSC Prelims', date: '2026-06-02' },
    { name: 'NDA', date: '2026-04-14' },
    { name: 'CUET', date: '2026-05-15' }
]

export default function ExamHub() {
    const [tab, setTab] = useState(TABS[0])
    const [news, setNews] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        fetch(
            `/api/news?q=${encodeURIComponent(tab.q)}&lang=en&country=in&max=15`
        )
            .then(res => res.json())
            .then(data => {
                setNews(data.articles || [])
                setLoading(false)
            })
            .catch(error => {
                console.error('Failed to fetch news:', error)
                setNews([])
                setLoading(false)
            })
    }, [tab])

    const daysLeft = (date: string) => {
        const d = new Date(date).getTime()
        const now = Date.now()
        return Math.max(Math.ceil((d - now) / (1000 * 60 * 60 * 24)), 0)
    }

    return (
        <section className="py-20 bg-gradient-to-br from-[#f7f8ff] via-white to-[#f0f7ff]">
            <div className="container px-4">

                <h2 className="text-4xl font-bold text-center mb-12">
                    📢 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]">
                        Live Exam & Admission Updates
                    </span>
                </h2>

                {/* Countdown Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-14">
                    {EXAMS.map(e => (
                        <div key={e.name} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow text-center">
                            <p className="text-xs sm:text-sm font-medium">{e.name}</p>
                            <p className="text-2xl sm:text-3xl font-bold text-[#7C3AED]">{daysLeft(e.date)}</p>
                            <p className="text-xs text-slate-500">Days Left</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            onClick={() => setTab(t)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition ${tab.key === t.key
                                    ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white shadow-lg'
                                    : 'bg-white border hover:bg-slate-50'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* News Marquee */}
                <div className="overflow-hidden py-4 sm:py-8 relative group">
                    <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#f7f8ff] to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#f7f8ff] to-transparent z-10 pointer-events-none" />
                    {loading && <p className="text-center text-slate-500">Loading live updates…</p>}

                    <div className="flex gap-3 sm:gap-6 animate-marquee whitespace-nowrap">
                        {news.concat(news).map((n, i) => (
                            <a
                                key={i}
                                href={n.url}
                                target="_blank"
                                className="min-w-[280px] sm:min-w-[360px] p-3 sm:p-5 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition"
                            >
                                <div className="flex gap-2 mb-2">
                                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">NEW</span>
                                    <span className="px-2 py-1 text-xs bg-[#00B4D8] text-white rounded">LIVE</span>
                                </div>
                                <p className="text-xs sm:text-sm font-medium line-clamp-2">{n.title}</p>
                                <p className="text-xs mt-2 text-slate-500">
                                    {n.source?.name}
                                </p>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
