import React from 'react';
import styles from './JobCard.module.scss';
import {IJob} from '../../services/types';

function JobCard(props: IJob) {
    return (
        <div className={styles.offer}>
            <div className={styles.colDetails}>
                <img src={props.image} alt="logo" className={styles.logo}/>
                <div className={styles.offerData}>
                    <div className={styles.title}>{props.title}</div>

                    <div className={styles.offerDetails}>
                        <div className={styles.detailsContainer}>
                            <div className={styles.company}>{props.companyName}</div>
                            <Separator/>
                            <div>
                                {props.city}, {props.country}
                            </div>
                            <Marginal/>
                        </div>
                        <div className={styles.detailsContainer}>
                            <div>{props.workLocation}</div>
                            <Separator/>
                            <div>{props.seniority}</div>
                            <Marginal />
                        </div>
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


