import React from 'react';
import styles from './JobFilter.module.scss';
import CheckBox, { Option } from '../CheckBox/CheckBox';

interface Props {
   label: string;
   options: Array<Option>;
}

const JobFilter: React.FC<Props> = ({ label, options }) => {
   return (
      <div className={styles.container}>
         <span className={styles.title}>{label}</span>
         <div className={styles.optionsContainer}>
            {options.map((option, idx) => (
               <CheckBox key={idx} option={option} />
            ))}
         </div>
      </div>
   );
};

export default JobFilter;
