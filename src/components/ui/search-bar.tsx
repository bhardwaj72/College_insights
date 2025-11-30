'use client'

import { useState } from 'react'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SearchBarProps {
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SearchBar({ onSearch, placeholder = "Find your college 🔍 (name, city, course...)", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const quickFilters = [
    "Engineering", "MBA", "Delhi", "Bangalore", "Computer Science", "Low Fees"
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    // Mock suggestions - in real app, this would filter from database
    if (value.length > 0) {
      const mockSuggestions = [
        "Delhi Technological University",
        "IIT Delhi",
        "NSUT Delhi",
        "Engineering in Delhi",
        "MBA Colleges"
      ].filter(s => s.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(mockSuggestions.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSearch = () => {
    if (query.trim()) {
      onSearch?.(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    onSearch?.(suggestion)
    setShowSuggestions(false)
  }

  const handleQuickFilter = (filter: string) => {
    setQuery(filter)
    onSearch?.(filter)
    setShowSuggestions(false)
  }

  return (
    <div className={`relative ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="pr-12 h-12 text-base rounded-xl border-2 focus:border-primary transition-colors"
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <Button
          size="sm"
          onClick={handleSearch}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 px-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-xl shadow-lg z-50">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-muted rounded-lg transition-colors text-sm"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Badge
            key={filter}
            variant="outline"
            className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
            onClick={() => handleQuickFilter(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>
    </div>
  )
}
