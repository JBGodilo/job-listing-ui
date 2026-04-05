import React from 'react';
import { Job } from '../types';
import { Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

interface JobsListProps {
  jobs: Job[];
  isLoading: boolean;
}

export const JobsList: React.FC<JobsListProps> = ({ jobs, isLoading }) => {
  if (isLoading) {
    return (
      <div className="min-h-[600px] space-y-4">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="h-5 bg-gray-200 rounded w-2/5" />
              <div className="flex items-center gap-2">
                <div className="h-5 w-20 bg-gray-100 rounded-full" />
                <div className="h-5 w-16 bg-blue-50 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-[600px] flex items-start pt-12">
        <div className="w-full text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">No jobs found</h3>
          <p className="text-gray-500">Try adjusting your filters to find what you&apos;re looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] space-y-4">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/5 transition-all cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-100">
                {job.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                {job.type}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
