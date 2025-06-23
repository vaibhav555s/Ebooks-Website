
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function StoryReaderNavigation({ 
  currentPage, 
  totalPages, 
  isFirstPage, 
  isLastPage, 
  isAnimating, 
  previousPage, 
  nextPage, 
  goToPage, 
  trackUserInteraction, 
  book 
}) {
  const handlePreviousPage = () => {
    previousPage();
    trackUserInteraction('page_navigation', book, { 
      action: 'previous', 
      from_page: currentPage,
      to_page: currentPage - 1 
    });
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      nextPage();
      trackUserInteraction('page_navigation', book, { 
        action: 'next', 
        from_page: currentPage,
        to_page: currentPage + 1 
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:gap-6">
      <div className="block sm:hidden text-center">
        <p className="text-xs text-zinc-500 mb-2">
          Swipe left/right to navigate pages
        </p>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto max-w-full px-4">
        {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
          let pageNum;
          if (totalPages <= 10) {
            pageNum = i + 1;
          } else if (i < 3) {
            pageNum = i + 1;
          } else if (i < 7) {
            pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + (i - 3)));
          } else {
            pageNum = totalPages - (9 - i);
          }
          
          return (
            <motion.button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300 flex-shrink-0",
                pageNum === currentPage
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 scale-125"
                  : "bg-zinc-700 hover:bg-zinc-600"
              )}
              whileHover={{ scale: pageNum === currentPage ? 1.25 : 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between w-full max-w-md gap-4">
        <motion.button
          onClick={handlePreviousPage}
          disabled={isFirstPage || isAnimating}
          className={cn(
            "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 min-h-[48px]",
            isFirstPage || isAnimating
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
          )}
          whileHover={!isFirstPage && !isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isFirstPage && !isAnimating ? { scale: 0.95 } : {}}
        >
          <ChevronLeft size={20} />
          <span className="hidden sm:inline">Previous</span>
        </motion.button>

        <div className="text-center">
          <div className="text-sm text-zinc-400">Page</div>
          <div className="text-lg font-bold text-white">
            {currentPage} of {totalPages}
          </div>
        </div>

        <motion.button
          onClick={handleNextPage}
          disabled={isLastPage || isAnimating}
          className={cn(
            "flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full font-medium transition-all duration-300 min-h-[48px]",
            isLastPage
              ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
              : isAnimating
              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90"
          )}
          whileHover={!isAnimating ? { scale: 1.05 } : {}}
          whileTap={!isAnimating ? { scale: 0.95 } : {}}
        >
          <span className="hidden sm:inline">{isLastPage ? "Finished" : "Next"}</span>
          <span className="sm:hidden">{isLastPage ? "✓" : "→"}</span>
          {!isLastPage && <ChevronRight size={20} className="hidden sm:block" />}
        </motion.button>
      </div>
    </div>
  );
}
