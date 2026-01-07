// src/components/chatbot/chat-buddy.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Send, X } from 'lucide-react'
import { collegesData } from '@/data/colleges-normalized'
import type { College } from '@/components/ui/college-card'

// ---------- Types ----------

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

interface CollegeRag extends College {
  ownership?: string
  userGroup?: string
  region?: string
  feesLakh?: number
  feesDisplay?: string
  avgPackageDisplay?: string
}

type Step = 'idle' | 'askLocation' | 'askBudget'

interface ConversationState {
  step: Step
  baseQuery?: string
  courseLabel?: string
  ownership?: 'Private' | 'Government'
  preferredLocation?: string
  maxFeesLakh?: number
}

const ALL_COLLEGES = collegesData as CollegeRag[]

// A quick list of all cities for simple location detection
const ALL_CITIES = Array.from(new Set(ALL_COLLEGES.map((c) => c.city))).filter(
  Boolean,
)

// ---------- RAG Helpers ----------

interface ParsedFilters {
  ownership?: 'Private' | 'Government'
  userGroups: string[]
  courseKeywords: string[]
  maxFeesLakh?: number
  preferredRegion?: string
  preferredCity?: string
}

function parseBudgetFromText(q: string): number | undefined {
  const budgetMatch =
    q.match(/(?:under|below|less than)\s+(\d+(\.\d+)?)\s*(l|lakh|lakhs|lac|lacs)?/i) ||
    q.match(/(\d+(\.\d+)?)\s*(l|lakh|lakhs|lac|lacs)\s*(?:budget|fees|total)?/i)

  if (!budgetMatch) return undefined
  const num = parseFloat(budgetMatch[1])
  if (Number.isNaN(num)) return undefined
  return num
}

function parseQueryFilters(qRaw: string): ParsedFilters {
  const q = qRaw.toLowerCase()

  let ownership: 'Private' | 'Government' | undefined
  if (q.includes('private')) ownership = 'Private'
  else if (q.includes('govt') || q.includes('government') || q.includes('public')) {
    ownership = 'Government'
  }

  const courseKeywords: string[] = []
  const userGroups: string[] = []

  if (
    q.includes('engineering') ||
    q.includes('b.tech') ||
    q.includes('btech') ||
    q.includes('b tech')
  ) {
    courseKeywords.push('engineering')
    userGroups.push('b.tech')
  }
  if (q.includes('m.tech') || q.includes('mtech')) {
    userGroups.push('m.tech')
  }
  if (q.includes('mba') || q.includes('management') || q.includes('pgdm')) {
    userGroups.push('mba')
  }
  if (q.includes('medical') || q.includes('mbbs')) {
    userGroups.push('mbbs')
  }
  if (q.includes('law')) {
    userGroups.push('law')
  }
  if (q.includes('design')) {
    userGroups.push('design')
  }
  if (q.includes('commerce') || q.includes('bcom') || q.includes('b.com')) {
    userGroups.push('commerce')
  }

  let preferredRegion: string | undefined
  if (q.includes('south india') || /\bsouth\b/.test(q)) preferredRegion = 'South'
  else if (q.includes('north india') || /\bnorth\b/.test(q)) preferredRegion = 'North'
  else if (q.includes('west')) preferredRegion = 'West'
  else if (q.includes('east')) preferredRegion = 'East'
  else if (q.includes('central')) preferredRegion = 'Central'

  let preferredCity: string | undefined
  for (const city of ALL_CITIES) {
    if (!city) continue
    if (q.includes(city.toLowerCase())) {
      preferredCity = city
      break
    }
  }

  const maxFeesLakh = parseBudgetFromText(q)

  return { ownership, userGroups, courseKeywords, maxFeesLakh, preferredRegion, preferredCity }
}

function scoreCollege(c: CollegeRag) {
  const placement = c.ratings?.placement ?? 0
  const faculty = c.ratings?.faculty ?? 0
  const campus = c.ratings?.campus ?? 0
  const roi = c.ratings?.roi ?? 0
  const rating = (placement + faculty + campus) / 3
  return rating * 2 + roi * 0.05
}

function applyStrictFilters(
  base: CollegeRag[],
  filters: ParsedFilters,
  lockedCity?: string,
  lockedBudget?: number,
): CollegeRag[] {
  let results = [...base]

  if (filters.ownership) {
    results = results.filter(
      (c) => c.ownership?.toLowerCase() === filters.ownership!.toLowerCase(),
    )
  }

  if (filters.userGroups.length) {
    const groupsLower = filters.userGroups.map((g) => g.toLowerCase())
    results = results.filter((c) => {
      const ug = c.userGroup?.toLowerCase() ?? ''
      const tags = (c.courseTags ?? []).map((t) => t.toLowerCase())
      const hasUserGroup = groupsLower.some((g) => ug.includes(g))
      const hasEngTag =
        groupsLower.some((g) => g.includes('b.tech')) &&
        tags.some(
          (t) =>
            t.includes('engineering') ||
            t.includes('b.tech') ||
            t.includes('btech'),
        )
      return hasUserGroup || hasEngTag
    })
  }

  const cityToUse = lockedCity ?? filters.preferredCity
  if (cityToUse) {
    results = results.filter((c) => c.city.toLowerCase() === cityToUse.toLowerCase())
  }

  const maxFees = lockedBudget ?? filters.maxFeesLakh
  if (maxFees) {
    results = results.filter((c) => {
      const f = c.feesLakh ?? 0
      return f > 0 && f <= maxFees
    })
  }

  if (filters.preferredRegion) {
    results = results.filter(
      (c) => c.region?.toLowerCase() === filters.preferredRegion!.toLowerCase(),
    )
  }

  return results
}

function findRelevantColleges(
  query: string,
  opts?: {
    lockedCity?: string
    lockedBudget?: number
  },
) {
  const filters = parseQueryFilters(query)

  // strict pass first
  let matches = applyStrictFilters(ALL_COLLEGES, filters, opts?.lockedCity, opts?.lockedBudget)

  let relaxed = false
  if (matches.length === 0) {
    // relax budget but keep other filters
    relaxed = true
    matches = applyStrictFilters(ALL_COLLEGES, { ...filters, maxFeesLakh: undefined })
  }
  if (matches.length === 0) {
    // last fallback – everything
    relaxed = true
    matches = [...ALL_COLLEGES]
  }

  matches.sort((a, b) => scoreCollege(b) - scoreCollege(a))
  const top = matches.slice(0, 7)

  return { matches: top, filters, relaxed }
}

function formatAnswer(
  query: string,
  opts?: {
    lockedCity?: string
    lockedBudget?: number
  },
): string {
  const { matches, filters, relaxed } = findRelevantColleges(query, opts)

  const parts: string[] = []

  if (filters.ownership) {
    parts.push(
      filters.ownership === 'Private'
        ? 'private colleges'
        : 'government colleges',
    )
  }

  if (filters.userGroups.includes('mbbs')) parts.push('for MBBS / Medical')
  else if (filters.userGroups.includes('mba')) parts.push('for MBA / Management')
  else if (filters.userGroups.includes('b.tech')) parts.push('for B.Tech / Engineering')

  const cityText =
    opts?.lockedCity ?? filters.preferredCity
      ? `in ${(opts?.lockedCity ?? filters.preferredCity)!}`
      : ''

  const maxFees =
    opts?.lockedBudget ?? filters.maxFeesLakh
      ? `with total fees up to about ₹${(opts?.lockedBudget ?? filters.maxFeesLakh)!.toFixed(
        1,
      )} Lakh`
      : ''

  const filterSummary = [parts.join(' '), cityText, maxFees]
    .filter(Boolean)
    .join(' ')

  const lines: string[] = []

  if (filterSummary) {
    lines.push(`Here are some options based on your preferences: ${filterSummary}.`)
  } else {
    lines.push('Here are some colleges that best match your query from the current dataset:')
  }

  if (relaxed && (opts?.lockedCity || opts?.lockedBudget)) {
    lines.push(
      'Note: No exact matches were found for all filters, so I relaxed a few conditions to show you the closest options.',
    )
  }

  lines.push('')

  matches.forEach((c, idx) => {
    const feesLakh =
      typeof c.feesLakh === 'number' && c.feesLakh > 0
        ? `₹${c.feesLakh.toFixed(2)} Lakh`
        : c.feesDisplay || 'Not available'

    const avgPkg =
      c.avgPackageDisplay ||
      (c.avgPackage ? `₹${c.avgPackage.toFixed(2)} LPA` : 'Not available')

    const highlights = (c.courseTags || []).filter(Boolean).slice(0, 3).join(' · ')

    lines.push(`${idx + 1}) ${c.name}`)
    lines.push(`   📍 ${c.city}, ${c.state}`)
    lines.push(
      `   🎓 Type: ${c.ownership || c.type || 'Not specified'} | Course group: ${c.userGroup || 'N/A'
      }`,
    )
    lines.push(`   💰 Fees (approx): ${feesLakh} | 📈 Avg package: ${avgPkg}`)
    if (highlights) {
      lines.push(`   🏷 Highlights: ${highlights}`)
    }
    lines.push('')
  })

  lines.push(
    'You can refine this further on the Explore page using filters like city, course, ownership, and fee range.',
  )

  return lines.join('\n')
}

// ---------- Suggested queries ----------

const SUGGESTED_QUERIES = [
  'Best private engineering colleges under 10L',
  'Top government medical colleges in India',
  'Best ROI MBA colleges in India',
  'Best B.Tech colleges in Bangalore',
  'Top private engineering colleges with good placements',
]

// ---------- Component ----------

export default function ChatBuddy() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [convState, setConvState] = useState<ConversationState>({ step: 'idle' })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        sender,
        timestamp: new Date(),
      },
    ])
  }

  // ---------- Conversation flow ----------

  const detectCourseAndOwnership = (text: string) => {
    const lower = text.toLowerCase()
    let courseLabel: string | undefined
    let ownership: 'Private' | 'Government' | undefined

    if (
      lower.includes('engineering') ||
      lower.includes('b.tech') ||
      lower.includes('btech') ||
      lower.includes('b tech')
    ) {
      courseLabel = 'B.Tech / Engineering'
    } else if (lower.includes('mba')) {
      courseLabel = 'MBA / Management'
    } else if (lower.includes('mbbs') || lower.includes('medical')) {
      courseLabel = 'MBBS / Medical'
    }

    if (lower.includes('private')) ownership = 'Private'
    if (lower.includes('govt') || lower.includes('government') || lower.includes('public')) {
      ownership = 'Government'
    }

    return { courseLabel, ownership }
  }

  const handleDirectAnswer = (text: string) => {
    const answer = formatAnswer(text)
    addMessage(answer, 'bot')
  }

  const handleSend = () => {
    const trimmed = inputText.trim()
    if (!trimmed) return

    addMessage(trimmed, 'user')
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const lower = trimmed.toLowerCase()

      // If we are in the middle of the guided flow
      if (convState.step === 'askLocation') {
        setConvState((prev) => ({
          ...prev,
          step: 'askBudget',
          preferredLocation: trimmed,
        }))
        setIsTyping(false)
        addMessage(
          'Great, noted your preferred location.\n\nWhat is your approximate total budget for the full course? (For example: "under 8L" or "10 lakh".)',
          'bot',
        )
        return
      }

      if (convState.step === 'askBudget') {
        const budget = parseBudgetFromText(lower)

        if (!budget) {
          setIsTyping(false)
          addMessage(
            'I could not understand the budget clearly.\nPlease mention it like "under 8L", "6 lakh", or "below 10 lakhs".',
            'bot',
          )
          return
        }

        const finalQuery = `${convState.baseQuery ?? ''} in ${convState.preferredLocation ?? ''
          } under ${budget} lakh`

        const answer = formatAnswer(finalQuery, {
          lockedCity: convState.preferredLocation,
          lockedBudget: budget,
        })

        setConvState({ step: 'idle' })
        setIsTyping(false)
        addMessage(
          `Great, I have everything I need now:\n• Course: ${convState.courseLabel ?? 'Not specified'}\n• Location: ${convState.preferredLocation ?? 'Not specified'
          }\n• Budget: up to ₹${budget} Lakh\n${convState.ownership ? `• College type: ${convState.ownership}` : ''
          }`,
          'bot',
        )
        addMessage(answer, 'bot')
        return
      }

      // If user already included everything in one query → direct answer
      const filters = parseQueryFilters(lower)
      if (filters.preferredCity && filters.maxFeesLakh) {
        const answer = formatAnswer(trimmed, {
          lockedCity: filters.preferredCity,
          lockedBudget: filters.maxFeesLakh,
        })
        setIsTyping(false)
        addMessage(answer, 'bot')
        return
      }

      // Start guided flow if looks like a "find college" query
      const { courseLabel, ownership } = detectCourseAndOwnership(lower)

      if (courseLabel) {
        // Ask for location next
        setConvState({
          step: 'askLocation',
          baseQuery: trimmed,
          courseLabel,
          ownership,
        })
        setIsTyping(false)
        addMessage(
          `Nice, you are looking for ${courseLabel.toLowerCase()} colleges${ownership ? ` (${ownership.toLowerCase()})` : ''
          }.\n\nWhich city or state do you prefer?`,
          'bot',
        )
        return
      }

      // Fallback – normal RAG answer
      const answer = formatAnswer(trimmed)
      setIsTyping(false)
      addMessage(answer, 'bot')
    }, 600)
  }

  const handleSuggestedClick = (q: string) => {
    setInputText(q)
    setTimeout(() => {
      handleSend()
    }, 120)
  }

  // ---------- Closed teaser strip ----------

  if (!isOpen && showTeaser) {
    const openChat = () => {
      setIsOpen(true)
      if (messages.length === 0) {
        addMessage(
          'Hi, I am Collegia Buddy. Ask me anything about colleges, fees, placements or admissions.\n\nYou can start with:\n• Best private engineering colleges under 10L\n• Top government medical colleges in India\n• Best ROI MBA colleges',
          'bot',
        )
      }
    }

    return (
      <div className="chatbot-root fixed bottom-6 right-6 z-50">
        <div
          role="button"
          tabIndex={0}
          onClick={openChat}
          onKeyDown={(e) => e.key === 'Enter' && openChat()}
          className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] text-white shadow-[0_16px_40px_rgba(15,23,42,0.55)] hover:shadow-[0_20px_60px_rgba(15,23,42,0.7)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          {/* Bot avatar */}
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
            <div className="relative w-full h-full rounded-2xl bg-white flex items-center justify-center shadow-md">
              <Image
                src="/images/collegia-bot.png"
                alt="Collegia Buddy"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            {/* online dot */}
            <div className="absolute -right-0.5 -bottom-0.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </span>
            </div>
          </div>

          <div className="text-left">
            <div className="text-xs font-medium opacity-90">
              Get instant answers to your college queries
            </div>
            <div className="text-sm font-semibold">Ask Collegia Buddy</div>
          </div>

          <span
            onClick={(e) => {
              e.stopPropagation()
              setShowTeaser(false)
            }}
            className="ml-1 text-white/80 hover:text-white cursor-pointer"
          >
            <X className="h-4 w-4" />
          </span>
        </div>
      </div>
    )
  }

  // ---------- Closed round bubble (after teaser dismissed) ----------

  if (!isOpen && !showTeaser) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            setIsOpen(true)
            if (messages.length === 0) {
              addMessage(
                'Hi, I am Collegia Buddy. Ask me anything about colleges, fees, placements or admissions.',
                'bot',
              )
            }
          }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] shadow-[0_18px_45px_rgba(15,23,42,0.55)] hover:shadow-[0_24px_60px_rgba(15,23,42,0.7)] hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <div className="absolute inset-2 rounded-full border border-white/30" />
          <div className="relative w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md">
            <Image
              src="/images/collegia-bot.png"
              alt="Collegia Buddy"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>

          {/* online dot */}
          <div className="absolute -right-0.5 -bottom-0.5">
            <span className="relative flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
            </span>
          </div>
        </button>
      </div>
    )
  }

  // ---------- Open chat window ----------

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.35)] border border-white/70 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-2xl bg-white/20 blur-sm" />
            <div className="relative w-full h-full rounded-2xl bg-white flex items-center justify-center shadow-md">
              <Image
                src="/images/collegia-bot.png"
                alt="Collegia Buddy"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="absolute -right-0.5 -bottom-0.5">
              <span className="relative flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
              </span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm">Collegia Buddy</h3>
            <p className="text-[11px] opacity-90">
              Ask anything about colleges, fees and placements
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white/80 hover:bg-white/15 rounded-full p-1.5 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white">

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex mb-3 ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start gap-2 max-w-[80%] ${m.sender === "user" ? "flex-row-reverse" : ""
                }`}
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-white shadow-sm flex-shrink-0">
                {m.sender === "user" ? (
                  <Image
                    src="/images/User.png"
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src="/images/AI-Bot.png"
                    alt="Collegia Bot"
                    width={36}
                    height={36}
                    className="object-contain p-1"
                  />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`px-4 py-3 rounded-2xl shadow-sm text-sm whitespace-pre-line ${m.sender === "user"
                    ? "bg-white text-gray-800 border border-gray-200 rounded-tr-none"
                    : "bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] text-white rounded-tl-none shadow-md"
                  }`}
                style={{ lineHeight: "1.45" }}
              >
                {m.text}

                {/* Timestamp */}
                <div
                  className={`text-[10px] mt-1 text-right ${m.sender === "user" ? "text-gray-400" : "text-white/70"
                    }`}
                >
                  {m.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}


        {/* Quick suggestions when just opened */}
        {messages.length === 1 && messages[0]?.sender === 'bot' && (
          <div className="mt-1">
            <p className="text-xs text-slate-500 mb-2">Try one of these:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestedClick(q)}
                  className="px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[11px] border border-slate-200 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#2563EB]/10 flex items-center justify-center text-xs font-semibold text-[#2563EB]">
                AI
              </div>
              <div className="bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] text-white rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-white/80 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-slate-100">
        <div className="flex space-x-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Write your query about colleges here..."
            className="flex-1 px-3 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/60"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="px-3 py-2.5 rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#0EA5E9] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
