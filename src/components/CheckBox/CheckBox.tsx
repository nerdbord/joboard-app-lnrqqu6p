import React from 'react';
import styles from './CheckBox.module.scss';
import CheckBoxTrue from '../icons/CheckBox/CheckBoxTrue';
import CheckBoxFalse from '../icons/CheckBox/CheckBoxFalse';
type JobType = {
   fullTime: boolean;
   contract: boolean;
   partTime: boolean;
   freelance: boolean;
};

type Data = {
   value: boolean;
   setValue: (key: keyof JobType, value: boolean ) => void;
   key: keyof JobType;
   label: string;
};
interface Props {
   data: Data;
}

const CheckBox: React.FC<Props> = ({ data }) => {
   const updateValue = () => {
    data.setValue(data.key,!data.value)
   };
   return (
      <div className={styles.container} onClick={updateValue}>
         <div className={styles.icon}>{data.value ? <CheckBoxTrue /> : <CheckBoxFalse />}</div>
         <span>{data.label}</span>
      </div>
   );
};

export default CheckBox;
