import React from 'react';
import styles from './ContainerJobs.module.scss';

interface Props {
   children: React.ReactNode;
}

export const ContainerJobs: React.FC<Props> = ({ children }) => {
   return <section className={styles.container}>{children}</section>;
};
