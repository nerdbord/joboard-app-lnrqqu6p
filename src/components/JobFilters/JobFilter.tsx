import React from 'react';
import styles from './JobFilter.module.scss';
import CheckBox, { Option } from '../CheckBox/CheckBox';
import Slider from '../Slider/Slider';

interface Props {
   label: string;
   options: Array<Option> | { value: number; setValue: (value: number) => void };
}

const JobFilter: React.FC<Props> = ({ label, options }) => {
   return (
      <div className={styles.container}>
         <span className={styles.title}>{label}</span>
         {Array.isArray(options) ? (
            <div className={styles.optionsContainer}>
               {options.map((option, idx) => (
                  <CheckBox key={idx} option={option} />
               ))}
            </div>
         ) : (
            <Slider value={options.value} setValue={options.setValue} />
         )}
      </div>
   );
};

export default JobFilter;
