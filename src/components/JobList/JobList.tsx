import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/queries';
import { IJobs } from '../../services/types';

const JobList: React.FC = () => {
   const { isError, isPending, data } = useQuery<IJobs>({
      queryKey: ['jobs'],
      queryFn: getJobs,
   });
   const jobs = data;

   if (isError) {
      return <div>Error occurred while fetching jobs.</div>;
    }
    
    if (isPending) {
      return <div>Loading...</div>;
    }

   return (
      
      <section>
         {jobs?.map(({ _id, title }) => (
            <p key={_id}>{title}</p>
         ))}
      </section>
   );
};

export default JobList;
