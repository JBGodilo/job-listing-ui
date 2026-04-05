import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "p-2 rounded-lg border border-gray-200 transition-all",
          currentPage === 1 
            ? "text-gray-300 cursor-not-allowed" 
            : "text-gray-600 hover:bg-white hover:border-blue-300 hover:text-blue-600"
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1">
        {[...Array(totalPages)].map((_, i) => {
          const page = i + 1;
          const isCurrent = page === currentPage;
          
          return (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                isCurrent
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-gray-600 hover:bg-white hover:border-gray-300 border border-transparent"
              )}
            >
              {page}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "p-2 rounded-lg border border-gray-200 transition-all",
          currentPage === totalPages 
            ? "text-gray-300 cursor-not-allowed" 
            : "text-gray-600 hover:bg-white hover:border-blue-300 hover:text-blue-600"
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};
