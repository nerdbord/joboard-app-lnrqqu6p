import React from 'react';
import styles from './JobCard.module.scss';
import { IJob } from '../../services/types';
import { useGetOfferById } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import { dayInterval } from '../../services/utils';

export interface JobCardProps {
   offer: IJob;
}

function JobCard({ offer }: JobCardProps) {
   const { data } = useGetOfferById(offer._id);
   const { setOffer, setCurrentOfferId, setIsOfferWindowOper, isOfferWindowOpen } = useJobsStore();
   const handleCardOnClick = () => {
      setOffer(data);
      setCurrentOfferId(offer._id);
      setIsOfferWindowOper(!isOfferWindowOpen);
   };
   return (
      <div
         className={styles.offer}
         onClick={handleCardOnClick}
         data-testid="offer"
         data-test-offer={JSON.stringify(offer)}
      >
         <div className={styles.offerContainer}>
            <img src={offer.image} alt="logo" className={styles.logo} />

            <div className={styles.offerDataContainer}>
               <p className={styles.title}>{offer.title}</p>
               <div className={styles.detailsContainer}>
                  <p className={styles.company}>{offer.companyName}</p>
                  <p className={styles.location}>
                     {offer.city}, {offer.country}
                  </p>
                  <p className={styles.workLocation}>{offer.workLocation}</p>
                  <p className={styles.seniority}>{offer.seniority}</p>
                  <p className={styles.salary}>
                     {offer.salaryFrom} – {offer.salaryTo} {offer.currency} net
                  </p>
               </div>
            </div>
            <p className={styles.dayAgo}>{dayInterval(offer.createdAt)}</p>
         </div>
      </div>
   );
}

export default JobCard;
