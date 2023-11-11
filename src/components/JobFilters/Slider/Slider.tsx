import React, { ChangeEvent } from 'react';
import styles from './Slider.module.scss';
import { IJob } from '../../../services/types';

interface Props {
   value: number;
   setValue: (value: number) => void;
   offerKeyName: keyof IJob;
   label: string;
}

const Slider: React.FC<Props> = ({ value, setValue, offerKeyName, label }) => {
   const maxValue = 160000;
   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(parseInt(e.target.value, 10));
   };
   const formatValue = (value: number) => {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
   };
   return (
      <div className={styles.sliderContainer}>
         <input
            type="range"
            min={0}
            max={maxValue}
            className={styles.sliderInput}
            value={value}
            onChange={handleInputChange}
            data-testid="filter-option"
            data-test-option={JSON.stringify({
               offerKeyName: offerKeyName,
               offerOption: label,
               value: value,
            })}
         />
         <div
            className={styles.sliderLabel}
            style={{ left: `calc(${(value / maxValue) * 100}% + ${10 - value / 10000}px )` }}
         >
            {formatValue(value)}
         </div>
      </div>
   );
};

export default Slider;
