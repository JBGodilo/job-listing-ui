export type JobCategory = 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Product' | 'Customer Support';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';

export interface Job {
  id: number;
  title: string;
  category: JobCategory;
  type: JobType;
}

export interface JobsMeta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface JobsResponse {
  data: Job[];
  meta: JobsMeta;
}

export interface JobFilters {
  category?: JobCategory[];
  type?: JobType[];
  page?: number;
  limit?: number;
}
