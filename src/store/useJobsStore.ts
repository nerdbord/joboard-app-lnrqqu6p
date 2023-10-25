import { create } from 'zustand';
import type { IJobs } from '../services/types';

type JobType = {
   fullTime: boolean;
   contract: boolean;
   partTime: boolean;
   freelance: boolean;
};

interface JobsStore {
   jobs: IJobs;
   filteredJobs: IJobs;
   searchTitle: string;
   searchLocation: string;
   jobType: JobType;

   setJobs: (value: IJobs) => void;
   clearSearch: () => void;
   setSearchTitle: (value: string) => void;
   setSearchLocation: (value: string) => void;
   setJobType: (key: keyof JobType, value: boolean) => void;
}

const useJobsStore = create<JobsStore>((set) => ({
   jobs: [],
   filteredJobs: [],
   searchTitle: '',
   searchLocation: '',
   jobType: { fullTime: false, contract: false, partTime: false, freelance: false },

   setJobs: (value) => set({ jobs: value, filteredJobs: value }),
   clearSearch: () =>
      set((state) => ({ filteredJobs: state.jobs, searchTitle: '', searchLocation: '' })),
   setSearchTitle: (value) => {
      set({ searchTitle: value });
      setFilteredJobs(set);
   },
   setSearchLocation: (value) => {
      set({ searchLocation: value });
      setFilteredJobs(set);
   },
   setJobType: (key, value) => {
      set((state) => ({
         jobType: { ...state.jobType, [key]: value },
      }));
      setFilteredJobs(set);
   },
}));

const setFilteredJobs = (set: (state: (prevState: JobsStore) => Partial<JobsStore>) => void) => {
   set((state) => ({
      filteredJobs: state.jobs.filter((job) => {
         return (
            (!state.searchTitle ||
               job.title.toLowerCase().includes(state.searchTitle.toLowerCase())) &&
            (!state.searchLocation ||
               job.city.toLowerCase().includes(state.searchLocation.toLowerCase())) &&
            (!state.jobType.fullTime || job.jobType === 'Full-time') &&
            (!state.jobType.contract || job.jobType === 'Contract') &&
            (!state.jobType.partTime || job.jobType === 'Part-time') &&
            (!state.jobType.freelance || job.jobType === 'Freelance')
         );
      }),
   }));
};

export default useJobsStore;
