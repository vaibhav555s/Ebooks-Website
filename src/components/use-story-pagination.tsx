
"use client"

import { useState, useCallback, useEffect } from "react"
import type { booksData } from "../data/data"

export interface UseStoryPaginationReturn {
  currentPage: number
  totalPages: number
  progress: number
  currentPageContent: string
  isFirstPage: boolean
  isLastPage: boolean
  isAnimating: boolean
  nextPage: () => void
  previousPage: () => void
  goToPage: (page: number) => void
}

export function useStoryPagination(book: booksData | undefined): UseStoryPaginationReturn {
  const [currentPage, setCurrentPage] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // Convert story string into properly sized pages
  const pages = book?.story ? createStoryPages(book.story) : []
  const totalPages = pages.length || 0
  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0
  const currentPageContent = pages[currentPage - 1] || ""
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  // Function to create pages with appropriate length
  function createStoryPages(story: string): string[] {
    const paragraphs = story.split('\n\n').filter(p => p.trim().length > 0)
    const pages: string[] = []
    let currentPage = ""
    const maxWordsPerPage = 200 // Adjust this value to control page length
    
    for (const paragraph of paragraphs) {
      const words = paragraph.split(' ')
      const currentWords = currentPage.split(' ').length
      
      // If adding this paragraph would exceed the word limit, start a new page
      if (currentWords + words.length > maxWordsPerPage && currentPage.length > 0) {
        pages.push(currentPage.trim())
        currentPage = paragraph
      } else {
        // Add paragraph to current page
        currentPage = currentPage ? currentPage + '\n\n' + paragraph : paragraph
      }
    }
    
    // Add the last page if it has content
    if (currentPage.trim()) {
      pages.push(currentPage.trim())
    }
    
    return pages.length > 0 ? pages : [story] // Fallback to original story if splitting fails
  }

  const animatePageChange = useCallback(
    (newPage: number) => {
      if (newPage < 1 || newPage > totalPages || newPage === currentPage || isAnimating) {
        return
      }

      setIsAnimating(true)

      // Brief delay for animation
      setTimeout(() => {
        setCurrentPage(newPage)
        setTimeout(() => {
          setIsAnimating(false)
        }, 100)
      }, 150)
    },
    [currentPage, totalPages, isAnimating],
  )

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      animatePageChange(currentPage + 1)
    }
  }, [currentPage, isLastPage, animatePageChange])

  const previousPage = useCallback(() => {
    if (!isFirstPage) {
      animatePageChange(currentPage - 1)
    }
  }, [currentPage, isFirstPage, animatePageChange])

  const goToPage = useCallback(
    (page: number) => {
      animatePageChange(page)
    },
    [animatePageChange],
  )

  // Reset page when book changes
  useEffect(() => {
    setCurrentPage(1)
    setIsAnimating(false)
  }, [book?.id])

  return {
    currentPage,
    totalPages,
    progress,
    currentPageContent,
    isFirstPage,
    isLastPage,
    isAnimating,
    nextPage,
    previousPage,
    goToPage,
  }
}
