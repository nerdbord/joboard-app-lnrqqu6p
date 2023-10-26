import { create } from 'zustand';
import type { IJobs } from '../services/types';

type JobType = {
   fullTime: boolean;
   contract: boolean;
   partTime: boolean;
   freelance: boolean;
};

type JobSeniority = {
   lead: boolean;
   expert: boolean;
   senior: boolean;
   midRegular: boolean;
   junior: boolean;
   intern: boolean;
};

interface JobsStore {
   jobs: IJobs;
   filteredJobs: IJobs;
   searchTitle: string;
   searchLocation: string;
   jobType: JobType;
   jobSeniority: JobSeniority;

   setJobs: (value: IJobs) => void;
   clearSearch: () => void;
   setSearchTitle: (value: string) => void;
   setSearchLocation: (value: string) => void;
   setJobType: (key: keyof JobType, value: boolean) => void;
   setJobSeniority: (key: keyof JobSeniority, value: boolean) => void;
}

const useJobsStore = create<JobsStore>((set) => ({
   jobs: [],
   filteredJobs: [],
   searchTitle: '',
   searchLocation: '',
   jobType: { fullTime: false, contract: false, partTime: false, freelance: false },
   jobSeniority: {
      lead: false,
      expert: false,
      senior: false,
      midRegular: false,
      junior: false,
      intern: false,
   },

   setJobs: (value) => set({ jobs: value, filteredJobs: value }),
   clearSearch: () => {
      set((state) => ({ filteredJobs: state.jobs, searchTitle: '', searchLocation: '' }));
      setFilteredJobs(set);
   },
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
   setJobSeniority: (key, value) => {
      set((state) => ({
         jobSeniority: { ...state.jobSeniority, [key]: value },
      }));
      setFilteredJobs(set);
   },
}));

// Filter jobs by search values and filter settings
const setFilteredJobs = (set: (state: (prevState: JobsStore) => Partial<JobsStore>) => void) => {
   set((state) => ({
      filteredJobs: state.jobs.filter((job) => {
         return (
            (!state.searchTitle ||
               job.title.toLowerCase().includes(state.searchTitle.toLowerCase())) &&
            (!state.searchLocation ||
               job.city.toLowerCase().includes(state.searchLocation.toLowerCase())) &&
            (!isAnySelected(state.jobType) ||
               (state.jobType.fullTime && job.jobType === 'Full-time') ||
               (state.jobType.contract && job.jobType === 'Contract') ||
               (state.jobType.partTime && job.jobType === 'Part-time') ||
               (state.jobType.freelance && job.jobType === 'Freelance')) &&
            (!isAnySelected(state.jobSeniority) ||
               (state.jobSeniority.lead && job.seniority === 'Lead') ||
               (state.jobSeniority.expert && job.seniority === 'Expert') ||
               (state.jobSeniority.senior && job.seniority === 'Senior') ||
               (state.jobSeniority.midRegular && job.seniority === 'Mid/Regular') ||
               (state.jobSeniority.junior && job.seniority === 'Junior') ||
               (state.jobSeniority.intern && job.seniority === 'Intern'))
         );
      }),
   }));
};

// Check if any value in an object is true
const isAnySelected = (obj: Object) => {
   return Object.values(obj).some((value) => value === true);
};

export default useJobsStore;
