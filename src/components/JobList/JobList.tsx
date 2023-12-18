import React, { useEffect} from 'react';
import { useGetJobs } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import styles from './JobList.module.scss';
import JobCard from '../JobCard/JobCard';
import JobOffer from '../JobOffer/JobOffer';
import Modal from '../Modal/Modal';

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
      <div className={styles.jobOffersList} data-testid="jobs-container">
         {filteredJobs && filteredJobs.map((offer) => <JobCard key={offer._id} offer={offer} />)}
         <Modal>
            <JobOffer />
         </Modal>
      </div>
   );
};

export default JobList;
