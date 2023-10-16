import axios from 'axios';
import { IJobs } from './types';

export const getJobs = async () => {
   try {
      const jobs = await axios.get<IJobs>('https://training.nerdbord.io/api/v1/joboard/offers', {
         headers: {
            Accept: 'application/json',
         },
      });
      return jobs;
   } catch (error) {
      console.log(error);
   }
};
