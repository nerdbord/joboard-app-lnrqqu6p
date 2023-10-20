import { QueryFunction, QueryKey } from '@tanstack/query-core';
import axios from 'axios';
import { IJobs } from './types';

export const getJobs:QueryFunction<IJobs, QueryKey> = async () => {
   try {
      const jobs = await axios.get('https://training.nerdbord.io/api/v1/joboard/offers', {
         headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
         },
      });
      return jobs.data;
   } catch (error) {
      throw new Error(error);
   }
};
