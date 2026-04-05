import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { JobCategory, JobType } from '../types';
import { cn } from '../lib/utils';
import { Filter, X } from 'lucide-react';

const CATEGORIES: JobCategory[] = [
  'Engineering',
  'Design',
  'Marketing',
  'Sales',
  'Product',
  'Customer Support',
];

const TYPES: JobType[] = ['Full-time', 'Part-time', 'Contract', 'Remote'];

export const FiltersSidebar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll('category') as JobCategory[];
  const selectedTypes = searchParams.getAll('type') as JobType[];

  const toggleFilter = (key: string, value: string) => {
    const current = searchParams.getAll(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    next.forEach((v) => newParams.append(key, v));
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams();
    const search = searchParams.get('search');
    if (search) newParams.set('search', search);
    setSearchParams(newParams);
  };

  const hasFilters = selectedCategories.length > 0 || selectedTypes.length > 0;

  return (
    <aside className="w-full lg:w-64 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Category
          </h3>
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <label key={category} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                  checked={selectedCategories.includes(category)}
                  onChange={() => toggleFilter('category', category)}
                />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
            Job Type
          </h3>
          <div className="space-y-3">
            {TYPES.map((type) => (
              <label key={type} className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleFilter('type', type)}
                />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};
