import React from 'react';
import styles from './JobTypeFilters.module.scss';
import CheckBox from '../../CheckBox/CheckBox';
import useJobsStore from '../../../store/useJobsStore';

function JobTypeFilters(): React.ReactElement {
   const { jobType, setJobType } = useJobsStore();
   return (
      <div className={styles.container}>
         <span className={styles.title}>Job type</span>
         <div className={styles.optionsContainer}>
            <CheckBox
               data={{
                  value: jobType.fullTime,
                  setValue: setJobType,
                  key: 'fullTime',
                  label: 'Full-time',
               }}
            />
            <CheckBox
               data={{
                  value: jobType.contract,
                  setValue: setJobType,
                  key: 'contract',
                  label: 'Contract',
               }}
            />
            <CheckBox
               data={{
                  value: jobType.partTime,
                  setValue: setJobType,
                  key: 'partTime',
                  label: 'Part-time',
               }}
            />
            <CheckBox
               data={{
                  value: jobType.freelance,
                  setValue: setJobType,
                  key: 'freelance',
                  label: 'Freelance',
               }}
            />
         </div>
      </div>
   );
}

export default JobTypeFilters;
