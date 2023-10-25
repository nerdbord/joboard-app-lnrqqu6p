import React, { useEffect } from 'react';
import { useGetJobs } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import styles from './JobList.module.scss';
import JobCard from '../JobCard/JobCard';

const JobList: React.FC = () => {
   const { isError, isPending, data } = useGetJobs();
   const { setJobs, filteredJobs } = useJobsStore();
   console.log(filteredJobs);

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
      <div className={styles.jobOffersList}>
         {filteredJobs && filteredJobs.map((offer) => <JobCard key={offer._id} {...offer} />)}
      </div>
   );
};

export default JobList;
