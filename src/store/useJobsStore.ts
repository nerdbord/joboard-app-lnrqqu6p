import { create } from 'zustand';
import { initialOffer, type IJob, type IJobs } from '../services/types';

interface JobsStore {
   jobs: IJobs;
   filteredJobs: IJobs;
   searchTitle: string;
   searchLocation: string;
   offer: IJob;
   currentOfferId: string;
   isOfferWindowOpen: boolean;

   setJobs: (value: IJobs) => void;
   setOffer: (value: IJob) => void;
   setCurrentOfferId: (value: string) => void;
   clearSearch: () => void;
   setSearchTitle: (value: string) => void;
   setSearchLocation: (value: string) => void;
   setIsOfferWindowOper: (value: boolean) => void;
}

const useJobsStore = create<JobsStore>((set) => ({
   jobs: [],
   filteredJobs: [],
   searchTitle: '',
   searchLocation: '',
   offer: initialOffer,
   currentOfferId: '',
   isOfferWindowOpen: false,

   setJobs: (value) => set({ jobs: value, filteredJobs: value }),
   setOffer: (value) => set({ offer: value }),
   setCurrentOfferId: (value) => set({ currentOfferId: value }),
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
   setIsOfferWindowOper: (value) => set({ isOfferWindowOpen: value }),
}));

const setFilteredJobs = (set: (state: (prevState: JobsStore) => Partial<JobsStore>) => void) => {
   set((state) => ({
      filteredJobs: state.jobs.filter((job) => {
         return (
            (!state.searchTitle ||
               job.title.toLowerCase().includes(state.searchTitle.toLowerCase())) &&
            (!state.searchLocation ||
               job.city.toLowerCase().includes(state.searchLocation.toLowerCase()))
         );
      }),
   }));
};

export default useJobsStore;
