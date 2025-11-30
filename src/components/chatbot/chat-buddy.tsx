'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Bot, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  text: string
  sender: 'bot' | 'user'
  timestamp: Date
}

interface ChatState {
  step: 'greeting' | 'course' | 'city' | 'budget' | 'preferences' | 'results'
  course?: string
  city?: string
  budget?: string
  preferences?: string[]
}

const COURSE_OPTIONS = ['Engineering', 'MBA', 'Design', 'Law', 'Medical', 'Commerce']
const CITY_OPTIONS = ['Delhi', 'Bangalore', 'Mumbai', 'Chennai', 'Pune', 'Hyderabad']
const BUDGET_OPTIONS = ['Under 5L', '5L - 10L', '10L - 20L', 'Above 20L']

export default function ChatBuddy() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatState, setChatState] = useState<ChatState>({ step: 'greeting' })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const getBotResponse = (userInput: string, currentState: ChatState): string => {
    const input = userInput.toLowerCase()
    
    switch (currentState.step) {
      case 'greeting':
        if (COURSE_OPTIONS.some(course => input.includes(course.toLowerCase()))) {
          return "Nice choice! ⚙️ Ab batao, kis city me dekh rahe ho — Delhi, Bangalore, ya Mumbai?"
        }
        return "Hey! 👋 Main hoon your College Buddy. Batao, kis course me interest hai — Engineering, MBA, Design, Law, Medical, ya Commerce?"
      
      case 'course':
        if (CITY_OPTIONS.some(city => input.includes(city.toLowerCase()))) {
          return "Perfect! 😎 Budget kaisa hai — Under 5L, 5L-10L, 10L-20L, ya Above 20L?"
        }
        return "Course choose karlo pehle! Engineering, MBA, Design, Law, Medical, ya Commerce?"
      
      case 'city':
        if (BUDGET_OPTIONS.some(budget => input.includes(budget.toLowerCase()))) {
          return "Great! 🔥 Last question — placements zyada important hai ya campus life?"
        }
        return "Budget batao please — Under 5L, 5L-10L, 10L-20L, ya Above 20L?"
      
      case 'budget':
        if (input.includes('placement') || input.includes('campus')) {
          return "Perfect! 🎯 Tumhare liye ye top colleges hain:\n\n1. DTU Delhi - Best placements\n2. NSUT Delhi - Great campus\n3. IIIT Delhi - Tech focused\n\nCompare karna chahte ho?"
        }
        return "Batao ki tumhe placements zyada important hai ya campus life?"
      
      default:
        return "Thanks for chatting! Mujhe lagta hai ye colleges tumhare liye perfect hain. Explore karne ke liye upar wale options try karo!"
    }
  }

  const updateChatState = (userInput: string, currentState: ChatState): ChatState => {
    const input = userInput.toLowerCase()
    let newState = { ...currentState }
    
    switch (currentState.step) {
      case 'greeting':
        if (COURSE_OPTIONS.some(course => input.includes(course.toLowerCase()))) {
          newState.step = 'course'
          newState.course = COURSE_OPTIONS.find(course => input.includes(course.toLowerCase()))
        }
        break
      case 'course':
        if (CITY_OPTIONS.some(city => input.includes(city.toLowerCase()))) {
          newState.step = 'city'
          newState.city = CITY_OPTIONS.find(city => input.includes(city.toLowerCase()))
        }
        break
      case 'city':
        if (BUDGET_OPTIONS.some(budget => input.includes(budget.toLowerCase()))) {
          newState.step = 'budget'
          newState.budget = BUDGET_OPTIONS.find(budget => input.includes(budget.toLowerCase()))
        }
        break
      case 'budget':
        if (input.includes('placement') || input.includes('campus')) {
          newState.step = 'results'
          newState.preferences = input.includes('placement') ? ['placements'] : ['campus']
        }
        break
    }
    
    return newState
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage = inputText.trim()
    addMessage(userMessage, 'user')
    setInputText('')
    setIsTyping(true)

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage, chatState)
      addMessage(botResponse, 'bot')
      setChatState(prev => updateChatState(userMessage, prev))
      setIsTyping(false)
    }, 1000)
  }

  const handleQuickReply = (reply: string) => {
    setInputText(reply)
    setTimeout(() => handleSendMessage(), 100)
  }

  const getQuickReplies = () => {
    switch (chatState.step) {
      case 'greeting':
        return COURSE_OPTIONS
      case 'course':
        return CITY_OPTIONS
      case 'city':
        return BUDGET_OPTIONS
      case 'budget':
        return ['Placements', 'Campus Life']
      default:
        return []
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] hover:from-[#9B3BF3] hover:to-[#0BC5E9] text-white shadow-[0_8px_30px_rgba(138,43,226,0.4)] hover:shadow-[0_12px_40px_rgba(138,43,226,0.6)] rounded-full px-6 py-4 flex items-center space-x-3 transition-all duration-300 hover:scale-110 animate-bounce"
        >
          <span className="text-2xl">💬</span>
          <span className="font-semibold">Talk to your College Buddy!</span>
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white/90 backdrop-blur-lg rounded-3xl shadow-[0_20px_60px_rgba(138,43,226,0.3)] border border-white/60 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#C9A7EB]/90 via-[#00B4D8]/90 to-[#FFD6E0]/90 backdrop-blur-sm text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-semibold text-lg">College Buddy</h3>
            <p className="text-xs opacity-90">Your friendly guide 💬</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-white/20 rounded-full p-2 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white/50 to-white/80">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-[#C9A7EB]/20 to-[#00B4D8]/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🤖</span>
            </div>
            <p className="font-semibold text-lg text-[#2F2F2F]">Hey! 👋 Main hoon Buddy</p>
            <p className="text-sm text-[#2F2F2F]/60">Aapka college selection guide</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.sender === 'user' ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8]' : 'bg-white/60 backdrop-blur-sm border border-white/80'}`}>
                <span className="text-lg">{message.sender === 'user' ? '👤' : '🤖'}</span>
              </div>
              <div className={message.sender === 'user' ? 'bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white rounded-2xl rounded-tr-none px-4 py-3 shadow-md' : 'bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl rounded-tl-none px-4 py-3 shadow-md'}>
                <p className="text-sm whitespace-pre-line">{message.text}</p>
                <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-[#2F2F2F]/50'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/60 backdrop-blur-sm border border-white/80 flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl rounded-tl-none px-4 py-3 shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-[#8A2BE2] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#00B4D8] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-[#FFD6E0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {getQuickReplies().length > 0 && (
        <div className="px-4 py-2 bg-white/60 backdrop-blur-sm border-t border-white/60">
          <div className="flex flex-wrap gap-2">
            {getQuickReplies().map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="text-xs px-3 py-2 rounded-full bg-gradient-to-r from-[#C9A7EB]/20 to-[#00B4D8]/20 hover:from-[#C9A7EB]/30 hover:to-[#00B4D8]/30 border border-white/60 text-[#2F2F2F] font-medium transition-all hover:scale-105"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-white/60">
        <div className="flex space-x-2">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white/60 border border-white/80 focus:outline-none focus:border-[#8A2BE2]/50 transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-[#8A2BE2] to-[#00B4D8] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
