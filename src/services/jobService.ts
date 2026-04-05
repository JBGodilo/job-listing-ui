import { JobFilters, JobsResponse } from '../types';

const API_BASE = '/api';

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const fetchJobs = async (filters: JobFilters): Promise<JobsResponse> => {
  const params = new URLSearchParams();

  if (filters.category && filters.category.length > 0) {
    filters.category.forEach(cat => params.append('category', cat));
  }

  if (filters.type && filters.type.length > 0) {
    filters.type.forEach(type => params.append('type', type));
  }

  params.set('page', String(filters.page || 1));
  params.set('limit', String(filters.limit || 10));

  const response = await fetch(`${API_BASE}/jobs?${params.toString()}`);

  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (body.message) {
        message = Array.isArray(body.message) ? body.message.join('. ') : body.message;
      }
    } catch {
      // use statusText fallback
    }
    throw new ApiError(response.status, message);
  }

  return response.json();
};
