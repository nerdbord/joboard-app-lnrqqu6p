import React, { useState, useEffect } from 'react';
import styles from './ContainerFilters.module.scss';
import JobFiltersSection from '../JobFilters/JobFiltersSection';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const ContainerFilters = (): React.ReactElement => {
   const isMobile = useMediaQuery('(max-width: 768px)');
   const [showFilters, setShowFilters] = useState<boolean>(false);

   useEffect(() => {
      !isMobile && !showFilters && setShowFilters(true);
      isMobile && showFilters && setShowFilters(false);
   }, [isMobile]);

   return (
      <section className={styles.container}>
         <div className={styles.header}>
            <h1>👾 JO-BOARD</h1>
            {isMobile && (
               <button
                  className={`${styles.button} ${showFilters ? styles.buttonClose : ''}`}
                  onClick={() => setShowFilters(!showFilters)}
               >
                  {showFilters ? 'Close' : 'Filter offers'}
               </button>
            )}
         </div>
         {showFilters && <JobFiltersSection />}
      </section>
   );
};
