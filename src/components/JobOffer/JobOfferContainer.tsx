import React from 'react';
import { PropsWithChildren } from '../../services/types';
import style from './JobOffer.module.scss';

const JobOfferContainer: React.FC<PropsWithChildren> = ({ children }) => {
   return <article className={style.container}>{children}</article>;
};

export default JobOfferContainer;
