import axios from 'axios';

export const getJobs = async () => {
   try {
      const jobs = await axios.get('https://training.nerdbord.io/api/v1/joboard/offers', {
         headers: {
            Accept: 'application/json',
         },
      });
      return jobs;
   } catch (error) {
      throw new Error(error);
   }
};
