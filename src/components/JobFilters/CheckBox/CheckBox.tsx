import React from 'react';
import styles from './CheckBox.module.scss';
import CheckBoxTrue from '../../icons/CheckBox/CheckBoxTrue';
import CheckBoxFalse from '../../icons/CheckBox/CheckBoxFalse';
import { FilterOptionCheckbox } from '../JobFiltersSection';

interface Props {
   option: FilterOptionCheckbox;
}

const CheckBox: React.FC<Props> = ({ option }) => {
   const { keyName, label, value, setValue } = option;
   const updateValue = () => {
      setValue(keyName, !value);
   };
   return (
      <div className={styles.container} data-testid="filter-checkbox">
         <input
            id={keyName}
            type="checkbox"
            checked={value as boolean}
            onChange={updateValue}
            hidden
         />
         <div className={styles.icon} onClick={updateValue}>
            {value ? <CheckBoxTrue /> : <CheckBoxFalse />}
         </div>
         <label htmlFor={keyName}>{label}</label>
      </div>
   );
};

export default CheckBox;
