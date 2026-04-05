export type JobCategory = 'Engineering' | 'Design' | 'Marketing' | 'Sales' | 'Product' | 'Customer Support';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: JobCategory;
  type: JobType;
  salary: string;
  postedAt: string;
  description: string;
  logo: string;
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
  page: number;
  totalPages: number;
}

export interface JobFilters {
  category?: JobCategory[];
  type?: JobType[];
  search?: string;
  page?: number;
}
