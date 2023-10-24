import React from 'react';
import styles from './JobCard.module.scss';
import {IJob} from "../../services/types";

function JobCard(props: IJob) {
   return (
      <div className={styles['offer']}>
         <img src={props.image} alt="logo" className={styles['logo']} />
         <div className={styles['offer-data']}>
            <div className={styles['title']}>{props.title}</div>
            <div className={styles['offer-details']}>
               <div className={styles['company']}>{props.companyName}</div>
               <div className={styles['location-seniority']}>
                  <Separator />
                  <div>
                     {props.city}, {props.country}
                  </div>
                  <Separator />
                  <div>{props.workLocation}</div>
                  <Separator />
                  <div>{props.seniority}</div>
                  <Separator />
                  <div className={styles['salary']}>
                     {props.salaryFrom} - {props.salaryTo} {props.currency} net
                  </div>
               </div>
            </div>
         </div>
         <DaysElapsed {...props} />
      </div>
   );
}

function Separator() {
   return <div className={styles['separator']}></div>;
}

function DaysElapsed(props: IJob) {
   const daysElapsed = countDaysAgo(props.createdAt);
   switch (daysElapsed) {
      case 0:
         return <div className={styles['days-elapsed']}>today</div>;
      case 1:
         return <div className={styles['days-elapsed']}>{daysElapsed} day ago</div>;
      default:
         return <div className={styles['days-elapsed']}>{daysElapsed} days ago</div>;
   }
}

function countDaysAgo(createdAt: string): number {
   const createdAtDate = new Date(createdAt);
   const today = new Date();
   const daysDiff = today.getDay() - createdAtDate.getDay();
   return daysDiff;
}

export default JobCard;
