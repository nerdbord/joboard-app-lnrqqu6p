import React from 'react';
import styles from './JobFiltersSection.module.scss';
import JobFilter from './JobFilter';
import useJobsStore from '../../store/useJobsStore';

function JobFiltersSection(): React.ReactElement {
   const { jobType, setJobType, jobSeniority, setJobSeniority, jobLocation, setJobLocation } = useJobsStore();

   const jobFilters = [
    {filterLabel: "Job Type", filterOptions: [
      { keyName: 'fullTime', label: 'Full-time', value: jobType.fullTime, setValue: setJobType },
      { keyName: 'contract', label: 'Contract', value: jobType.contract, setValue: setJobType },
      { keyName: 'partTime', label: 'Part-time', value: jobType.partTime, setValue: setJobType },
      { keyName: 'freelance', label: 'Freelance', value: jobType.freelance, setValue: setJobType },
    ]},
    {filterLabel: "Seniority", filterOptions: [
      { keyName: 'lead', label: 'Lead', value: jobSeniority.lead, setValue: setJobSeniority },
      { keyName: 'expert', label: 'Expert', value: jobSeniority.expert, setValue: setJobSeniority },
      { keyName: 'senior', label: 'Senior', value: jobSeniority.senior, setValue: setJobSeniority },
      { keyName: 'midRegular', label: 'Mid/Regular', value: jobSeniority.midRegular, setValue: setJobSeniority },
      { keyName: 'junior', label: 'Junior', value: jobSeniority.junior, setValue: setJobSeniority },
      { keyName: 'intern', label: 'Intern', value: jobSeniority.intern, setValue: setJobSeniority },
    ]},
    {filterLabel: "Location", filterOptions: [
      { keyName: 'remote', label: 'Remote', value: jobLocation.remote, setValue: setJobLocation },
      { keyName: 'partRemote', label: 'Part-Remote', value: jobLocation.partRemote, setValue: setJobLocation },
      { keyName: 'onSite', label: 'On-Site', value: jobLocation.onSite, setValue: setJobLocation },
    ]},
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
