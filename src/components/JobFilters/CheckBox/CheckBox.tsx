import React from 'react';
import styles from './CheckBox.module.scss';
import CheckBoxTrue from '../../icons/CheckBox/CheckBoxTrue';
import CheckBoxFalse from '../../icons/CheckBox/CheckBoxFalse';
import type { IJob } from '../../../services/types';
import type { Option } from '../JobFilter';

interface Props {
   option: Option;
   offerKeyName: keyof IJob;
}

const CheckBox: React.FC<Props> = ({ option, offerKeyName }) => {
   const { keyName, label, value, setValue } = option;
   const updateValue = () => {
      setValue(keyName, !value);
   };
   return (
      <div
         className={styles.container}
         onClick={updateValue}
         data-testid="filter-option"
         data-test-option={JSON.stringify({
            offerKeyName: offerKeyName,
            offerOption: label,
            value: value,
         })}
      >
         <div className={styles.icon}>{value ? <CheckBoxTrue /> : <CheckBoxFalse />}</div>
         <span>{label}</span>
      </div>
   );
};

export default CheckBox;
