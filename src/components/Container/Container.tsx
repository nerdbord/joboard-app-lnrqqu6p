import React from 'react';
import styles from './Container.module.scss';

interface Props {
   children: React.ReactNode;
}

export const Container: React.FC = (props: Props) => (
   <div className={styles.container}>{props.children}</div>
);
