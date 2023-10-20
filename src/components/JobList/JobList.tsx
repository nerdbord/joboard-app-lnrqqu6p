import React, { useEffect } from 'react';
import { useGetJobs } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';

const JobList: React.FC = () => {
   const { isError, isPending, data } = useGetJobs();
   const { setJobs, filteredJobs } = useJobsStore();

   useEffect(() => {
      data && setJobs(data);
   }, [data]);

   if (isError) {
      return <div>Error occurred while fetching jobs.</div>;
   }

   if (isPending) {
      return <div>Loading...</div>;
   }

   return (
      <section>
         {filteredJobs?.map(({ _id, title }) => (
            <p key={_id}>{title}</p>
         ))}
      </section>
   );
};

export default JobList;
