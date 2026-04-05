import React from 'react';
import { cn } from '../lib/utils';
import { Filter, X } from 'lucide-react';
import { FilterGroup } from '../hooks/useJobFilters';

interface FiltersSidebarProps {
  filterGroups: FilterGroup[];
  selectedValues: Record<string, string[]>;
  onToggle: (key: string, value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  filterGroups,
  selectedValues,
  onToggle,
  onClear,
  hasActiveFilters,
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="lg:sticky lg:top-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filters
        </h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {filterGroups.map((group) => (
          <section key={group.key}>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
              {group.label}
            </h3>
            <div className="space-y-3">
              {group.options.map((option) => (
                <label key={option} className="flex items-center group cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-colors"
                    checked={selectedValues[group.key]?.includes(option) ?? false}
                    onChange={() => onToggle(group.key, option)}
                  />
                  <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
      </div>
    </aside>
  );
};
