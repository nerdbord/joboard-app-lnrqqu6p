import React, { useEffect } from 'react';
import { useGetJobs } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import { inspect } from 'util';
import styles from './JobList.module.scss';
import JobCard from '../JobCard/JobCard';

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
      // <section>
      //    {filteredJobs?.map(({ _id, title }) => (
      //       <p key={_id}>{title}</p>
      //    ))}
      // </section>
      <div className={styles['job-offers-list']}>
         {data && data.map((offer) => <JobCard key={offer._id} {...offer} />)}
      </div>
   );
};

export default JobList;
