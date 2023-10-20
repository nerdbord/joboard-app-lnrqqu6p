import React from 'react';
import { useGetJobs } from '../../services/queries';

const JobList: React.FC = () => {
   const { isError, isPending, data } = useGetJobs();
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
