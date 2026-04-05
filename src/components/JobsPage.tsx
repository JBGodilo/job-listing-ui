import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJobs, ApiError } from '../services/jobService';
import { FiltersSidebar } from '../components/FiltersSidebar';
import { JobsList } from '../components/JobsList';
import { Pagination } from '../components/Pagination';
import { Briefcase, ServerCrash, AlertTriangle, RefreshCw } from 'lucide-react';
import { useJobFilters, FilterGroup } from '../hooks/useJobFilters';

const JOB_FILTER_GROUPS: FilterGroup[] = [
  {
    key: 'category',
    label: 'Category',
    options: ['Engineering', 'Design', 'Marketing'],
  },
  {
    key: 'type',
    label: 'Job Type',
    options: ['Full-time', 'Part-time', 'Contract'],
  },
];

export const JobsPage: React.FC = () => {
  const {
    filters,
    selectedValues,
    toggleFilter,
    clearFilters,
    hasActiveFilters,
  } = useJobFilters(JOB_FILTER_GROUPS);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
    placeholderData: (previousData) => previousData,
  });

  const renderError = () => {
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
      return (
        <div className="min-h-[600px] flex items-start pt-12">
          <div className="w-full p-8 bg-amber-50 rounded-2xl border border-amber-200 text-center">
            <div className="bg-amber-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-amber-900 mb-2">Bad Request</h3>
            <p className="text-amber-700">{error.message}</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[600px] flex items-start pt-12">
        <div className="w-full p-8 bg-red-50 rounded-2xl border border-red-200 text-center">
          <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
            <ServerCrash className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-900 mb-2">Error connecting to server</h3>
          <p className="text-red-600 mb-6">We couldn&apos;t reach the server. Please check your connection and try again.</p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="bg-white border-b border-gray-100 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-600" />
              Explore Job Listings
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <FiltersSidebar
            filterGroups={JOB_FILTER_GROUPS}
            selectedValues={selectedValues}
            onToggle={toggleFilter}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Jobs List Area */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                {isError ? 'Error' : data ? `${data.meta.totalItems} Jobs Found` : 'Loading...'}
              </h2>
            </div>

            {isError ? (
              renderError()
            ) : (
              <>
                <JobsList jobs={data?.data || []} isLoading={isLoading} />
                <Pagination 
                  totalPages={data?.meta.totalPages || 0} 
                  currentPage={filters.page ?? 1} 
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
