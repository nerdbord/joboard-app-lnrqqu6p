import React from 'react';
import { PropsWithChildren } from '../../services/types';

const JobList: React.FC<PropsWithChildren> = ({ children }) => {
   return <section>{children}</section>;
};

export default JobList;
