import { QueryFunction, QueryKey } from '@tanstack/query-core';
import axios from 'axios';
import { IJob, IJobs } from './types';
import { useQuery } from '@tanstack/react-query';

export const getJobs: QueryFunction<IJobs, QueryKey> = async () => {
   try {
      const jobs = await axios.get('https://training.nerdbord.io/api/v1/joboard/offers', {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
      });
      return jobs.data;
   } catch (error) {
      throw new Error(error);
   }
};

const queryJobsKey = 'jobs';

export const useGetJobs = () => {
   return useQuery<IJobs>({
      queryKey: [queryJobsKey],
      queryFn: getJobs,
   });
};

export const getOffer: QueryFunction<IJob, QueryKey> = async (id) => {
   try {
      const offer = await axios.get(`https://training.nerdbord.io/api/v1/joboard/offers/${id}`, {
         headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
         },
      });
      return offer.data;
   } catch (error) {
      throw new Error(error);
   }
};

const queryOfferByIdKey = 'offer';

export const useGetOfferById = (id) => {
   return useQuery<IJob>({
      queryKey: [queryOfferByIdKey, id],
      queryFn: () => getOffer(id),
   });
};
