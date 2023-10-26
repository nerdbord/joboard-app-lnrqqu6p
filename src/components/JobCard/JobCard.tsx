import React from 'react';
import styles from './JobCard.module.scss';
import { IJob } from '../../services/types';
import { useGetOfferById } from '../../services/queries';
import useJobsStore from '../../store/useJobsStore';

function JobCard(props: IJob) {
   const { data } = useGetOfferById(props._id);
   const { setOffer, setCurrentOfferId, setIsOfferWindowOper, isOfferWindowOpen } = useJobsStore();
   const handleCardOnClick = () => {
      setOffer(data);
      setCurrentOfferId(props._id);
      setIsOfferWindowOper(!isOfferWindowOpen);
   };
   return (
      <div className={styles.offer} onClick={handleCardOnClick}>
         <img src={props.image} alt="logo" className={styles.logo} />
         <div className={styles.offerData}>
            <div className={styles.title}>{props.title}</div>
            <div className={styles.offerDetails}>
               <div className={styles.company}>{props.companyName}</div>
               <div className={styles.locationSeniority}>
                  <Separator />
                  <div>
                     {props.city}, {props.country}
                  </div>
                  <Separator />
                  <div>{props.workLocation}</div>
                  <Separator />
                  <div>{props.seniority}</div>
                  <Separator />
                  <div className={styles.salary}>
                     {props.salaryFrom} - {props.salaryTo} {props.currency} net
                  </div>
               </div>
            </div>
            <div className={styles.colSalaryDays}>
                <div className={styles.salary}>
                    {props.salaryFrom} - {props.salaryTo} {props.currency} net
                </div>
                <DaysElapsed {...props} />
            </div>
        </div>
    );
}

function Separator() {
    return <div className={styles.separator}></div>;
}

function Marginal() {
    return <div className={styles.marginal}></div>;
}

function DaysElapsed(props: IJob) {
    const daysElapsed = countDaysAgo(props.createdAt);
    switch (daysElapsed) {
        case 0:
            return <div className={styles.daysElapsed}>today</div>;
        case 1:
            return <div className={styles.daysElapsed}>{daysElapsed} day ago</div>;
        default:
            return <div className={styles.daysElapsed}>{daysElapsed} days ago</div>;
    }
}

function countDaysAgo(createdAt: string): number {
    const createdAtDate = new Date(createdAt);
    const today = new Date();
    const timeDiff = today.getTime() - createdAtDate.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
}

export default JobCard;


