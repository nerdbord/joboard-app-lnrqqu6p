import React from 'react';
import styles from './JobFiltersSection.module.scss';
import JobTypeFilters from './JobTypeFilters/JobTypeFilters';

function JobFiltersSection(): React.ReactElement {
   return (
      <section className={styles.container}>
         <div className={styles.header}>
            <p>Filter offers</p>
            <span>Clear filters</span>
         </div>

         <div className={styles.filtersContainer}>
            <div className={styles.separator} />
            <JobTypeFilters />
            <div className={styles.separator} />
         </div>
      </section>
   );
}

export default JobFiltersSection;
