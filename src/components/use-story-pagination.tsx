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

  const totalPages = book?.totalPages || 0
  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0
  const currentPageContent = book?.pages.find((p) => p.pageNumber === currentPage)?.content || ""
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

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
