"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

type SearchContextType = {
  searchQuery: string
  setSearchQuery: (query: string) => void
  performSearch: () => void
  isSearching: boolean
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()

  // Reset isSearching state when component mounts
  useEffect(() => {
    setIsSearching(false)
  }, [])

  const performSearch = () => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      router.push(`/search?q=฿{encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        performSearch,
        isSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider")
  }
  return context
}

