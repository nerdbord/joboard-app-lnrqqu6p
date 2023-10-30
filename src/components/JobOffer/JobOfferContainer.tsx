import React from 'react';
import { PropsWithChildren } from '../../services/types';

const JobOfferContainer: React.FC<PropsWithChildren> = ({ children }) => {
   return <article>{children}</article>;
};

export default JobOfferContainer;
