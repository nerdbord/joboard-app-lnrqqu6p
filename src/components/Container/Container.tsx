import React from 'react';
import styles from './Container.module.scss';
import { PropsWithChildren } from '../../services/types';

export const Container: React.FC<PropsWithChildren> = ({ children }) => {
   return <div className={styles['container']}>{children}</div>;
};
