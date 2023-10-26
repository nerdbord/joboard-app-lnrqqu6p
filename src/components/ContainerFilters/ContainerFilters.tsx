import React from 'react';
import styles from './ContainerFilters.module.scss';

interface Props {
   children: React.ReactNode;
}

export const ContainerFilters: React.FC<Props> = ({ children }) => {
   return <section className={styles.container}>{children}</section>;
};
