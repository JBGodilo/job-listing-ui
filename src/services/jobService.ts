import { Job, JobFilters, JobsResponse } from '../types';

const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    company: 'TechFlow',
    location: 'San Francisco, CA',
    category: 'Engineering',
    type: 'Full-time',
    salary: '$140k - $180k',
    postedAt: '2 days ago',
    description: 'We are looking for a Senior Frontend Engineer to join our core product team...',
    logo: 'https://picsum.photos/seed/techflow/100/100',
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'CreativePulse',
    location: 'Remote',
    category: 'Design',
    type: 'Remote',
    salary: '$110k - $150k',
    postedAt: '1 day ago',
    description: 'Join our design team to help shape the future of digital experiences...',
    logo: 'https://picsum.photos/seed/creativepulse/100/100',
  },
  {
    id: '3',
    title: 'Marketing Manager',
    company: 'GrowthLabs',
    location: 'New York, NY',
    category: 'Marketing',
    type: 'Full-time',
    salary: '$90k - $130k',
    postedAt: '3 days ago',
    description: 'Lead our growth initiatives and manage multi-channel marketing campaigns...',
    logo: 'https://picsum.photos/seed/growthlabs/100/100',
  },
  {
    id: '4',
    title: 'Backend Developer (Node.js)',
    company: 'DataStream',
    location: 'Austin, TX',
    category: 'Engineering',
    type: 'Contract',
    salary: '$80 - $120 / hr',
    postedAt: '5 hours ago',
    description: 'Help us scale our real-time data processing pipelines...',
    logo: 'https://picsum.photos/seed/datastream/100/100',
  },
  {
    id: '5',
    title: 'Sales Executive',
    company: 'CloudScale',
    location: 'Chicago, IL',
    category: 'Sales',
    type: 'Full-time',
    salary: '$70k - $100k + Commission',
    postedAt: '1 week ago',
    description: 'Drive revenue growth by identifying and closing new business opportunities...',
    logo: 'https://picsum.photos/seed/cloudscale/100/100',
  },
  {
    id: '6',
    title: 'Customer Success Lead',
    company: 'HappyUsers',
    location: 'Remote',
    category: 'Customer Support',
    type: 'Remote',
    salary: '$85k - $115k',
    postedAt: '4 days ago',
    description: 'Ensure our customers get the most value out of our platform...',
    logo: 'https://picsum.photos/seed/happyusers/100/100',
  },
  {
    id: '7',
    title: 'Junior Frontend Developer',
    company: 'StartUpInc',
    location: 'Seattle, WA',
    category: 'Engineering',
    type: 'Full-time',
    salary: '$70k - $90k',
    postedAt: '6 days ago',
    description: 'Great opportunity for a junior developer to learn and grow...',
    logo: 'https://picsum.photos/seed/startupinc/100/100',
  },
  {
    id: '8',
    title: 'UX Researcher',
    company: 'UserFirst',
    location: 'Remote',
    category: 'Design',
    type: 'Part-time',
    salary: '$50 - $70 / hr',
    postedAt: '2 weeks ago',
    description: 'Conduct user research to inform our product roadmap...',
    logo: 'https://picsum.photos/seed/userfirst/100/100',
  }
];

export const fetchJobs = async (filters: JobFilters): Promise<JobsResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  let filteredJobs = [...MOCK_JOBS];

  if (filters.search) {
    const search = filters.search.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.description.toLowerCase().includes(search)
    );
  }

  if (filters.category && filters.category.length > 0) {
    filteredJobs = filteredJobs.filter((job) =>
      filters.category?.includes(job.category)
    );
  }

  if (filters.type && filters.type.length > 0) {
    filteredJobs = filteredJobs.filter((job) => filters.type?.includes(job.type));
  }

  const pageSize = 4;
  const page = filters.page || 1;
  const total = filteredJobs.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    jobs: filteredJobs.slice(start, end),
    total,
    page,
    totalPages,
  };
};
