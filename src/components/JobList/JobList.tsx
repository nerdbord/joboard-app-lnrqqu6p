import React, { useEffect, useState } from 'react';
import { useGetJobs } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import styles from './JobList.module.scss';
import JobCard from '../JobCard/JobCard';
import JobOffer from '../JobOffer/JobOffer';
import Modal from '../Modal/Modal';
import JobCardMobile from '../JobCard/JobCardMobile';

const JobList: React.FC = () => {
   const [isMobile, setIsMobile] = useState(false);
   const { isError, isPending, data } = useGetJobs();
   const { setJobs, filteredJobs } = useJobsStore();

   const updateMobileWidth = () => {
      setIsMobile(window.innerWidth < 768);
   };

   useEffect(() => {
      data && setJobs(data);
   }, [data]);

   useEffect(() => {
      window.addEventListener('resize', updateMobileWidth);
      return () => {
         window.removeEventListener('resize', updateMobileWidth);
      };
   }, []);

   if (isError) {
      return <div>Error occurred while fetching jobs.</div>;
   }

   if (isPending) {
      return <div>Loading...</div>;
   }

   return (
      <div className={styles.jobOffersList} data-testid="jobs-container">
         {filteredJobs &&
            filteredJobs.map((offer) =>
               !isMobile ? (
                  <JobCard key={offer._id} offer={offer} />
               ) : (
                  <JobCardMobile key={offer._id} offer={offer} />
               ),
            )}

         <Modal>
            <JobOffer />
         </Modal>
      </div>
   );
};

export default JobList;
