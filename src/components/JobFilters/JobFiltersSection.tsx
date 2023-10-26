import React from 'react';
import styles from './JobFiltersSection.module.scss';
import JobFilter from './JobFilter';
import useJobsStore from '../../store/useJobsStore';

function JobFiltersSection(): React.ReactElement {
   const { jobType, setJobType } = useJobsStore();

   const jobFilters = [
    {filterLabel: "Job Type", filterOptions: [
      { keyName: 'fullTime', label: 'Full-time', value: jobType.fullTime, setValue: setJobType },
      { keyName: 'contract', label: 'Contract', value: jobType.contract, setValue: setJobType },
      { keyName: 'partTime', label: 'Part-time', value: jobType.partTime, setValue: setJobType },
      { keyName: 'freelance', label: 'Freelance', value: jobType.freelance, setValue: setJobType },
    ]}
  ];
   return (
      <section className={styles.container}>
         <div className={styles.header}>
            <p>Filter offers</p>
            <span>Clear filters</span>
         </div>

         <div className={styles.filtersContainer}>
            {jobFilters.map(({ filterLabel, filterOptions }, idx) => (
               <div key={idx}>
                  <div className={styles.separator} />
                  <JobFilter label={filterLabel} options={filterOptions} />
               </div>
            ))}
         </div>
      </section>
   );
}

export default JobFiltersSection;
