import { useSearchParams } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import { JobFilters } from '../types';

export interface FilterGroup {
  key: string;
  label: string;
  options: string[];
}

export function useJobFilters(filterGroups: FilterGroup[]) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters: JobFilters = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const group of filterGroups) {
      result[group.key] = searchParams.getAll(group.key);
    }
    return {
      ...result,
      page: parseInt(searchParams.get('page') || '1', 10),
    } as JobFilters;
  }, [searchParams, filterGroups]);

  const selectedValues = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const group of filterGroups) {
      map[group.key] = searchParams.getAll(group.key);
    }
    return map;
  }, [searchParams, filterGroups]);

  const toggleFilter = useCallback((key: string, value: string) => {
    const current = searchParams.getAll(key);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    const newParams = new URLSearchParams(searchParams);
    newParams.delete(key);
    next.forEach((v) => newParams.append(key, v));
    newParams.set('page', '1');
    setSearchParams(newParams);
  }, [searchParams, setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const hasActiveFilters = useMemo(() => {
    return filterGroups.some((group) => searchParams.getAll(group.key).length > 0);
  }, [searchParams, filterGroups]);

  return {
    filters,
    selectedValues,
    toggleFilter,
    clearFilters,
    hasActiveFilters,
  };
}
