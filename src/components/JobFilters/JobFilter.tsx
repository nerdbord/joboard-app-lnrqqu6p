import React from 'react';
import styles from './JobFilter.module.scss';
import CheckBox from './CheckBox/CheckBox';
import Slider from './Slider/Slider';
import { JobFilterType } from './JobFiltersSection';

interface Props {
   filter: JobFilterType;
}

const JobFilter: React.FC<Props> = ({ filter }) => {
   const { filterLabel, offerKeyName, options } = filter;
   return (
      <div className={styles.container} data-testid={offerKeyName} role="jobfilters-section">
         <span className={styles.title}>{filterLabel}</span>
         {Array.isArray(options) ? (
            <div className={styles.optionsContainer}>
               {options.map((option, idx) => (
                  <CheckBox key={idx} option={option} />
               ))}
            </div>
         ) : (
            <Slider option={options} />
         )}
      </div>
   );
};

export default JobFilter;
