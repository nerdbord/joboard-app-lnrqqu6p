import React from 'react';
import styles from './JobFilter.module.scss';
import CheckBox, { Option } from './CheckBox/CheckBox';
import Slider from './Slider/Slider';
import type { IJob } from '../../services/types';

interface Props {
   label: string;
   offerKeyName: keyof IJob;
   options: Array<Option> | { value: number; setValue: (value: number) => void };
}

const JobFilter: React.FC<Props> = ({ label, offerKeyName, options }) => {
   return (
      <div
         className={styles.container}
         data-testid={`filter-${label.toLowerCase().replace(' ', '-')}`}
      >
         <span className={styles.title}>{label}</span>
         {Array.isArray(options) ? (
            <div className={styles.optionsContainer}>
               {options.map((option, idx) => (
                  <CheckBox key={idx} option={option} offerKeyName={offerKeyName} />
               ))}
            </div>
         ) : (
            <Slider value={options.value} setValue={options.setValue} />
         )}
      </div>
   );
};

export default JobFilter;
