import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getJobs } from '../../services/queries';

const JobList: React.FC = () => {
   const { isError, isPending, data } = useQuery({
      queryKey: ['jobs'],
      queryFn: getJobs,
   });
   const jobs = data?.data;

   return (
      <section>
         {jobs?.map(({ _id, title }) => (
            <p key={_id}>{title}</p>
         ))}
      </section>
   );
};

export default JobList;
