import React from 'react';
import { JobCardProps } from './JobCard';
import { useGetOfferById } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';
import stylesMobile from './JobCardMobile.module.scss';
import styles from './JobCard.module.scss';
import { dayInterval } from '../../services/utils';

const JobCardMobile = ({ offer }: JobCardProps) => {
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
            <p className={styles.title}>{offer.title}</p>

            <div className={stylesMobile.offerDataContainerMobile}>
               <img src={offer.image} alt="logo" className={styles.logo} />
               <div className={stylesMobile.column}>
                  <div className={stylesMobile.detailsContainer}>
                     <p className={styles.company}>{offer.companyName}</p>
                     <p className={styles.location}>
                        {offer.city}, {offer.country}
                     </p>
                  </div>
                  <div className={stylesMobile.detailsContainer}>
                     <p className={styles.workLocation}>{offer.workLocation}</p>
                     <p className={styles.seniority}>{offer.seniority}</p>
                  </div>
               </div>
            </div>
            <div className={stylesMobile.dataRow}>
               <p className={styles.salary}>
                  {offer.salaryFrom} – {offer.salaryTo} {offer.currency} net
               </p>
               <p className={styles.dayAgo}>{dayInterval(offer.createdAt)}</p>
            </div>
         </div>
      </div>
   );
};

export default JobCardMobile;
