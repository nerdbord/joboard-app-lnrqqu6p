import React from 'react';
import styles from './JobFiltersSection.module.scss';
import JobFilter from './JobFilter';
import useJobsStore from '../../store/useJobsStore';
import { IJob } from '../../services/types';

export interface FilterOptionCheckbox {
   keyName: string;
   label: string;
   value: boolean | number;
   setValue: (keyName: string, value: boolean | number) => void;
}
export interface FilterOptionSlider {
   value: number;
   setValue: (value: number) => void;
}

export interface JobFilterType {
   filterLabel: string;
   offerKeyName: keyof IJob;
   options: Array<FilterOptionCheckbox> | FilterOptionSlider;
}

function JobFiltersSection(): React.ReactElement {
   const {
      jobType,
      setJobType,
      jobSeniority,
      setJobSeniority,
      jobLocation,
      setJobLocation,
      jobSalary,
      setJobSalary,
      clearFilters,
   } = useJobsStore();

   const jobFilters: Array<JobFilterType> = [
      {
         filterLabel: 'Job Type',
         offerKeyName: 'jobType',
         options: [
            {
               keyName: 'fullTime',
               label: 'Full-time',
               value: jobType.fullTime,
               setValue: setJobType,
            },
            {
               keyName: 'contract',
               label: 'Contract',
               value: jobType.contract,
               setValue: setJobType,
            },
            {
               keyName: 'partTime',
               label: 'Part-time',
               value: jobType.partTime,
               setValue: setJobType,
            },
            {
               keyName: 'freelance',
               label: 'Freelance',
               value: jobType.freelance,
               setValue: setJobType,
            },
         ],
      },
      {
         filterLabel: 'Seniority',
         offerKeyName: 'seniority',
         options: [
            { keyName: 'lead', label: 'Lead', value: jobSeniority.lead, setValue: setJobSeniority },
            {
               keyName: 'expert',
               label: 'Expert',
               value: jobSeniority.expert,
               setValue: setJobSeniority,
            },
            {
               keyName: 'senior',
               label: 'Senior',
               value: jobSeniority.senior,
               setValue: setJobSeniority,
            },
            {
               keyName: 'midRegular',
               label: 'Mid/Regular',
               value: jobSeniority.midRegular,
               setValue: setJobSeniority,
            },
            {
               keyName: 'junior',
               label: 'Junior',
               value: jobSeniority.junior,
               setValue: setJobSeniority,
            },
            {
               keyName: 'intern',
               label: 'Intern',
               value: jobSeniority.intern,
               setValue: setJobSeniority,
            },
         ],
      },
      {
         filterLabel: 'Location',
         offerKeyName: 'workLocation',
         options: [
            {
               keyName: 'remote',
               label: 'Remote',
               value: jobLocation.remote,
               setValue: setJobLocation,
            },
            {
               keyName: 'partRemote',
               label: 'Part-Remote',
               value: jobLocation.partRemote,
               setValue: setJobLocation,
            },
            {
               keyName: 'onSite',
               label: 'On-Site',
               value: jobLocation.onSite,
               setValue: setJobLocation,
            },
         ],
      },
      {
         filterLabel: 'Salary (min.)',
         offerKeyName: 'salaryFrom',
         options: { value: jobSalary, setValue: setJobSalary },
      },
   ];
   return (
      <section className={styles.container}>
         <div className={styles.header}>
            <p>Filter offers</p>
            <span onClick={clearFilters} data-testid="clear-filters">
               Clear filters
            </span>
         </div>

         <div className={styles.filtersContainer}>
            {jobFilters.map((filter, idx) => (
               <div key={idx}>
                  <div className={styles.separator} />
                  <JobFilter filter={filter} />
               </div>
            ))}
         </div>
      </section>
   );
}

export default JobFiltersSection;
