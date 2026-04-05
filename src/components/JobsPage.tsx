import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs } from '../services/jobService';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { JobsList } from '../components/JobsList';
import { Pagination } from '../components/Pagination';
import { JobCategory, JobType } from '../types';
import { Search, Briefcase } from 'lucide-react';

export const JobsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');

  const filters = {
    search: searchParams.get('search') || undefined,
    category: searchParams.getAll('category') as JobCategory[],
    type: searchParams.getAll('type') as JobType[],
    page: parseInt(searchParams.get('page') || '1', 10),
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchInput) {
      newParams.set('search', searchInput);
    } else {
      newParams.delete('search');
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  // Update input when URL changes (e.g. back button)
  useEffect(() => {
    setSearchInput(searchParams.get('search') || '');
  }, [searchParams]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Find your next <span className="text-blue-600">dream job</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Browse through thousands of job opportunities from top companies around the world.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by job title, company, or keywords..."
              className="block w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm group-hover:border-gray-300"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20"
            >
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <FiltersSidebar />

          {/* Jobs List Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {data ? `${data.total} Jobs Found` : 'Searching...'}
              </h2>
            </div>

            {isError ? (
              <div className="p-8 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                Something went wrong while fetching jobs. Please try again.
              </div>
            ) : (
              <>
                <JobsList jobs={data?.jobs || []} isLoading={isLoading} />
                <Pagination 
                  totalPages={data?.totalPages || 0} 
                  currentPage={filters.page} 
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
