import React from 'react';
import { PropsWithChildren } from '../../services/types';
import style from './Modal.module.scss';
import useJobsStore from '../../store/useJobsStore';

const Modal: React.FC<PropsWithChildren> = ({ children }) => {
   const { isOfferWindowOpen } = useJobsStore();
   return (
      <div className={style.container} style={{ display: isOfferWindowOpen ? 'flex' : 'none' }}>
         {children}
      </div>
   );
};

export default Modal;
